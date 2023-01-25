import Image from "./Image"

export type ImageComponentProperties = {
  src: string
  alt?: string
  initialHeight: number
  initialWidth: number
  fit: string
  duration: number
  easing: string
}

const ImageComponent = ({
  src,
  alt,
  initialHeight,
  initialWidth,
  fit,
  easing,
  duration,
}: ImageComponentProperties) => {
  const onResize = (width: number, height: number) => {
    //  Change Lexical Image Node Properties Here"
  }

  return (
    <Image
      src={src}
      alt={alt}
      initialHeight={initialHeight}
      initialWidth={initialWidth}
      fit={fit}
      duration={duration}
      easing={easing}
      onResize={onResize}
    />
  )
}
// Positioning Resizer elements
// Controling when the Resizer elements appear on the Image
// Controling Lexical Image Node properties

export default ImageComponent
