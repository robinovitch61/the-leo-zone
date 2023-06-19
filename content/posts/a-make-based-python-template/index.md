---
title: "a python project template with make"
date: "2023-06-19"
description: "A Python project template with GNU make, by Leo Robinovitch."
draft: true
---

[GNU make](https://www.gnu.org/software/make/manual/make.html) is technically a build tool , but it's often used to
define common developer tasks. For example, `make build` might build your application, and `make deploy` might first run
`build` if it needs to, then run a deploy command.

Folks have a lot of complaints about the Python tooling:

- Why is dependency management so confusing (pip, poetry, pipenv, etc.?)
- Why is environment management so confusing (virtualenv, pyenv, pyenv-virtualenv, etc.?)hhh
- Why is there no standard way to build and distribute a Python app?
- How do I write and distribute a package in Python?
- How do I enforce a common code style for my team in Python?

The tricky bit is that there are multiple good answers to all of these questions. **Your best bet is to find a set of
answers that work for you and your team.** Update and improve individual components as you go.

This is an enumeration of a set of solutions to common Python problems that I've been using at work and in personal
projects recently, and that I like quite a bit. It uses `make` to perform development and administrative tasks. Pick and
choose components that you like, or use the [cookiecutter template](TODO LEO) as a starting point for your own project.

## Requirements

## Build with Docker

## Local Development

## Deployment?

## Typing & Testing

## Packaging

## Linting & Formatting

## Documentation
