---
title: "how to only torrent through a vpn"
date: "2023-02-04"
description: "How to ensure your torrent client only ever uses internet traffic through your VPN"
---

How can you make sure that you never accidentally have your torrent client on but your VPN off? You can **restrict the
network interface that your torrent client uses to that of your VPN**.

To ensure privacy while torrenting legal content, you've probably heard the endless ads on podcasts and Youtube for
using a VPN. This article assumes you already have a VPN and know how to turn it on and off.

A network interface is the point of connection between a computer and a network that may be connected to the rest of the
world. Your VPN will have its own dedicated network interface, and **for some torrent clients, you can specify to only
ever use that network interface for torrent traffic**.

First, find the network interface used by your VPN as follows:

1. Turn off your torrent client and VPN.
2. Open a terminal (Terminal App on MacOS, Command Prompt for Windows).
3. Run `ifconfig` (or `ipconfig` for Windows).
4. The short names on the left of the output are your network interfaces. For example, `lo0` below.

```shell{linenos=false}
❯ ifconfig
lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 16384
```

5. Turn on your VPN.
6. Run `ifconfig` (or `ipconfig`) again. There should be a new network interface that wasn't present before. That is the
   network interface for your VPN. Note down the name of that new network interface.

Now time to tell your torrent client to only ever use that network interface. Note that not all torrent clients support
this action. I'll show the process for [qBittorrent](https://www.qbittorrent.org/), which does support it.

1. Turn on your VPN.
2. Open qBittorrent, then open its Preferences.
3. Go to "Advanced".
4. Under the setting Network Interface, select the network interface name used by your VPN and hit "OK".

Torrent traffic will now only flow if your VPN is on and connected.
