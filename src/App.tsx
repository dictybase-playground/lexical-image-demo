import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { Grid, Paper, makeStyles } from "@material-ui/core"
import ImagePlugin from "./plugins/ImagePlugin"
import TreeViewPlugin from "./plugins/TreeViewPlugin"
import ImageNode from "./nodes/ImageNode"
import ToolbarV7Plugin from "./Toolbar"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import "./editor.css"

const usePaperStyles = makeStyles({
  root: {
    position: "relative",
  },
})

const editorTheme = {
  paragraph: "editor-paragraph",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const initialConfig = {
  namespace: "DictyEditor",
  theme: { ...editorTheme },
  nodes: [HeadingNode, QuoteNode, ListItemNode, ListNode, ImageNode],
  onError,
}

const EditorV8 = () => {
  const inputClasses = useEditorInputStyles()
  const placeholderClasses = useEditorPlaceholderStyles()
  const paperClasses = usePaperStyles()

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ImagePlugin />
      <Grid container direction="column">
        <Grid item>
          <ToolbarV7Plugin />
        </Grid>
        <Grid item>
          <Paper className={paperClasses.root}>
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable className={inputClasses.root} />
              }
              placeholder={
                <div className={placeholderClasses.root}>
                  Enter some text...
                </div>
              }
            />
          </Paper>
        </Grid>
        <TreeViewPlugin />
      </Grid>
    </LexicalComposer>
  )
}

export default EditorV8
