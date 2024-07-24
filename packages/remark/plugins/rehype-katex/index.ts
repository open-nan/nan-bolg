import { visit, SKIP} from 'unist-util-visit'
import type {Root, Element} from 'hast'
import katex from 'katex';

import {fromHtmlIsomorphic} from 'hast-util-from-html-isomorphic'


export function rehypeKatex() {

  return function (tree: Root) {
    visit(tree, 'element', function (node: Element, index, parent) {
      const classNames = node.properties?.className as string[]
      if(node.tagName === 'code'&&classNames?.includes('language-math')){

        const childNodes = node.children.map((child)=>{
          const mathHtml = katex.renderToString(child.value,
            {
              output: 'mathml' ,throwOnError: false,
              displayMode: !(classNames?.includes('math-inline')),
            });
          const mathNode = fromHtmlIsomorphic(mathHtml)
          return mathNode
        })

        const newNode = {
          type: 'element',
          children: childNodes,
          tagName: 'span',
          properties: {
            className: classNames,
          },
        }

        parent?.children.splice(index||0, 1, newNode)
        return SKIP
      }
      return
    })
  }
}
