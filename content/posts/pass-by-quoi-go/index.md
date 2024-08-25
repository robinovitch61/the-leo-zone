---
title: "(im)mutability in Go and Python"
date: "2024-06-09"
description: "A discussion of mutability and immutability in Go and Python, by Leo Robinovitch."
draft: true
---

Mutable means "can change", and immutability means "can't change". I recently learned that both Go and Python, as well
as many other modern languages, use something called "pass by copy", which when understood well, has deep implications
for the mutability of data. I'll walk through some cases of mutability in both languages.

## Identifying Data

In Python, each object has an `id` that is unique and constant during its lifetime:

```python
print(id("hello"))  # 4381714672
```

In CPython, this represents the address of the variable in memory.

Go has pointers, which represent the address of a variable in memory directly:

```go
i := "hello"
println(&i)  // 0x1400004c728
```

In both languages, data (which may be bound to a variable name in a scope), has an address, a type, and a value.

In Go, all function arguments are bound to copies of the data in the outer scope. In the following example, the
variables `i` and `val` both have value 1, but different memory addresses, meaning that a copy of `i` has been made and
bound to `val` within `test`.

```go
func test(val int) {
    println(&val)
}

i := 1
println(&i)  // prints 0x..c730
test(i)      // prints 0x..c728
```

This isn't how it works in Python:

```python
def test(val):
    print(id(val))

i = 1
print(id(i))  # 4304623440
test(i)       # 4304623440
```

The object `i` is not copied, but instead the parameter `val` within the scope of `test` refers to the same object as
`i`.

So why can't we change `val` within `test` and see that change propagate to `i`?

```python
def test(val):
    print(id(val), val)  # ..7024 1
    val = 2
    print(id(val), val)  # ..7056 2

i = 1
print(id(i), i)  # ..7024 1
test(i)
print(id(i), i)  # ..7024 1
```

On **assignment**, Python performs the following: (TODO: on assignment??)

- check

TODO: any example of Python mutating the outer value during assignment except e.g. `a[1] = newval` or dict update? TODO:
difference in Python between `mylist += [1]` and `mylist = mylist + [1]`

In Go, you can always (TODO: always?) mutate data through its pointer:

```go
func
```

To make mutability explicit, Go has value and pointer semantics. Function signatures determine the mutability of
arguments:

```go
func square(im int, m *int) {
	im = im * im
	*m = *m * *m
}

func main() {
	passedAsValue := 2
	passedAsPointer := 3
	square(passedAsValue, &passedAsPointer)
	println(passedAsValue, passedAsPointer) // 2, 9
}
```

The `passedAsValue` `int` in `main`'s scope is the first argument to `square`. A copy of it (TODO: different memory
addr, same value?) is assigned to the `im` argument in `square`'s scope. Changing `im` by reassigning it does not affect
the value of `passedAsValue` in the outer scope.

The `passedAsPointer` `*int` in `main`'s scope is the second argument to `square`. The pointer (TODO: copy of pointer?)
is assigned to the `m` argument in `square`'s scope. Changing the value that `m` points to changes `passedAsPointer` in
the outer scope.

This works similarly for `struct`s:

```go
type thing struct {
	a int
}

func editThing(t thing, tp *thing) {
	t.a = 3
	tp.a = 4 // go compiler automatically dereferences: (*tp).a = 4
}

func main() {
	passedAsValue := thing{a: 1}
	passedAsPointer := thing{a: 1}
	editThing(passedAsValue, &passedAsPointer)
	fmt.Printf("%+v, %+v\n", passedAsValue, passedAsPointer) // {a:1}, {a:4}
}
```

And a struct that contains a pointer field can be passed by value with its pointer field still mutable:

```go
type thing struct {
	a *int
}

func editThing(t thing, tp *thing) {
	*t.a = 3
	*tp.a = 4 // go compiler automatically dereferences: *((*tp).a) = 4
}

func main() {
	sharedInt := 1
	passedAsValue := thing{a: &sharedInt}
	passedAsPointer := thing{a: &sharedInt}
	editThing(passedAsValue, &passedAsPointer)
	fmt.Printf("%d, %d\n", *passedAsValue.a, *passedAsPointer.a) // 4, 4
}
```

Functions implemented on types can have pointer or value receivers: TODO

This affects what types implement an interface: TODO

Everything in Python is an [object]. Depending on their type, the value of objects is mutable or immutable:

| Value Mutability | Example Object Types   |
| ---------------- | ---------------------- |
| Immutable        | int, float, str, tuple |
| Mutable          | list, dict, set        |

Pass by **reference** implies that changing the value of arguments inside the function **also changes** their value
outside the function. In Python, arguments that are mutable objects are passed by reference:

```python
def info(v):
    print(id(v), type(v), v)

my_list = [1]

def my_func(arg: list):
    info(arg)
    arg.append(2)
    info(arg)
    print(arg)  # get [1, 2]
    arg = []
    info(arg)

info(my_list)
my_func(my_list)
info(my_list)
print(my_list)  # get [1, 2]
```

Pass by **value** implies that changing the value of arguments inside the function **does not change** their value
outside the function. In Python, immutable objects are passed by value:

```python
def info(v):
    print(id(v), type(v), v)

my_int = 1

def my_func(arg: int):
    info(arg)
    arg = 2
    info(arg)
    print(arg)  # get 2

info(my_int)
my_func(my_int)
info(my_int)
print(my_int)  # get 1
```

But this isn't the whole story - rather than values in memory and pointers to those values, everything in Python is an
object, and all functions are "passed by assignment". TODO: improve clarity

https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference
https://realpython.com/python-pass-by-reference/
https://docs.python.org/3/reference/compound_stmts.html#function-definitions
https://docs.python.org/3/reference/expressions.html#calls
https://stackoverflow.com/questions/373419/whats-the-difference-between-passing-by-reference-vs-passing-by-value
https://cs.stanford.edu/people/nick/py/python-var.html
https://docs.python.org/3/reference/simple_stmts.html#assignment-statements
https://docs.python.org/3/reference/executionmodel.html#binding-of-names

https://zchee.github.io/golang-wiki/MethodSets/ https://go.dev/tour/methods/9
https://stackoverflow.com/questions/48790663/why-value-stored-in-an-interface-is-not-addressable-in-golang
https://go.dev/play/p/eeaYzqZsmOs
https://stackoverflow.com/questions/51264339/what-do-value-semantics-and-pointer-semantics-mean-in-go

[object]: https://docs.python.org/3/reference/datamodel.html#objects-values-and-types
