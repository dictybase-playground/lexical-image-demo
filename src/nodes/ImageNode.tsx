import {
  DecoratorNode,
  EditorConfig,
  Spread,
  SerializedLexicalNode,
} from "lexical"
import ImageComponent from "../ImageComponent"

type SerializedImageNode = Spread<
  {
    source: string
    width: number
    height: number
    fit?: string
    transition?: string
    duration?: number
    alt?: string
    type: "image"
  },
  SerializedLexicalNode
>

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

  static importJSON({
    source,
    alt,
    width,
    height,
    fit,
    transition,
    duration,
  }: SerializedImageNode): ImageNode {
    return new ImageNode({
      source,
      alt,
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

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      source: this.source,
      width: this.width,
      height: this.height,
      fit: this.fit,
      transition: this.transition,
      duration: this.duration,
      alt: this.alt,
      version: 1,
    }
  }

  decorate() {
    console.log(this.width, this.height)
    return (
      <ImageComponent
        nodeKey={this.__key}
        src={this.source}
        alt={this.alt}
        initialWidth={this.width}
        initialHeight={this.height}
        fit="cover"
        easing="cubic-bezier(0.7, 0, 0.6, 1)"
        duration={2000}
      />
    )
  }
}

export default ImageNode
