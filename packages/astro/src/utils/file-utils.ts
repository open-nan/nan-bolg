import {CommonParser, type CommonParserOption, ExcerptParser, type ExcerptParserOption} from "@nan-pack/remark"
import * as fs from "fs"


// 将路径转化成为页面路径, 可用与将md文件路径转化为slug
export type PageUrl = string
export function toPageURl(postPath: string, prefix: string = ''): PageUrl{
  return (prefix + postPath).toLowerCase().replace(".md", "_md")
}

/**
 * 一个文件是否存在
*/
export function isExist(filePath: string){
  return fs.existsSync(filePath)
}

/**
 * 一个路径的类型，相对路径，绝对路径，url链接
 */
export function getPathType(innerPath: string){
  if(innerPath.startsWith("http")){
    return "url"
  }
  if(innerPath.startsWith("/")){
    return "absolute"
  }
  if(innerPath.startsWith(".")){
    return "relative"
  }
}
