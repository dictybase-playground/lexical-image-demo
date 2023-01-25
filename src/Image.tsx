import { useRef, useState } from "react"
import { Container } from "@material-ui/core"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import ImageResizer from "./ImageResizer"
import useImageStyles from "./imageStyles"

export type ImageProperties = {
  src: string
  alt?: string
  initialWidth: number
  initialHeight: number
  fit: string
  duration: number
  easing: string
  onResize: (width: number, height: number) => void
}

const Image = ({
  src,
  alt,
  initialHeight = 500,
  initialWidth = 500,
  fit = "contain",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 2000,
  onResize,
}: ImageProperties) => {
  const [dimensions, setDimensions] = useState({
    width: initialHeight,
    height: initialWidth,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const imageContainerReference = useRef<HTMLImageElement>(null)
  const { root, image, icons } = useImageStyles({
    width: dimensions.width,
    height: dimensions.height,
    fit,
    easing,
    duration,
    loading,
    error,
  })

  const handleResize = (newWidth: number, newHeight: number) => {
    setDimensions({ width: newWidth, height: newHeight })
    onResize(newWidth, newHeight)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <Container ref={imageContainerReference} disableGutters className={root}>
      <img
        src={src}
        alt={alt}
        className={image}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
      {loading ? <LoadingDisplay icons={icons} /> : null}
      {error ? <ErrorDisplay icons={icons} /> : null}
      {imageContainerReference.current ? (
        <ImageResizer
          handleResize={handleResize}
          imageContainer={imageContainerReference.current}
        />
      ) : null}
    </Container>
  )
}

export default Image
