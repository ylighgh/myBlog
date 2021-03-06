---
layout: Post
title: 线性表|顺序表(图书管理系统) 
subtitle: Linear list | Sequence Table (Library Management System)
date: 2022-04-09
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-09/header-0.jpg
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

#define InitSize 10

typedef struct book
{
    char book_no[10];
    char book_name[10];
    double book_price;
} BOOK;

typedef struct Seq
{
    BOOK *BK;
    int length;
} Sq;


int menuSelect(); //选择菜单
void InitList(Sq &L); //初始化顺序表
void PrintList(Sq L); //打印循序表
void InsertValue(Sq &L); //插入记录
void PrintOneValue(Sq L, int i); //打印一条指定记录
int GetElemByNo(Sq L, char *book_no); //获取一条记录的索引值
void SearchByNo(Sq L); //查找一条记录
void DeleteElemByNo(Sq &L); //删除一条记录
void ModifyElemByNo(Sq &L); //修改一条记录
void DestroyList(Sq &L); //销毁顺序标


int main()
{
    //顺序表初始化
    Sq L;
    InitList(L);

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
            DeleteElemByNo(L);
            break;
        case 3: //修改图书记录
            ModifyElemByNo(L);
            break;
        case 4: //插入图书记录
            InsertValue(L);
            break;
        case 5: //退出系统
            DestroyList(L);
            break;
        }
    }

    return 0;
}

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

void InitList(Sq &L)
{
    L.BK = (BOOK *)malloc(sizeof(BOOK) * InitSize);
    L.length = 0;
}

void InsertValue(Sq &L)
{
    system("clear");
    while (true)
    {
        printf("请输入图书信息:(编号 名称 价格)\n");
        setbuf(stdin, NULL); //清空缓冲区
        scanf("%s %s %lf", L.BK[L.length].book_no, L.BK[L.length].book_name, &(L.BK[L.length].book_price));
        L.length++;
        printf("是否继续插入图书信息(Y|N)\n");
        setbuf(stdin, NULL);
        int choice = getchar();
        if (choice == 'N' || choice == 'n')
        {
            break;
        }
    }
}

void PrintList(Sq L)
{
    system("clear");
    printf("图书编号\t图书名称\t图书价格\n");
    for (int i = 0; i < L.length; i++)
    {
        printf("%s\t\t%s\t\t%.2lf\n", L.BK[i].book_no, L.BK[i].book_name, L.BK[i].book_price);
    }
    getchar();
}

void PrintOneValue(Sq L, int i)
{
    printf("图书编号\t图书名称\t图书价格\n");
    printf("%s\t\t%s\t\t%.2lf\n", L.BK[i].book_no, L.BK[i].book_name, L.BK[i].book_price);
}

int GetElemByNo(Sq L, char *no)
{
    for (int i = 0; i < L.length; i++)
    {
        if (strcmp(L.BK[i].book_no, no) == 0)
        {
            return i;
        }
    }
    return -1;
}

void SearchByNo(Sq L)
{
    char no[20]; //保存待查找图书编号
    int i;       //保存查找到该结点的序号
                 // system("clear");
    printf("*************************** 图书编号查找 ***************************\n");
    printf("                                                                  \n");
    printf("请输入查找的图书编号：");
    scanf("%s", no);         //输入待查找学号
    getchar();               //消除回车键影响
    i = GetElemByNo(L, no);  //调用GetElemByNo函数，得到一个整数
    if (i != -1)             //如果整数i值不等于-1，说明没找到
        PrintOneValue(L, i); //找到，调用显示函数显示记录
    else
        printf("没有图书编号为%s的图书！\n", no);
    getchar();
}

void DeleteElemByNo(Sq &L)
{
    char no[20]; //保存待查找图书编号
    int i;       //保存查找到该结点的序号
                 // system("clear");
    printf("*************************** 图书编号删除 ***************************\n");
    printf("                                                                  \n");
    printf("请输入需要删除的图书编号：");
    scanf("%s", no);        //输入待查找学号
    getchar();              //消除回车键影响
    i = GetElemByNo(L, no); //调用GetElemByNo函数，得到一个整数
    if (i != -1)
    { //如果整数i值不等于-1，说明没找到
        for (int j = i; j < L.length; j++)
        {
            L.BK[j] = L.BK[j + 1]; //元素前移
        }
        L.length--; //长度减1
        printf("成功删除编号为%s的书籍", no);
    }
    else
        printf("没有图书编号为%s的图书！\n", no);
    getchar();
}

void DestroyList(Sq &L)
{
    if (L.BK)
    {                // 检查是否为空
        free(L.BK);  // 删除分配的内存
        L.BK = NULL; // 基地址设为空
    }
    L.length = 0; // 表长设为0
    printf("Sq顺序表已经销毁\n");
    exit(0);
}

void ModifyElemByNo(Sq &L)
{
    char no[20]; //保存待查找图书编号
    int i;       //保存查找到该结点的序号
                 // system("clear");
    printf("*************************** 图书编号修改 ***************************\n");
    printf("                                                                  \n");
    printf("请输入需要修改的图书编号：");
    scanf("%s", no);        //输入待修改学号
    getchar();              //消除回车键影响
    i = GetElemByNo(L, no); //调用GetElemByNo函数，得到一个整数
    if (i != -1)
    { //如果整数i值不等于-1，说明没找到
        printf("======修改前======\n");
        PrintOneValue(L, i); //找到，调用显示函数显示记录
        printf("请输入编号:");
        setbuf(stdin, NULL);
        scanf("%s", L.BK[i].book_no);
        printf("请输入名称:");
        setbuf(stdin, NULL);
        scanf("%s", L.BK[i].book_name);
        printf("请输入价格:");
        setbuf(stdin, NULL);
        scanf("%lf", &(L.BK[i].book_price));
        printf("======修改后======\n");
        PrintOneValue(L, i); //
        getchar();
    }
    else
        printf("没有图书编号为%s的图书！\n", no);
    getchar();
}
```

## 注意事项
1. 如果需要移植到Windows上执行,部分代码可能无法正常运行
```cpp
清屏命令:
Linux: System("clear")
Windows: System("cls") 
```
