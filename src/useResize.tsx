import React, { useRef } from "react"

export type Direction =
  | "north"
  | "south"
  | "east"
  | "west"
  | "ne"
  | "nw"
  | "se"
  | "sw"

type ResizeOptions = {
  handleResize: (width: number, height: number) => void
  handleResizeStart?: () => void
  handleResizeEnd?: () => void
}

export type MouseMoveHandlerCreator = (
  initialValues: {
    initialX: number
    initialY: number
    initialWidth: number
    initialHeight: number
  },
  handleResize: (width: number, height: number) => void,
) => (event: MouseEvent) => void

// Since the addEventListener method expects a listener function which accepts
// only an event listener, these functions are curried to provide arguments
// for the other parameters in advance.
export const createNorthMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialY, initialHeight, initialWidth } = initialValues
    const finalY = event.clientY

    const newHeight = Math.floor(initialHeight - (finalY - initialY))
    handleResize(initialWidth, newHeight)
  }

export const createSouthMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialY, initialHeight, initialWidth } = initialValues
    const finalY = event.clientY

    const newHeight = Math.floor(initialHeight + finalY - initialY)
    handleResize(initialWidth, newHeight)
  }

export const createEastMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialX, initialHeight, initialWidth } = initialValues
    const finalX = event.clientX

    const newWidth = initialWidth + finalX - initialX
    handleResize(newWidth, initialHeight)
  }

export const createWestMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialX, initialHeight, initialWidth } = initialValues
    const finalX = event.clientX

    const newWidth = initialWidth - (finalX - initialX)
    handleResize(newWidth, initialHeight)
  }

export const createDiagonalEastMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialX, initialHeight, initialWidth } = initialValues
    const aspectRatio = initialWidth / initialHeight
    const finalX = event.clientX

    const newWidth = Math.floor(initialWidth + finalX - initialX)
    const newHeight = newWidth / aspectRatio
    handleResize(newWidth, newHeight)
  }

export const createDiagonalWestMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialX, initialHeight, initialWidth } = initialValues
    const aspectRatio = initialWidth / initialHeight
    const finalX = event.clientX

    const newWidth = initialWidth - (finalX - initialX)
    const newHeight = newWidth / aspectRatio
    handleResize(newWidth, newHeight)
  }

const directionToHandler = new Map<Direction, MouseMoveHandlerCreator>([
  ["north", createNorthMoveHandler],
  ["south", createSouthMoveHandler],
  ["east", createEastMoveHandler],
  ["west", createWestMoveHandler],
  ["ne", createDiagonalEastMoveHandler],
  ["se", createDiagonalEastMoveHandler],
  ["nw", createDiagonalWestMoveHandler],
  ["sw", createDiagonalWestMoveHandler],
])
/**
 * A React hook that returns a mousedown event handler used to resize elements
 *
 * @category Hooks
 * @param handleResize a callback function used to set the new dimensions of the parent element.
 * @param imageContainer a reference to the parent container
 * @returns an event handler for mousedown events
 */
export const useResize = (
  imageContainer: HTMLDivElement,
  { handleResizeStart, handleResize, handleResizeEnd }: ResizeOptions,
) => {
  // moveHandlerReference is used to track which moveHandler is currently registered
  // so it can be removed by onMouseUp.
  const moveHandlerReference = useRef<{
    handler: ((event: MouseEvent) => void) | null | undefined
  }>({ handler: null })
  const initialValuesReference = useRef({
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
  })

  const onMouseUp = () => {
    if (!moveHandlerReference.current.handler) return
    document.removeEventListener(
      "mousemove",
      moveHandlerReference.current.handler,
    )
    // setTimeout here allows other resize-related click event listeners
    // to run before handleResizeEnd. If handleResizeEnd controls an "isResizing"
    // state, other click listeners are allowed to fire before the state changes.
    if (handleResizeEnd) setTimeout(handleResizeEnd, 0)
  }

  // Initializes values used for calculating new image dimensions during mousemove
  // and adds the appropriate mousemove and mouseup event listeners
  const onMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    direction: Direction,
  ) => {
    event.preventDefault()
    if (handleResizeStart) handleResizeStart()
    const { width: initialWidth, height: initialHeight } =
      imageContainer.getBoundingClientRect()

    initialValuesReference.current.initialY = event.clientY
    initialValuesReference.current.initialX = event.clientX
    initialValuesReference.current.initialWidth = initialWidth
    initialValuesReference.current.initialHeight = initialHeight
    const mouseMoveHandlerCreator = directionToHandler.get(direction)
    if (!mouseMoveHandlerCreator) return

    const mouseMoveHandler = mouseMoveHandlerCreator(
      initialValuesReference.current,
      handleResize,
    )
    moveHandlerReference.current.handler = mouseMoveHandler
    document.addEventListener("mousemove", mouseMoveHandler)
    document.addEventListener("mouseup", onMouseUp, { once: true })
  }

  return {
    onMouseDown,
  }
}
