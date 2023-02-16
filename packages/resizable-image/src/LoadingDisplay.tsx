import { Container, CircularProgress } from "@material-ui/core"

const LoadingDisplay = ({ icons }: { icons: string }) => (
  <Container disableGutters className={icons}>
    <CircularProgress size={56} thickness={6} />
  </Container>
)

export default LoadingDisplay
