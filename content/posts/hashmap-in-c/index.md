---
title: "DRAFT: a hash table implementation in C"
date: "2023-05-15"
description: "A hash table implementation in C, by Leo Robinovitch."
draft: true
---

I recently learned a lot by completing a simple hash table implementation in C via a problem
in [CS Primer](https://csprimer.com/). In particular, I gained more intuition around hash functions, pointers, the
stack, and the heap.

## Setup

I define two `struct`s. One is called `Entry` and represents an item in the hash table. The other, `Hashtable`,
represents the hash table itself.

`Entry` contains three fields:
* `key`, the key associated with the value
* `val`, the value itself
* `next`, an optional pointer to the next Entry for chained hash collision resolution



All fields are pointers for fixed-size structs.


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

typedef struct Hashmap {
    Entry **buckets;
    int nBuckets;
} Hashmap;
```

| Syntax    | Description |
|-----------|-------------|
| Header    | Title       |
| Paragraph | Text        |
| Paragraph | Text        |
| Paragraph | Text        |
| Paragraph | Text        |

## Alternatives/extensions

* resizing (link to impl)
* open addressing vs chaining
* etc
