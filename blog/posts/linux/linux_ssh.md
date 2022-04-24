---
layout: Post
title: Linux|SSH无密钥登陆 
subtitle: SSH keyless login 
date: 2022-04-18
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-18/header-0.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
---

## 生成密钥对

SSH密钥对包括两个文件：私钥文件（Private Key），公钥文件（Public Key）

执行命令：`ssh-keygen -N "" -f ~/.ssh/yss` 生成SSH密钥对

生成带邮箱的密钥对:`ssh-keygen -N "" -f ~/.ssh/yl -C xxxx@xxx.com`

执行完毕之后会生成两个文件：

- 私钥文件： $HOME/.ssh/yss

- 公钥文件： $HOME/.ssh/yss.pub

## 上传SSH公钥文件

执行命令：`ssh-copy-id -i $HOME/.ssh/yss.pub root@remoteIP`

