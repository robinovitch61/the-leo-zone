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
