---
title: "DRAFT: a simple hash table implementation in C"
date: "2023-05-15"
description: "A hash table implementation in C, by Leo Robinovitch."
draft: true
---

I implemented a simple [hash table][wiki_hash_table] in C via a problem in [CS Primer](https://csprimer.com/). In doing
so, I gained better intuition around hash functions, pointers, and memory segments like the stack and the heap.

This post is aimed at relative beginners to C and people interested in how a basic hash table might be implemented.

## Theory

You probably have encountered a hash table in the wild, like a [`dict` in Python][python_source]
or [`Map` in JavaScript][v8_source]. Hash tables map a key to a value. Setting, looking up, and deleting values is
average O(1) time complexity.

Under the hood, there is an array of "buckets" or "slots" (I'll use the term buckets) that can hold values. When you
associate a key and a value, the key's hash is used such that the associated value lives at an index in the array that
is (usually) easy to find.

There are a number of design decisions and techniques when implementing a hash table:

* hash function selection
* initial size of the buckets array
* collision resolution
* when to resize or compact the buckets array

The C hash table data structure I show below starts with a buckets array of size 8, has no resizing, takes only strings
as keys, and uses chained (linked list) hash collision resolution.

### Hash functions

Hash functions take a value and deterministically return a number. As a contrived example, `my_hash_func("hello")`
returns 123 for the lifetime of the program[^1]. An input like "world" might return a different number, say 127. There
are a number of desirable characteristics for a good hash function[^2].

[^1]: I say for the lifetime of the program and not "always" because most programming languages add an unpredictable
random value to the hash function output. This value is the same for the lifetime of the process, but different across
processes. This is the reason [Python `sets` are not ordered][set_ordering]. The reason for changing the hash output
between processes is extremely interesting - if attackers know or can infer the hash function by providing application
input, they can [purposefully increase the number of collisions in order to DoS the server][dos_attack].

[^2]: TODO

### The buckets array

The hash table internally runs keys through its hash function, `mod`'s the output by the length its buckets array, and
stores the associated value at that index of the buckets array. For example, say "hello" hashed to 123 as
above. `123 % 4` is 3. If I wanted to map " hello" to the number 72, my hash table's buckets would look like this in
pseudo-code:

```python
> ht["hello"] = 72

# "hello" hashes to 123, and 123 % 4 = 3
> ht.show_buckets()
bucket 0: NULL
bucket 1: NULL
bucket 2: NULL
bucket 3: ("hello", 72) -> NULL
```

Each bucket optionally contains the head of a linked list. Here, buckets 0 to 2 are empty, and bucket 3 contains a
linked list with a single value.

Looking up the value of "hello", the hash map will once again map the key "hello" to the bucket 3, traverses the linked
list until it finds "hello", then returns the associated value 72.

You can imagine that if a lot of keys land in bucket 3, the linked list there will be very long, and setting/getting
values from the hash table will no longer perform at O(1) (TODO: word correctly). This is why most implementations
resize the number of buckets when the bucket array gets too full (TODO: link to more info about what too full means).

Finally, I'll be mentioning the heap frequently. You can think of the stack and heap as different memory spaces (or
segments a la segfault) in RAM during program runtime. The stack is scoped to a function, whereas the heap is scoped to
the program (TODO this right? Difference between this and global variable?). The memory in the stack is free'd after a
function returns, whereas the heap has to be manually managed (allocated and free'd) by the author of the program.

## Setup of the C Implementation

I define two `struct`s, which in C is a collection of named typed fields. One is called `Entry` and represents an item
in the hash table. The other, `Hashtable`, represents the hash table itself.

`Entry` contains three fields:

* `key`, the key associated with the value
* `val`, a void pointer to the value itself
* `next`, an optional pointer to the next Entry for chained hash collision resolution

All fields are pointers in order to ensure each `Entry` is a fixed size in memory (i.e. the `sizeof` each field is
fixed).

TODO: consider storing hash(key)

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define STARTING_BUCKETS 8
#define MAX_KEY_SIZE 20

typedef struct Entry {
    char *key;
    void *val;
    struct Entry *next;
} Entry;
```

`HashTable` contains 2 fields:

* `buckets`, a pointer to a array of `Entry`s
* `nBuckets`, the number of buckets in the Hashmap

Since both fields are a static size, a `HashTable` instance is also a static size.

```c
typedef struct HashTable {
    Entry **buckets;
    int nBuckets;
} HashTable;
```

The hash function used is the djb2 algorithm from TODO http://www.cse.yorku.ca/~oz/hash.html. Unlike most real hash
table implementations, only strings are allowed as keys:

TODO talk about magic numbers.

```c
unsigned long hash(char *s) {
    unsigned long h = 5381;
    char c;
    while ((c = *s++)) {
        h = ((h << 5) + h) + c;
    }
    return h;
}
```

The `get_bucket` function returns the bucket index for a given key:

```c
int get_bucket(HashTable *h, char *key) {
    return (int) (hash(key) % h->nBuckets);
}
```

When creating a new `HashTable`, memory is allocated on the heap for the `HashTable` and its buckets. Each bucket is a
pointer to an `Entry`. A pointer to the `HashTable` is returned.

TODO STARTING_BUCKETS

```c
#define STARTING_BUCKETS 8

...

HashTable *HashTable_new() {
    HashTable *h = malloc(sizeof(struct HashTable));
    h->nBuckets = STARTING_BUCKETS;
    h->buckets = malloc(STARTING_BUCKETS * sizeof(Entry *));
    return h;
}
```

At this point, the heap memory looks something like this:

TODO Byte offset the right term?

| Byte Offset | Value                     | Description      |
|-------------|---------------------------|------------------|
| 0xFF00      | `HashTable(8, 0xFF80)`    | HashTable itself |
| 0xFF80      | `[NULL, NULL, ..., NULL]` | Initial buckets  |

TODO HashTable_free

TODO discuss `calloc`, `strdup`, `strncmp` as alternatives/simplifications/safety features

## Alternatives/extensions

* resizing (link to impl)
* open addressing vs chaining
* etc

[wiki_hash_table]: https://en.wikipedia.org/wiki/Hash_table

[python_source]: https://github.com/python/cpython/blob/main/Objects/dictobject.c

[v8_source]: https://github.com/v8/v8/blob/main/src/objects/ordered-hash-table.cc

[set_ordering]: https://docs.python.org/3/reference/datamodel.html#object.__hash__

[dos_attack]: https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf
