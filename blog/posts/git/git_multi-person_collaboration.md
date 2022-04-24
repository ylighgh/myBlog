---
layout: Post
title: Git|多人协作
subtitle: multi-person collaboration   
date: 2022-04-24
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-24/header-2.jpg
permalinkPattern: /post/git/:year/:month/:day/:slug/
tags:
- Git
---

## Fork项目


## 添加主项目仓库

`git remote add upstream git@github.com:xxx/xxx.git`

检测是否添加成功: `git remote -v`

```shell
origin  git@github.com:ylighgh/ChiKeXing.git (fetch)
origin  git@github.com:ylighgh/ChiKeXing.git (push)
upstream        git@github.com:ylighgh-01/ChiKeXing.git (fetch)
upstream        git@github.com:ylighgh-01/ChiKeXing.git (push)
```
## 分支

查看当前分支: `git branch`

新建分支: 
- 旧版: `git checkout -b xxx`
- 新版: `git switch -c xxx`

切换分支: 
- 旧版:`git checkout xxx`
- 新版: `git switch xxx`

查看分支状态:`git status`

删除分支:`git branch -d xxx`

合并分支:`git merge xxx`

## 冲突问题

在`push`

## 推送

推送自己的仓库:`git push origin HEAD:xxx` (推送到xxx分支下)


## 项目操作流程

1. 每次开发时,进入到`main`分支,执行:`git pull upstream:main`(拉去远程主仓库最新版本的内容)

2. 新建dev分支: `git switch -c dev`

3. 切换到dev分支: `git switch dev`

4. 开发完成后执行:

```shell
git add .
git commit -m 'xxx'

# 切换到main分支
git switch main

# 合并dev的分支操作
git merge dev

git add .
git commit -m 'xxx'

# 推送到远程main仓库
git push origin HEAD:main
```

5. 去`GitHub`上创建PR请求,进行代码合并

