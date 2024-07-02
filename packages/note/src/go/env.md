---
title: 安装与环境配置
order: -1
category:
  - GO
---
# 安装与环境配置

## SDK 下载
::: tip SDK
 全称为Software Development Kit软件开发工具，提供给开发用的，其中包含了开发对应语言的工具包
:::

Golang 的官网下载地址为：[golang.org](golang.org)，需要翻墙

Golang 中文社区下载地址为：[https://studygolang.com/dl](https://studygolang.com/dl)

::: warning 注意 安装时的安装地址不要出现中文、特殊字符空格等 :::

## 环境搭建
安装完成之后运行
```shell
$ go version
# 如果出现`go version go1.8.1 darwin/amd64` 则证明安装完成
```
检查家目录下是否有`.bash_profile`如果没有，就新建一个，然后写入
```shell

# GOBIN指向SDK的根目录
export GOROOT=/usr/local/go
# GOPATH指向我们的工作目录
export GOPATH=/Users/nan/code/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```
更新环境变量
```shell
source ~/.bash_profile
```
这时在执行`go version`应该就能看见版本信息了

## 重要的环境变量
Go通过环境变量来做项目上的管理和控制，通过命令go env可以查看相关变量：
```shell
$ go env
# 启用go module管理项目，需要有go.mod和go.sum文件；
GO111MODULE=""
GOARCH="arm64"
GOBIN="/bin"
GOCACHE="/Users/nan/Library/Caches/go-build"
GOENV="/Users/nan/Library/Application Support/go/env"
GOEXE=""
GOEXPERIMENT=""
GOFLAGS=""
GOHOSTARCH="arm64"
GOHOSTOS="darwin"
GOINSECURE=""
GOMODCACHE="/Users/nan/code/go/pkg/mod"
GONOPROXY=""
GONOSUMDB=""
GOOS="darwin"
# 工作目录并不是项目所有目录，编译后的二进制文件存放地，import包的搜索路径，主要包含bin、pkg、src；
GOPATH="/Users/nan/code/go"
GOPRIVATE=""
# 下载依赖时的代理，必须配置，不然无法成功下载；
GOPROXY="https://proxy.golang.org,direct"
# Go的安装目录，即可执行文件所在的目录；
GOROOT="/usr/local/go"
GOSUMDB="sum.golang.org"
GOTMPDIR=""
GOTOOLDIR="/usr/local/go/pkg/tool/darwin_arm64"
GOVCS=""
GOVERSION="go1.20.1"
GCCGO="gccgo"
AR="ar"
CC="clang"
CXX="clang++"
CGO_ENABLED="1"
GOMOD="/usr/local/go/src/go.mod"
GOWORK=""
CGO_CFLAGS="-O2 -g"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-O2 -g"
CGO_FFLAGS="-O2 -g"
CGO_LDFLAGS="-O2 -g"
PKG_CONFIG="pkg-config"
```

## DOS 命令
- go 指令用于构建编译我们的代码
- gofw
- ldd 可查看可执行文件的依赖库

## 常用的代理有
```shell
# 1. 七牛 CDN
export GOPROXY=https://goproxy.cn,direct
# 2. 阿里云
export GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
# 3. 官方
export GOPROXY=https://goproxy.io,direct
```
