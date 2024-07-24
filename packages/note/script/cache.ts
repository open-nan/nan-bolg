import * as path from 'path'
import * as fs from 'fs'
import { parse as parseYaml } from 'yaml'
import md5 from 'md5'
import config from '../config'
import { CacheMD } from '../type'



const rootPath = config.root
const cacheDir= config.cachePath

/**
 * 获取指定目录下的所有markdown文件列表
 * @param dir 基于note的根目录, 指定目录(默认为根目录), 查找目录下的所有帖子文件
 * @returns path[] 返回
*/
function readAllMarkdownlist(dir: string /** dir 绝对路径地址 */, ext: string = '.md'){
  const list: string[] = []
  try{
    const currentDir = path.join(rootPath, dir)

    fs.readdirSync(currentDir).map(item => {
      const aPath = path.join(currentDir, item)
      if(fs.statSync(aPath).isDirectory()){
        list.push(...readAllMarkdownlist(path.join(dir, item), ext))
      }else if(fs.statSync(aPath).isFile()&&path.extname(aPath) === ext){
        list.push(path.join(dir, item))
      }
    })
  }catch(err){
    new Error('read-md.ts 读取文件失败: ' + dir )
  }
  return list
}

// 缓存目标文件
function upCacheExportMD(filePath: string, md?: string):{
  catalog: string
  cacheFileName: string
  exportName: string
}{
  const fullPath = path.join(rootPath, filePath)
  if(md===undefined){
    md = fs.readFileSync(filePath, 'utf-8')
  }
  const fileNameMd5 = md5(filePath);
  const frontmatter =  /^---\n([\s\S]*?)\n---/.exec(md)?.[1] || '';
  const content = md.replace(/^---\n([\s\S]*?)\n---/, '');
  const cacheExportMDFileName = fileNameMd5 + '.json';

  const cacheExportMD: CacheMD = {
    updateTime: new Date(),
    frontmatter: parseYaml(frontmatter),
    content: content,
    sourecPath: fullPath,
    cacheFileName: cacheExportMDFileName,
    cacheRootPath: path.join(rootPath, cacheDir),
    catalog: filePath,
  }

  const temp = JSON.stringify(cacheExportMD)
  const cachePath = path.join(cacheExportMD.cacheRootPath, cacheExportMD.cacheFileName)
  fs.writeFileSync(cachePath, temp)

  return {
    catalog: cacheExportMD.catalog,
    cacheFileName: cacheExportMD.cacheFileName,
    exportName: '_'+fileNameMd5+'_'
  }
}

function importTemp(name: string, url: string){
  return `import ${name} from '${url}';\n`
}



// 跟新缓存
export function updateCache():void{
  let headingImportStr = ''
  let cacheExportObj = '{\n'
  const postPaths = config.docsPaths|| ['./docs']
  postPaths.forEach(item => {
    readAllMarkdownlist(item).forEach(i => {
      const { catalog, cacheFileName, exportName } = upCacheExportMD(i)
      headingImportStr += importTemp(exportName, './' + cacheFileName)
      cacheExportObj += `'${catalog}': ${exportName},\n`
    })
  })
  cacheExportObj += '}'

  const cacheExportContent = `${headingImportStr}\nexport const postMap = ${cacheExportObj};\nexport const rootDir = '${rootPath}'`

  fs.writeFileSync(path.join(rootPath, cacheDir, 'index.js'), cacheExportContent)
}

updateCache()
