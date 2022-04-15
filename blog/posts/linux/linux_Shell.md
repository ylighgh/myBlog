---
layout: Post
title: Linux|Shell 
subtitle: Linux|Shell 
date: 2022-04-15
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-15/header-0.jpg
permalinkPattern: /post/linux/:year/:month/:day/:slug/
tags:
- Linux
--- 

## Shell简介

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁

**查看当前系统有哪些解释器**

```shell
╰─$ cat /etc/shells
# Pathnames of valid login shells.
# See shells(5) for details.

/bin/sh
/bin/bash
/usr/bin/git-shell
/bin/zsh
/usr/bin/zsh
```

## Shell使用

### 定义和删除

```shell
# 定义一个变量
variable_name=2

# 删除变量
unset variable_name
```

### 参数传递

|  参数处理   | 说明  |
|  ----  | ----  |
| $n  | $0 : 脚本名称(包含执行的路径) <br> $1 : 脚本的一个参数 |
| $#  | 参数的个数 |
| $*  | 以一个单字符串显示所有向脚本传递的参数 |
| $@  | 基本的软件使与$*相同，但是使用时加引号，并在引号中返回每个参数用手册目录 |
| $?  | 显示最后命令的退出状态 <br> 0表示没有错误，其他任何值表明有错误。 |

**$* 与 $@ 区别：**

- 相同点：都是引用所有参数。
- 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）

```shell
# 向脚本追加内容
cat <<EOF> test.sh
echo "-- \$* 演示 ---"
for i in "$*"; do
    echo $i
done

echo "-- \$@ 演示 ---"
for i in "$@"; do
    echo $i
done

# 添加权限
chmod +x test.sh

# 执行结果
./test.sh
-- $* 演示 ---
1 2 3
-- $@ 演示 ---
1
2
3
```


### 运算符

#### 关系运算符

|  运算符   | 说明  |
|  ----  | ----  |
| -eq	 | 检测两个数是否相等，相等返回 true |
| -ne	 | 检测两个数是否不相等，不相等返回 true |
| -eq	 | 检测左边的数是否大于右边的，如果是，则返回 true |
| -eq	 | 检测左边的数是否小于右边的，如果是，则返回 true |
| -eq	 | 检测左边的数是否大于等于右边的，如果是，则返回 true |
| -eq	 | 检测左边的数是否小于等于右边的，如果是，则返回 true |

### 流程控制

#### if

**if**
```shell
if condition
then
    command1 
    command2
    ...
    commandN 
fi
```
**if   else**
```shell
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi
```

**if elif else**
```shell
if condition
then
    command1 
elif
then
    command2
else
    command
fi
```

#### for

```shell
# 增强型for循环
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

# 简单for循环
for init; condition; increment
do
    command1
    command2
    ...
    commandN
done
```

#### while

```shell
while condition
do
    command
done
```

#### case
`;;`类似于`break`
```shell
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2)
    command1
    command2
    ...
    commandN
    ;;
*) # 默认情况
    command1
    command2
    ;;
esac
```


## 函数
```shell
[ function ] funname [()]

{

    action;

    [return int;]

}

1、可以带function fun() 定义，也可以直接fun() 定义,不带任何参数。

2、参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return后跟数值n(0-255
```

## 输入输出重定向

输出重定向:`command1 > file1`

输入重定向:`command1 < file1`

**/dev/null 文件**

如果希望执行某个命令，但又不希望在屏幕上显示输出结果

那么可以将输出重定向到 /dev/null：`command > /dev/null`

如果希望屏蔽 stdout 和 stderr，可以这样写:`command > /dev/null 2>&1`

## 其他注意事项

**单引号和双引号**

单引号 : 被单引号引起来的内容会原样输出

双引号 : 被双引号引起来的内容可以输出变量