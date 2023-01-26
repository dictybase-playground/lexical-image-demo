import { DecoratorNode, EditorConfig } from "lexical"
import ImageComponent from "../ImageComponent"

type ImageNodeConstructorProperties = {
  source: string
  width: number
  height: number
  fit?: string
  transition?: string
  duration?: number
  alt?: string
  key?: string
}

class ImageNode extends DecoratorNode<JSX.Element> {
  // public private protected?
  source: string
  width: number
  height: number
  fit?: string
  duration?: number
  transition?: string
  alt?: string

  static getType() {
    return "image"
  }

  static clone(node: ImageNode) {
    const { source, alt, key, width, height, fit, transition, duration } = node
    return new ImageNode({
      source,
      alt,
      key,
      width,
      height,
      fit,
      transition,
      duration,
    })
  }

  constructor({
    source,
    width,
    height,
    fit,
    transition,
    duration,
    alt,
    key,
  }: ImageNodeConstructorProperties) {
    super(key)
    this.source = source
    this.height = height
    this.width = width
    this.fit = fit
    this.transition = transition
    this.duration = duration
    this.alt = alt
  }

  setDimensions(width: number, height: number) {
    console.log("set dimensions")
    const writable = this.getWritable()
    writable.width = width
    writable.height = height
  }

  createDOM(config: EditorConfig) {
    const div = document.createElement("div")
    const { theme } = config
    const className = theme.image
    if (className) {
      div.className = className
    }
    return div
  }

  updateDOM() {
    return false
  }

  decorate() {
    return (
      <ImageComponent
        nodeKey={this.__key}
        src={this.source}
        alt={this.alt}
        initialHeight={this.height}
        initialWidth={this.width}
        fit="cover"
        easing="cubic-bezier(0.7, 0, 0.6, 1)"
        duration={2000}
      />
    )
  }
}

export default ImageNode
