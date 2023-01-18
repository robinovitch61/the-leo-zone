---
title: "the linux upskill challenge"
date: "2023-01-02"
description: "The Linux Upskill Challenge (https://github.com/livialima/linuxupskillchallenge) as done by Leo
Robinovitch"
draft: true
---

The [Linux Upskill Challenge](https://github.com/livialima/linuxupskillchallenge) is something I've been following on
Reddit for a while and have been wanting to do. At this point, I'm pretty OK with computers. But I've never been a Linux
power user.

I have many fundamental knowledge gaps and questions:

* What does "everything is a file" mean?
* When would I actually want to reach for a tool like `lsof` or `tcpdump`?
* What is a kernel, actually?
* What is userspace vs kernelspace?
* What does `sudo su` do, other than seemingly put me in a perpetually sudo-ey universe?
* What is the "GNU" part of Linux?

I could google these questions individually, and I have semi-informed guesses about the answers to some of them, but the
fact that I can think of so many off the top of my head indicates to me that there are probably
many [unkown unkowns](https://en.wikipedia.org/wiki/There_are_unknown_unknowns) here, and a semi-structured process like
the Upskill Challenge may help to identify them and fill in some answers.

This post will be a running list of my notes as I undergo the process.

## Day 0: Setup

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/00-AWS-Free-Tier.md)

They recommend provisioning a VPC somewhere in the cloud. I chose AWS - signed up a for a new account on the free tier
and created a t2.micro Ubuntu 20.04 LTS EC2 instance and an RSA key pair for it.

Changed the perms on the private key to `chmod 600` and added the following to my `~/.ssh/config`:

```
Host linux-upskill
  Hostname 18.xxx.xxx.xxx
  User ubuntu
  IdentityFile ~/.ssh/linux-upskill
```

Then running `ssh linux-upskill` dropped me in to a shell.

The article briefly mentions how AWS provisions a "tiny" VPS:

> In a datacentre somewhere, a single physical server running Linux will be split into a dozen or more Virtual servers,
> using the KVM (Kernel-based Virtual Machine) feature that's been part of Linux since early 2007.

Well this is very cool! From [this article](https://ubuntu.com/blog/kvm-hyphervisor) and other places:

> A hypervisor, also known as a virtual machine monitor or VMM, is software that creates and runs virtual machines (VMs)

> \[In KVM\] Every VM runs as a separate Linux process under systemd, with dedicated virtual hardware resources
> attached.

> The main difference between Type 1 vs. Type 2 hypervisors is that Type 1 (e.g. KVM) runs on bare metal and Type 2
> (e.g. Virtualbox) runs on top of an operating system.

## Day 1: Get to know your server

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/01.md)

Nothing too wild here, but some fun tidbit learnings:

* prompt with `$` is non-root, `#` is root
* `free` and `uname -a` are nice utilities

The further reading goes in to SSH port forwarding a bit. I've seen some pretty cool remote dev setups in the past that
used port forwarding, and was able to get local port forwarding working using nginx:

```shell{linenos=false}
ssh linux-upskill
sudo apt-get install nginx -y
sudo systemctl start nginx.service
sudo systemctl status nginx.service
exit

ssh -L localhost:8000:localhost:80 linux-upskill
open http://localhost:8000
```

The http traffic went through my running ssh tunnel and voila, the nginx landing page!

I assume I could do the reverse, running nginx locally and using reverse port forwarding to `curl` the nginx server from
my remote server through an ssh tunnel running up with `ssh -R ...`.

Another thing I learned:

> Ports numbers less than 1024 are privileged ports and can be used only by root

A Recurser pointed out that a list of all packages installed in a given distribution may be shared in a
public `.manifest` file,
e.g. [Ubuntu 22.04 Desktop](http://releases.ubuntu.com/jammy/ubuntu-22.04.1-desktop-amd64.manifest).

## Day 2: Basic navigation

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/02.md)

Pretty basic, `cd`, `mkdir`, etc. Tidbit learnings:

* Boolean arguments to cli tools are called "switches", e.g. the `-l` in `ls -l`
* The `-rt` switches to `ls` sort by time, reversed such that oldest modified files show up first
* You can see the man page of `man` with `man man` - and there are actually a lot of options!
* Prank your coworkers by putting this in a shell script at work: `PS1="$PS1"💩`. Every invocation of the script will add
  another emoji to their prompt
* This actually seems pretty handy for shell scripts at work: `export PS4='$0.$LINENO+ '`

## Day 3: Power trip!

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/03.md)

Roles and permissions!

* setting up non-root accounts with permission to run `sudo` for admins is standard
* `/etc/shadow` is where hashed passwords are kept
* `sudo -i` for running a series of commands as root
* `/var/log/auth.log` logs all uses of sudo (`grep "sudo" /var/log/auth.log`)
* `hostnamectl` to rename the server
* `/etc/cloud/cloud.cfg` has a `preserve_hostname` across reboots
* `timedatectl` for time, timezone, and date controls
* john the ripper and hashcat are tools that can be used to crack passwords once you have `/etc/passwd`
  and `/etc/shadow`

From `man sudo`:

> -i, --login: Run the shell specified by the target user's password database entry as a login shell...The command is
> run with an environment similar to the one a user would receive at log in. Note that most shells behave differently
> when a command is specified as compared to an interactive session.

From `man su`:

> su allows to run commands with a substitute user and group ID.
>
> When called without arguments, su defaults to running an interactive shell as root.

Interestingly, the prompt is different for `sudo -i` and `sudo su`:

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ sudo -i
root@ip-172-31-24-204:~# logout

ubuntu@ip-172-31-24-204:~$ sudo su
root@ip-172-31-24-204:/home/ubuntu# exit
```

After some discussion with some [Recursers](https://recurse.com/) we figured out that `sudo -i` and `sudo su -`
both `cd` to the home directory, whereas `sudo su` without the dash leaves you in the prior home
directory (`/home/ubuntu`).

## Day 4: Installing software, exploring the file structure

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/04.md)

Learned a good amount about the linux directory structure - `man hier` is gold!

* `apt-get` is a full-featured but simplified interface to `dpkg`, and `apt` is a more user-friendly but slightly
  stripped-back version of `apt-get`
* `apt search` to find installable packages
* `man hier` to see a man page on the directory hierarchy
* `/sbin` contains commands needed to boot the system ("system binaries")
* `/etc` contains static configuration files
* `/var` contains files that may change in size, e.g. log files
* `/etc/apt/sources.list` contains the repository locations, usually mirror servers closer to my server than the main
  servers are

Notably, these directory meanings shouldn't be treated as gospel. It looks like `sbin` and `bin` are symlinks to
their `/usr` equivalents, e.g.

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ ls -la /sbin
lrwxrwxrwx 1 root root 8 Dec  1 21:32 /sbin -> usr/sbin
```

Further note on `apt` vs `dpkg` ([source](https://www.makeuseof.com/apt-vs-dpkg/)):

> With APT, you can retrieve a file from a remote repository and install it, all in one command. This saves you from the
> work of manually finding and downloading the package before installation.
>
> With dpkg, you can only install local files you've already downloaded yourself. It can't search remote repositories or
> pull packages from them.

## Day 5: More or less...

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/05.md)

Mishmash of cli utilities, dotfiles, etc.

* `more` is a worse version of `less` and I can probably always stick with `less`
* `history` and running repeating commands with `!<some number from history>` is very nice, although I'll likely stick
  to `Ctrl + r`
* `nano` is sweet, but I'll prefer `vi` or `vim` when it's installed

## Day 6: Editing with "vim"

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/06.md)

I use Vim keybindings in most places I edit text already, but there were some new tidbits for me here:

* Learned about the existence of `pico`, `joe`, and `jed` text editors
* `vi --version` to see if `vi` is actually `vim` on your machine
* `cp -v` for verbose copy
* `dd` deletes lines, whereas `d{motion}` deletes text that `{motion}` moves over
* `vi` is required by the [Single Unix Specification and POSIX](https://en.wikipedia.org/wiki/Single_UNIX_Specification)
* `vi` uses `hjkl` for motion because of the [ADM-3A terminal keyboard](https://en.wikipedia.org/wiki/ADM-3A)
* `neovim` has it's own `:Tutor` command, whereas `vimtutor` is also always available for vanilla `vim` introduction

A Recurser friend noted that another way to check the `vi` version/binary that is installed is using `readlink`
and `which`:

```shell
readlink -f $(which vi)
```

## Day 7: The server and its services

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/07.md)

Install and run Apache2 web server, similar to my nginx experiments on Day 1.

* since I allow all http traffic to my server on port 80, [http://18.236.102.243/](http://18.236.102.243/) is available
  to the public (might not work anymore if you are reading this in the future)
* a virtual host is a contained site or system on a web server
* I can edit the default page with `sudo vim /var/www/html/index.html`
* `systemctl` manages `systemd` services
* `systemctl list-units [--all --state --type]` shows units, i.e. resources that systemd knows how to manage

Notably, [Apache may change its name soon](https://blog.nativesintech.org/apache-appropriation/).

Since the web server is public, I got this fun entry in the `/var/log/apache2/access.log` the following day:

```
198.235.24.13 - - [10/Jan/2023:21:12:16 +0000]
"GET / HTTP/1.0" 200 11155 "-" "Expanse, a Palo Alto Networks company,
searches across the global IPv4 space multiple times per day to identify
customers&#39; presences on the Internet.
```

## Day 8: The infamous "grep" and other text processors

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/08.md)

A good day full of useful tools. Some new things I learned:

* ssh runs it's own service, `sshd` (Secure Shell Daemon) `sudo systemctl status sshd`
* `/var/log/auth.log` contains login and sudo usage information
* `tail -f` to follow

> Use the `cut` command to select out most interesting portions of each line by specifying "-d" for delimiter and "-f"
> for field - like: `grep "authenticating" /var/log/auth.log | grep "root" | cut -f 10- -d" "`
> (field 10 onwards, where the delimiter between field is the " " character).

* use `grep -v XXX` to invert the output ("all lines that do not contain XXX")
* it would be nice to get better at `awk` and `sed` one day

## Day 9: Diving into networking

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/09.md)

Ok, I learned a LOT of stuff today!

### ports and network devices

> a port is a number assigned to uniquely identify a connection endpoint and to direct data to a specific service

* `ss`, "socket status", is one tool to examine open ports, replacing `netstat`
* `nmap` is another, non-default tool for port examination

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ sudo ss -ltpn
State      Recv-Q     Send-Q         Local Address:Port           Peer Address:Port     Process
LISTEN     0          4096           127.0.0.53%lo:53                  0.0.0.0:*         users:(("systemd-resolve",pid=417,fd=13))
LISTEN     0          128                  0.0.0.0:22                  0.0.0.0:*         users:(("sshd",pid=653,fd=3))
LISTEN     0          511                        *:80                        *:*         users:(("apache2",pid=29833,fd=4),("apache2",pid=29832,fd=4),("apache2",pid=26021,fd=4))
LISTEN     0          128                     [::]:22                     [::]:*         users:(("sshd",pid=653,fd=4))
```

After `sudo apt install nmap`:

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ nmap localhost
Starting Nmap 7.80 ( https://nmap.org ) at 2023-01-12 19:40 UTC
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00011s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 0.07 seconds
```

* `nmap localhost` may show services that are *only* bound to `localhost` (the loopback network device), so can first
  get actual network card IP address:

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ ip address
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc fq_codel state UP group default qlen 1000
    link/ether 02:32:a6:75:13:17 brd ff:ff:ff:ff:ff:ff
    inet 172.31.24.204/20 brd 172.31.31.255 scope global dynamic eth0
       valid_lft 3099sec preferred_lft 3099sec
    inet6 fe80::32:a6ff:fe75:1317/64 scope link
       valid_lft forever preferred_lft forever

ubuntu@ip-172-31-24-204:~$ nmap 172.31.24.204
Starting Nmap 7.80 ( https://nmap.org ) at 2023-01-12 19:49 UTC
Nmap scan report for ip-172-31-24-204.us-west-2.compute.internal (172.31.24.204)
Host is up (0.00011s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 0.07 seconds
```

* so in this case, the *exposed* services are the same ones bound to localhost, but this may not always be true

### host firewall

* a firewall is a network security system that monitors and controls incoming and outgoing network traffic based on
  predetermined security rules
* the linux kernel has built-in firewall functionality called netfilter
* `iptables` and `nftables` are utilities for configuring netfilter
* `ufw` (uncomplicated firewall) is a less complicated tool
* checking what rules are in place:

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ sudo iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

* this^ is equivalent to "no firewall"
* after `sudo apt install ufw`, can deny `http` traffic:

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ sudo ufw allow ssh
Rules updated
Rules updated (v6)

ubuntu@ip-172-31-24-204:~$ sudo ufw deny http
Rules updated
Rules updated (v6)

ubuntu@ip-172-31-24-204:~$ sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
```

* `sudo iptables -L` now has MANY rules, including

```shell{linenos=false}
Chain ufw-user-input (1 references)
target     prot opt source               destination
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:ssh
DROP       tcp  --  anywhere             anywhere             tcp dpt:http
```

* Now, [http://18.236.102.243/](http://18.236.102.243/) fails to connect until I undo it with

```shell{linenos=false}
sudo ufw allow http
sudo ufw enable
```

* in general, not running unnecessary services is a good enough practice for protection depending on the server
* changing the standard port, e.g. the `ssh` standard port 22 by editing `/etc/ssh/sshd_config`, is a fine "security by
  obscurity" ([or not](https://danielmiessler.com/blog/no-moving-your-ssh-port-isnt-security-by-obscurity/), because
  you're not actually hiding the mechanism) thing to do

## Day 10: Getting the computer to do your work for you

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/10.md)

* `crontab -l` shows user crontab entry, add `sudo` for `root` user
* system crontab at `/etc/crontab`

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6    * * 7   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6    1 * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
```

* there are hourly, daily, weekly, and monthly scripts run in `/etc/cron.hourly`, `/etc/cron.daily`, etc.
* `run-parts` runs scripts or programs in a directory in alphabetical order
* `logrotate` rotates, compresses, and mails system logs
* `systemd` can be used to run specific tasks at times using timers:

```shell{linenos=false}
ubuntu@ip-172-31-24-204:~$ systemctl list-timers
NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES
Sat 2023-01-14 00:00:00 UTC 3h 7min left  Fri 2023-01-13 00:01:30 UTC 20h ago      logrotate.timer              logrotate.service
Sat 2023-01-14 00:00:00 UTC 3h 7min left  Fri 2023-01-13 00:01:30 UTC 20h ago      man-db.timer                 man-db.service
Sat 2023-01-14 01:00:13 UTC 4h 7min left  Fri 2023-01-13 10:59:30 UTC 9h ago       fwupd-refresh.timer          fwupd-refresh.service
...
```

* `anacron`, or "anachronistic cron", is good for e.g. laptops that are off some of the time

## Day 11: Finding things...

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/11.md)

How to find files and text in files efficiently.

* `locate` (`sudo apt install mlocate`) is a very nifty version of `find / -name <somefilename> 2>/dev/null`
* may want to run `sudo updatedb` to update the index `locate` searches (usually runs daily through cron)
* `find /home -mtime -3` finds all the files modified in the last 3 days
* recursively search text with `grep -R -i "PermitRootLogin" /etc/* 2>/dev/null`
* `zless` and `zgrep` for viewing/searching compressed (e.g. gzip'd) files
* `find` flags and options:
    * `-iname` to ignore case for name
    * `-o` for "or"
    * `-size` for size filtering, e.g. `-size +100M`
    * `-atime` for access time, e.g. `-atime 30` accessed in last 30 days
    * `-ok` like `-exec`, but ask for confirmation, e.g. `find . -type f -ok cat {} \;`

## Day 12: Transferring files

[Link](https://github.com/livialima/linuxupskillchallenge/blob/master/12.md)

File sharing protocols other than `ftp` and `scp`:

* SMB for Windows
* AFP for local network of MacOS
* WebDAV for http
* `rsync`
* SFTP over SSH - best for our purposes as we're already ssh'ing
    * There is an `sftp` utility pre-installed on MacOS

[Cyberduck](https://cyberduck.io/) is a nice cloud storage browser with SFTP support, providing a GUI for
uploading/downloading files to/from remote servers. The logo and app icon alone make it well worth it.

A Recurser pointed out [magic-wormhole](https://magic-wormhole.readthedocs.io/en/latest/welcome.html), which is another
very cool program for transferring data securely.
