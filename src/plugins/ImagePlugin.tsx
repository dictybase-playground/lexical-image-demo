import { useEffect } from "react"
import { createCommand, COMMAND_PRIORITY_EDITOR, $insertNodes } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ImageNode from "../nodes/ImageNode"

type InsertImagePayload = {
  source: string
  altText: string
}

export const INSERT_IMAGE_COMMAND = createCommand()

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    const unregisterInsertImageCommand = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      ({ source, altText }: InsertImagePayload) => {
        const imageNode = new ImageNode(source, altText)
        console.log("inserting image node?")
        $insertNodes([imageNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )

    return () => {
      unregisterInsertImageCommand()
    }
  })

  return null
}

export default ImagePlugin
