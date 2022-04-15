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

## 查找
```py
startwith() # 判断字符串是否以xxx开头

endwith() # 判断字符串是否以xxx结尾

count() # 计算字符串中出现了多少个xxx

find() # 查找字符串,如果找到返回索引,找不到返回-1

index() # 查找字符串,如果找到返回索引,找不到报错
``` 

## 其他操作

### 转来转去

==字符串是不可变对象,任何操作对原字符串是不会有任何影响的==

 ```python
s = "i am yl"

print(s.capitalize()) # 输出:I am yl 首字母变成大写 

print(s.lower()) # 输出:i am yl 全部变成小写

print(s.upper()) # 输出:I AM YL 全部变成大写 #忽略大小写

print(s.swapcase()) #输出:I AM YL 大写变小写,小写变大写

print(s.title()) #输出I Am Yl 每个单词的首字母大些
 ```
### 切来切去

去掉字符串左右两端的空白(空格,\t,\n): `strip()`


替换字符:`replace()`
 ```python
s = "fuck"
print(s.replace("fuck", "f**k")) # 输出结果: f**k
 ```

 字符串切割:`split()`
 ```python
s = "a_b_c_d_e"
list = s.split("_")
print(list) # ['a', 'b', 'c', 'd', 'e']
 ```

列表组合:`join()`(把一个列表组合成一个字符串)

```py
s1 = "_l_".join(list) # 输出结果:a_l_b_l_c_l_d_l_e
```

### 字符串长度

`len()`


### 迭代

```py
for 变量 in 可迭代对象
    pass
```
`in`两种用法:
- 在for里面,是把每一个元素获取赋值到前面的变量
- 不在for,判断xxx是否出现在str中


## 结论
1. upper(),把字符串中所有的字母都变成大写,主要使用忽略大小写的时候

2. strip(),默认去掉左右两端的空白,包括(\n,\t,空格)

3. replace(),字符串替换

4. split(),字符串切割,得到字符串列表

5. join(),把列表重新组合成字符串

6. startwith,判断字符串是否以xxx开头

7. find(),查找xxx

8. count(),数数,查找xxx在字符串中出现的次数

9. isdigit(),判断该字符是否是数字组成

10. len(),字符串的长度