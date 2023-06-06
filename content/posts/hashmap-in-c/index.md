---
title: "a simple hash table in C"
date: "2023-06-07"
description: "A simple hash table implementation in C, by Leo Robinovitch."
draft: true
---

I implemented a simple [hash table][wiki_hash_table] in C when solving a problem in [CS Primer][csprimer]. By doing so,
I gained better intuition around hash functions, pointers, and memory segments like the stack and the heap.

This post is aimed at relative beginners to C and people interested in how a basic hash table is implemented.

## Basics

You have probably encountered a hash table in the wild, like a [`dict` in Python][python_source]
or [`Map` in JavaScript][v8_source]. Hash tables associate a key with a value. Setting, looking up, and deleting values
is average O(1) time complexity - fast.

Under the hood, there is an array of "buckets" or "slots". I'll use the term buckets going forward. The buckets array
can hold values. When you associate a key with a value, a "property" of the key - its hash - is used to obtain the index
where its value lives in the buckets array. Since the value's index in the buckets array is quick and easy to derive
from the key, setting and looking up by key (usually) takes very little work.

There are a number of design decisions when implementing a hash table:

* hash function selection
* initial size of the buckets array
* collision resolution (when many keys hash to the same index)
* when to resize or compact the buckets array

The C hash table implementation I walk through below starts with a buckets array of size 4, has no resizing or
compaction, accepts only strings as keys, and uses chained (linked list) hash collision resolution.

### Hash functions

A hash function takes an argument (in this case, a key) and deterministically returns a number. As a contrived example,
`my_hash_func(key="hello")` returns 123 for the lifetime of the program[^1]. A different key,
say `my_hash_func(key="world")` might return a different number, say 127. There are a number of desirable
characteristics for a good hash function[^2].

[^1]: **a hash function returns the same number for the same input for the *life of the program***: I say for the life
of the program and not "always" because most programming languages [add an unpredictable random value][python_seed] (a
seed) to the hash function input. This value is the same for the lifetime of the process, but different across
processes. The reason for this is extremely interesting - if attackers know or can infer the hash function output by
providing application input, they
can [purposefully increase the number of collisions in order to DoS attack the server][dos_attack]. This is also the
reason [Python `sets` are not ordered][set_ordering]. TODO: C's `hash` function seeded?

[^2]: **desirable characteristics of a hash function**: TODO

    * TODO
    * TODO

### The buckets array

The hash table internally runs keys through its hash function, `mod`'s the output by the length its buckets array, and
stores the associated value at that index of the buckets array. For example, say "hello" hashed to 123 as above, and our
buckets array is of length 4. `123 % 4` is 3. If I wanted to associate the key "hello" with the number 72 in my hash
table, the buckets array would look like this in pseudo-code:

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
associated value (72). If no matching key is found in the linked list, the hash table may throw an error (e.g.
`KeyError` in Python ) or return a null pointer like my implementation below.

You can imagine that if a lot of keys land in bucket 3, the linked list there will be very long, and setting/getting
values from the hash table will no longer be performant. This is why most implementations resize the number of buckets
when the buckets array gets too full[^3].

[^3]: **when is the bucket array too full?**: TODO

### The heap

I'll be mentioning the heap frequently. You can think of the stack and heap as different memory spaces (or segments, à
la [segfault]) in RAM during program runtime. Variables on the stack are scoped to a function - they are all deallocated
and are no longer referencable when the function returns. The heap is used to store variables that need to be referenced
outside the scope of the function that defines them. A common way variables are stored on the heap is with the function
`malloc`. They are then referencable until the program calls the function `free` on them.

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

All fields are pointers in order to ensure each `Entry` is a static size in memory - the output of the `sizeof`
function for each field is fixed, therefore the output of `sizeof(Entry)` is constant.

The other `struct`, `HashTable`, represents the hash table itself.

```c
typedef struct HashTable {
    Entry **buckets;
    int nBuckets;
} HashTable;
```

`HashTable` contains 2 fields:

* `buckets`, a pointer to an array of pointers to `Entry`s - *the memory tables below may help if this is confusing*
* `nBuckets`, the number of buckets in the Hashmap

Similar to `Entry`, since both fields are a static size, a `HashTable` instance is also a static size.

The hash function used operates only on strings, and is called [djb2][djb2] written by [Daniel Bernstein][djb][^4].

[^4]: **the djb2 hash function**: TODO

    - magic numbers
    - has the desirable properties discussed above

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

When creating a new `HashTable`, memory is allocated on the heap for the `HashTable` and its buckets array. Each entry
in the buckets array, i.e. each bucket, is a pointer to an `Entry`. A pointer to the `HashTable` is returned.

```c
HashTable *HashTable_new() {
    int nBuckets = 4;
    HashTable *h = malloc(sizeof(HashTable));
    h->nBuckets = nBuckets;
    h->buckets = malloc(nBuckets * sizeof(Entry *));
    return h;
}
```

After calling `HashTable_new`, `malloc` has been called twice, so the heap looks something like this:

| Address                                 | Pseudo-value                                            | Description      |
|-----------------------------------------|---------------------------------------------------------|------------------|
| 0xFF00                                  | `HashTable(4, {{< color "red" >}}0xFF40{{< /color >}})` | HashTable itself |
| {{< color "red" >}}0xFF40{{< /color >}} | `[NULL, NULL, NULL, NULL]`                              | Initial buckets  |

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

[^5]: We could also append it to the end of the linked list, but it would involve keeping a reference to the previous
`Entry` around or doing a look-ahead to find the linked list's termination point. If the aim is to create a generally
performant data structure, there's no way to know whether users will be referencing recently inserted values more often
than previously inserted values, so it's not such an important decision whether to put the new entry on the head or
tail. In a more complete implementation, resizing the buckets array to reduce the length of the linked lists makes this
decision even more arbitrary.

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

And the output of something like `show_buckets()` for `h` looks like this:

```c
bucket 0: NULL
bucket 1: ("item a", 5) -> NULL
bucket 2: NULL
bucket 3: NULL
```

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
                // set whole bucket to NULL
                h->buckets[bucket] = NULL;
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

* [`calloc`] should be used instead of `malloc` in initialization to ensure allocated memory is zeroed
* [`strncmp`] should be used instead of `strcmp` in order to avoid unexpected behavior if non-null-terminated strings
  are passed to it

Some easy optimizations:

* use `(h << 5) + h` instead of `33 * h` in `djb2` as they are equivalent, but bit shifting & addition may produce
  faster machine code than multiplication depending on the compiler
* store the hash of the key on each entry and only compare the keys if the `Entry`s hashed values match

More involved improvements:

* support non-string keys
* resizing the buckets array once it gets too full
* switch from chained hash collision with linked lists to a different technique like open addressing[^6]
* maintain insertion order

Thanks to Oz and [CS Primer][csprimer] for this problem. I found it a great exercise to learn more about hash tables and
the design decisions behind them, hash functions, the C programming language, and memory management.

[^6]: **what is open addressing?**: TODO link to Python blog post

[csprimer]: https://csprimer.com/courses/

[wiki_hash_table]: https://en.wikipedia.org/wiki/Hash_table

[python_source]: https://github.com/python/cpython/blob/main/Objects/dictobject.c

[v8_source]: https://github.com/v8/v8/blob/main/src/objects/ordered-hash-table.cc

[python_seed]: https://en.wikipedia.org/wiki/Hash_function#Deterministic

[set_ordering]: https://docs.python.org/3/reference/datamodel.html#object.__hash__

[dos_attack]: ./dos_via_algo_complexity_attack.pdf

[segfault]: https://en.wikipedia.org/wiki/Segmentation_fault

[djb2]: http://www.cse.yorku.ca/~oz/hash.html

[djb]: https://en.wikipedia.org/wiki/Daniel_J._Bernstein

[strdup]: https://man7.org/linux/man-pages/man3/strdup.3.html

[del]: https://docs.python.org/3/reference/simple_stmts.html#the-del-statement

[`calloc`]: https://man7.org/linux/man-pages/man3/calloc.3p.html

[`strncmp`]: https://linux.die.net/man/3/strncmp
