import { useRef, useState, useCallback } from "react"

export interface CanvasSize {
  width: number
  height: number
}

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayImageRef = useRef<HTMLImageElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const [currentScreen, setCurrentScreen] = useState<"start" | "camera" | "preview">("start")
  const [isStreaming, setIsStreaming] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [capturedPhoto, setCapturedPhoto] = useState<{ src: string; timestamp: number } | null>(null)
  const [isFrontCamera, setIsFrontCamera] = useState(true)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [overlayLoaded, setOverlayLoaded] = useState(false)
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false)
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 300, height: 533 })
  const [videoSize, setVideoSize] = useState<CanvasSize>({ width: 0, height: 0 })
  const [hasNativeShare, setHasNativeShare] = useState(false)
  const [inputMethod, setInputMethod] = useState<"camera" | "file">("camera")

  return {
    videoRef,
    canvasRef,
    previewCanvasRef,
    fileInputRef,
    containerRef,
    overlayImageRef,
    animationFrameRef,
    currentScreen,
    setCurrentScreen,
    isStreaming,
    setIsStreaming,
    cameraPermission,
    setCameraPermission,
    capturedPhoto,
    setCapturedPhoto,
    isFrontCamera,
    setIsFrontCamera,
    stream,
    setStream,
    isProcessing,
    setIsProcessing,
    overlayLoaded,
    setOverlayLoaded,
    hasMultipleCameras,
    setHasMultipleCameras,
    canvasSize,
    setCanvasSize,
    videoSize,
    setVideoSize,
    hasNativeShare,
    setHasNativeShare,
    inputMethod,
    setInputMethod,
  }
} 