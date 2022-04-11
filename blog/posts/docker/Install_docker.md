---
layout: Post
title: Docker|CentOS7安装docker 
subtitle: CentOS7 install docker
date: 2022-04-11
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-11/header-5.jpg
permalinkPattern: /post/docker/:year/:month/:day/:slug/
tags:
- Docker
---

## 向脚本文件追加内容
```shell
cat << EOF > docker_install.sh
#安装curl
yum -y install curl

#CentOS7- 配置阿里镜像源
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo 
yum clean all 
yum makecache 
#Uninstall old versions
yum -y remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine 

#SET UP THE REPOSITORY
yum -y install yum-utils 
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo 

#INSTALL DOCKER ENGINE
yum -y install docker-ce docker-ce-cli containerd.io   
systemctl enable docker  
systemctl start docker

#配置镜像加速
mkdir -p /etc/docker 
echo "{" > /etc/docker/daemon.json 
echo   '  "registry-mirrors": ["https://ueeg7jo6.mirror.aliyuncs.com"]  '   >> /etc/docker/daemon.json 
echo "}" >> /etc/docker/daemon.json  

#重载Docker，使配置生效
systemctl daemon-reload 
systemctl restart docker 
EOF
```
## 给脚本授予执行权限

```shell
chmod +x docker_install.sh
```
## 执行脚本

```shell
sh docker_install.sh
```

## 测试
执行:`docker run hello-world`
```shell
[ylighgh@docker ~]# docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```
