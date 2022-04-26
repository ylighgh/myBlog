---
layout: Post
title: Linux|TcpWrappers 
subtitle: TcpWrappers
date: 2022-04-26
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-26/header-1.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
---

## 简介

TcpWrappers是一个工作在第四层(传输层)的安全工具,对有状态(TCP)的特定服务进行安全检测并实现访问控制,界定方式是凡是调用`libwrap.so`库文件的程序就可以受
TcpWrappers的安全控制.

判断方式:

1. 查看对应服务命令位置:
- `which sshd`
2. 查看指定命令执行时是否调用`libwrap.so`文件
- `ldd /usr/sbin/sshd|grep libwrap.so`
- ldd:静态的查看服务调用时所用的文件列表

## 工作原理

1. 优先查看`/etc/hosts.allow`,匹配则停止
2. 允许个别,拒绝所有:`hosts.allow`文件添加单个允许策略,`hosts.deny`文件添加ALL
3. 拒绝个别,允许所有:`hosts.allow`文件为空,`hosts.deny`文件添加单个拒绝策略

## 编写规则

`service_list@host:client_list`

- service_list:是程序(服务)的列表,可以是多个,使用`,`隔开
- host:设置允许或者禁止他人从自己的哪个网口进入.这一项不写,就代表全部
- client_list:是访问者的地址,如果需要控制的用户较多,可以使用空格或`,`隔开
    - 基于IP地址:192.158.1.1 
    - 基于主机名:www.baidu.com www.sougou.com
    - 基于网络/掩码: 192.168.0.0/255.255.255.0


## 测试

1. 拒绝单个IP使用ssh远程连接

拒绝单个,允许所有

配置文件:
- hosts.allow :空着
- hosts.deny: sshd:192.168.10.20

2. 拒绝某一网段使用ssh远程连接

配置文件:
- hosts.allow :空着
- hosts.deny: sshd:192.168.10.

3. 仅允许单个IP使用ssh远程连接

允许单个,拒绝所有

配置文件:
- hosts.allow :sshd:192.168.10.20
- hosts.deny: sshd:ALL