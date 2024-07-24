---
title: Golang 学习笔记
order: 0
category:
  - GO
---

::: warning 建设中.....
:::

# Golang 学习笔记
[标准库](https://pdos.csail.mit.edu/6.824/index.html)
[标准库中文](https://studygolang.com/pkgdoc)

## 优势
- 部署简单，他可以直接编译为机器码，不依赖与其他库，直接可运行即可部署
- 静态类型的语言，编译时就能检查出来隐藏的问题
- 语言层面的并发，能充分利用多核
- 强大的标准库
- runtime系统调度机制
- 高效的GC垃圾回收
- 内嵌C语法支持
- 跨平台

## 缺点
- 包管理，大部分包都在github上
- 没有泛化类型
- 所以Exception都使用Error来处理
- 对C的降级处理并非无缝

## 目录

[安装与环境配置](./env.md)  
[变量与数据类型](./variable.md)
