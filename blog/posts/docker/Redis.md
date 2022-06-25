---
layout: Post
title: Docker|Redis集群 
subtitle: Docker|Redis集群
date: 2022-06-25
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-06-25/header-0.jpg
permalinkPattern: /post/docker/:year/:month/:day/:slug/
tags:
- Docker
---

## redis分布式存储

架构图

![redis_01](/img/in-post/2022-06-25/redis_01.png)

### 哈希取余算法

### 一致性哈希算法

### 哈希槽算法

## 3主3从redis集群配置

### 启动redis
```bash
docker run -d --name redis-node-1 --net host --privileged=true -v /data/redis/share/redis-node-1:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6381

docker run -d --name redis-node-2 --net host --privileged=true -v /data/redis/share/redis-node-2:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6382

docker run -d --name redis-node-3 --net host --privileged=true -v /data/redis/share/redis-node-3:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6383

docker run -d --name redis-node-4 --net host --privileged=true -v /data/redis/share/redis-node-4:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6384

docker run -d --name redis-node-5 --net host --privileged=true -v /data/redis/share/redis-node-5:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6385

docker run -d --name redis-node-6 --net host --privileged=true -v /data/redis/share/redis-node-6:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6386
```

### 构建主从关系
```bash
# 进入docker容器
docker exec -it redis-node-1 bash

# 执行命令 (--cluster-replicas 1 为每个master创建一个slave节点)
redis-cli --cluster create 192.168.43.205:6381 192.168.43.205:6382 192.168.43.205:6383 192.168.43.205:6384 192.168.43.205:6385 192.168.43.205:6386 --cluster-replicas 1
```

### 查看集群状态
```bash
# 集群状态
cluster info

# 集群节点
cluster nodes
```


## 主从容错切换迁移

### 数据读写存储

```bash
# 进入到6381节点
docker exec -it redis-node-1 bash

# 加入-c参数说明以集群方式连接(优化路由)
redis-cli -p 6381 -c
```

### 查看集群信息
```bash
redis-cli --cluster check 192.168.43.205:6381
```

### 主从切换

```bash
当主节点挂掉之后,从节点会自动成为主节点

但是将主节点恢复正常之后,从节点仍然是主节点

如果需要将从节点恢复至从节点,则需要手动将从节点重启
```

## 主从扩容

架构图

![redis_02](/img/in-post/2022-06-25/redis_02.png)

### 增加两台redis

```bash
docker run -d --name redis-node-7 --net host --privileged=true -v /data/redis/share/redis-node-7:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6387

docker run -d --name redis-node-8 --net host --privileged=true -v /data/redis/share/redis-node-8:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6388
```


### 将新增master节点加入原集群
```bash
# 进入node7
docker exec -it redis-node-7 bash

# 加入原集群
redis-cli --cluster add-node 192.168.43.205:6387: 192.168.43.205:6381
```

### 重新分配槽号
```bash
redis-cli --cluster reshard 192.168.43.205:6381
```

### 检查集群情况
```bash
redis-cli --cluster check 192.168.43.205:6381
```

### 为主节点6387分配从节点6388
```bash
redis-cli --cluster add-node 192.168.43.205:6388 192.168.43.205:6387 --cluster-slave --cluster-master-id master节点的ID
```

## 主从缩容

删除6387和6388 恢复之前的三主三从模式

### 删除6388从节点
```bash
# 获取6388从节点ID
redis-cli --cluster check 192.168.43.205:6381

# 删除6388从节点
redis-cli --cluster del-node 192.168.43.205:6388 0c4824ab3ae11a430e1be746e578eb48497117da
```

### 清除6387的槽号
```bash
redis-cli --cluster reshard 192.168.43.205:6381

redis-cli --cluster check 192.168.43.205:6381
```

![redis_03](/img/in-post/2022-06-25/redis_03.png)

### 删除6387节点
```bash
redis-cli --cluster del-node 192.168.43.205:6367 6387ID号

redis-cli --cluster check 192.168.43.205:6381
```
