import { makeStyles } from "@material-ui/core"

const useResizerStyles = makeStyles({
  root: {
    height: "6px",
    width: "6px",
    position: "absolute",
    backgroundColor: "rgb(60, 132, 244)",
    border: "1px solid #fff",
    zIndex: 3,
  },
  north: {
    marginLeft: "auto",
    marginRight: "auto",
    top: "-4px",
    cursor: "n-resize",
  },
  south: {
    marginLeft: "auto",
    marginRight: "auto",
    bottom: "-4px",
    cursor: "s-resize",
  },
  east: {
    marginTop: "auto",
    marginBottom: "auto",
    right: "-4px",
    cursor: "w-resize",
  },
  west: {
    marginTop: "auto",
    marginBottom: "auto",
    left: "-4px",
    cursor: "e-resize",
  },
  ne: {
    top: "-4px",
    right: "-4px",
    cursor: "ne-resize",
  },
  nw: {
    top: "-4px",
    left: "-4px",
    cursor: "nw-resize",
  },
  se: {
    bottom: "-4px",
    right: "-4px",
    cursor: "se-resize",
  },
  sw: {
    bottom: "-4px",
    left: "-4px",
    cursor: "sw-resize",
  },
})

export default useResizerStyles
