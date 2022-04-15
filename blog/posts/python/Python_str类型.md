---
layout: Post
title: Python|Str类型基本操作
subtitle: Basic operations of Str type
date: 2022-04-15
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-15/header-1.jpg
permalinkPattern: /post/python/:year/:month/:day/:slug/
tags:
- Python
---

## 索引和切片

索引即下标

```python
s = "abcdef"

print(s[0]) #输出 a

print(s[-1]) # 输出倒数第一个元素 即 f
```
**切片**

基本语法:`str[start:end:step]` ==顾头不顾尾== end的数据取不到

- start:起始位置
- end:结束位置
- step:步长值(步长为-1,表示从右往左)

```python
s = "abcdef"

print(s[1:3]) # 输出:bc 顾头不顾尾

print(s[3:]) # 输出:def 后面什么都不写,表示切到最后

print(s[:3]) # 输出:abc 前面什么都不写,表示从头开始切

print(s[:]) # 输出:abcdef 从头到尾

print(s[3:1]) # 输出: 默认情况下,切片是从左往右切

# 如果需要从右往左切,需要给出第三个参数(步长值)

print(s[4:1:-1]) # 输出 edc

print(s[1:5:2]) # 输出 bd
```

## 其他操作

### 大小写转换

==字符串是不可变对象,任何操作对原字符串是不会有任何影响的==

