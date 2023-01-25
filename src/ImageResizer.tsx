import useResizerStyles from "./resizerStyles"
import { Direction, useResize } from "./useResize"

const directions: Direction[] = [
  "north",
  "south",
  "east",
  "west",
  "ne",
  "nw",
  "se",
  "sw",
]

export type ImageResizerProperties = {
  imageContainer: HTMLDivElement
  handleResize: (width: number, height: number) => void
}

/**
 * Renders draggable handles that can be used to resize their parent element.
 *
 * @param handleResize a callback function used to set the new dimensions of the parent element.
 * @param imageContainer a reference to the parent container
 */
const ImageResizer = ({
  handleResize,
  imageContainer,
}: ImageResizerProperties) => {
  const classes = useResizerStyles()
  const { onMouseDown } = useResize(imageContainer, handleResize)
  return (
    <>
      {directions.map((direction) => (
        <div
          key={direction}
          className={`${classes.root} ${classes[direction]}`}
          onMouseDown={(event) => onMouseDown(event, direction)}
        />
      ))}
    </>
  )
}

export default ImageResizer
