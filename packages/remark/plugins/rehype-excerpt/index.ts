export function rehypeExcerpt(option) {
  return function (tree) {
    const ParagraphNumber = option.ParagraphNumber || 10
    tree.children = tree.children.slice(0,ParagraphNumber)
  }
}
