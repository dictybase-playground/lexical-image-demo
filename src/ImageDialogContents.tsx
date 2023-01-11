import { useState, ChangeEvent } from "react"
import {
  Button,
  CardHeader,
  Card,
  CardContent,
  TextField,
  CardActions,
  Grid,
} from "@material-ui/core"
import { useSetAtom } from "jotai"
import dialogOpenAtom from "./state"

const TableDialogContents = () => {
  const setIsDialogOpen = useSetAtom(dialogOpenAtom)
  const [url, setUrl] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setUrl(value)
  }

  const handleConfirm = () => {
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardContent>
        <CardHeader title="Insert Image" />
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              fullWidth
              label="Image URL"
              value={url}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleConfirm}> Confirm </Button>
      </CardActions>
    </Card>
  )
}

export default TableDialogContents
