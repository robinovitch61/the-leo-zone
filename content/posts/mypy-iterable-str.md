---
title: "iterable[str] in python"
date: 2022-10-03
description: "A Python typing pitfall when using Iterable[str]."
---

Here's a fun thing with Python's type annotations.

Sometimes one might use `Iterable` as a type annotation to try to indicate something might be a set, a list, or a
tuple.

But `Iterable` really just means [something that implements
`__iter__()`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterable).

And `str` implements `__iter__()`, e.g.:

```
for char in "abc":
    print(char)
# a
# b
# c
```

And "a" is a `str`, just like "abc" is a `str`.

So this type checks: `my_var: Iterable[str] = "abc"` (!!!).

```
from typing import Iterable, List

# these all pass type check
a: str = "a"
b: Iterable[str] = "abc"  # woops?
c: Iterable[str] = ["abc", "def"]

# this fails type check
d: List[str] = "abc"  
```

A fun footgun to be aware of :). Get more specific with types to avoid unexpectedly
correct-but-not-what-was-meant annotations.
