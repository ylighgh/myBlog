---
layout: Post
title: 线性表|顺序表基础操作 
subtitle: Basic Operations of Sequence Tables
date: 2022-04-08
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-08/header-0.jpg
permalinkPattern: /post/Structure/:year/:month/:day/:slug/
tags:
- Structure
--- 
## 简介

顺序表存储数据时，会提前申请一整块足够大小的物理空间，然后将数据依次存储起来，存储时做到数据元素之间不留一丝缝隙

使用顺序表存储数据之前，除了要申请足够大小的物理空间之外，为了方便后期使用表中的数据，顺序表还需要实时记录以下 2 项数据：
1. 顺序表申请的存储容量；
2. 顺序表的长度，也就是表中存储数据元素的个数；

```cpp
#define INITSIZE 10 //对INITSIZE进行宏定义，表示顺序表申请空间的大小

typedef struct Seq
{
    int *data;//声明了一个名为data的长度不确定的数组，也叫“动态数组”
    int length;//记录当前顺序表的长度
    int MaxSize;//记录顺序表分配的存储容量
} SeqList;
```

## 初始化与销毁

### 初始化
```cpp
void InitList(SeqList &L){
    L.data = (int *)malloc(sizeof(int) * INITSIZE); //构造一个空的顺序表，动态申请存储空间
    L.length = 0;//空表的长度初始化为0
    L.MaxSize = INITSIZE;//空表的初始存储空间为INITSIZE
}
```
### 销毁
```cpp
void DestroyList(SeqList &L){
    if(L.data){ // 检查是否为空
        free(L.data); // 删除分配的内存
        L.data=NULL; // 基地址设为空
    }
    L.length=0; // 表长设为0
    L.MaxSize=0;// 表空间设为0
    printf("SeqList顺序表已经销毁\n");
}
```
## 插入与删除
### 插入
```cpp
bool listInsert(SeqList &L,int i ,int elem){
    if(i<1||i>L.length+1){ //判断i的范围是否有效
        return false;
    }
    if(L.length==MaxSize){ //存储空间已满
        return false;
    }
    for(int j = L.length;j>=i;j--){ //将第i个位置的元素及之后的元素后移
        L.data[j]=L.data[j-1];
    }

    L.data[i-1]=elem; //在i位置放入element
    L.length++;      //表长自增1个单位长度
    return true;
}
```

::: tip 注意
在插入操作中,插入的形参是我们人为指定的位置.

但是在程序中,下标是从0开始的,所以实际插入的位置应该为:`i-1`
:::


### 删除

#### 按值删除
```cpp
void DeleteNodeByValue(SeqList &L,int elem){
    int i,location = 0;
    //遍历整个结构体,找到待删除元素的坐标值
    for(i = 0;i<L.length;i++){
        if(L.data[i]==elem){
            location = i;
            break;
        }
    }
    if(i>=L.length){
        printf("未找到值为%d的元素\n"elem);
        return ;
    }

    //根据获取的坐标值,依次将元素往前移位
    for(int j=location;j<L.length;j++){
        L.data[j-1]=L.data[j];
    }

    L.length--; //表长自减1个单位长度
    printf("成功删除%d元素\n",elem);
}
```

#### 按位删除
```cpp
void DeleteNodeByPos(SeqList &L,int location){
    //判断location坐标是否越界
    if(location<1||location>L.length){
        printf("location值异常,请检查后再输入!\n");
        return ;
    }
    int elem = L.data[location-1]; //将待删除的元素值赋给elem
    for(int i = location;i<L.length;i++){ //将第location个位置的元素往前移位
        L.data[i-1]=L.data[i];
    }
    L.length--; //表长自减1个单位长度
    printf("成功删除第%d个位置上元素,值为:%d\n",location,elem);
}
```

## 查找与更改

### 查找

#### 按位查找
```cpp
int GetElemByPos(SeqList L,int i){
    return L.data[i-1]; //返回该位序的值
} 
```
#### 按值查找
```cpp
int GetElemByValue(SeqList L,int elem){
    for(int i = 0 ; i<L.length;i++){
        if(L.data[i]==elem){
            return i+1; //数组下标的元素值等于elem,返回其位序为i+1
        }
    }
    return 0;
} 
```
### 更改

#### 按位更改
```cpp
void ModifyElemByPos(SeqList &L,int i){
    int location = GetElemByPos(L,i);
    int value;
    scanf("%d",&value);
    L.data[location]=value;
}
```
#### 按值更改
```cpp
void ModifyElemByValue(SeqList &L,int elem){
    int location = GetElemByValue(L,elem);
    int value;
    scanf("%d",&value);
    L.data[location]=value;
}
```

## 其他操作

### 求表长
```cpp
int GetListLength(SeqList L){
    int count=0;
    for(int i = 0;i<L.length;i++){
        count++;
    }
    return count;
}
```
### 输出操作
```cpp
void PrintList(SeqList L)
{
    for (int i = 0; i < L.length; i++)
    {
        printf("data[%d]=%d\n", i, L.data[i]);
    }
}
```
### 判空操作
```cpp
bool isEmpty(SeqList L)
{
    return (L.length==0);
}
```
