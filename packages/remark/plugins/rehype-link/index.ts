import { visit, SKIP} from 'unist-util-visit'
import type { Root, Element} from 'hast'

export type RewriteUrlType = 'img'|'link'
export function rehypeLink(options: {rewriteUrl?: (type: RewriteUrlType, src: string)=> string}) {
  return function (tree: Root) {
    visit(tree, 'element', function (node: Element) {
      if(options.rewriteUrl === undefined) return SKIP

      // 处理图片资源路径
      if(node.tagName === 'img'){
        const src = options.rewriteUrl('img', node.properties.src as string)
        node.properties.src = src
      }

      // 处理链接
      if(node.tagName === 'a'){
        const src = options.rewriteUrl('link', node.properties.href as string)
        node.properties.href = src
      }
    })
  }
}
