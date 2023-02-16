import { useEffect } from "react"
import {
  createCommand,
  COMMAND_PRIORITY_EDITOR,
  $insertNodes,
  $createRangeSelection,
  $getSelection,
  $setSelection,
  $isNodeSelection,
  DRAGSTART_COMMAND,
  COMMAND_PRIORITY_HIGH,
  DROP_COMMAND,
  LexicalEditor,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ImageNode, { $isImageNode } from "../nodes/ImageNode"

type InsertImagePayload = {
  source: string
  alt?: string
  width: number
  height: number
  key?: string
}

export const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>()

// On Firefox, when the image is dragged, a transparent version of the image hovers
// with the user's cursor. This can make it difficult to see where the image is
// being moved precisely. The drag image can be replaced with transparent image
// below
const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
const img = document.createElement("img")
img.src = TRANSPARENT_IMAGE

export const getImageNode = () => {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) return null
  const nodes = selection.getNodes()
  return $isImageNode(nodes[0]) ? nodes[0] : null
}

export const getDragImageData = (event: DragEvent) => {
  const dragData = event.dataTransfer?.getData("application/lexical-drag")
  if (!dragData) return null
  const { type, data } = JSON.parse(dragData)
  if (type !== "image") return null

  return data as InsertImagePayload
}

export const getDragSelection = (event: DragEvent) => {
  let range

  // Firefox?

  // Other browsers
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY)
  }

  return range
}

export const onDragStart = (event: DragEvent) => {
  // 1: Get the ImageNode in the current editor selection
  const imageNode = getImageNode()
  if (!imageNode) {
    return false
  }
  const { dataTransfer } = event
  if (!dataTransfer) return false
  // 2: Using event dataTransfer API, capture the properties of
  //    the ImageNode in a JSON, including the node key.
  //    When a drop event occurs, the JSON will be parsed and used to
  //    create a new ImageNode
  dataTransfer.setData(
    "application/lexical-drag",
    JSON.stringify({
      data: {
        source: imageNode.source,
        alt: imageNode.alt,
        width: imageNode.width,
        height: imageNode.height,
        key: imageNode.getKey(),
      },
      type: "image",
    }),
  )
  dataTransfer.setDragImage(img, 0, 0)
  return true
}

export const onDrop = (event: DragEvent, editor: LexicalEditor) => {
  const node = getImageNode()
  if (!node) return false

  // 1: Get image data
  const data = getDragImageData(event)
  if (!data) return false

  // 2: Get current selection range
  const range = getDragSelection(event)
  if (!range) return false
  // 3: Remove previous ImageNode
  node.remove()
  // 4: Create new image node with image data at current selection
  const rangeSelection = $createRangeSelection()
  rangeSelection.applyDOMRange(range)
  $setSelection(rangeSelection)
  editor.dispatchCommand(INSERT_IMAGE_COMMAND, data)

  return true
}

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    const unregisterInsertImage = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: InsertImagePayload) => {
        const imageNode = new ImageNode(payload)
        $insertNodes([imageNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )

    const unregisterDragStart = editor.registerCommand(
      DRAGSTART_COMMAND,
      onDragStart,
      COMMAND_PRIORITY_HIGH,
    )
    const unregisterDrop = editor.registerCommand(
      DROP_COMMAND,
      (event) => onDrop(event, editor),
      COMMAND_PRIORITY_HIGH,
    )

    return () => {
      unregisterInsertImage()
      unregisterDragStart()
      unregisterDrop()
    }
  })

  return null
}

export default ImagePlugin
