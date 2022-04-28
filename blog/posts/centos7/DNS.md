---
layout: Post
title: CentOS|DNS 
subtitle: DNS Service 
date: 2022-04-28
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-28/header-0.jpg
permalinkPattern: /post/centos7/:year/:month/:day/:slug/
tags:
- CentOS
---

## 简介

域名系统(Domain Name System，缩写:DNS）是互联网的一项服务。域名解析是把域名指向网站空间IP，让人们通过注册的域名可以方便地访问到网站的一种服务。IP地址是网络上标识站点的数字地址，为了方便记忆，采用域名来代替P地址标识站点地址。域名解析就是域名到IP地址的转换过程。域名的解析工作由DNS服务器完成。可以理解为DNS就是翻译官。

- 正向解析：域名-->IP地址
- 反向解析：IP地址-->域名

## 解析过程

假设我们需要访问`www.kernel.org`,过程为：

1. 客户机首先查看查找本地hosts文件，如果有则返回，否则进行下一步

2. 客户机查看本地缓存，是否存在本条目的缓存，如界有则直接返回，否则进行下一步

3. 将请求转发给指向的DNS服务器

4. 查看域名是否本地解析，是则本地解析返回，否则进行下一步

5. 本地DNS服务器首先在缓存中查找，有则返回，无则进行下一步

6. 向全球13个根域服务器发起DNS请求，根域返回org 域的地址列表

7. 使用某一个org域的P地址，发起DNS请求，org域返回kernel域服务器地址列表

8. 使用某一个kernel域P地址，发起DNS请求，kernel域返回www.kernel.org主机的IP地址，本地DNS服务收到后，返回给客户机，并在本地DNS服务器保存一份。


## 文件介绍

配置文件：
- 主配置文件：`/etc/named.conf`

- 详细说明:

```shell
options {
        # 设置服务器监听网卡（可以写具体一个IP,也可以写成any）
        listen-on port 53 { 127.0.0.1; };
        listen-on-v6 port 53 { ::1; };
        # 数据保存文件
        directory       "/var/named";
        dump-file       "/var/named/data/cache_dump.db";
        statistics-file "/var/named/data/named_stats.txt";
        memstatistics-file "/var/named/data/named_mem_stats.txt";
        recursing-file  "/var/named/data/named.recursing";
        secroots-file   "/var/named/data/named.secroots";
        # 设置可以访问服务器的客户端IP（可以用any）
        allow-query     { localhost; };

```
- 区域配置文件：`/etc/named.rfc1912.zones`

- 详细说明:
```shell
# 正向区域配置文件标签，修改为需要解析的域
zone "localhost.localdomain" IN {
        # DNS服务器类型(master/slave)
        type master;
        # 正向数据配置文件名称(默认保存在/var/name/下)
        file "named.localhost";
        # 允许数据更新的列表(填写IP地址)
        allow-update { none; };
};
# 反向区域配置文件，仅修改IP位置，并且将IP写反
zone "1.0.0.127.in-addr.arpa" IN {
        type master;
        file "named.loopback";
        allow-update { none; };
};
```
- 数据配置文件：`/var/named/xx.xx`
```shell
$TTL 1D # 域名有效解析生存周期(一般指缓存时间)
@       IN SOA  @ rname.invalid. (
                                0       ; serial  # 配置文件修改版本(如：20220428)
                                1D      ; refresh # 更新频率(从向主的查询周期)
                                1H      ; retry # 更新失败的重试时间周期
                                1W      ; expire # 无法更新时的失效周期
                                3H )    ; minimum # 缓存服务器无法更新时的失效时间
        NS      @           # 设置DNS服务器的域名
        A       127.0.0.1   # IPv4域名IP解析记录
        AAAA    ::1         # IPv6域名IP解析记录

1D # 域名有效解析生存周期(一般指缓存时间)
@：代表域名本身 
SOA：SOA标记(起始授予机构的资源记录描述了域名的管理员，电子邮件地址，和一些时间参数)  
```
## 实验

### 基础实验

- DNS Server：`192.168.10.10`

- Client：`192.168.10.20`

**DND服务器配置**
```shell
# 安装DNS服务
yum -y install bind

# 备份基础文件
cp /etc/named.conf /etc/named.conf.bak
cp /etc/named.rfc1912.zones /etc/named.rfc1912.zones.bak
cp /var/named/named.localhost /var/named/named.localhost.bak
cp /var/named/named.loopback /var/named/named.loopback.bak
```
*修改主配置文件*
```shell
# 设置服务器监听地址
sed -i '13s/127.0.0.1/any/' /etc/named.conf
# 设置可以访问服务器的客户端IP
sed -i '21s/localhost/any/' /etc/named.conf
```

*修改区域配置文件*
```shell
cat <<EOF> /etc/named.rfc1912.zones
zone "yssuvu.com" IN {
        type master;
        file "yssuvu.localhost";
        allow-update { none; };
};
zone "10.168.192.in-addr.arpa" IN {
        type master;
        file "yssuvu.loopback";
        allow-update { none; };
};
EOF
```

*修改数据配置文件*
```shell
# yssuvu.localhost文件内容
cat <<EOF> /var/named/yssuvu.localhost
\$TTL 1D
@       IN SOA  yssuvu.com. rname.invalid. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      dns.yssuvu.com.
dns     A       192.168.10.10
www     A       192.168.10.10
EOF
```
```shell
# yssuvu.loopback文件内容
cat <<EOF> /var/named/yssuvu.loopback
\$TTL 1D
@       IN SOA  yssuvu.com. rname.invalid. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      dns.yssuvu.com.
10      PTR     dns.yssuvu.com.
10      PTR     www.yssuvu.com.
EOF
```

*重启DNS服务*
```shell
systemctl restart named
```

**客户机验证**

使用`nslookup www.yssuvu.com`和`nslookup 192.168.10.10`检验是否配置成功
```shell
[root@clinet ~]# nslookup www.yssuvu.com
Server:         192.168.10.10
Address:        192.168.10.10#53

Name:   www.yssuvu.com
Address: 192.168.10.10

[root@clinet ~]# nslookup 192.168.10.10
10.10.168.192.in-addr.arpa      name = dns.yssuvu.com.
10.10.168.192.in-addr.arpa      name = www.yssuvu.com.
```
### 主从实验

- DNS Master Server：`192.168.10.10`

- DNS Slave Server：`192.168.10.20`

- Client:`192.168.10.30`


**Master服务器配置**

修改区域文件中的从服务器地址
```shell
sed -i '4s/none/192.168.10.20/' /etc/named.rfc1912.zones
sed -i '9s/none/192.168.10.20/' /etc/named.rfc1912.zones
```

**Slave服务器配置**
```shell
# 安装DNS服务
yum -y install bind

# 备份基础文件
cp /etc/named.conf /etc/named.conf.bak
cp /etc/named.rfc1912.zones /etc/named.rfc1912.zones.bak
cp /var/named/named.localhost /var/named/named.localhost.bak
cp /var/named/named.loopback /var/named/named.loopback.bak
```
*修改主配置文件*
```shell
# 设置服务器监听地址
sed -i '13s/127.0.0.1/any/' /etc/named.conf
# 设置可以访问服务器的客户端IP
sed -i '21s/localhost/any/' /etc/named.conf
```
*修改区域配置文件*
```shell
cat <<EOF> /etc/named.rfc1912.zones
zone "yssuvu.com" IN {
        type slave;
        masters { 192.168.10.10; };
        file "slaves/yssuvu.localhost";
};
zone "10.168.192.in-addr.arpa" IN {
        type slave;
        masters { 192.168.10.10; };
        file "slaves/yssuvu.loopback";
};
EOF
```
*重启DNS服务*
```shell
systemctl restart named
```

**Client配置**
1. 将客户机的DNS1设置为SlaveDNS的IP地址
2. 使用`nslookup`命令验证是否成功

```shell
[root@clinet ~]# nslookup www.yssuvu.com
Server:         192.168.10.20
Address:        192.168.10.20#53

Name:   www.yssuvu.com
Address: 192.168.10.10

[root@clinet ~]# nslookup 192.168.10.10
10.10.168.192.in-addr.arpa      name = www.yssuvu.com.
10.10.168.192.in-addr.arpa      name = dns.yssuvu.com.
```
### 主缓实验

作用：加快解析速度，提高工作效率

- DNS Master Server：`192.168.10.10`

- DNS Cache Server：`192.168.10.20`

- Client:`192.168.10.30`

**Master服务器配置**

同上

**Cache服务器配置**

```shell
# 安装DNS服务
yum -y install bind

# 备份基础文件
cp /etc/dnsmasq.conf /etc/dnsmasq.conf.bak
```
*修改配置信息**
```shell
cat <<EOF> /etc/dnsmasq.conf
# 需要解析的域名
domain=www.yssuvu.com 
# 主DNS服务器IP
server=192.168.10.10  
# 声明缓存条目
cache-size=15000      
EOF
```

*启动dnsmasq服务*
```shell
systemctl start dnsmasq
```

**Client配置**
1. 将客户机的DNS1设置为DNS缓存服务器的IP地址
2. 使用`nslookup`命令验证是否成功
```shell
[root@clinet ~]# nslookup www.yssuvu.com
Server:         192.168.10.20
Address:        192.168.10.20#53

Non-authoritative answer:
Name:   www.yssuvu.com
Address: 192.168.10.10
```
### 分离解析

- DNS Master Serve(同时需要开启路由功能)
- `vm10 192.168.10.10`
- `vm11 100.100.100.10`

- Web Server
- `vm10 192.168.10.20`
- `vm11 100.100.100.20`
`
- LanClient:`vm10 192.168.10.30`

- WanClient:`vm11 100.100.100.30`

**Master服务器配置**

```shell
# 安装DNS服务
yum -y install bind

# 备份基础文件
cp /etc/named.conf /etc/named.conf.bak
cp /etc/named.rfc1912.zones /etc/named.rfc1912.zones.bak
cp /var/named/named.localhost /var/named/named.localhost.bak
cp /var/named/named.loopback /var/named/named.loopback.bak
```

*修改主配置文件*
需要将原本的zone区域数据删除
```shell
cat <<EOF>> /etc/named.conf
view lan{
    match-clients { 192.168.10.0/24; };
    zone "." IN{
        type hint;
        file "named.ca";
    };
    include "/etc/lan.zones";
};

view wan{
    match-clients { any; };
    zone "." IN{
        type hint;
        file "named.ca";
    };
    include "/etc/wan.zones";
};
EOF
```

*修改区域配置文件*
```shell
cat <<EOF> /etc/lan.zones
zone "yssuvu.com" IN {
        type master;
        file "lan.localhost";
        allow-update { none; };
};
zone "10.168.192.in-addr.arpa" IN {
        type master;
        file "lan.loopback";
        allow-update { none; };
};
EOF

cat <<EOF> /etc/wan.zones
zone "yssuvu.com" IN {
        type master;
        file "wan.localhost";
        allow-update { none; };
};
zone "100.100.100.in-addr.arpa" IN {
        type master;
        file "wan.loopback";
        allow-update { none; };
};
EOF
```

*修改数据配置文件*
```shell
# lan.localhost文件内容
cat <<EOF> /var/named/lan.localhost
\$TTL 1D
@       IN SOA  yssuvu.com. rname.invalid. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      dns.yssuvu.com.
dns     A       192.168.10.10
www     A       192.168.10.20
EOF
```
```shell
# lan.loopback文件内容
cat <<EOF> /var/named/lan.loopback
\$TTL 1D
@       IN SOA  yssuvu.com. rname.invalid. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      dns.yssuvu.com.
10      PTR     dns.yssuvu.com.
20      PTR     www.yssuvu.com.
EOF
```

```shell
# wan.localhost文件内容
cat <<EOF> /var/named/wan.localhost
\$TTL 1D
@       IN SOA  yssuvu.com. rname.invalid. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      dns.yssuvu.com.
dns     A       100.100.100.10
www     A       100.100.100.20
EOF
```
```shell
# wan.loopback文件内容
cat <<EOF> /var/named/wan.loopback
\$TTL 1D
@       IN SOA  yssuvu.com. rname.invalid. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      dns.yssuvu.com.
10      PTR     dns.yssuvu.com.
20      PTR     www.yssuvu.com.
EOF
```

*重启DNS服务*
```shell
systemctl restart named
```

**验证**

内网客户机
```shell
[root@lan ~]# nslookup www.yssuvu.com
Server:         192.168.10.10
Address:        192.168.10.10#53

Name:   www.yssuvu.com
Address: 192.168.10.20
```

外网客户机
```shell
[root@waan ~]# nslookup www.yssuvu.com
Server:         100.100.100.10
Address:        100.100.100.10#53

Name:   www.yssuvu.com
Address: 100.100.100.20
```
