---
title: Map 与 WeakMap
date: 2023-02-14
tag:
  - es6
category:
  - Javascript/Typescript
---
# Map 与 WeakMap

## Map 映射表
::: info 在MDN上是这么描述 Map 的:
  该Map对象保存键值对并记住键的原始插入顺序。任何值（对象和 原始值）都可以用作键或值。

:::

说到键值对形式的数据格式，我会很容易联想到`数组(Array)`和`对象(Object)`,我们先来看一下它的区别
```js
/**
 * Array
 * 在 javascript 中数组是一组数据的集合，并且可进行迭代的
 * key 必须为number，从 0 开始依次递增，
 * vaule 可以为任何类型
 */
const array = new Array([a,b,c,d,e])
console.log(array[0]); // a
array.forEach((value,key)=>{
  console.log(value+' => '+key + ', ');
}) // 0 => a, 1 => b, 2 => c, 3 => d, 4 => e

/**
 * Object
 * 在 javascript 中对象是一组属性的集合，不能进行迭代
 * key 必须为string，通常我们称它为属性名
 * vaule 可以为任何类型
 */
const object = new Object({
  name: 'aaa'
})
console.log(object.name); // aaa
object.forEach((value,key)=>{
  console.log(key+' => '+value + ', ');
})// Error 因为Object不可以进行迭代
```

Map 你可以把它看成一个可以跌代的对象，而它的key可以为对象或者原始值
```js
/**
 * Map
 * 出现在 ES6 中
 * key 可以对象或者原始值，并记住键的原始插入顺序
 * vaule 可以为任何类型
 */

const map = new Map()
// 通过 .set() 方法插入值
map.set('name': 'aaaa')
// 通过 .get() 方法获取值
console.log(map.get('name')) // aaaa

// 我们可以以一个对象作为 key 插入一个值
const Obj = {name: 'I'}
map.set(Obj: '这里的key是一个对象')
console.log(map.get(Obj)) // 这里的key是一个对象

// 并且我们可以对Map实体进行迭代
map.forEach((value,key)=>{
  console.log(key+' => '+value + ', ');
}) // name => 'aaaa', [object Object] => 这里对key是一个对象,
```
### Map 的方法及属性
```js
// 静态属性
get Map[@@species]
// 用于创建派生对象的构造函数。

// 实例属性
Map.prototype.size
// 返回 Map 对象中的键值对数量。


Map.prototype.clear()
// 移除 Map 对象中所有的键值对。

Map.prototype.delete()
// 移除 Map 对象中指定的键值对，如果键值对存在并成功被移除，返回 true，
// 否则返回 false。调用 delete 后再调用 map.has(key) 将返回 false。

Map.prototype.get()
// 返回与指定的键 key 关联的值，若不存在关联的值，则返回 undefined。

Map.prototype.has()
// 返回一个布尔值，用来表明 Map 对象中是否存在与指定的键 key 关联的值。

Map.prototype.set()
// 在 Map 对象中设置与指定的键 key 关联的值，并返回 Map 对象。

Map.prototype[@@iterator]()
// 返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组
// 并以插入 Map 对象的顺序排列。

Map.prototype.keys()
// 返回一个新的迭代对象，其中包含 Map 对象中所有的键，并以插入 Map 对象的顺序排列。

Map.prototype.values()
// 返回一个新的迭代对象，其中包含 Map 对象中所有的值，并以插入 Map 对象的顺序排列。

Map.prototype.entries()
// 返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组
// 并以插入 Map 对象的顺序排列。

Map.prototype.forEach()
// 以插入的顺序对 Map 对象中存在的键值对分别调用一次 callbackFn。
// 如果给定了 thisArg 参数，这个参数将会是回调函数中 this 的值。
```


## WeakMap（弱映射表)
::: info 在MDN上是这么描述 WeakMap 的:
  WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

:::

```js
const weakMap = new WeakMap()

// WeakMap 赋值
weakMap.set('name', 'map') // Error，weakMap的key只能是一个对象

const Obj = {name: 'I'}
weakMap.set(Obj: '这里的key是一个对象')
console.log(weakMap.get(Obj)) // 这里的key是一个对象
```
### WeakMap 的实例方法
```js
WeakMap.prototype.delete(key)
// 删除 WeakMap 中与 key 相关联的值。删除之后， WeakMap.prototype.has(key) 将会返回 false。

WeakMap.prototype.get(key)
// 返回 WeakMap 中与 key 相关联的值，如果 key 不存在则返回 undefined。

WeakMap.prototype.has(key)
// 返回一个布尔值，断言一个值是否已经与 WeakMap 对象中的 key 关联。

WeakMap.prototype.set(key, value)
// 给 WeakMap 中的 key 设置一个 value。该方法返回一个 WeakMap 对象。
```

## 为什么我们需要WeakMap
::: warning Map 的缺陷
Map 在建立以对象为key的映射关系时会建立与对象的强引用，这会可能会导致内存泄露

:::
```js
const map = new Map()
for(let i=0,i<=100000,i++){
  ;(function(){
    // 这里的foo在函数执行完成后本应该释放
    // 但是由于 map 将 foo 作为key并建立了强链接，导致foo占用的空间没有被释放
    // 这样便会导致内存泄露
    const foo = {foo: 1}
    map.set(foo, 1)
  })()
}
```
而 WeakMap 只会与key建立弱连接，这样防止了内存泄露
```js
const weakMap = new WeakMap()
for(let i=0,i<=100000,i++){
  ;(function(){
    const foo = {foo: 1}
    maweakMapp.set(foo, 1) //建立弱连接关系，不会保留foo的空间
  })()
}
```
::: tip 这也是为什么 WeakMap 有`.values()`的实例方法而没有`.keys()`的实例方法的原因
:::
