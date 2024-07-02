import {CommonParser, type CommonParserOption, ExcerptParser, type ExcerptParserOption} from "@nan-pack/remark"
import { getPathType, isExist, toPageURl } from './file-utils'
import { getContent, getFullPath } from '@nan-pack/note';
import { getImageUrl } from '../server/images-server';
import * as path from 'path'


function getLinkUrl(url: string){
  if(url.endsWith('.md')){
    return toPageURl(url,'post')
  }
  return url
}



export class RemarkMD{
  private content: string
  private path: string

  private markdownParserOption: CommonParserOption = {
    rewriteLinkUrl:(type, str)=>{
      const pathType = getPathType(str)
      // 如果是url链接，则直接输出
      if(pathType === 'url')return str

      let innUrl: string = getFullPath(str)
      if(pathType === 'relative'){ // 如果是相对链接就拼接上当前目录
        innUrl = getFullPath(path.dirname(this.path), str)
      }

      if(!isExist(innUrl))return str

      switch (type){
        case 'img':
          return getImageUrl(innUrl)
        case 'link':
          return getLinkUrl(path.join(path.dirname(this.path), str))
      }

      return innUrl
    }
  }

  constructor(path: string){
    this.path = path
    this.content =  getContent(path)
  }


  // 将markdown格式转化为html格式
  public async toHtml() {
    const markdownParser = new CommonParser(this.markdownParserOption)
    return await markdownParser.process(this.content)
  }

  // 将markdown格式转化为html格式, 并摘抄起片段
  private excerptParserOption: ExcerptParserOption = {
    ...this.markdownParserOption,
    paragraphNumber: 5
  }
  public async toExcerpt() {
    const excerptParser = new ExcerptParser(this.excerptParserOption)
    return await excerptParser.process(this.content)
  }
}
