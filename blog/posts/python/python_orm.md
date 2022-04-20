---
layout: Post
title: Python|ORM模型映射 
subtitle: ORM model mapping 
date: 2022-04-20
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-20/header-0.jpg
permalinkPattern: /post/python/:year/:month/:day/:slug/
tags:
- Python
---

## ORM
`ORM（Object Ralational Mapping，对象关系映射）`用来把对象模型表示的对象映射到基于SQL的关系模型数据库结构中去。这样，我们在具体的操作实体对象的时候，就不需要再去和复杂的SQL语句打交道，只需简单的操作实体对象的属性和方法。ORM技术是在对象和关系之间提供了一条桥梁，前台的对象型数据和数据库中的关系型的数据通过这个桥梁来相互转化 

## 使用

### 安装
```shell
pip install flask_sqlalchemy
```

### 创建模型
```py
# 引用包
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI # 数据库配置
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app, use_native_unicode="utf8")

# 定义ORM模型
class User(db.Model):
    # 表名
    __tablename__ = 'article'
    # 字段名
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
```

## CRUD

### C(增加数据)
```python
# 创建对象
article = Article(title="钢铁是怎样炼成的", content="xxxx")
# 添加到session
db.session.add(article)
# 提交保存到数据库
db.session.commit()
# 关闭session
db.session.close()
```
### R(查询数据)
```python
# filter_by :返回类列表对象
article = Article.query.filter_by(id=1)[0]
```
### U(更新数据)
```python
article = Article.query.filter_by(id=2)[0]
article.content = 'yyy'
db.session.commit()
db.session.close()
```
### D(删除数据)
```python
Article.query.filter_by(id=1).delete()
db.session.commit()
db.session.close()
```

## ORM管理

**安装**

```shell
pip install flask_migrate
```

**使用**
```py
from flask_migrate import Migrate
migrate = Migrate(app, db)
```

**提交数据库**
```shell
# 初始化提交
flask db init 

# 提交到暂存区
flask db migrate -m 'comment'

# 提交到数据库
flask db upgrade 
```


## 数据库配置文件
一般将数据库存放在`config.py`中,随后在app.py中引用`from config import DB_URI`
```py
# 数据库的配置变量
HOSTNAME = 'aliyun'
PORT = '3306'
DATABASE = 'zl_flask'
USERNAME = 'root'
PASSWORD = 'xxxx'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
```