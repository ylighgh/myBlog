---
layout: Post
title: Linux|FACL 
subtitle: FACL Table
date: 2022-04-26
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-26/header-0.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
---

## 开启

**查看是否开启**
```shell
[root@aliyun ~]# dumpe2fs -h /dev/vda1|grep acl
dumpe2fs 1.42.9 (28-Dec-2013)
Default mount options:    user_xattr acl
```
如果没有开启,则需要手动开启分区的ACL的权限
```shell
# 重新挂载根分区,并挂载加入acl权限
mount -o remout,acl /
```

## 基本命令

查询文件的ACL权限:`getfacl FILENAME`

```shell
[root@aliyun ~]# getfacl workspace/
# file: workspace/
# owner: root
# group: root
user::rwx
group::r-x
other::r-x
```

设定ACL权限:`setacl OPTION FILENAME`
- -m 设定ACL权限
- -b 删除ACL权限
- -x 删除单个用户的ACL权限


## 创建

1. 给/test目录赋予user读写执行权限

`setacl -m u:user:rwx /test` 

u->g 表示赋予组

2. 赋予递归ACL权限,只能赋予目录

==只能争对已经存在的文件==

`setacl -m u:user:rwx -R /test`  


==只能争对新建的文件==

`setacl -m d:u:user:rwx -R /test` 

## 删除

1. 删除指定用户和用户组的ACL权限

`setacl -x u:st /project`

2. 删除文件的所有ACL权限

`setacl -b /project`


::: tip 注意

ACL权限,一旦递归之后,不可避免的会出现权限溢出

:::