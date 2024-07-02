---
title: 顶点着色器与片源着色器
date: 2023-09-08
order: -2
tag:
  - Webgl
category:
  - Javascript/Typescript
---



::: vue-playground webgl 绘制一个点

@file App.vue
```vue
<template >
  <canvas 
    ref="canvasDOM" 
    :canvas-id="canvasId"
    :width="props.width"
    :height="props.height"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

// 定义 props
export interface Props {
  canvasId?: string,
  width?: number,
  height?: number
}
const props = withDefaults(defineProps<Props>(), {
  width: 150,
  height: 150
})

// 定义 canvasId
const canvasId  = props.canvasId
// 定义 canvasDOM
const canvasDOM = ref<HTMLCanvasElement>()
// 定义 canvas 上下文对象
let ctx:WebGLRenderingContext | null  = null


onMounted(() => {
  // 获取 canvas 上下文对象
  ctx = canvasDOM.value?.getContext("webgl") as WebGLRenderingContext;

  // 定义顶点着色器 GLSL
  const vertexShaderSource =  `
    void main (){
      gl_PointSize=20.0;
      gl_Position=vec4(0.0,0.0,0.0,1.0);
    }
  `

  // 定义片源着色器 GLSL
  const framgmentShaderSource = ` 
    void main (){
      gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    }
  `

  // 调用初始化着色器函数
  const program = initShaber(ctx, vertexShaderSource, framgmentShaderSource) 

  // 渲染到canvas中
  ctx.drawArrays(ctx.POINTS,0,1)
})


// 声明初始化着色器函数
function initShaber(gl: WebGLRenderingContext, vertexShaderSource: string, framgmentShaderSource: string ){

  // 创建顶点着色器
  let vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
  // 创建片着色器
  let framgmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader

  // 引入着色器源
  gl.shaderSource(vertexShader,vertexShaderSource)
  gl.shaderSource(framgmentShader,framgmentShaderSource)

  // 编译着色器
  gl.compileShader(vertexShader)
  gl.compileShader(framgmentShader)

  // 创建程序对象
  const program = gl.createProgram() as WebGLProgram

  // 附着着色器到program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, framgmentShader)

  // 链接program
  gl.linkProgram(program)
  // 链接program
  gl.useProgram(program)

  return program
}
</script>
```

@import

```json
{
  "imports": {
    "@vueuse/core": "https://unpkg.com/@vueuse/core/index.mjs",
    "@vueuse/shared": "https://unpkg.com/@vueuse/shared/index.mjs",
    "vue-demi": "https://unpkg.com/vue-demi/lib/index.mjs"
  }
}
```

@setting

```json
{
  "showCompileOutput": true
}
```

:::


::: vue-playground webgl 绘制一个矩形

@file App.vue
```vue
<template >
  <canvas 
    ref="canvasDOM" 
    :canvas-id="canvasId"
    :width="props.width"
    :height="props.height"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

// 定义 props
export interface Props {
  canvasId?: string,
  width?: number,
  height?: number
}
const props = withDefaults(defineProps<Props>(), {
  width: 150,
  height: 150
})

// 定义 canvasId
const canvasId  = props.canvasId
// 定义 canvasDOM
const canvasDOM = ref<HTMLCanvasElement>()
// 定义 canvas 上下文对象
let ctx:WebGLRenderingContext | null  = null


onMounted(() => {
  // 获取 canvas 上下文对象
  ctx = canvasDOM.value?.getContext("webgl") as WebGLRenderingContext;

  // 定义顶点着色器 GLSL
  const vertexShaderSource =  `
    attribute vec4 apos;
    void main() {
      gl_Position=apos;
    }
  `

  // 定义片源着色器 GLSL
  const framgmentShaderSource = ` 
    void main (){
      gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    }
  `

  // 调用初始化着色器函数
  const program = initShaber(ctx, vertexShaderSource, framgmentShaderSource) 
  // 获取顶点着色器的位置变量apos，将变量 aposLocation 指向 apos 变量
  let aposLocation = ctx.getAttribLocation(program, 'apos')
  
  // 定义 四个顶点的数组
  const data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5])

  // 创建缓冲区对象
  const buffer = ctx.createBuffer()
  // 绑定缓冲区对象
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer)
  // 将顶点数组传入缓存区
  ctx.bufferData(ctx.ARRAY_BUFFER, data, ctx.STATIC_DRAW)
  // 缓存区中的数据传递给apos
  ctx.vertexAttribPointer(aposLocation, 2, ctx.FLOAT, false, 0, 0)
  // 允许数据传递
  ctx.enableVertexAttribArray(aposLocation);
  
  console.log(aposLocation);
  

  // 开始绘制
  ctx.drawArrays(ctx.LINE_LOOP, 0, 4)
})


// 声明初始化着色器函数
function initShaber(gl: WebGLRenderingContext, vertexShaderSource: string, framgmentShaderSource: string ){

  // 创建顶点着色器
  let vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
  // 创建片着色器
  let framgmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader

  // 引入着色器源
  gl.shaderSource(vertexShader,vertexShaderSource)
  gl.shaderSource(framgmentShader,framgmentShaderSource)

  // 编译着色器
  gl.compileShader(vertexShader)
  gl.compileShader(framgmentShader)

  // 创建程序对象
  const program = gl.createProgram() as WebGLProgram

  // 附着着色器到program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, framgmentShader)

  // 链接program
  gl.linkProgram(program)
  // 链接program
  gl.useProgram(program)

  return program
}
</script>
```

@import

```json
{
  "imports": {
    "@vueuse/core": "https://unpkg.com/@vueuse/core/index.mjs",
    "@vueuse/shared": "https://unpkg.com/@vueuse/shared/index.mjs",
    "vue-demi": "https://unpkg.com/vue-demi/lib/index.mjs"
  }
}
```

@setting

```json
{
  "showCompileOutput": true
}
```

:::
