export type Frontmatter = Record<string, string>

export type CacheMD = {
  /** 缓存时间 **/
  updateTime: Date
  /** 目录 **/
  catalog: string
  /** 源文件路径 **/
  sourecPath: string
  /** 缓存路径 **/
  cacheFileName: string
  /** 缓存路径 **/
  cacheRootPath: string
  /** frontmatter **/
  frontmatter: Frontmatter
  /** 文件内容 **/
  content: string
}

export type CacheExportObj = Record<string, CacheMD>
