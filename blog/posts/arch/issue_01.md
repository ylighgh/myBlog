---
layout: Post
title: Archlinux|execv无法正常调用
subtitle: Execv failed (no such file or directoy)
date: 2022-04-14
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-14/header-0.jpg
permalinkPattern: /post/arch/:year/:month/:day/:slug/
tags:
- ArchLinux
---

## Issue

```shell
Failed to call execv (no such file or directory)
Error: The command was not executed correctly
Error: Unable to commit for processing (failed to run transaction hook function)
```

## Solve

```shell
sudo pacman -S pacman-contrib
```