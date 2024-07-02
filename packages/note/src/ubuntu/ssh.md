---
title: SSH命令合集
date: 2023-02-13
category:
  - 操作系统
---

# SSH命令合集

## 创建SSH密钥
用于创建SSH密钥对
```shell
ssh-keygen -t [ras] -C [email]
```
设置为当前用户登陆密钥
```shell
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```
常见的分布式集群，通常由多台机器构成，为了便于操作管理，通过ssh方式启动集群代理，需要在多个服务器上进行ssh免登录配置。将第一台机器上的authorized_keys复制到第二台机器上。
```shell
scp authorized_keys root@192.168.56.101:~/.ssh
```