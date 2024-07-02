/**
 * @date 2024-06-30
 * @file 图片服务，用来生成图片服务系统
*/
import {BaseServer} from './base-server';
import sharp from 'sharp'

type ImagesServerQption = {imagePath: string}
class ImagesServer extends BaseServer<ImagesServerQption, string>{
  dev(option: ImagesServerQption){
    const href = `/@fs${option.imagePath}?origFormat=png`
    return '/_image?href=' + href
  }

  // TODO 优化图片文件，输入目录日志，将目录地址输入到构建目录下
  prod(option: ImagesServerQption){
    return option.imagePath
  }
}

const imgServer = new ImagesServer()


export function getImageUrl (imagePath: string){
  return imgServer.run({imagePath})
}
