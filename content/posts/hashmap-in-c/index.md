---
title: "a simple hash table in C"
date: "2023-06-06"
description: "A simple hash table implementation in C, by Leo Robinovitch."
---

I implemented a simple [hash table][wiki_hash_table] in C when solving a problem in [CS Primer][csprimer]. Solving it
helped me gain better intuition around hash functions, pointers, and memory segments like the stack and the heap.

## Basics

You have probably encountered a hash table in the wild, like
a [`dict` in Python][python_source], [`map` in Go][go_source], or [`Map` in JavaScript][v8_source]. Hash tables
associate a key with a value. Setting, looking up, and deleting values is average O(1) time complexity -- fast.

Under the hood of a hash table, there is an array of "buckets" or "slots". I'll use the term buckets going forward. The
buckets array holds the values stored in the hash table. When you associate a key with a value, the key's hash is used
to obtain the index of its value in the buckets array. Since the index is quick and easy to derive from the key, setting
and looking up by key (usually) takes little work.

There are a number of design decisions when implementing a hash table:

* hash function selection
* initial size of the buckets array
* collision resolution (when many keys hash to the same index)
* when to resize or compact the buckets array

The C hash table implementation I walk through below starts with a buckets array of size 4, has no resizing or
compaction, accepts only strings as keys, and uses separate chaining (linked list) hash collision resolution.

### Hash functions

A hash function takes an argument (in this case, a key) and deterministically returns a number. As a contrived example,
`my_hash_func(key="hello")` returns 123 for the lifetime of the program[^1]. A different key,
say `my_hash_func(key="world")` might return a different number, say 127. There are a number of desirable
characteristics for a good hash function[^2].

[^1]: **a hash function returns the same number for the same input for the *life of the program***: I say for the life
of the program and not "always" because most programming languages [add an unpredictable random value][python_seed] (a
seed) to the hash function input. This value is the same for the lifetime of the process, but different across
processes. The reason for this is interesting -- if attackers know or can infer the hash function output by providing
application input, they
can [purposefully increase the number of hash table collisions in order to DoS attack the server][dos_attack]. Because
of this random seed, [Python `sets` are not ordered][set_ordering].

[^2]: **desirable characteristics of a hash function**: read [this discussion][choosing_func]
from [Queens' CISC-235][queens], but Tl;DR a good hash function does the following:

    * gives equal weight to all elements (digits, chars) in the key
    * uniformly distributes keys throughout the output space
    * is fast to compute
    * is discontinuous (keys that are close in value don't necessarily map to outputs that are close in value)

    The [djb2] hash function used here is pretty good on these criteria.

### The buckets array

When setting a value, the hash table internally runs the key through its hash function, takes the output modulo the
length of its buckets array, and puts the value at that index of the buckets array. For example, say "hello" hashed to
123 as above, and our buckets array is of length 4. `123 % 4` is 3. If I wanted to associate the key "hello" with the
number 72 in my hash table, the buckets array would look like this in pseudo-code:

```python
> h["hello"] = 72
> h.show_buckets() # "hello" hashes to 123, and 123 % 4 = 3
bucket 0: NULL
bucket 1: NULL
bucket 2: NULL
bucket 3: ("hello", 72) -> NULL
```

Each bucket optionally contains the head of a linked list. Here, buckets 0 through 2 are empty and bucket 3 contains a
linked list with a single value (72) associated with the key "hello".

When looking up the value of key "hello", the hash map will once again infer that the key "hello" lives in bucket 3,
then traverse the linked list in bucket 3. Once it finds the matching key "hello" in the linked list, it returns the
associated value of 72. If no matching key is found in the linked list, the hash table may throw an error (e.g.
`KeyError` in Python) or return a null pointer like my implementation below.

You can imagine that if a lot of keys hash-and-mod to bucket 3, the linked list there will be very long, and
setting/getting values from the hash table will no longer be performant. This is why most implementations resize the
number of buckets when the buckets array gets too full[^3].

[^3]: **when is the bucket array too full?**: the load factor is the proportion of buckets with at least one value. When
the load factor reaches some high enough value, it may be a good idea to resize the hash table by creating a larger
buckets array, reinserting all values into it, and replacing the old bucket array with the new one.

    As long as the hash function evenly distributes keys to output values, you
    can expect about equal distribution of values throughout the buckets array, i.e. equally long linked lists when using
    separate chaining collision resolution.

    Hash tables using separate chaining hash collisions may tolerate higher load factors than those using open addressing,
    as the extra operations required to seek an item is bound by the max length of the linked lists. Open addressing
    collisions may cause up to the number of buckets extra operations as an empty bucket is sought, so the max load factor
    is usually lower when this is used. Python, which uses open addressing, [uses a max load factor of 1/2 to
    1/3][python_load].

    It's also possible to implement a hash table that resizes based on frequency of access or overall process load, maybe
    resizing only during periods of lower load.

    The load factor can also be too low, which indicates an overuse of memory. In that case, your hash table may compact in
    order to require less buckets and free up memory.

### The heap

I'll be mentioning the heap frequently. You can think of the stack and heap as different memory spaces (or segments, à
la [segfault]) in RAM during program runtime. Variables on the stack are scoped to a function -- they are all
deallocated and are no longer referencable when the function returns. The heap is used to store variables that need to
be referenced outside the scope of the function that defines them. A common way variables are stored on the heap is with
the function `malloc`. They are then referencable until the program calls the function `free` on them. Failure to `free`
unused variables on the heap as the program continues to run is what is referred to as a memory leak, as the heap memory
may repeatedly fill up, causing the process to request more heap memory.

## Hash table C implementation

In C, a `struct` is a collection of named and typed fields. I define two `struct`s. One is called `Entry` and represents
an item in the hash table.

```c
typedef struct Entry {
    char *key;
    void *val;
    struct Entry *next;
} Entry;
```

`Entry` contains three fields:

* `key`, the key associated with the value
* `val`, a void ("any type") pointer to the value itself
* `next`, a pointer to the next `Entry` for collision resolution

All fields are pointers in order to ensure each `Entry` is a static size in memory -- the output of the `sizeof`
function for each field is fixed, therefore the output of `sizeof(Entry)` is constant.

The other `struct` represents the hash table itself:

```c
typedef struct HashTable {
    Entry **buckets;
    int nBuckets;
} HashTable;
```

`HashTable` contains 2 fields:

* `buckets`, a pointer to an array of pointers to `Entry`s (the memory tables below may help if this is initially
  confusing)
* `nBuckets`, the number of buckets in the Hashmap

Similar to `Entry`, since both fields are a static size, a `HashTable` instance is also a static size.

### The djb2 hash function

The hash function used operates only on strings, and is called [djb2][djb2] written by [Daniel Bernstein][djb][^4].

[^4]: **the djb2 hash function**: this is a pretty strange looking function at first. What are these magic numbers 33
and 5381? There is some explanation for them [here on stackoverflow](https://stackoverflow.com/a/13809282), but long
story short, they seem to provide a hash function with all the desirable properties discussed in a footnote.

```c
uint32_t hash(char *s) {
    uint32_t h = 5381;
    char c;
    while ((c = *s++)) {
        h = 33 * h + c;
    }
    return h;
}
```

The `get_bucket` function returns the bucket index for a given key:

```c
uint32_t get_bucket(HashTable *h, char *key) {
    return hash(key) % h->nBuckets;
}
```

### Creating an empty hash table

When creating a new `HashTable`, memory is allocated on the heap for the `HashTable` and its buckets array. Each entry
in the buckets array, i.e. each bucket, is a pointer to an `Entry`. A pointer to the `HashTable` is returned.

```c
HashTable *HashTable_new() {
    int nBuckets = 4;
    HashTable *h = malloc(sizeof(HashTable));
    h->nBuckets = nBuckets;
    h->buckets = calloc(nBuckets, sizeof(Entry *));
    return h;
}
```

Note that [`calloc`] is called instead of [`malloc`] when initializing the buckets array to ensure that all items are
initially zero'd out (NULL).

After calling `HashTable_new`, `malloc`/`calloc` has been called twice, so the heap looks something like this:

| Address                                 | Pseudo-value                                            | Description      |
|-----------------------------------------|---------------------------------------------------------|------------------|
| 0xFF00                                  | `HashTable(4, {{< color "red" >}}0xFF40{{< /color >}})` | HashTable itself |
| {{< color "red" >}}0xFF40{{< /color >}} | `[NULL, NULL, NULL, NULL]`                              | Initial buckets  |

### Associating a key and value

Let's define a `HashTable_set` function to associate keys and values:

```c
void HashTable_set(HashTable *h, char *key, void *val) {
    uint32_t bucket = get_bucket(h, key);
    Entry *v = h->buckets[bucket];
    
    // traverse the linked list at the key's bucket index
    while (v != NULL) {
        if (strcmp(v->key, key) == 0) {
            // if Entry is found, overwrite its value
            v->val = val;
            return;
        }
        v = v->next;
    }

    // found no existing entry - create one
    // and make it the head of the linked list
    Entry *newVal = malloc(sizeof(Entry));
    newVal->key = strdup(key);
    newVal->val = val;
    newVal->next = h->buckets[bucket];
    h->buckets[bucket] = newVal;
}
```

We get the key's bucket index from its hash, then traverse the optional linked list of `Entry`s at that index in the
buckets array. If we find an existing key, we overwrite its value with the new value and return. If no existing `Entry`
for the key is found, allocate memory for a new `Entry`, create and store a copy of the key using [strdup] (which uses
`malloc` under the hood), set its value, and insert it as the head[^5] of the linked list at the appropriate bucket
index.

[^5]: **why insert values at the head of the linked list?**: we could have also appended them to the end of the linked
list, but it would involve keeping a reference to the previous `Entry` around or doing a look-ahead to find the linked
list's termination point. If the aim is to create a generally performant data structure, there's no way to know whether
users will be referencing recently inserted values more often than previously inserted values, so it's not such an
important decision whether to put the new entry on the head or tail. In a more complete implementation, resizing the
buckets array to reduce the length of the linked lists makes this decision even more arbitrary.

Now we can run the following code:

```c
HashTable *h = HashTable_new();
int a = 5;
// hash("item a") % 4 = 1 for this example
HashTable_set(h, "item a", &a);
// >breakpoint<
```

At the breakpoint, the stack looks something like this:

| Address                                   | Pseudo-value | Description |
|-------------------------------------------|--------------|-------------|
| {{< color "green" >}}0x0000{{< /color >}} | `5`          | Integer a   |

The heap looks something like this:

| Address                                    | Pseudo-value                                                                                         | Description      |
|--------------------------------------------|------------------------------------------------------------------------------------------------------|------------------|
| 0xFF00                                     | `HashTable(4, {{< color "red" >}}0xFF40{{< /color >}})`                                              | HashTable itself |
| {{< color "red" >}}0xFF40{{< /color >}}    | `[NULL, {{< color "blue" >}}0xFF80{{< /color >}}, NULL, NULL]`                                       | Buckets array    |
| {{< color "blue" >}}0xFF80{{< /color >}}   | `Entry({{< color "indigo" >}}0xFFB0{{< /color >}}, {{< color "green" >}}0x0000{{< /color >}}, NULL)` | Inserted entry   |
| {{< color "indigo" >}}0xFFB0{{< /color >}} | `"item a"`                                                                                           | Key for entry    |

And the buckets of `h` looks like this:

```c
bucket 0: NULL
bucket 1: ("item a", 5) -> NULL
bucket 2: NULL
bucket 3: NULL
```

### Looking up values by key

For looking up values by key, `HashTable_get` is similar but simpler than `HashTable_set`:

```c
void *HashTable_get(HashTable *h, char *key) {
    uint32_t bucket = get_bucket(h, key);
    Entry *v = h->buckets[bucket];
    
    // traverse the linked list at the key's bucket index
    while (v != NULL) {
        // if Entry is found, return the value
        if (strcmp(v->key, key) == 0) return v->val;
        v = v->next;
    }
    
    // no key found, return NULL
    return NULL;
}
```

A void pointer to the value rather than the value itself is returned.

### Deleting entries

Hash tables often also include functionality to delete an entry, like Python's [`del` keyword][del]. The
`HashTable_delete` function allows the user or program to mark entries as removed:

```c
void HashTable_delete(HashTable *h, char *key) {
    uint32_t bucket = get_bucket(h, key);
    Entry *prev = NULL;
    Entry *v = h->buckets[bucket];
    
    // traverse the linked list at the key's bucket index
    while (v != NULL) {
        if (strcmp(v->key, key) == 0) {
            // found Entry to delete
            if (prev == NULL) {
                // if head of linked list,
                // set head to next value
                h->buckets[bucket] = v->next;
            } else {
                // if middle or end of linked list,
                // remove without disrupting pointers
                prev->next = v->next;
            }
            // free allocated heap memory for the Entry's
            // key and the Entry itself
            free(v->key);
            free(v);
            return;
        }
        prev = v;
        v = v->next;
    }
    // if no Entry found, do nothing
}
```

So after running the following:

```c
HashTable *h = HashTable_new();
int a = 5;
HashTable_set(h, "item a", &a);
HashTable_delete(h, "item a")
// >breakpoint<
```

At the breakpoint, the stack looks something like this:

| Address | Pseudo-value | Description |
|---------|--------------|-------------|
| 0x0000  | `5`          | Integer a   |

And the heap looks the same as when the hash table was originally initialized:

| Address                                 | Pseudo-value                                            | Description      |
|-----------------------------------------|---------------------------------------------------------|------------------|
| 0xFF00                                  | `HashTable(4, {{< color "red" >}}0xFF40{{< /color >}})` | HashTable itself |
| {{< color "red" >}}0xFF40{{< /color >}} | `[NULL, NULL, NULL, NULL]`                              | Buckets array    |

### Discarding the hash table

Finally, the user may want to free the entire hash table, so let's provide them with a `HashTable_free` function:

```c
void HashTable_free(HashTable *h) {
    // traverse every linked list and free
    // each Entry and its key
    for (int b = 0; b < h->nBuckets; b++) {
        Entry *v = h->buckets[b];
        while (v != NULL) {
            Entry *next = v->next;
            free(v->key);
            free(v);
            v = next;
        }
    }
    
    // free the buckets array and the HashTable itself
    free(h->buckets);
    free(h);
}
```

This completes the implementation of a simple hash table in C.

## Alternatives and discussion

There are a couple things I know I'm doing imperfectly above, and probably more that I don't know about:

* [`strncmp`] should be used instead of `strcmp` in order to avoid unexpected behavior if non-null-terminated strings
  are passed to it
* the code should check if `malloc`, `strcmp`, and their analogues fail. In particular, this is important in embedded or 
  older environments where the OS may not kill processes before address space is exhausted

Some easy optimizations:

* use `(h << 5) + h` instead of `33 * h` in `djb2` as they are equivalent, but bit shifting & addition may produce
  faster machine code than multiplication depending on the compiler
* store the hash of the key in each `Entry` and only compare the keys if the hash values match

More involved improvements:

* support non-string keys
* use a balanced binary tree at each bucket rather than a linked list
* resize the buckets array once it gets too full
* switch from chained resolution with linked lists to a different technique like open addressing[^6]
* maintain insertion order
* add a random seed to each process that uses the hash table in order to prevent [DoS attacks][dos_attack]

Thanks to Oz and [CS Primer][csprimer] for this problem. I found it a great exercise to learn more about hash tables and
the design decisions behind them, hash functions, the C programming language, and memory management.

[^6]: **what is open addressing?**: [open addressing][open_addr] is a technique to efficiently locate empty buckets in
which to place values during hash collisions. The absolute best resource I've found to deeply understand open addressing
is [this explorable explanation of Python dicts][explorable], which is absolutely worth your time if you enjoyed this
post.

[csprimer]: https://csprimer.com/courses/

[wiki_hash_table]: https://en.wikipedia.org/wiki/Hash_table

[python_source]: https://github.com/python/cpython/blob/main/Objects/dictobject.c

[python_load]: https://github.com/python/cpython/blob/2587b9f64eefde803a5e0b050171ad5f6654f31b/Objects/dictobject.c#L399-L409

[go_source]: https://github.com/golang/go/blob/master/src/runtime/map.go

[v8_source]: https://github.com/v8/v8/blob/main/src/objects/ordered-hash-table.cc

[python_seed]: https://en.wikipedia.org/wiki/Hash_function#Deterministic

[set_ordering]: https://docs.python.org/3/reference/datamodel.html#object.__hash__

[dos_attack]: ./dos_via_algo_complexity_attack.pdf

[choosing_func]: ./choosing_hash_function.pdf

[queens]: https://sites.cs.queensu.ca/courses/cisc235/

[segfault]: https://en.wikipedia.org/wiki/Segmentation_fault

[djb2]: http://www.cse.yorku.ca/~oz/hash.html

[djb]: https://en.wikipedia.org/wiki/Daniel_J._Bernstein

[strdup]: https://man7.org/linux/man-pages/man3/strdup.3.html

[del]: https://docs.python.org/3/reference/simple_stmts.html#the-del-statement

[`malloc`]: https://man7.org/linux/man-pages/man3/malloc.3p.html

[`calloc`]: https://man7.org/linux/man-pages/man3/calloc.3p.html

[`strncmp`]: https://linux.die.net/man/3/strncmp

[magic_nums]: https://stackoverflow.com/a/13809282

[open_addr]: https://en.wikipedia.org/wiki/Open_addressing

[explorable]: https://just-taking-a-ride.com/inside_python_dict/chapter1.html
