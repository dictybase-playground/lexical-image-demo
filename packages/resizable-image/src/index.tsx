import React, { useRef, useState } from "react"
import { useAtomValue } from "jotai"
import { Container } from "@material-ui/core"
import { ImageDimensionsAtom } from "./state"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import ImageResizer from "./ImageResizer"
import useImageStyles from "./useImageStyles"

export type ImageProperties = {
  src: string
  alt?: string
  imageReference: React.MutableRefObject<HTMLImageElement | null>
  fit: string
  duration: number
  easing: string
  isSelected: boolean
  onResize: (width: number, height: number) => void
}

const Image = ({
  src,
  alt,
  imageReference,
  fit = "contain",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 2000,
  isSelected,
  onResize,
}: ImageProperties) => {
  const dimensions = useAtomValue(ImageDimensionsAtom)
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

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <Container ref={imageContainerReference} disableGutters className={root}>
      <img
        ref={imageReference}
        src={src}
        alt={alt}
        className={image}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
      {loading ? <LoadingDisplay icons={icons} /> : null}
      {error ? <ErrorDisplay icons={icons} /> : null}
      {imageContainerReference.current && isSelected ? (
        <ImageResizer
          onResize={onResize}
          imageContainer={imageContainerReference.current}
        />
      ) : null}
    </Container>
  )
}

export default Image
