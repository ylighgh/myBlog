---
layout: Post
title: Linux|Service 
subtitle: Linux| Service
date: 2022-05-06
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-05-06/header-0.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
---

## Linux基础

###  运行级别

Linux系统运行级别:Linux系统有7个运行级别,不同的运行级别运行的程序和功能都不一样,而Linux系统默认是运行在一个标准的级别上,系统运行级别文件/etc/inittab文件
[source,note]
----
运行级别0:所有进程被终止,机器将有序的停止,关机时系统处于这个运行级别(关机)
运行级别1:单用户模式,(root用户进行系统维护),系统里运行的所有服务都不会启动
运行级别2:多用户模式(网络文件系统NFS服务为没有被启动)
运行级别3:完全多用户模式,(有NFS网络文件系统)标准的运行级别
运行级别4:系统未使用
运行级别5:登陆后,进入带GUI的图形化界面,标准的运行级别
运行级别6:系统正常关闭并重启

#查看当前的运行级别
runlevel

#切换运行级别
init 数字   

#获取当前系统默认运行级别
systemctl get-default

#修改系统默认运行级别
systemctl set-default TARGET.target
----

## 关机和重启

[source,bash]
----
#关机
halt
init 0
poweroff
shutdown
shutdown -h 10    //10分钟后关机
shutdown -h now   //立刻关机



#重启
init 6
reboot
shutdown -r now
shutdown -r 10    //10分钟后重启
----

## 软链接与硬链接

.软链接
特点:软链接可以跨分区,可以对目录进行链接,源文件删除后,链接文件不可用

格式: `ln -s 源文件路径 目标文件路径`

.硬链接
特点:硬链接不可以跨分区,不可以对目录进行链接,源文件删除后,链接文件仍然可以使用

格式: `ln  源文件路径 目标文件路径`


## 系统硬件
内核(kernel)

命令: `uname -rs`
[source.shell]
----
[root@localhost ~]# uname -rs
Linux 3.10.0-1062.el7.x86_64

Linux  #内核名称
3      #主版本
10     #次版本
0      #修改版本
1062   #补丁次数
el7    #Enterprise Linux(企业版Linux)
X86_64 #CPU架构
----

CPU

命令: `lscpu`

系统内存

命令: `free -mh`

网卡

命令: `ifconfig 网卡名`

主机名
[source.shell]
----
hostname [新名称]  //临时生效,重启恢复
hostnamectl set-hostname [新名称] //永久生效
----

## 用户管理

用户模板目录: `/etc/skel`

默认信息目录: `/etc/default/useradd`

创建用户: `useraddd`


* 常用选项:

- -u 指定用户UID

- -d 指定用户家目录

- -c 用户描述信息

- -g 指定用户基本组

- -G 指定用户附加组

- -s 指定用户的shell

## 密码管理

命令格式: `passwd [-选项] 用户名`

密码规范: 长度不能少于8个字符,复杂度(数字,字母区分大小写,特殊字符)

* 常用选项:

- -S 查看密码信息

- -l 锁定用户密码

- -u 解锁用户密码

- -d 删除密码

- --stdin 通过管道方式设置用户密码

* 非交互式设置用户密码

* 命令格式: `echo 密码|passwd --stdin 用户名`

用户密码文件: `/etc/shadow`

* 字段含义:

- 第三个字段:密码最后一次修改日期

- 第四个字段:密码的修改期限,为0表示随时可以修改,为10表示10天之内不能修改

- 第五个字段:密码有效期

- 第六个字段:密码到期前警告时间

- 第七个字段:密码过期后的宽限时间

- 第八个字段:账号失效时间(日期从1970年1月1日起)

- 第八个字段:保留

新建用户登录就提示修改密码: `chage -d 0 用户名`

