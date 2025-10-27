import { useEffect, useRef, useState } from "react"

export const useOverlayImage = (src: string = "/GeneraliOverlay.png") => {
  const overlayImageRef = useRef<HTMLImageElement | null>(null)
  const [overlayLoaded, setOverlayLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src

    img.onload = () => {
      overlayImageRef.current = img
      setOverlayLoaded(true)
    }

    img.onerror = () => {
      console.warn("Overlay image failed to load")
      setOverlayLoaded(true) // Proceed even if overlay fails
    }
  }, [src])

  return { overlayImageRef, overlayLoaded }
}
