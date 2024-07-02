export function remarkHint(opt={regexTag: 'tip|warning'}) {
  const { regexTag } = opt

  return function (tree, file) {
    const stack = []
    const startReg = new RegExp(`^:::[ ]+(${regexTag})[ ]+(.*)?`)
    tree.children.forEach((node, key) => {
      // 捕获 ::: top 
      if(node.type==='paragraph'&&startReg.test(node.children[0].value)){
        const [text, type, title ] = node.children[0].value.match(startReg)
        stack.unshift({
          key, text, type,title,
        })
      }

      // TODO
      if(node.type==='paragraph'&&stack.length>0&&/^:::[ \t\n]*$/.test(node.children[0].value)){
        const {key, type, title} = stack[0]
        const startNode = tree.children[key]
        startNode.type = 'html'
        startNode.value = `<div class="hint ${type}"><span class='hint-title'>${title}</span>`
        node.type = 'html'
        node.value = '</div>'
        stack.shift()
      }
    })
  }
}
