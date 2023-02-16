import { ReactNode } from "react"
import { useAtom } from "jotai"
import { motion } from "framer-motion"
import { Button, CircularProgress, PropTypes } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import DoneIcon from "@material-ui/icons/Done"
import ErrorIcon from "@material-ui/icons/Error"
import {
  ButtonStateAtom,
  ButtonStates,
} from "../../../packages/resizable-image/src/state"
import useButtonStyles from "./useButtonStyles"

type TextSlideProperties = {
  text: string
}

const TextSlide = ({ text }: TextSlideProperties) => (
  <motion.div
    key={text}
    initial={{ x: 70, opacity: 0 }}
    animate={{ x: 10, opacity: 1 }}
    transition={{ delay: 0.09, duration: 0.6, ease: "easeIn" }}>
    {text}
  </motion.div>
)

const buttonText: Record<ButtonStates, ReactNode> = {
  NORMAL: <TextSlide text="Save" />,
  LOADING: <TextSlide text="Loading" />,
  DONE: <TextSlide text="Done!" />,
  ERROR: <TextSlide text="Error" />,
}

const buttonIcon: Record<ButtonStates, ReactNode> = {
  NORMAL: <SaveIcon />,
  LOADING: <CircularProgress size={22} />,
  DONE: <DoneIcon />,
  ERROR: <ErrorIcon />,
}

const buttonColor: Record<ButtonStates, PropTypes.Color> = {
  NORMAL: "primary",
  LOADING: "default",
  DONE: "primary",
  ERROR: "secondary",
}

type SaveButtonProperties = {
  save: () => void
}

// I think we might have to pass in the onClick handler and
// handle the changing button state logic in the whichever persistenceplugin
// uses the savebutton. If our savehook callback is asynchronous, then we'll want
// to await that callback before proceeding to set the button state
const SaveButton = ({ save }: SaveButtonProperties) => {
  const [buttonState, setButtonState] = useAtom(ButtonStateAtom)
  const { root } = useButtonStyles()

  const onClick = async () => {
    // A better solution would probably be to set the button's state to disabled
    // when in the DONE or ERROR state, and override MUI's default styling for
    // a disabled button.
    if (buttonState !== "NORMAL") return

    setButtonState("LOADING")
    try {
      save()
      setButtonState("DONE")
    } catch {
      setButtonState("ERROR")
    } finally {
      setTimeout(() => {
        setButtonState("NORMAL")
      }, 2000)
    }
  }
  return (
    <Button
      className={root}
      variant="contained"
      color={buttonColor[buttonState]}
      disabled={buttonState === "LOADING"}
      onClick={onClick}
      startIcon={buttonIcon[buttonState]}>
      {buttonText[buttonState]}
    </Button>
  )
}

export default SaveButton
