import ToolBar from "@material-ui/core/Toolbar"
import { makeStyles } from "@material-ui/core"
import InsertImageButton from "./InsertImageButton"

const useToolbarStyles = makeStyles({
  root: {
    marginBottom: "1px",
    background: "#fff",
  },
})

const ToolbarV7 = () => {
  const { root } = useToolbarStyles()
  return (
    <ToolBar variant="dense" className={root}>
      <InsertImageButton />
    </ToolBar>
  )
}

export default ToolbarV7
