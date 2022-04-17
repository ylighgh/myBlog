---
layout: Post
title: Python|装饰器 
subtitle:  Python|Decorators        
date: 2022-04-17
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-17/header-0.jpg
permalinkPattern: /post/python/:year/:month/:day/:slug/
tags:
- Python
---

## 通用装饰器
```py
def Decorators(fn):
    def inner(*args,**kwargs):
        """调用之前""""
        ret = fn(*args,**kwargs) # 处理目标函数的返回值
        """调用之后""""
        return fn
    return inner
```     

调用 : `@Decorators`

## 高阶装饰器
todo...

## *和**的区别

- 一个星（*）：表示接收的参数作为元组来处理

- 两个星（**）：表示接收的参数作为字典来处理


## 闭包

- 函数名的本质就是一个变量,可以被赋值,可以给别的变量赋值,做参数传递,做返回值
- 闭包:内层函数对外层函数变量的使用
    1. 让一个变量能够常驻内存
    2. 保护变量不被修改

```py
def func():
    a = 10
    def inner():
        print(a)
    return inner

fn = func()
```

*调用结果*
```shell
10
```
