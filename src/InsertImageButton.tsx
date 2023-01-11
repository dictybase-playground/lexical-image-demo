import { Button, Dialog } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useAtom } from "jotai"
import dialogOpenAtom from "./state"
import TableDialogContents from "./ImageDialogContents"

const InsertTableButton = () => {
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
        <TableDialogContents />
      </Dialog>
    </>
  )
}

export default InsertTableButton
