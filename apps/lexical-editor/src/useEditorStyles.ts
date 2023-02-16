import { makeStyles } from "@material-ui/core"

export const useEditorInputStyles = makeStyles({
  root: {
    minHeight: "150px",
    resize: "none",
    fontSize: "15px",
    position: "relative",
    tabSize: "1",
    outline: "0",
    padding: "15px 10px",
    caretColor: "#444",
  },
})

export const useEditorPlaceholderStyles = makeStyles({
  root: {
    color: "#999",
    overflow: "hidden",
    position: "absolute",
    textOverflow: "ellipsis",
    top: "15px",
    left: "10px",
    fontSize: "15px",
    userSelect: "none",
    display: "inline-block",
    pointerEvents: "none",
  },
})
