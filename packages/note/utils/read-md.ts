import * as fs from 'fs'
import * as path from 'path'

// 递归读取路径下的所有的markdown文件
export function readAllMarkdownlist(root: string, dir: string = '/' /** dir 绝对路径地址 */, ext: string = '.md'){
  const list: string[] = []
  try{
    const currentDir = path.join(root, dir)

    fs.readdirSync(currentDir).map(item => {
      const aPath = path.join(currentDir, item)
      if(fs.statSync(aPath).isDirectory()){
        list.push(...readAllMarkdownlist(root, path.join(dir, item), ext))
      }else if(fs.statSync(aPath).isFile()&&path.extname(aPath) === ext){
        list.push(path.join(dir, item))
      }
    })
  }catch(err){
    new Error('read-md.ts 读取文件失败: ' + dir )
  }
  return list
}
