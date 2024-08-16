## 概述

分为前端（[chat-frontend](https://github.com/mzlin2020/caht-room/tree/main/chat-frontend)）和后端（[chat-backend](https://github.com/mzlin2020/caht-room/tree/main/chat-backend)），两个项目。重点在于后端项目的实现，前端较为粗略

功能要点

| 模块         | 功能                                              |
| ------------ | ------------------------------------------------- |
| 账号         | 登录、注册、找回密码、修改用户信息、头像上传      |
| 通讯录       | 好友（添加、删除、列表） 群聊（添加、删除、列表） |
| 聊天         | 单聊、群聊（发送文字、表情、图片、文件）          |
| 收藏         | 添加、删除、列表                                  |
| 好友申请通知 | 列表、通过申请、拒绝申请                          |



## 如何运行项目

**前端项目**

1、下载源码、安装依赖`pnpm install`

2、运行项目`pnpm run dev`



**后端项目**

确保本地已下载mysql、redis、minio（也可通过docker启动）

由于项目使用了邮箱注册的方式，所以需要开启 smtp、imap 等服务。示例：https://service.mail.qq.com/detail/0/428

1、下载源码，安装依赖`pnpm install`。

2、新建数据库`chat-root`，并执行`npx prisma migrate dev --name init`初始化数据库表格

3、将邮箱即授权码填写至项目`email`模块的service中

4、项目的文件上传功能用到了minio，如果已开启了该服务，生成临时签名并填写至项目`minio`的module中（可选）

5、运行项目`pnpm run start`



