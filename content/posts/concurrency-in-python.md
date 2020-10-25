---
title: concurrency in python
date: 2019-10-29
---

{{< fig width="70" src="concurrency.png" caption=`Concurrency ! easy is` >}}

Concurrency is of paramount importance in modern computing. It is a complex domain in itself, with major contributions from database development, machine learning, distributed application deployment, and academia.

Python requires a clear and simple concurrency framework as it is commonly used in high-compute settings like training neural networks. Matrix algebra has been made fast with NumPy and related tools, interfacing with C to get large performance improvements. In the machine learning context, Python often combines concurrency with this efficient toolset to yield readable, easily iterated-upon, and rapid results.

Modern computers already use concurrency for almost everything. It is likely that the machine you're reading this on has multiple cores/CPUs, each of which runs multiple processes (multiprocessing). Processes are just programs given a "time chunk" in which to run on a CPU, after which their state is cached efficiently while the next program runs. If a process is running and itself needs to do multiple things (e.g. show a loading icon while also actually loading the content), a process gets split in to threads, which themselves get allocated time chunks from the overall process's time chunk. Processes usually run separate from and possibly in parallel with other processes, with strictly defined ways of interacting with one another.

Underlying the original CPython interpreter is the Global Interpreter Lock (GIL). This ensures that the Python interpreter is controlled by only one thread at a time. This is mainly because Python cleans up memory by "reference counting" instead of other means like garbage collection, ownership, etc. If the reference count for an object drops to zero, Python releases the memory allocated for that object. But multiple threads could change the reference count for an object at the same time, possibly causing memory errors and weird bugs. The GIL is a single lock on the Python interpreter, ensuring that memory is properly managed and no <a href="https://en.wikipedia.org/wiki/Deadlock">deadlocks</a> occur. Because Python was designed decades ago and parallel processing wasn't as high priority, this solution to memory management assumption wasn't seen as a big deal back then.

Unfortunately, this means that multithreading for CPU-intensive tasks in Python doesn't actually expediate computation - you can write code that implies threads are helping to speed up a high CPU task, but the GIL will ensure that only one thread runs at a time anyway! In fact, multithreading on high CPU tasks will actually be SLOWER than a single thread, as the GIL has decently high overhead when locking/unlocking threads. The one place multithreading is advantageous is IO operations, as IO operations [do not require the lock from the GIL](https://stackoverflow.com/questions/29270818/why-is-a-python-i-o-bound-task-not-blocked-by-the-gil).

{{< fig width="70" src="cpu_io_bound.png" source=https://realpython.com/python-concurrency/ >}}

The degredation of performance with threaded compute and improvement in performance with threaded IO is demonstrated in the following static notebook:

{{< gist e9f94dabc8d46b269a279759676596a6 >}}

Race conditions occur when data is modified or dropped in an undesirable manner due to a process switching threads before read-modify-write code sections are complete! Here is a complete example of a race condition and how to fix it using locks:

{{< gist 8bf045f09ab77e26527139b914fa55d9 >}}

Threading is all well and good, but what if we need true parallel operation on CPU bound computation to speed up a general task? That's where the `multiprocessing` built in package comes in. Processes have more overhead than threads, but get around the GIL-caused limitations of multithreading in CPython, allowing real compute performance improvements. Additionally, processes don't share global variables the same way threads do. Data sharing between processes is possible but explicitly specified in the code, making them generally safer. Threads are subject to race conditions and deadlocks, but these are more easily avoided with processes.

An example of how multiprocessing can speed up a CPU bound operation is as follows:

{{< gist 380dc5af7c1bf684d5dbd64cac966f7c >}}

I don't cover `asyncio` here, but that's a topic for another day! I hope `threading` and `multiprocessing` were made more clear from the above discussion and examples.

## References:
* [Better Developers Mailing List of https://lerner.co.il/](https://lerner.co.il)
* [https://realpython.com/python-gil/](https://realpython.com/python-gil/)
* [https://medium.com/practo-engineering/threading-vs-multiprocessing-in-python-7b57f224eadb](https://medium.com/practo-engineering/threading-vs-multiprocessing-in-python-7b57f224eadb)
* [https://wiki.python.org/moin/GlobalInterpreterLock](https://wiki.python.org/moin/GlobalInterpreterLock)
* [https://medium.com/towards-artificial-intelligence/the-why-when-and-how-of-using-python-multi-threading-and-multi-processing-afd1b8a8ecca](https://medium.com/towards-artificial-intelligence/the-why-when-and-how-of-using-python-multi-threading-and-multi-processing-afd1b8a8ecca)
* [https://www.geeksforgeeks.org/multithreading-in-python-set-2-synchronization/](https://www.geeksforgeeks.org/multithreading-in-python-set-2-synchronization/)
* [https://realpython.com/python-concurrency/](https://realpython.com/python-concurrency/)
* [https://realpython.com/intro-to-python-threading/#race-conditions](https://realpython.com/intro-to-python-threading/#race-conditions)
