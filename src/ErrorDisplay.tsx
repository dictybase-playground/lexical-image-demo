import BrokenImageTwoToneIcon from "@material-ui/icons/BrokenImageTwoTone"
import { SvgIcon, Container } from "@material-ui/core"

const ErrorDisplay = ({ icons }: { icons: string }) => (
  <Container disableGutters className={icons}>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </Container>
)

export default ErrorDisplay
