---
layout: Post
title: Linux|使用fdisk进行磁盘分区 
subtitle: Linux | Disk Partitioning with fdisk
date: 2022-04-14
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-14/header-1.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
---

## 列出分区表

`fdisk -l`

```shell
╭─ylighgh@ylighgh ~ 
╰─$ sudo fdisk -l         
Disk /dev/sdb：223.58 GiB，240065183744 字节，468877312 个扇区
磁盘型号：SSD PLUS 240    
单元：扇区 / 1 * 512 = 512 字节
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：4096 字节 / 33553920 字节
磁盘标签类型：gpt
磁盘标识符：3446E790-30DD-424F-8650-D95EE75055FA

设备            起点      末尾      扇区   大小 类型
/dev/sdb1       2048    616447    614400   300M EFI 系统
/dev/sdb2     616448   4810751   4194304     2G Linux swap
/dev/sdb3    4810752 214525951 209715200   100G Linux 文件系统
/dev/sdb4  214525952 468877278 254351327 121.3G Linux 文件系统
```

## 手动分区

`fdisk /dev/sd?`

```shell
  DOS (MBR)
   a   开关 可启动 标志
   b   编辑嵌套的 BSD 磁盘标签
   c   开关 dos 兼容性标志

  常规
   d   删除分区
   F   列出未分区的空闲区
   l   列出已知分区类型
   n   添加新分区
   p   打印分区表
   t   更改分区类型
   v   检查分区表
   i   打印某个分区的相关信息

  杂项
   m   打印此菜单
   u   更改 显示/记录 单位
   x   更多功能(仅限专业人员)

  脚本
   I   从 sfdisk 脚本文件加载磁盘布局
   O   将磁盘布局转储为 sfdisk 脚本文件

  保存并退出
   w   将分区表写入磁盘并退出
   q   退出而不保存更改

  新建空磁盘标签
   g   新建一份 GPT 分区表
   G   新建一份空 GPT (IRIX) 分区表
   o   新建一份的空 DOS 分区表
   s   新建一份空 Sun 分区表

```


## 格式化分区(写入文件系统)

`mkfs -t FILETYPE /dev/sd?`