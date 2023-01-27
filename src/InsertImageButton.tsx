import { Button, Dialog } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useAtom } from "jotai"
import { dialogOpenAtom } from "./state"
import ImageDialogContents from "./ImageDialogContents"

const InsertImageButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(dialogOpenAtom)

  return (
    <>
      <Button
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<AddIcon />}>
        Image
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ImageDialogContents />
      </Dialog>
    </>
  )
}

export default InsertImageButton
