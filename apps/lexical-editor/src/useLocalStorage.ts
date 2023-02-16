import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const useLocalStorage = () => {
  const [editor] = useLexicalComposerContext()

  const saveLocalStorage = useCallback(() => {
    const editorState = editor.getEditorState()
    const editorStateString = JSON.stringify(editorState)
    localStorage.setItem("lexical-image-demo", editorStateString)
  }, [editor])

  const retrieveLocalStorage = useCallback(() => {
    const editorString = localStorage.getItem("lexical-image-demo")
    if (editorString) {
      const editorState = editor.parseEditorState(editorString)
      editor.setEditorState(editorState)
    }
  }, [editor])

  return { saveLocalStorage, retrieveLocalStorage }
}

export default useLocalStorage
