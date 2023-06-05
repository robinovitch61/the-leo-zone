---
title: "DRAFT: a simple hash table implementation in C"
date: "2023-05-15"
description: "A hash table implementation in C, by Leo Robinovitch."
draft: true
---

I implemented a simple [hash table][wiki_hash_table] in C in a problem in [CS Primer](https://csprimer.com/). In doing
so, I gained better intuition around hash functions, pointers, and memory segments like the stack and the heap.

This post is aimed at relative beginners to C and people interested in how a basic hash table might be implemented.

## Basics

You have probably encountered a hash table in the wild, like a [`dict` in Python][python_source]
or [`Map` in JavaScript][v8_source]. Hash tables map a key to a value. Setting, looking up, and deleting values is
average O(1) time complexity.

Under the hood, there is an array of "buckets" or "slots". I'll use the term buckets going forward. The buckets array
can hold values. When you associate a key with a value, the hash of the key is used to obtain the index where that value
lives in the buckets array. Since the value's index in the buckets array is easy to derive from the hash of the key,
setting and looking up by key (usually) takes very little work.

There are a number of design decisions when implementing a hash table:

* hash function selection
* initial size of the buckets array
* collision resolution
* when to resize or compact the buckets array

The C hash table data structure I show below starts with a buckets array of size 4, has no resizing, accepts only
strings as keys, and uses chained (linked list) hash collision resolution.

### Hash functions

Hash functions take a value and deterministically return a number. As a contrived example, `my_hash_func("hello")`
returns 123 for the lifetime of the program[^1]. An `my_hash_func("world")` might return a different number, say 127.
There are a number of desirable characteristics for a good hash function[^2].

[^1]: **hash functions returning the same value for the same input for the life of the program**: I say for the life of
the program and not "always" because most programming languages [add an unpredictable random value][python_seed] (a
seed) to the hash function input. This value is the same for the lifetime of the process, but different across
processes. The reason for changing the hash output between processes is extremely interesting - if attackers know or can
infer the hash function output by providing application input, they
can [purposefully increase the number of collisions in order to DoS the server][dos_attack]. This is also the
reason [Python `sets` are not ordered][set_ordering].

[^2]: **desirable characteristics of a hash function**:

    * TODO
    * TODO

### The buckets array

The hash table internally runs keys through its hash function, `mod`'s the output by the length its buckets array, and
stores the associated value at that index of the buckets array. For example, say "hello" hashed to 123 as
above. `123 % 4` is 3. If I wanted to map "hello" to the number 72, my hash table's buckets would look like this in
pseudo-code:

```python
> h["hello"] = 72
> h.show_buckets() # "hello" hashes to 123, and 123 % 4 = 3
bucket 0: NULL
bucket 1: NULL
bucket 2: NULL
bucket 3: ("hello", 72) -> NULL
```

Each bucket optionally contains the head of a linked list. Here, buckets 0 to 2 are empty, and bucket 3 contains a
linked list with a single value (72) associated with the key "hello".

When looking up the value of "hello", the hash map will once again map the key "hello" to the bucket 3, traverse the
linked list until it finds the matching key "hello", then return the value 72.

You can imagine that if a lot of keys land in bucket 3, the linked list there will be very long, and setting/getting
values from the hash table will no longer be performant. This is why most implementations resize the number of buckets
when the buckets array gets too full[^3].

[^3]: TODO

### The heap

I'll be mentioning the heap frequently. You can think of the stack and heap as different memory spaces (or segments, à
la [segfault]) in RAM during program runtime. The stack is scoped to a function - all variables on the stack are
deallocated and are no longer referencable when the function returns. The heap is used to store variables that need to
be referenced outside a function's scope, e.g. via `malloc`, can be passed between functions, and are referencable until
the programmer `free`s them.

## Hash table C implementation

In C, a `struct` is a collection of named and typed fields. I define two `struct`s. One is called `Entry` and represents
an item in the hash table.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *key;
    void *val;
    struct Entry *next;
} Entry;
```

`Entry` contains three fields:

* `key`, the key associated with the value
* `val`, a void ("any type") pointer to the value itself
* `next`, an optional pointer to the next `Entry` for collision resolution

All fields are pointers in order to ensure each `Entry` is a fixed size in memory (i.e. the `sizeof` each field is
fixed).

The other `struct`, `HashTable`, represents the hash table itself.

```c
typedef struct HashTable {
    Entry **buckets;
    int nBuckets;
} HashTable;
```

`HashTable` contains 2 fields:

* `buckets`, a pointer to an array of pointers to `Entry`s
* `nBuckets`, the number of buckets in the Hashmap

Since both fields are a static size, a `HashTable` instance is also a static size.

The hash function used operates only on strings, and is called [djb2][djb2][^4] written by [Daniel Bernstein][djb].

[^4]: TODO

    - magic numbers
    - has desirable properties

```c
uint32_t hash(char *s) {
    uint32_t h = 5381;
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

After calling `HashTable_new`, the heap looks something like this:

| Address | Pseudo-value               | Description      |
|---------|----------------------------|------------------|
| 0xFF00  | `HashTable(4, 0xFF40)`     | HashTable itself |
| 0xFF40  | `[NULL, NULL, NULL, NULL]` | Initial buckets  |

A hash table isn't very useful without being able to associate keys and values, so let's define a `HashTable_set`
function:

```c
void HashTable_set(HashTable *h, char *key, void *val) {
    uint32_t bucket = get_bucket(h, key);
    Entry *v = h->buckets[bucket];
    
    // traverse the optional linked list
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
for the key is found, allocate memory for a new `Entry`, create and store a copy of the key using [strdup], set its
value, and insert it as the head[^5] of the linked list at the appropriate bucket index.

[^5]: TODO: We could also append it to the end of the linked list, but it would involve keeping a reference to the
previous `Entry` around or doing a look-ahead to find the termination point. If the aim is to create a generally
performant data structure, there's no way to know whether users will be referencing more recently inserted values more
often than previously inserted values, so it's not such an important consideration. In reality, resizing the buckets
array to reduce the length of the linked lists makes this decision even more arbitrary.

Now after running the following code:

```c
HashTable *h = HashTable_new();
int a = 5;
// hash("item a") % 4 = 1
HashTable_set(h, "item a", &a);
// >breakpoint<
```

The stack looks something like this:

| Address | Pseudo-value | Description |
|---------|--------------|-------------|
| 0x0000  | `5`          | Integer a   |

The heap looks something like this:

| Address | Pseudo-value                  | Description      |
|---------|-------------------------------|------------------|
| 0xFF00  | `HashTable(4, 0xFF40)`        | HashTable itself |
| 0xFF40  | `[NULL, 0xFF80, NULL, NULL]`  | Buckets array    |
| 0xFF80  | `Entry(0XFFB0, 0X0000, NULL)` | Inserted entry   |
| 0xFFB0  | `"item a"`                    | Key for entry    |

And the output of something like `show_buckets()` for `h` looks like this:

```c
bucket 0: NULL
bucket 1: ("item a", 5) -> NULL
bucket 2: NULL
bucket 3: NULL
```

`HashTable_get` is similar but simpler than `HashTable_set`. In this implementation, if the key isn't found, `NULL` is
returned:

```c
void *HashTable_get(HashTable *h, char *key) {
    uint32_t bucket = get_bucket(h, key);
    Entry *v = h->buckets[bucket];
    
    // traverse the optional linked list
    while (v != NULL) {
        // if Entry is found, return the value
        if (strcmp(v->key, key) == 0) return v->val;
        v = v->next;
    }
    
    // no key found, return NULL
    return NULL;
}
```

Hash tables often also include functionality to delete an entry, like Python's [`del` keyword][del]. This allows the
user to mark entries as removed/unavailable:

```c
void HashTable_delete(HashTable *h, char *key) {
    uint32_t bucket = get_bucket(h, key);
    Entry *prev = NULL;
    Entry *v = h->buckets[bucket];
    
    // traverse the optional linked list
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

So after running:

```c
HashTable *h = HashTable_new();
int a = 5;
HashTable_set(h, "item a", &a);
HashTable_delete(h, "item a")
// >breakpoint<
```

The stack looks something like this:

| Address | Pseudo-value | Description |
|---------|--------------|-------------|
| 0x0000  | `5`          | Integer a   |

And the heap looks the same as when the hash table was originally initialized:

| Address | Pseudo-value               | Description      |
|---------|----------------------------|------------------|
| 0xFF00  | `HashTable(4, 0xFF40)`     | HashTable itself |
| 0xFF40  | `[NULL, NULL, NULL, NULL]` | Buckets array    |

Finally, the user may want to free the entire hash table, so let's provide them with a `HashTable_free` function:

```c
void HashTable_free(HashTable *h) {
    // traverse every optional linked list
    // and free each Entry and its key
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

TODO discuss `calloc`, `strdup`, `strncmp` as alternatives/simplifications/safety features

## Alternatives/extensions

* storing hash(key) on Entry
* resizing (link to impl)
* open addressing vs chaining
* etc

If you'd like to see an implementation where I dynamically resize the buckets array, check out the gist here (TODO).

[wiki_hash_table]: https://en.wikipedia.org/wiki/Hash_table

[python_source]: https://github.com/python/cpython/blob/main/Objects/dictobject.c

[v8_source]: https://github.com/v8/v8/blob/main/src/objects/ordered-hash-table.cc

[python_seed]: https://en.wikipedia.org/wiki/Hash_function#Deterministic

[set_ordering]: https://docs.python.org/3/reference/datamodel.html#object.__hash__

[dos_attack]: https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf

[segfault]: https://en.wikipedia.org/wiki/Segmentation_fault

[djb2]: http://www.cse.yorku.ca/~oz/hash.html

[djb]: https://en.wikipedia.org/wiki/Daniel_J._Bernstein

[strdup]: https://man7.org/linux/man-pages/man3/strdup.3.html

[del]: https://docs.python.org/3/reference/simple_stmts.html#the-del-statement
