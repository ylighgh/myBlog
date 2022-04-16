---
layout: Post
title: Python|文件操作 
subtitle: Python|Files operation
date: 2022-04-16
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-16/header-0.jpg
permalinkPattern: /post/python/:year/:month/:day/:slug/
tags:
- Python
---

## 修改文件

**Python文件修改**

1. 读取文件中的内容
2. 把要修改的文件写入一个副本文件
3. 将源文件删除(借助os模块)
4. 将副本文件重命名为源文件

```py
import os
with open("b.txt", mode="r", encoding="utf-8") as f1, \
        open("b_副本.txt", mode="w", encoding="utf-8") as f2:
    for line in f1:
        if "aaa" in line:
            line = line.replace("aaa", "bbb") # 将文件中aaa,修改为bbb
        f2.write(line)

os.remove("b.txt")
os.rename("b_副本.txt", "b.txt")
```


## 读取规则文件

```shell
序号  图书名称    图书价格
001  python     20.12
002  linux      12.12
003  java       14.12

实际输出:
[{'序号': '001', '图书名称': 'python', '图书价格': '20.12'}, 
{'序号': '002', '图书名称': 'linux', '图书价格': '12.12'}, 
{'序号': '003', '图书名称': 'java', '图书价格': '14.12'}]
```
```py
book_list = [] # 准备列表存储数据

with open("a.txt",mode="r",encoding="utf-8") as f:
    book_title = f.readline().strip() # 去掉左右空白部分
    book_title = book_title.split()   # 转换成字符串对象
    for book_data in f:
        book_data = book_data.strip() # 去掉左右空白部分
        book_data = book_data.split() # 转换成字符串对象
        dic = {}
        for i in range(len(book_title)): # 拿到索引
            dic[book_title[i]]=book_data[i]
        book_list.append(dic)
print(book_list)
``