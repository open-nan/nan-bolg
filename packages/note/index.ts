/**
 * @date 2024-06-26 15:58
 * @file 笔记加载器， 用于查找，读取，归档指定目录下的所有markdown文件
 */
import * as path from 'path'
import * as fs from 'fs'
import {readAllMarkdownlist} from './utils/read-md'
import { parse as parseYaml } from 'yaml'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的 URL
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件的目录
const __dirname = dirname(__filename);



/**
 * 根目录
*/
const rootPath = path.join(__dirname, './src')
export const rootDir = rootPath

/**
 * 获取指定目录下的所有markdown文件
 * @param dir 基于note的根目录, 指定目录(默认为根目录), 查找目录下的所有帖子文件
 * @returns path[] 返回
*/
export function getPostPathList(dir: string = '/'){
  return readAllMarkdownlist(rootPath, dir)
}

/**
 *  当前目录下的所有帖子文件
*/
const innerAllPageList = getPostPathList()
export const allPageList = innerAllPageList

/**
 * 获取文件的完整路径
*/
export function getFullPath(...filePath: string[]){
  return path.join(rootPath, ...filePath)
}


/**
 * 获取文件的frontmatter部分
 */
export function getFrontmatter ( filePath: string){
  const fullPath = getFullPath(filePath)
  const contain = fs.readFileSync(fullPath, 'utf-8')
  const frontmatterSrting = /^---\n([\s\S]*?)\n---/.exec(contain)?.[1] || ''
  return parseYaml(frontmatterSrting)
}


/**
 * 获取文件的内容部分
*/
export function getContent(filePath: string){
  const fullPath = getFullPath(filePath)
  const contain = fs.readFileSync(fullPath, 'utf-8')
  const content = contain.replace(/^---\n([\s\S]*?)\n---/, '')
  return content
}
