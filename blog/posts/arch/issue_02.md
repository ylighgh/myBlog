---
layout: Post
title: ArchLinux|质
subtitle: BIOS can't find boot media solution
date: 2022-04-26
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-26/header-2.jpg
permalinkPattern: /post/arch/:year/:month/:day/:slug/
tags:
- ArchLinux
---
## 场景

由于Windows自动更新而引发GRUB引导分区找不到ArchLinux介质的问题

## 解决方法

**关于BIOS找不到引导介质的解决方法**

```shell
mount /dev/sdc3 /mnt

mkdir /mnt/home
mount /dev/sdc4 /mnt/home

mkdir /mnt/efi
mount /dev/sdc1 /mnt/efi

#切换到挂载系统
arch-chroot /mnt

grub-install --target=x86_64-efi --efi-directory=efi --removeable --bootloader=GRUB --recheck

##--removeable 表示是移动介质
##--recheck 检查设备

#重新生成grub文件
grub-mkconfig -o /boot/grub/grub.cfg
```

*开机提示timed out waiting for device*


引导找不到，导致UUID更改，恢复方法如下：
```shell
#执行命令记录EFI分区的UUID
blkid

#编辑fstab文件将UUID重新写入
vim /etc/fstab
```