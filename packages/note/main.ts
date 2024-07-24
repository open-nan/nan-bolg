/* @ts-ignore */
import {postMap, rootDir as cacheRootDir} from './.cache/index.js'
import { CacheExportObj } from './type.js'
const posts = postMap as unknown as CacheExportObj

/*
 * 根目录
*/
export const rootDir = cacheRootDir

/**
 * 获取指定目录下的所有markdown文件
 * @param dir 基于note的根目录, 指定目录(默认为根目录), 查找目录下的所有帖子文件
 * @returns path[] 返回
*/
function getPostPathList(dir?: string){
  let list = Object.keys(posts)
  if(dir!==undefined){
    list = list.filter(key => {
      const pathArr = key.split('/')
      pathArr.pop()
      return pathArr.join('/').startsWith(dir)
    })
  }
  return list
}

/**
 *  当前目录下的所有帖子文件
*/
const innerAllPageList = getPostPathList()
export const allPageList = innerAllPageList
/**
 * 获取文件的完整路径
*/
export function getFullPath(filePath: string){
  return rootDir + '/' + filePath
}
/**
 * 获取文件的frontmatter部分
 */
export function getFrontmatter (filePath: string){
  return posts[filePath].frontmatter
}


/**
 * 获取文件的内容部分
*/
export function getContent(filePath: string){
  return posts[filePath].content
}
