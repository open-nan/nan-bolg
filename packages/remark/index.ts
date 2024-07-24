/**
 * @date 2024-06-26 16:48
 * @file markdown 编译器用于将 markdown 转换为 html
*/


import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc';
import remarkMath from 'remark-math';
import rehypeShiki from '@shikijs/rehype'


import {rehypeLink, type RewriteUrlType} from './plugins/rehype-link'
import {rehypeCodeBlock} from './plugins/rehype-code-block';
import {rehypeExcerpt} from './plugins/rehype-excerpt'
import {remarkMermaid} from './plugins/remark-mermaid'
import {remarkHint} from './plugins/remark-hint'
import {rehypeKatex} from './plugins/rehype-katex'

export abstract class Parser<T extends Record<string, any>>{
    core = unified()
    protected abstract parser(option: T): void
    protected abstract compiler(option: T): void

    constructor(option: T){
      this.core.use(remarkParse)
      this.parser(option)

      this.core.use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypeStringify)
        .use(rehypeRaw)
      this.compiler(option)
    }

    async process(input: string) {
      return await this.core.process(input)
    }
}

export type CommonParserOption = {
  rewriteLinkUrl?: (type: RewriteUrlType, str: string) => string
}
export class CommonParser <T extends CommonParserOption> extends Parser<T>{
  protected parser(option: T){
      this.core
      .use(remarkMermaid)
      .use(remarkHint)
      .use(remarkGfm)
      .use(remarkToc)
      .use(remarkMath)
  }
  protected compiler(option: T){
      this.core
      .use(rehypeKatex)
      .use(rehypeCodeBlock)
      .use(rehypeLink, {rewriteUrl: option.rewriteLinkUrl})
      .use(rehypeShiki, {
        // or `theme` for a single theme
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        }
      })
  }
}

export type ExcerptParserOption =  CommonParserOption &  {
  paragraphNumber?: number
}
export class ExcerptParser <T extends ExcerptParserOption> extends CommonParser<T>{
    parser(option: T) {
        super.parser(option)
        this.core.use(rehypeExcerpt, {ParagraphNumber: option.paragraphNumber??5})
    }
}






