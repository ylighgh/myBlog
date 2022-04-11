---
layout: Post
title: 线性表|单链表基础操作 
subtitle: Basic operations of singly linked list
date: 2022-04-11
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-11/header-3.jpg
permalinkPattern: /post/Structure/:year/:month/:day/:slug/
tags:
- Structure
---

## 单链表

### 简介

链表是一种常见的基础数据结构，结构体指针在这里得到了充分的利用。链表可以动态的进行存储分配，也就是说，链表是一个功能极为强大的数组，他可以在节点中定义多种数据类型，还可以根据需要随意增添，删除，插入节点。链表都有一个`头指针`，一般以`headNode`来表示，存放的是一个地址。链表中的节点分为两类，`头结点`和`一般节点`，头结点是没有数据域的。链表中每个节点都分为两部分，一个`数据域`，一个是`指针域`

```cpp
typedef struct LNode
{
    ElemType data; //数据域
    struct LNode *next; //指针域
}LNode,*LinkList;
```

::: tip 注意

`LinkList` 等价于 `LNode *`

强调这是一个节点 --使用`LNode *`

强调这是一个链表 --使用`LinkList`

:::

## 初始化与销毁

### 初始化

**带头节点的单链表初始化**

```cpp
bool InitList(LinkList &L){
    L = (LNode *)malloc(sizeof(LNode)); //分配一个头节点
    if(L==NULL){ //内存不足,分配失败
        return false;
        
    }else{
        L->next=NULL; //头节点之后暂时没有节点
        retrun true;
    }
}
```
### 单链表的建立

#### 头插法
```cpp
LinkList List_HeadInsert(LinkList &L){
    LNode *s;
    int x;
    scanf("%d",&x);
    while(x!=9999){
        s=(LNode *)malloc(sizeof(LNode));
        s->data = x;
        s->next = L->next;
        L->next = s;
        scanf("%d",&x);
    }
    return L;
}
```

#### 尾插法
```cpp
Todo...
```
### 销毁
```cpp
Status DestroyList(LinkList &L){
    Lnode *p; //用于指向要销毁的结点
    while(L){ //循环条件，L 非空
        p = L;//将 头指针L 指向的地址赋值给 指针P，使 指针P 指向头结点
        L = L->next;//让 头指针L 指向下一个结点
        free(p); //释放 指针P 指向的结点
    }
    return OK; //循环结束，返回OK
}
```
## 插入与删除

### 插入

#### 按位序插入

**带头节点的按位序插入操作**

`LinkInsert(&L,i,e)`:插入操作.在表L的第i个位置上插入指定元素e

```cpp
bool LinkInsert(&L,i,e){
    if(i<1){ //判断i值是否合法
        return false;
    }
    LNode *p;  //指针p指向当前扫描到的节点
    int j = 0; //当前p扫描到的第几个节点
    p = L; //L指向头节点,头节点是第0个节点(不含数据)
    while(p != NULL&& j < i-1){ //循环找到第i-1个节点
        p = p->next;
        j++;
    }
    if(p==NULL){ //i值不合法
        retrun false;
    }
    LNode * s = (LNode *)malloc(sizeof(LNode));
    s->data = e;
    s->next = p->next;
    p->next = s; //将节点s链接到p后
    return true;
}
```

#### 指定节点后插

`InsertNextNode(LNode *p,ElemType e)`后插操作,在p节点之后插入元素e

```cpp
bool InsertNextNode(LNode *p,ElemType e){
    if(p==NULL){
        return false;
    }
    LNode *s = (LNode *)malloc(sizeof(LNode));
    if(s==NULL){ //内存分配失败
        return false;
    }
    s->data = e; //用节点s保存数据元素e
    s->next = p->next;
    p->next = s; //将节点s链接到p之后
    return true;
}
```

#### 指定节点前插
`InsertPriorNode(LNode *p,ElemType e)`后插操作,在p节点之后插入元素e

```cpp
bool InsertPriorNode(LNode *p,ElemType e){
    if(p==NULL){
        return false;
    }
    LNode *s = (LNode *)malloc(sizeof(LNode));
    if(s==NULL){ //内存分配失败
        return false;
    }
    //偷天换日
    s->next = p->next;
    p->next = s; //新节点s连到p之后
    s->data = p->data; //将p中元素复制到p
    p->data = e; //将p中元素覆盖为e
    return true;
}
```
**偷天换日**

1. 将p节点指针域指向的下一节点的地址赋给s节点
2. 将p节点指针域指向s
3. 将p节点中数据域的值赋给s节点
4. 将e赋值给p节点

### 删除

#### 按位序删除

`LinkDelete(&L,i,&e)`:插入操作.在表L的第i个位置上插入指定元素e
```cpp
bool LinkInsert(&L,i,&e){
    if(i<1){ //判断i值是否合法
        return false;
    }
    LNode *p;  //指针p指向当前扫描到的节点
    int j = 0; //当前p扫描到的第几个节点
    p = L; //L指向头节点,头节点是第0个节点(不含数据)
    while(p != NULL&& j < i-1){ //循环找到第i-1个节点
        p = p->next;
        j++;
    }
    if(p == NULL){ //i值不合法
        retrun false;
    }
    if(p->next == NULL){ //第i-1个节点之后已经无其他节点
        retrun false;
    }
    LNode *q = p->next; //令q指向被删除的节点
    e = q->data; //用e返回元素的值
    p->next = q->next; //将*q节点从链中断开
    free(q); //释放节点的存储空间
    return true;
}
```

#### 指定节点删除
```cpp
bool DeleteNode(LinkList L,ElemeType data){
    LNode *posNodeFront = L;
    LNode *posNode = L->next;
    if(posNode == NULL){
        return false;
    }else{
        while(posNode->data!=data){
            posNodeFront = posNode;
            posNode = posNodeFront->next;
            if(posNode==NULL){
                return false;
            }
        }
        posNodeFront->next=posNode->next;
        free(posNode);
        return true;
    }
}
```

## 查找

### 按位查找
```cpp
LNode *GetElem(LinkList L,int i){
    if(i<0){
        return NULL;
    }
    LNode *p; //指针p指向当前扫描到的节点
    int j = 0; //当前p指向的第几个节点
    p = L; //L指向头节点,头节点是第0个节点(不存数据)
    while(p!=NULL&&j<i){ //循环找到第i个节点
        p = p->next;
        j++;
    }
    return p;
}
```
### 按值查找
按值查找,找到数据域==e的节点
```cpp
LNode *GetElem(LinkList L,ElemType e){
    LNode *p = L->next; //从第一个节点开始查找数据域为e的节点
    while(p != NULL && p->data !=e){
        p = p->next;
    }
    return p;
}
```
## 其他操作

### 求表长
```cpp
int Length(LinkList L){
    int len = 0;
    LNode *p = L;
    while(p->next != NULL){
        p = p->next;
        len++;
    }
    return len;
}
```
### 输出操作
```cpp
void printList(LinkList L){
    //创建移动节点
    LNode *pMove = L->next;
    
    //打印节点(当移动节点不为空时)
    while(pMove){
        printf("%d\t",pMove->data);
        pMove = pMove->next;
    }
    printf("\n");
}
```
### 判空操作
```cpp
bool isEmpty(LinkList L)
{
    return (L->next==NULL);
}
```