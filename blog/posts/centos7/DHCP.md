---
layout: Post
title: CentOS|DHCP 
subtitle: DHCP
date: 2022-04-27
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-27/header-0.jpg
permalinkPattern: /post/centos7/:year/:month/:day/:slug/
tags:
- CentOS
---

## 简介

DHCP (Dynamic Host Configuration Protocol，动态主机配置协议）是一个工作在应用层的局域网网络协议，数据传输时使用UDP不可靠传输协议工作，通常被应用在大型的局域网络环境中，主要作用是集中的管理、分配网络资源，使网络环境中的主机能动态的获得IP地址、Gateway地址、DNS服务器地址等信息，并能够提升地址的使用率。

## 工作原理

**租约四部曲**

Client-->DHCP Discover-->Server 

Client<--DHCP Offer<--Server 

Client-->DHCP Request-->Server 

Client<--DHCP ACK(NCK)<--Server 

```shell
Apr 27 17:20:33 server dhcpd: DHCPDISCOVER from 00:0c:29:16:91:27 via ens32
Apr 27 17:20:34 server dhcpd: DHCPOFFER on 192.168.0.101 to 00:0c:29:16:91:27 (clinet) via ens32
Apr 27 17:20:34 server dhcpd: DHCPREQUEST for 192.168.0.101 (192.168.0.60) from 00:0c:29:16:91:27 (clinet) via ens32
Apr 27 17:20:34 server dhcpd: DHCPACK on 192.168.0.101 to 00:0c:29:16:91:27 (clinet) via ens32
```
*DCHP客户端进行IP请求*

客户端使用0.0.0.0的地址作为源地址，使用255.255.255.255作为目标地址，使用UDP 67端口作为目的端口来广播请求IP地址信息。广播信息包括DHCP客户机的MAC地址和计算机名

*DCHP服务器相应请求*

DHCP服务器使用自己的IP地址作为源地址，使用255.255.255.255作为目标地址，使用UDP 68端口作为源端口来广播DHCP OFFER信息。
广播信息包括：
- DHCP服务器/客户端的MAC地址
- DHCP服务器提供的合法IP地址
- 子网掩码，默认网关，租约期限

*续租租约*

DHCP客户机会在租期过去50%的时候，直接向为其提供IP地址的DHCP服务器发送DHCP REQUEST消息包。如果客户机接收到该服务器回应的DHCP ACK消息包，客户机就根据包中所提供的新的租期以及其它已经更新的TCP/IP参数，更新自己的配置，IP租用更新完成。如果没有收到该服务器的回复，则客户机继续使用现有的IP地址，因为当前租期还有50%。如果在租期过去50%的时候没有更新，则DHCP客户机将在租期过去87.5%的时候再次向为其提供IP地址的DHCP服务器联系。**如果还不成功，到租约的100%时候，DHCP客户机必须放弃这个IP地址，重新申请。如果此时无DHCP服务器可用，DHCP客户机会使用169.254.0.0/16中随机的一个地址，并且每隔5分钟再进行尝试。**

## DHCP搭建

### 安装

`yum -y install dhcp`

**配置文件**

- 配置文件：`/etc/dhcp/dhcpd.conf`  
- 模板文件：`/usr/share/doc/dhcp-4.*.*/dhcpd.conf.example`
- 中继配置文件：`/etc/sysconfig/dhcrelay`

**文件详情**
```shell
subnet 192.168.88.0 netmask 255.255.255.0{      #声明要分配的网段和子网掩码
    range 192.168.88.3 192.168.88.10;           #声明可用IP地址池
    option domain-name "yssuvu.com";            #设置DNS域 
    option domain-name-servers 8.8.8.8;         #设置DNS服务器地址
    option routers 192.168.88.254;              #默认网关的地址
    option broadcast-address 192.168.88.255;    #广播地址（可不写)
    default-lease-time 600;                     #默认租约(s）
    max-lease-time 720;                         #最大租约(s)
}
```
### 基础配置
Server:

```shell
mv /etc/dhcp/dhcpd.conf /etc/dhcp/dhcpd.conf.bak
cp -a /usr/share/doc/dhcp-4.*.*/dhcpd.conf.example /etc/dhcp/dhcpd.conf

vim /etc/dhcp/dhcpd.conf
subnet 192.168.0.0 netmask 255.255.255.0 {
  range 192.168.0.101 192.168.0.110;
  option routers 192.168.0.1;
  default-lease-time 600;
  max-lease-time 7200;
}

systemctl restart dhcpd
```

Client:
1. 设置网络模式为DHCP
2. 重启网卡`ifdown ens32;ifup ens32`


### 地址保留
1. `arp -a` 查看客户机MAC地址
2. 修改配置文件
```shell
host xxx{
    hardware ethernet MAC地址；
    fixed-address IP地址;
}

```
3. 重启DCHP服务：`systemctl restart dhcpd`
4. 客户端重启网卡：`ifdown ens32;ifup ens32`

### 超级作用域

**实验环境**

Server：
- eth0:192.168.10.1/24
- eth0:0:192.168.20.1/24

Client:
- eth0:192.168.10.10/24

Client1:
- eth0:192.168.20.20/24

1. 创建子接口

`cp /etc/sysconfig/network-scripts/ifcfg-ens32 /etc/sysconfig/network-scripts/ifcfg-ens32:0`

2. 分别给两个接口配置IP
3. 开启路由转发功能 

`echo " net.ipv4.ip_forward = 1">>/etc/sysctl.conf`

4. 刷新内核参数 `sysctl -p` 

5. 修改dhcp配置文件
```shell
vim /etc/dhcp/dhcpd.conf
shared-network 10-20{
    subnet 192.168.10.0 netmask 255.255.255.0{
        range 192.168.10.10 192.168.10.10;
         option routers 192.168.10.1;
    }
    subnet 192.168.20.0 netmask 255.255.255.0{
        range 192.168.20.20 192.168.20.90;
         option routers 192.168.20.1;
    }
}
```

6. 重启dhcp服务`systemctl restart dhcpd`  

### 中继

**实验环境**

Server：
- ens32:192.168.10.10/24      Vmnet10

Relay:
- ens32:192.168.10.20/24     Vmnet10
- ens33:100.100.100.20/24     Vmnet11

Client:
- ens32:dhcp                 Vmnet11

1. 配置DHCP服务器IP地址和网段

- 修改`/etc/dhcp/dhcp.conf`文件

```shell
subnet 192.168.10.0 netmask 255.255.255.0{
    range 192.168.10.100 192.168.10.110;
    option routers 192.168.10.20;
}
subnet 100.100.100.0 netmask 255.255.255.0{
    range 100.100.100.100 100.100.100.110;
    option routers 100.100.100.20;
}
```

2. 配置Relay服务器IP地址和网段

```shell
# 安装dhcp
yum -y install dhcp


# 声明DHCP服务器地址(如果重新增加一个子网，则需要重新声明)
dhcrelay 192.168.10.10

# 开启路由转发功能 
echo "net.ipv4.ip_forward = 1">>/etc/sysctl.conf

# 刷新内核参数 
sysctl -p 
```
