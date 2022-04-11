---
layout: Post
title: Linux|find命令使用 
subtitle:  How to use the find command on Linux 
date: 2022-04-11
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-11/header-6.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
---

## 按照文件名搜索
```shell
find 搜索路径 [选项] 搜索内容
选项:
    -name 按照文件名搜索
    -iname 按照文件名搜索,不区分文件名大小写
    -inum 按照inode号搜索
```

eg:搜索/tmp目录下后缀名为.log的文件

`find /tmp -name '*.log'`
## 按照文件大小搜索
```shell
find 搜索路径 [选项] 搜索内容
选项:
    -size [+][-]大小 按照指定大小搜索文件
```
- `+`:比指定大小还要大的文件
- `-`:比指定大小还要小的文件

eg:搜索workspace目录下大于100MB的文件

`find workspace -size +100M`

## 按照修改时间搜索
```shell
find 搜索路径 [选项] 搜索内容
选项:
    -atime [+][-]时间:  按照文件访问时间搜索
    -mtime [+][-]时间:  按照文件数据修改时间搜索
    -ctime [+][-]时间:  按照文件状态修改时间搜索
```
- `-5`:代表5天内修改的文件
- `5`:代表前5~6天内修改的文件
- `+5`:代表6天前修改的文件

## 按照权限搜索
```shell
find 搜索路径 [选项] 搜索内容
选项:
    -uid 用户ID:     按照用户ID查找所有者是指定ID的文件
    -gid 组ID:       按照用户组ID查找所属组是指定ID的文件
    -user 用户名:    按照用户名查找所有者是指定用户的文件
    -group 组名:     按照组名查找所属者是指定用户的文件
    -nouser:        查找没有所有者的文件
```

## 按照文件类型搜索
```shell
find 搜索路径 [选项] 搜索内容
选项:
    -type d:        查找目录
    -type f:        查找普通文件
    -type l:        查找软链接文件
```

## 逻辑运算符
```shell
find 搜索路径 [选项] 搜索内容
选项:
    -a:     and 逻辑与
    -o:     or  逻辑或
    -not:   not 逻辑非
```

eg:
1. 查找`workspace`目录下文件类型为普通类型,并且大小大于100MB的以`.txt`结尾的文件

    `find workspace -name '*.txt' -a -size +100M -a -type f`

## 其他选项

`-exec选项`:将find查询的结果交给`exec`调用的`command`来执行

```shell
find 搜索路径 [选项] 搜索内容 -exec command {} \;
```

eg:列出当前目录下文件类型为软链接文件的信息

`find . -type l -exec ls -l {} \;`