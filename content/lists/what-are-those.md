---
title: what are those?
---

What things are in three points or less. A continually updating brain dump.

{{< toc >}}

{{< those
  "MAC address"
  "Media Access Control"
  "Unique to device; hard-coded into a network adapter/network interface card"
>}}

{{< those
  gateway
  "A key stopping point for data traveling between networks"
  "Can be a computer routing traffic (workplace) or router (at home)"
  "Checks IPs of messages and forwards accordingly"
>}}

{{< those
  API
  "Application Program Interface"
  "The specification for how a service is to be interacted with"
>}}

{{< those
  URL
  "Uniform Resource Locator, i.e. web address, endpoint"
  "A reference to a web resource"
>}}

{{< those
  HTTP
  "HyperText Transfer Protocol"
  "Defines how messages are formatted and transmitted on the web"
  "Common methods: GET, PUT (idempotent), POST, DELETE, etc."
>}}

{{< those
  "REST API"
  "REpresentational State Transfer"
  "A set of guiding principles, design patterns, architecture for APIs"
  "Statelessly performs CRUD operations on resources usually through HTTP"
>}}

{{< those
  CRUD
  "Create (POST), Read (GET), Update (PUT), Delete (DELETE)"
  "Standardized use of HTTP methods in RESTful APIs"
>}}

{{< those
  IPC
  "Inter-Process Communication"
  "Methods an OS uses to allow processes to manage shared data"
>}}

{{< those
  "TCP/IP"
  "Transmission Control Protocol/Internet Protocol"
  "Communication protocols used to connect devices on the web"
  "TCP does management, IP does routing"
>}}

{{< those
  "Throughput/Latency"
  "Throughput: number of items transferred per unit time"
  "Latency: amount of time required for single item"
  "Queue Size = Throughput * Latency"
>}}

{{< those
  "Stack (Data Structure)"
  "A Last-In, First-Out (LIFO) structure"
  "Push (add to stack), pop (remove from stack), math, etc."
>}}

{{< those
  "Queue (Data Structure)"
  "A First-In, First-Out (FIFO) structure"
  "Enqueue, dequeue, etc."
  "Can be made thread safe (queue.Queue in Python)"
>}}

{{< those
  "Heap (Data Structure)"
  "A tree where all nodes are in a specific order"
  "Min heap has smallest element as root (max v.v.)"
  "Often used to implement a priority queue"
>}}

{{< those
  "Stack (Memory)"
  "A fast-access memory region managed by CPU"
  "Freed upon function completion (local memory)"
>}}

{{< those
  "Heap (Memory)"
  "A larger but slower access memory region (vs. stack)"
  "Accessed with addresses, needs intelligent cleanup"
>}}

{{< those
  Cache
  "A fast-access, temporary data store"
  "Used to avoid rereqeusting or recomputing a resource"
>}}

{{< those
  Kernel
  "The portion of the operating system code that is always resident in memory"
  "Has complete control over everything in the system"
>}}

{{< those
  "Linux Process"
  "A running instance of a program, identified by a process ID"
  "Foreground/interactive and background processes"
>}}

{{< those
  Daemon
  "Background processes that start at system startup and run forever"
>}}

{{< those
  Proxy
  "An intermediary server separating end users from the websites they browse."
>}}

{{< those
  "Reverse Proxy"
  "A type of proxy server that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client, appearing as if they originated from the proxy server itself."
>}}

{{< those-toc-gen >}}