---
title: 词法分析
date: 2023-09-14
order: -1
category:
  - 编译原理
---

## 词法分析的主要任务
1. 从左往右逐行扫描源字符码，识别各个单词，确定单词的类型
2. 将识别出的单词转换成统一的`词法单元:token`进行表示，

### token <种别码, 属性值>
```ts
token = {
  // 种别码 
  kind: ...
  // 属性值
  value: ...
} 
```

我们可以将我们编程中遇见的单词大致分为一下几种形式

|     |  单词类型  |  种别  | 种别码 |
| :-: | :------: | :----- | :---- |
|  1  |  关键字     | if, else, for, fun, ... | 一词一码 
|  2  |  标识符     | 变量, 浮点型, 字符型, ... | 多词一码
|  3  |   常量     | 变量, 浮点型, 字符型, ... | 一型一码 
|  4  |  运算符     | 算数、关系、逻辑 运算符 | 一词一码/一型一码
|  5  |  界限字符   | ; () =  {} ...  | 一词一码


我们在分析
```ts 
  while( i != 100 ){
    i ++ 
  }
```
的时候，
我们可以将它分解为以下token序列
```ts
const tokenList = [
  // while
  { kind: 'WHILE', value: null, }
  // (
  { kind: 'SLP', value: null, }
  // i
  { kind: 'IDN', value: 'i', }
  // !=
  { kind: 'NE', value: null, }
  // )
  { kind: 'SRP', value: null, }
  // {
  { kind: 'LP', value: null, }
  // i
  { kind: 'IDN', value: 'i', }
  // ++
  { kind: 'INC', value: null, }
  // ;
  { kind: 'SEMI', value: null, }
  // }
  { kind: 'RP', value: null, }
]
```

