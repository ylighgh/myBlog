---
layout: Post
title: 顺序栈|基本操作实现 
subtitle:  Sequence stack | Basic operation implementation
date: 2022-04-18
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-18/header-1.jpg
permalinkPattern: /post/Structure/:year/:month/:day/:slug/
tags:
- Structure
---

## 运行环境

OS:`Arch Linux x86_64`

Language:`C++`

Compiler Version:`gcc Version 11.2.0 (GCC)`


## 注意事项

- [Cpp标准输入输出流](https://www.runoob.com/cplusplus/cpp-basic-input-output.html)
- [Cpp中的New和Delete](https://www.runoob.com/cplusplus/cpp-dynamic-memory.html)
- *,++,--的优先级(==同级,自右向左运算==)

::: tip 注意

e = *--S.top;  ----栈顶指针减1,将栈顶元素赋值给e

*S.top++ = e;  ----先将元素e压入栈顶,然后栈顶指针才加1
:::

## 代码

```cpp
#include <iostream>
#include <stdlib.h>
using namespace std;

typedef int Status;    //定义函数执行状态
int OK = 1, ERROR = 0; //定义操作状态 成功:1 失败:0

//定义顺序栈存储结构
#define MAXSIZE 100
typedef struct stock
{
    int *base;     //栈底指针
    int *top;      //栈顶指针
    int stacksize; //栈的大小
} SqStack;

/************funciton*********/
Status InitStack(SqStack &S);   //初始化栈
Status DestoryStack(SqStack S); //销毁栈
Status Push(SqStack &S, int e); //入栈
Status Pop(SqStack &S, int &e); //出栈
void PrintStock(SqStack S);     //打印栈元素
void GetTop(SqStack S);         //取栈顶元素
/************funciton*********/

int main(int argc, char const *argv[])
{
    //构建一个空栈
    SqStack S;

    //初始化栈
    if (InitStack(S))
    {
        cout << "初始化栈成功" << endl;

        //入栈操作
        Push(S, 1);
        Push(S, 2);
        Push(S, 3);

        //打印栈元素
        cout << "栈内元素为:" << endl;
        PrintStock(S);

        //获取栈顶元素
        GetTop(S);

        //出栈操作
        int e;
        Pop(S, e);
        cout << "出栈元素为:";
        cout << e << endl;

        //打印栈元素
        cout << "栈内剩余元素为:" << endl;
        PrintStock(S);

        //销毁栈
        DestoryStack(S);
    }
    else
    {
        cout << "初始化栈失败,退出程序" << endl;
        exit(0);
    }

    return 0;
}

//初始化栈
Status InitStack(SqStack &S)
{
    //构造一个空栈S
    S.base = new int[MAXSIZE];
    if (!S.base) 
    {
        return ERROR;
    }
    else
    {
        S.top = S.base;
        S.stacksize = MAXSIZE;
        return OK;
    }
}

//销毁栈
Status DestoryStack(SqStack S)
{
    delete[] S.base; //释放栈顶指针内存
    S.top = S.base = NULL; //栈顶指针和栈底指针至为NULL
    S.stacksize = 0; //栈长度至为0
    return OK;
}

//入栈操作
Status Push(SqStack &S, int e)
{
    if (S.top - S.base == S.stacksize)
    {
        return ERROR;
    }
    else
    {
        *S.top++ = e; //将元素e压入栈顶,栈顶指针加1 
        return OK;
    }
}

//出栈
Status Pop(SqStack &S, int &e)
{
    if (S.top - S.base == S.stacksize)
    {
        return ERROR;
    }
    else
    {
        e = *--S.top; //栈顶指针减1,将栈顶元素赋值给e
        return OK;
    }
}

//遍历栈元素
void PrintStock(SqStack S)
{
    for (int *i = S.base; i < S.top; i++) //定义一个指针i去指向栈底指针,依次自下至上遍历所有元素
    {
        cout << *i << endl;
    }
}

//取栈顶元素
void GetTop(SqStack S)
{
    cout << "栈顶元素为:" << *--S.top << endl; //获取栈顶元素
}
```

## 输出结果
```shell
╭─ylighgh@ylighgh ~/workspace/cpp 
╰─$ ./Stack 
初始化栈成功
栈内元素为:
1
2
3
栈顶元素为:3
出栈元素为:3
栈内剩余元素为:
1
2
```