

export function remarkMermaid() {
  // 所有 remark 和 rehype 插件都返回一个单独的函数
  return function (tree) {
    tree.children.forEach((node) => {
      if(node.type==='code'&& node.lang==='mermaid'){
        node.type = 'html';
        node.value = `<div class="mermaid">${node.value}</div>`
      }
    })
  }
}