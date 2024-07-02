/**
 * @date 2024-06-30
 * @file 服务基础类
*/


export abstract class BaseServer<opt extends Record<string,any>|undefined, res>{
  // 开发服务器运行
  abstract dev(option?: opt):res

  // 构建时运行
  abstract prod(option?: opt):res

  run(option?: opt){
    switch (process.env.NODE_ENV){
      case 'development':
        return this.dev(option)
      case 'production' :
        return this.prod(option)
      default:
        return this.dev(option)
    }
  }
}
