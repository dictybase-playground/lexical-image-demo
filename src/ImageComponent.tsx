import { useEffect, useRef, useState } from "react"
import { $getNodeByKey, CLICK_COMMAND, COMMAND_PRIORITY_LOW } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import Image from "./Image"

export type ImageComponentProperties = {
  src: string
  nodeKey: string
  alt?: string
  initialHeight: number
  initialWidth: number
  fit: string
  duration: number
  easing: string
}

const ImageComponent = ({
  src,
  alt,
  nodeKey,
  initialHeight,
  initialWidth,
  fit,
  easing,
  duration,
}: ImageComponentProperties) => {
  const imageReference = useRef<HTMLImageElement>(null)
  const [editor] = useLexicalComposerContext()
  const [isResizing, setIsResizing] = useState(false)
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)

  const onResize = (width: number, height: number) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if (!node || !(node.getType() === "image")) return
      node.setDimensions(width, height)
    })
  }

  useEffect(() => {
    const unregisterCommandListener = editor.registerCommand(
      CLICK_COMMAND,
      (payload: MouseEvent) => {
        // Click commands are dispatched every time a click event occurs anywhere on the root element.
        // When that event occurs check if the event target matches the image dom element.

        // This prevents the selection from being cleared after resizing the image
        // since returning true will prevent other CLICK_COMMAND listeners. There must
        // be another command listener registered that clears the editor selection.
        if (isResizing) return true
        if (payload.target === imageReference.current) {
          // If a different image is already selected, clearSelection() will remove it
          // from the editor selection.
          clearSelection()
          // Creates a NodeSelection and sets the current editor selection to the
          // node that matches the provided nodeKey argument
          setSelected(true)
          return true
        }
        return false
      },
      COMMAND_PRIORITY_LOW,
    )
    return () => {
      unregisterCommandListener()
    }
  })
  return (
    <Image
      src={src}
      imageReference={imageReference}
      alt={alt}
      initialHeight={initialHeight}
      initialWidth={initialWidth}
      fit={fit}
      duration={duration}
      easing={easing}
      isResizing={isSelected}
      onResizeStart={() => setIsResizing(true)}
      onResizeEnd={() => setIsResizing(false)}
      onResize={onResize}
    />
  )
}

export default ImageComponent
