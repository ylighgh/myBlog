---
layout: Post
title: Git|用户设置
subtitle:  Git|User Setting 
date: 2022-04-24
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-24/header-0.jpg
permalinkPattern: /post/git/:year/:month/:day/:slug/
tags:
- Git
---

## 查看用户名

`git config user.name`

## 切换用户

`git config --global user.name "xxx" `

## 切换邮箱

`git config --global user.email "xxx"`

## Git多用户设置

### 添加私钥

1. 打开ssh-agent

`eval $(ssh-agent -s)`

2. 添加私钥

`ssh-add ~/.ssh/id_rsa_one`

`ssh-add ~/.ssh/id_rsa_two`

### 修改config文件

```shell
cat <<EOF>> ~/.ssh/config
Host one.github.com
HostName github.com
User ID1 # 用户名1
IdentityFile ~/.ssh/id_rsa_one

Host two.github.com  # 前缀名可以任意设置
HostName github.com
User ID2 # 用户名2
IdentityFile ~/.ssh/id_rsa_two
EOF
```

### 验证

`ssh -T git@one.github.com`

```shell
╭─ylighgh@ylighgh ~/.ssh 
╰─$ ssh -T git@ylighgh.github.com
Hi ylighgh! You've successfully authenticated, but GitHub does not provide shell access.
╭─ylighgh@ylighgh ~/.ssh 
╰─$ ssh -T git@ylighgh-01.github.com                                                                                   1 ↵
Hi ylighgh-01! You've successfully authenticated, but GitHub does not provide shell access.
```

## 拉取文件

例如我要克隆的远程仓库的ssh地址是：`git@github.com:happyCoding1024/FrontendLearningTool.git`

假设这个远程仓库是在GitHub账号为ID1的仓库中，那么克隆时需要改成下面的形式：

`git clone  git@one.github.com:happyCoding1024/FrontendLearningTool.git`

## 本地化

由于现在不是全局配置了，所以每个仓库都需要配置各自的用户名和邮箱来确定这个仓库是和哪个 GitHub 账号连接的。

在项目文件夹中右键打开 GitBash，然后执行下面 的语句，设置账号和相应的项目关联：

`git config user.name  xxx`

`git config user.email  xxx@qq.com`
