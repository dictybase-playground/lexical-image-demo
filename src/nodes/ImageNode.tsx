import { DecoratorNode, EditorConfig } from "lexical"

class ImageNode extends DecoratorNode<JSX.Element> {
  static getType() {
    return "image"
  }

  static clone(node: ImageNode) {
    return new ImageNode(node.__src, node.__altText, node.__key)
  }

  createDOM(config: EditorConfig) {
    const image = document.createElement("img")
    image.src = this.__source
    image.alt = this.__altText
    const { className } = config.theme
    if (className) image.className = className

    return image
  }

  constructor(source: string, altText?: string, key?: string) {
    super(key)
    this.__source = source
    this.__altText = altText
  }
}

export default ImageNode
