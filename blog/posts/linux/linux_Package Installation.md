---
layout: Post
title: Linux|软件包安装 
subtitle:  Linux|Package Installation
date: 2022-04-12
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-12/header-0.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
---

## 分类

1. 源码包 (自由选择功能,编译安装,稳定效率高)
2. 二进制包(包管理系统简单,安装速度快)

## 源码包


## 二进制包

- DPKG包

- RPM包

### 安装

#### 安装位置

|  路径   | 说明  |
|  ----  | ----  |
| /etc/  | 配置安装文件目录 |
| /usr/bin/  | 可执行的命令安装目录 |
| /usr/lib/  | 程序所使用的函数库保存位置 |
| /usr/share/doc/  | 基本的软件使用手册目录 |
| /usr/share/man/  | 帮助文件保存目录 |

#### 安装命令

`rpm -ivh 包名`

其他拓展选项

-   --nodeps 不检测依赖性安装
-   --replacefiles  替换文件安装
-   --replacepkgs  替换软件包安装
-   --force  强制安装
-   --test  测试安装(检测依赖性)
-   --prefix 执行安装路径

#### 升级命令

`rpm -Uvh 包名`

- -U    升级安装,如果没有装过,系统直接安装,如果装过,版本较旧,则会升级到心版本

- -F    升级安装,如果没有装过,则不会安装

#### 卸载命令

`rpm -e 包名`

- --nodeps 不检测依赖性


#### 查询命令

`rpm -q 包名`

查询系统所有软件包

`rpm -qa`

查询软件详细信息

`rpm -qi 包名`

查询未安装软件的详细信息

`rpm -qip 包名`

查询包中的文件目录

`rpm -ql 包名`

查询未安装包将要安装的文件目录

`rpm -qlp 包名`

查询文件系统属于哪个包

`rpm -qf 包名`

查询软件包所依赖的软件包

`rpm -qR 包名`

- -p    查询未安装的软件包所需的依赖软件包


### 编译安装Apache

```
Todo... 
```