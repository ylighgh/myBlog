---
layout: Post
title: CentOS|vsftpd 
subtitle: vsftpd
date: 2022-04-29
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-29/header-0.jpg
permalinkPattern: /post/centos7/:year/:month/:day/:slug/
tags:
- CentOS
---
## 简介

FTP是File Transfer Protocol（文件传输协议）的英文简称，用于Internet上的文件的双向传输。使用FTP 来传输时，是具有一定程度的危险性，因为数据在因特网上面是完全没有受到保护的明文传输方式

VSFTP是一个基于GPL发布的类Unix系统上使用的FTP服务器软件,它的全称是Very Secure FTP，从名称定义上基本可以看出，这是为了解决ftp传输安全性问题的

## 连接类型

控制连接(持续连接)-->TCP21(命令信道)-->用户收发FTP命令

数据连接(按需连接)-->TCP20(数据信道)-->用户上传下载数据


## 工作模式

- 主动模式(Port)

    FTP客户端首先和服务器的TCP 21端口建立连接，用来发送命令，客户端需要接收数据的时候在这个通道上发送PORT命令。PORT命令包含了客户端用什么端口接收数据。在传送数据的时候，服务器端通过自己的TCP 20端口连接至客户端的指定端口发送数据。FTP server必须和客户端建立一个新的连接用来传送数据

- 被动模式(Passive)

    FTP客户端首先和服务器的TCP 21端口建立连接，用来建立控制通道发送命令﹐但建立连接后客户端发送Pasv命令。服务器收到Pasv命令后,打开一个临时端口(端口大于1023小于65535）并且通知客户端在这个端口上传送数据的请求，客户端连接FTP服务器的临时端口，然后FTP服务器将通过这个端口传输数据

## 传输模式

- Binary模式：不对数据进行任何处理，适合进行可执行文件、压缩文件、图片等

- ASCII模式：进行文本传输时，自动适应目标操作系统的结束符，如回车符等


## 软件信息

服务端软件：`vsftpd`

客户端软件：`ftp`

服务名：`vsftpd`

端口号:`20` `21` `指定范围内随机端口`

配置文件：`/etc/vsftpd/vsftpd.conf`

## 实验

**安装**
```bash
# 安装vsftpd服务
yum -y install vsftpd ftp

cp /etc/vsftpd/vsftpd.conf  /etc/vsftpd/vsftpd.conf.default
# 启动服务并设置开机自启
systemctl enable vsftpd
systemctl start vsftpd
```

**查看状态**

`systemctl status vsftpd`

```bash
[root@server ~]# systemctl status vsftpd
● vsftpd.service - Vsftpd ftp daemon
   Loaded: loaded (/usr/lib/systemd/system/vsftpd.service; enabled; vendor preset: disabled)
   Active: active (running) since Fri 2022-04-29 10:49:27 CST; 5s ago
  Process: 17565 ExecStart=/usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf (code=exited, status=0/SUCCESS)
 Main PID: 17566 (vsftpd)
   CGroup: /system.slice/vsftpd.service
           └─17566 /usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf

Apr 29 10:49:27 server systemd[1]: Starting Vsftpd ftp daemon...
Apr 29 10:49:27 server systemd[1]: Started Vsftpd ftp daemon.
```
### 匿名用户

默认可下载，不可上传

1. 安装

2. 登录:`ftp IP地址`
```bash
[root@server ftp]# ftp localhost
Connected to localhost (127.0.0.1).
220 (vsFTPd 3.0.2)
Name (localhost:root): ftp
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
```

3. 常用命令
```bash
ftp> help
Commands may be abbreviated.  Commands are:

!               debug           mdir            sendport        site
$               dir             mget            put             size
account         disconnect      mkdir           pwd             status
append          exit            mls             quit            struct
ascii           form            mode            quote           system
bell            get             modtime         recv            sunique
binary          glob            mput            reget           tenex
bye             hash            newer           rstatus         tick
case            help            nmap            rhelp           trace
cd              idle            nlist           rename          type
cdup            image           ntrans          reset           user
chmod           lcd             open            restart         umask
close           ls              prompt          rmdir           verbose
cr              macdef          passive         runique         ?
delete          mdelete         proxy           send

```
### 本地用户

用户账号名称：`/etc/passwd`

用户账号密码：`/etc/shadow`

本地用户默认的登陆地点就是用户的家目录

```bash
# 增加一个本地用户
useradd -s /sbin/nologin yl

# 修改配置文件
sed -i '4s/auth/#auth/' /etc/pam.d/vsftpd

# 修改密码
echo "123"|passwd --stdin yl

# 登陆
ftp localhost
```
```bash
[root@baiduyun ~]# ftp localhost
Trying ::1...
Connected to localhost (::1).
220 (vsFTPd 3.0.2)
Name (localhost:root): yl
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files
```
### 虚拟用户

1. 创建虚拟用户来代替本地用户,减少本地用户曝光率
2. 使用本地用户作为虚拟用户的映射用户,为虚拟用户提供工作目录和权限控制
3. 能够设置严格的权限(为每一个用户生成单独的配置文件)



