import { DecoratorNode } from "lexical"

class ImageNode extends DecoratorNode<JSX.Element> {
  static getType() {
    return "image"
  }

  static clone(node: ImageNode) {
    return new ImageNode(node.__src, node.__altText, node.__key)
  }

  constructor(source: string, altText: string, key?: string) {
    super(key)
    this.__source = source
    this.__altText = altText
  }
}

export default ImageNode
