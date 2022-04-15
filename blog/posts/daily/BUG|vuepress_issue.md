---
layout: Post
title: BUG|vue项目部署到nginx无法加载静态资源
subtitle: The resource path cannot be found when the vue project is deployed to the nginx server
date: 2022-04-15
author: Sanshi Yin
useHeaderImage: true
headerImage: /img/in-post/2022-04-15/header-4.jpg
permalinkPattern: /post/daily/:year/:month/:day/:slug/
tags:
- 摸鱼
---

## BUG

将vuepress项目打包上传到nginx服务器上,静态资源加载不出来,所有资源都带上了根路径

```shell
Request URL: http://xxxx:6080/blog/assets/app.8e97bc7b.js
Request Method: GET
Status Code: 200 OK
Remote Address: xxxx:6080
Referrer Policy: strict-origin-when-cross-origin

```
![vue_issue](/img/in-post/2022-04-15/vue_issue.png)
## 原因

vuepress项目设置了根路径,build之后所有资源都会带上根路径
```vue
module.exports = {
  base:"/blog/", //设置站点根路径
  title: "yss",
  description: "Just for code.",
```
## 解决办法
修改nginx配置文件,反向代理/blog/路径至根路径,修改后的配置文件如下:

```shell
server {
    listen       6080;
    root /data/web/blog;
    server_name  blog.com;
    error_log /var/log/nginx/blog.com_error.log;
    access_log /var/log/nginx/blog.com_access.log;

    location / {
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /blog/{   //反向代理
        proxy_pass http://127.0.0.1:6080/;
    }
}
```
