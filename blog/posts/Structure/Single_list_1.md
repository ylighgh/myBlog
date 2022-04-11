---
layout: Post
title: 线性表|单链表(图书管理系统) 
subtitle: Linear list | single linked list (library management system)
date: 2022-04-11
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-11/header-1.jpg
permalinkPattern: /post/Structure/:year/:month/:day/:slug/
tags:
- Structure
---

## 运行环境

OS:`Arch Linux x86_64`

Language:`C++`

Compiler Version:`gcc Version 11.2.0 (GCC)`

## 代码
```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct book
{
    char book_no[10];
    char book_name[10];
    double book_price;
} BOOK;

typedef struct LNode
{
    BOOK BK;
    struct LNode *next;
} LNode, *LinkList;

/************函数*****************/
bool InitList(LinkList &L);            //初始化单链表
void DestroyList(LinkList &L);         //销毁单链表
void PrintList(LinkList L);            //打印链表数据
void List_HeadInsert(LinkList &L);     //头插法建立单链表
int menuSelect();                      //选择菜单
void SearchByNo(LinkList L);           //根据图书编号查找图书信息
void PrintOneValue(LNode *p);          //打印指定记录
LNode *GetElem(LinkList L, char *no);  //根据图书编号获取节点
void DeleteByNo(LinkList L);           //根据图书编号删除图书信息
bool DeleteNode(LinkList L, char *no); //删除指定节点
void ModifyByNo(LinkList &L);          //根据图书编号删除图书信息
/***********************************/

int main()
{
    LinkList L;
    if (InitList(L))
    {
        while (true)
        {
            switch (menuSelect())
            {
            case 0: //查看图书信息
                PrintList(L);
                break;
            case 1: //查找图书记录
                SearchByNo(L);
                break;
            case 2: //删除图书记录
                DeleteByNo(L);
                break;
            case 3: //修改图书记录
                ModifyByNo(L);
                break;
            case 4: //插入图书记录
                List_HeadInsert(L);
                break;
            case 5: //退出系统
                DestroyList(L);
                break;
            }
        }
    }
    else
    {
        printf("内存不足,初始化链表失败!\n");
        return 0;
    }
}

//初始化单链表
bool InitList(LinkList &L)
{
    L = (LNode *)malloc(sizeof(LNode)); //分配一个头节点
    if (L == NULL)
    { //内存不足,分配失败
        return false;
    }
    else
    {
        L->next = NULL; //头节点之后暂时没有节点
        return true;
    }
}

//销毁
void DestroyList(LinkList &L)
{
    LNode *p; //用于指向要销毁的结点
    while (L)
    {                //循环条件，L 非空
        p = L;       //将 头指针L 指向的地址赋值给 指针P，使 指针P 指向头结点
        L = L->next; //让 头指针L 指向下一个结点
        free(p);     //释放 指针P 指向的结点
    }
    printf("LinkList已经销毁\n");
    exit(0);
}

//选择菜单
int menuSelect()
{
    system("clear");
    int c;
    printf("****************************** 主菜单 ****************************\n");
    printf("|                                                                  |\n");
    printf("|		           0. 查看图书信息                         |\n");
    printf("|		           1. 查找图书记录                         |\n");
    printf("|		           2. 删除图书记录                         |\n");
    printf("|		           3. 修改图书记录                         |\n");
    printf("|		           4. 插入图书记录                         |\n");
    printf("|		           5. 退出程序                             |\n");
    printf("|                                                                  |\n");
    printf("******************************************************************\n\n");
    do
    {
        printf("\n	输入您的菜单选项编号（0-5):"); //提示输入选项
        scanf("%d", &c);                           //输入选择项											//将输入的字符串转化为整型数
        getchar();                                 //消除回车键
        if (c < 0 || c > 5)
            printf("\t您输入的序号有误，请重新输入！！！");
    } while (c < 0 || c > 5); //选项不在0~5之间重输
    return c;                 //返回选择项，主程序根据该数调用相应的函数
}

//打印链表数据
void PrintList(LinkList L)
{
    system("clear");
    printf("图书编号\t图书名称\t图书价格\n");
    //创建移动节点
    LNode *pMove = L->next;
    //打印节点(当移动节点不为空时)
    while (pMove)
    {
        printf("%s\t\t%s\t\t%.2lf\n", pMove->BK.book_no, pMove->BK.book_name, pMove->BK.book_price);
        pMove = pMove->next;
    }
    getchar();
}

//头插法建立单链表
void List_HeadInsert(LinkList &L)
{
    LNode *newNode;
    while (true)
    {
        newNode = (LNode *)malloc(sizeof(LNode));
        printf("请输入图书信息:(编号 名称 价格):");
        setbuf(stdin, NULL); //清空缓冲区
        scanf("%s %s %lf", newNode->BK.book_no, newNode->BK.book_name, &(newNode->BK.book_price));
        newNode->next = L->next; //新节点的指针域指向NULL
        L->next = newNode;       //头节点的指针域指向新节点
        printf("是否继续插入图书信息(Y|N):");
        setbuf(stdin, NULL);
        int choice = getchar();
        if (choice == 'N' || choice == 'n')
        {
            break;
        }
    }
}

//根据图书编号获取节点
LNode *GetElem(LinkList L, char *no)
{
    LNode *p = L->next; //从第一个节点开始查找数据域为e的节点
    while (p != NULL && strcmp(p->BK.book_no, no) != 0)
    {
        p = p->next;
    }
    return p == NULL ? NULL : p; //三目运算符 条件为真返回NULL,假为p节点
}

//打印指定记录
void PrintOneValue(LNode *p)
{
    printf("图书编号\t图书名称\t图书价格\n");
    printf("%s\t\t%s\t\t%.2lf\n", p->BK.book_no, p->BK.book_name, p->BK.book_price);
}

//根据图书编号查找图书信息
void SearchByNo(LinkList L)
{
    char no[20]; //保存待查找图书编号
    int i;       //保存查找到该结点的序号
                 // system("clear");
    printf("*************************** 图书编号查找 ***************************\n");
    printf("                                                                  \n");
    printf("请输入查找的图书编号：");
    scanf("%s", no); //输入待查找学号
    getchar();       //消除回车键影响
    LNode *p = (LNode *)malloc(sizeof(LNode));
    p = GetElem(L, no);
    if (p != NULL)
    {
        PrintOneValue(p);
    }
    else
    {
        printf("没有图书编号为%s的图书！\n", no);
    }
    getchar();
}

//删除指定节点
bool DeleteNode(LinkList L, char *no)
{
    // 设置第一个节点的位置
    LNode *posNodeFront = L;
    LNode *posNode = L->next;

    // 判断是否为空链表
    if (posNode == NULL)
    {
        return false;
    }
    else
    {
        while (strcmp(posNode->BK.book_no, no) != 0)
        {

            // 判断是否为空链表
            posNodeFront = posNode;
            posNode = posNodeFront->next;

            if (posNode == NULL)
            {
                return false;
            }
        }

        //将删除节点的前一节点的指针域指向删除节点的指针域
        posNodeFront->next = posNode->next;

        //释放待删除节点的内存(删除节点)
        free(posNode);
        return true;
    }
}

//根据图书编号删除图书信息
void DeleteByNo(LinkList L)
{
    char no[20]; //保存待查找图书编号
    int i;       //保存查找到该结点的序号
                 // system("clear");
    printf("*************************** 图书编号删除 ***************************\n");
    printf("                                                                  \n");
    printf("请输入需要删除的图书编号：");
    scanf("%s", no); //输入待查找学号
    getchar();       //消除回车键影响
    if (DeleteNode(L, no))
    {
        printf("成功删除图书编号为%s的图书！\n", no);
    }
    else
    {
        printf("没有图书编号为%s的图书！\n", no);
    }
    getchar();
}

//修改
void ModifyByNo(LinkList &L)
{
    char no[20]; //保存待查找图书编号
    int i;       //保存查找到该结点的序号
                 // system("clear");
    printf("*************************** 图书编号修改 ***************************\n");
    printf("                                                                  \n");
    printf("请输入需要修改的图书编号：");
    scanf("%s", no); //输入待修改学号
    getchar();       //消除回车键影响
    LNode *p = (LNode *)malloc(sizeof(LNode));
    p = GetElem(L, no);
    if (p != NULL)
    {
        //如果整数i值不等于-1，说明没找到
        printf("======修改前======\n");
        PrintOneValue(p); //找到，调用显示函数显示记录
        printf("请输入编号:");
        setbuf(stdin, NULL);
        scanf("%s", p->BK.book_no);
        printf("请输入名称:");
        setbuf(stdin, NULL);
        scanf("%s", p->BK.book_name);
        printf("请输入价格:");
        setbuf(stdin, NULL);
        scanf("%lf", &(p->BK.book_price));
        printf("======修改后======\n");
        PrintOneValue(p); //
        getchar();
    }
    else
        printf("没有图书编号为%s的图书！\n", no);
    getchar();
}
```