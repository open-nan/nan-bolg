import { visit, SKIP} from 'unist-util-visit'
import type { Root, Element, } from 'hast'


export const defaultLanguages = [
  'ts', 'js',  'javesrcpit', 'html', 'css',  'md', 'vue',
  'c', 'c++', 'c#', 'cpp', 'go', 'golang',
  'sh', 'json', 'yaml',
]

export function rehypeCodeBlock(languages: string[] = defaultLanguages) {
  return function (tree: Root) {
    let hasCode = false

    visit(tree, 'element', function (node: Element, index, parent) {
      if (node.tagName !== 'pre') return

      const code = node.children[0] as unknown as Element
      const classNames = code.properties?.className as string[]
      const classNamelanguage = classNames?.find((className) =>
        className.startsWith('language-')
      )

      const language = classNamelanguage ? classNamelanguage.slice(9): 'sh'

      if (!language||!languages.includes(language)) return

      hasCode = true

      const languageElement: Element = {
        type: 'element',
        children: [{ type: 'text', value: language }],
        tagName: 'span',
        properties: {
          className: ['language'],
        },
      }

      const copyButtonElement: Element = {
        type: 'element',
        tagName: 'button',
        children: [
          {
            type: 'element',
            tagName: 'svg',
            properties: {viewBox: "0 0 16 16", className: 'code-copy code-copy-svg'},
            children: [
              {
                type: 'element',
                tagName: 'use',
                properties: { 'xlink:href': '#code-copy'},
                children: [],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'svg',
            properties: {viewBox: "0 0 16 16", className: 'code-copy success-hook-svg'},
            children: [
              {
                type: 'element',
                tagName: 'use',
                properties: { 'xlink:href': '#success-hook'},
                children: [],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'svg',
            properties: {viewBox: "0 0 1024 1024", className: 'code-copy fail-cross-svg'},
            children: [
              {
                type: 'element',
                tagName: 'use',
                properties: { 'xlink:href': '#fail-cross'},
                children: [],
              },
            ],
          }
        ],
        properties: {
          className: ['rehype-copy-code', 'copy-button'],
        },
      }

      const codeOptionElement: Element = {
        type: 'element',
        children: [
          languageElement,
          copyButtonElement,
        ],
        tagName: 'div',
        properties: {
          className: ['code-option'],
        },
      }

      const codeblock: Element = {
        type: 'element',
        children: [
          node,
          codeOptionElement,
        ],
        tagName: 'div',
        properties: {
          className: ['code-block'],
        },
      }

      parent?.children.splice(index||0, 1, codeblock)

      return SKIP
    })
   if(hasCode){
      const script = `function copyToClipboard(t){function e(t){t.hasChildNodes()?t.childNodes.forEach(function(t){e(t)}):n+=t.textContent}var o=t.parentNode.parentNode,c=o.querySelector("code"),n="";e(c),navigator.clipboard.writeText(n).then(function(){prompt(t,"copied")}).catch(function(){prompt(t,"failed")})}function prompt(t,e){t.classList.add(e),setTimeout(function(){t.classList.remove(e)},2e3)}document.currentScript.parentNode.addEventListener("click",function(t){var e=t.target;e.matches('button[class*="rehype-copy-code"]')&&copyToClipboard(e)});`
      const clipboardCopy: Element = {
        type: 'element',
        children: [{ type: 'text', value: script }],
        tagName: 'script',
        properties: {},
      }
      tree.children.push(clipboardCopy)
   }
  }
}
