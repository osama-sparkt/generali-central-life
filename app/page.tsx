// // "use client";
// // import React, { useEffect, useCallback } from "react"
// // import { Home, RotateCcw, Share, Download, Upload, Loader2 } from "lucide-react"
// // import StartScreen from "../components/StartScreen"
// // import CameraDeniedScreen from "../components/CameraDeniedScreen"
// // import CameraScreen from "../components/CameraScreen"
// // import PreviewScreen from "../components/PreviewScreen"
// // import { useCamera } from "../hooks/useCamera"
// // import { useOverlayImage } from "../hooks/useOverlayImage"

// // interface CapturedPhoto {
// //   src: string
// //   timestamp: number
// // }

// // interface CanvasSize {
// //   width: number
// //   height: number
// // }

// // export default function CameraApp() {
// //   const { overlayImageRef, overlayLoaded } = useOverlayImage()
// //   const {
// //     videoRef,
// //     canvasRef,
// //     previewCanvasRef,
// //     fileInputRef,
// //     containerRef,
// //     // overlayImageRef,
// //     animationFrameRef,
// //     currentScreen,
// //     setCurrentScreen,
// //     isStreaming,
// //     setIsStreaming,
// //     cameraPermission,
// //     setCameraPermission,
// //     capturedPhoto,
// //     setCapturedPhoto,
// //     isFrontCamera,
// //     setIsFrontCamera,
// //     stream,
// //     setStream,
// //     isProcessing,
// //     setIsProcessing,
// //     // overlayLoaded,
// //     setOverlayLoaded,
// //     hasMultipleCameras,
// //     setHasMultipleCameras,
// //     canvasSize,
// //     setCanvasSize,
// //     videoSize,
// //     setVideoSize,
// //     hasNativeShare,
// //     setHasNativeShare,
// //     inputMethod,
// //     setInputMethod,
// //   } = useCamera()

// //   const [isSharing, setIsSharing] = React.useState(false)
// //   const [isDownloading, setIsDownloading] = React.useState(false)

// //   // Check for native share support
// //   useEffect(() => {
// //     const checkShareSupport = () => {
// //       const isMobile = /iPad|iPhone|iPod|Android/i.test(navigator.userAgent)
// //       return !!(typeof navigator.share === "function" && isMobile)
// //     }
// //     setHasNativeShare(checkShareSupport())
// //   }, [])

// //   // Calculate optimal canvas size
// //   const calculateCanvasSize = useCallback((): CanvasSize => {
// //     const maxHeight = window.innerHeight - 160
// //     const idealWidth = (9 * maxHeight) / 16
// //     const maxWidth = Math.min(window.innerWidth - 32, 500)

// //     if (idealWidth > maxWidth) {
// //       return {
// //         width: maxWidth,
// //         height: (16 * maxWidth) / 9,
// //       }
// //     }

// //     return {
// //       width: idealWidth,
// //       height: maxHeight,
// //     }
// //   }, [])

// //   // Handle window resize
// //   useEffect(() => {
// //     const handleResize = () => {
// //       const newSize = calculateCanvasSize()
// //       setCanvasSize(newSize)

// //       if (previewCanvasRef.current) {
// //         previewCanvasRef.current.width = newSize.width
// //         previewCanvasRef.current.height = newSize.height
// //         if (isStreaming && videoRef.current) {
// //           startPreview()
// //         }
// //       }
// //     }

// //     handleResize()
// //     window.addEventListener("resize", handleResize)
// //     return () => window.removeEventListener("resize", handleResize)
// //   }, [calculateCanvasSize, isStreaming])

// //   // Load overlay image
// //   useEffect(() => {
// //     const img = new Image()
// //     img.crossOrigin = "anonymous"
// //     img.onload = () => {
// //       overlayImageRef.current = img
// //       setOverlayLoaded(true)
// //     }
// //     img.onerror = () => {
// //       console.warn("Overlay image failed to load")
// //       setOverlayLoaded(true) // Continue without overlay
// //     }
// //     img.src = "/overlay.png" // Place your overlay image in public/overlay.png
// //   }, [])

// //   // Check for multiple cameras
// //   const checkMultipleCameras = async () => {
// //     try {
// //       const devices = await navigator.mediaDevices.enumerateDevices()
// //       const videoDevices = devices.filter((device) => device.kind === "videoinput")
// //       setHasMultipleCameras(videoDevices.length > 1)
// //     } catch (error) {
// //       console.error("Error checking cameras:", error)
// //       setHasMultipleCameras(false)
// //     }
// //   }

// //   // Start camera stream
// //   const startCamera = async () => {
// //     setInputMethod("camera")
// //     try {
// //       // Stop existing stream
// //       if (stream) {
// //         stream.getTracks().forEach((track) => track.stop())
// //       }

// //       if (animationFrameRef.current) {
// //         cancelAnimationFrame(animationFrameRef.current)
// //         animationFrameRef.current = null
// //       }

// //       const mediaStream = await navigator.mediaDevices.getUserMedia({
// //         video: {
// //           facingMode: isFrontCamera ? "user" : "environment",
// //           width: { ideal: 1920 },
// //           height: { ideal: 1080 },
// //           aspectRatio: { ideal: 9 / 16 },
// //         },
// //       })

// //       setStream(mediaStream)

// //       if (videoRef.current) {
// //         videoRef.current.srcObject = mediaStream
// //         videoRef.current.onloadedmetadata = () => {
// //           if (videoRef.current) {
// //             videoRef.current
// //               .play()
// //               .then(() => {
// //                 setIsStreaming(true)
// //                 setCameraPermission(true)
// //               })
// //               .catch((error) => {
// //                 console.error("Error playing video:", error)
// //               })
// //           }
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error accessing camera:", error)
// //       setCameraPermission(false)
// //     }
// //   }

// //   // Start preview animation
// //   const startPreview = useCallback(() => {
// //     if (!videoRef.current || !previewCanvasRef.current) return

// //     const video = videoRef.current
// //     const canvas = previewCanvasRef.current
// //     const ctx = canvas.getContext("2d")

// //     if (!ctx) return

// //     canvas.width = canvasSize.width
// //     canvas.height = canvasSize.height

// //     const animate = () => {
// //       if (!videoRef.current || !previewCanvasRef.current) return
// //       if (!video || !ctx || video.paused || video.ended) {
// //         animationFrameRef.current = requestAnimationFrame(animate)
// //         return
// //       }

// //       const videoWidth = video.videoWidth
// //       const videoHeight = video.videoHeight

// //       if (videoWidth === 0 || videoHeight === 0) {
// //         animationFrameRef.current = requestAnimationFrame(animate)
// //         return
// //       }

// //       // Update video size state
// //       // (Removed setVideoSize from here to avoid infinite loop)

// //       const { sx, sy, sWidth, sHeight } = getCropDimensions(videoWidth, videoHeight)

// //       ctx.clearRect(0, 0, canvas.width, canvas.height)

// //       // Mirror for front camera
// //       if (isFrontCamera) {
// //         ctx.save()
// //         ctx.translate(canvas.width, 0)
// //         ctx.scale(-1, 1)
// //       }

// //       ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)

// //       if (isFrontCamera) {
// //         ctx.restore()
// //       }

// //       // Draw overlay if loaded
// //       if (overlayImageRef.current && overlayLoaded) {
// //         ctx.imageSmoothingEnabled = true;
// //         ctx.imageSmoothingQuality = 'high';
// //         ctx.drawImage(overlayImageRef.current, 0, 0, canvas.width, canvas.height)
// //       }

// //       animationFrameRef.current = requestAnimationFrame(animate)
// //     }

// //     animationFrameRef.current = requestAnimationFrame(animate)
// //   }, [canvasSize, isFrontCamera, overlayLoaded, videoSize])

// //   // Get crop dimensions for 9:16 aspect ratio
// //   const getCropDimensions = (videoWidth: number, videoHeight: number) => {
// //     const targetRatio = 9 / 16
// //     let sx = 0,
// //       sy = 0,
// //       sWidth = videoWidth,
// //       sHeight = videoHeight

// //     const videoRatio = videoWidth / videoHeight

// //     if (videoRatio > 9 / 16) {
// //       // Video is wider, crop sides
// //       sWidth = videoHeight * targetRatio
// //       sx = (videoWidth - sWidth) / 2
// //     } else {
// //       // Video is taller, crop top/bottom
// //       sHeight = videoWidth / targetRatio
// //       sy = (videoHeight - sHeight) / 2
// //     }

// //     return { sx, sy, sWidth, sHeight }
// //   }

// //   // Start preview when streaming begins
// //   useEffect(() => {
// //     if (isStreaming && videoRef.current && previewCanvasRef.current) {
// //       const checkVideoReady = () => {
// //         const video = videoRef.current
// //         if (video && video.videoWidth > 0 && video.videoHeight > 0) {
// //           // Only update if changed
// //           setVideoSize((prev) => {
// //             if (prev.width !== video.videoWidth || prev.height !== video.videoHeight) {
// //               return { width: video.videoWidth, height: video.videoHeight }
// //             }
// //             return prev
// //           })
// //           startPreview()
// //         } else {
// //           setTimeout(checkVideoReady, 100)
// //         }
// //       }
// //       checkVideoReady()
// //     }
// //   }, [isStreaming, startPreview])

// //   // Restart preview after retake
// //   useEffect(() => {
// //     if (!capturedPhoto && isStreaming && videoRef.current && previewCanvasRef.current && currentScreen === "camera") {
// //       const timeout = setTimeout(() => {
// //         startPreview()
// //       }, 100)
// //       return () => clearTimeout(timeout)
// //     }
// //   }, [capturedPhoto, isStreaming, currentScreen, startPreview])

// //   // Initialize camera when entering camera screen
// //   useEffect(() => {
// //     if (currentScreen === "camera") {
// //       checkMultipleCameras()
// //       startCamera()
// //     }

// //     return () => {
// //       if (stream) {
// //         stream.getTracks().forEach((track) => track.stop())
// //       }
// //       if (animationFrameRef.current) {
// //         cancelAnimationFrame(animationFrameRef.current)
// //       }
// //     }
// //   }, [currentScreen])

// //   // Capture photo
// //   const capturePhoto = () => {
// //     if (!videoRef.current || !canvasRef.current || !isStreaming) return

// //     if (animationFrameRef.current) {
// //       cancelAnimationFrame(animationFrameRef.current)
// //       animationFrameRef.current = null
// //     }

// //     const video = videoRef.current
// //     const canvas = canvasRef.current
// //     const videoWidth = video.videoWidth
// //     const videoHeight = video.videoHeight

// //     if (videoWidth === 0 || videoHeight === 0) {
// //       console.error("Video dimensions not available")
// //       return
// //     }

// //     canvas.width = 1080
// //     canvas.height = 1920

// //     const { sx, sy, sWidth, sHeight } = getCropDimensions(videoWidth, videoHeight)
// //     const ctx = canvas.getContext("2d")

// //     if (ctx) {
// //       // Mirror for front camera
// //       if (isFrontCamera) {
// //         ctx.save()
// //         ctx.translate(canvas.width, 0)
// //         ctx.scale(-1, 1)
// //       }

// //       ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)

// //       if (isFrontCamera) {
// //         ctx.restore()
// //       }

// //       // Add overlay
// //       if (overlayImageRef.current && overlayLoaded) {
// //         ctx.imageSmoothingEnabled = true;
// //         ctx.imageSmoothingQuality = 'high';
// //         ctx.drawImage(overlayImageRef.current, 0, 0, canvas.width, canvas.height)
// //       }

// //       setCapturedPhoto({
// //         src: canvas.toDataURL("image/jpeg", 0.95),
// //         timestamp: Date.now(),
// //       })
// //       setCurrentScreen("preview")
// //     }
// //   }

// //   // Handle file selection - Fixed event handling
// //   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setInputMethod("file")
// //     const file = event.target.files?.[0]
// //     if (!file) return

// //     if (!file.type.startsWith("image/")) {
// //       alert("Please select an image file")
// //       return
// //     }

// //     const img = new Image()
// //     img.src = URL.createObjectURL(file)
// //     img.onload = () => {
// //       const canvas = canvasRef.current
// //       if (!canvas) return

// //       canvas.width = 1080
// //       canvas.height = 1920

// //       const ctx = canvas.getContext("2d")
// //       if (!ctx) return

// //       const targetRatio = 9 / 16
// //       const imgRatio = img.width / img.height
// //       let sx = 0,
// //         sy = 0,
// //         sWidth = img.width,
// //         sHeight = img.height

// //       if (imgRatio > targetRatio) {
// //         sWidth = img.height * targetRatio
// //         sx = (img.width - sWidth) / 2
// //       } else if (imgRatio < targetRatio) {
// //         sHeight = img.width / targetRatio
// //         sy = (img.height - sHeight) / 2
// //       }

// //       ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)

// //       // Add overlay
// //       if (overlayImageRef.current && overlayLoaded) {
// //         ctx.imageSmoothingEnabled = true;
// //         ctx.imageSmoothingQuality = 'high';
// //         ctx.drawImage(overlayImageRef.current, 0, 0, canvas.width, canvas.height)
// //       }

// //       setCapturedPhoto({
// //         src: canvas.toDataURL("image/jpeg", 0.95),
// //         timestamp: Date.now(),
// //       })
// //       setCurrentScreen("preview")

// //       // Clean up the object URL
// //       URL.revokeObjectURL(img.src)
// //     }

// //     img.onerror = () => {
// //       console.error("Error loading image file")
// //       alert("Error loading image file")
// //     }
// //   }

// //   // Download image
// //   const downloadImage = (src: string, filename: string) => {
// //     const link = document.createElement("a")
// //     link.href = src
// //     link.download = filename
// //     document.body.appendChild(link)
// //     link.click()
// //     document.body.removeChild(link)
// //   }

// //   // Share photo
// //   const sharePhoto = async () => {
// //     if (!capturedPhoto) return
// //     setIsSharing(true)
// //     try {
// //       const response = await fetch(capturedPhoto.src)
// //       const blob = await response.blob()
// //       const file = new File([blob], `Generali-Central-${capturedPhoto.timestamp}.jpg`, {
// //         type: "image/jpeg",
// //       })
// //       const shareData = {
// //         title: "My Generali Photo",
// //         text: "Celebrating New Beginnings with Generali Center",
// //         files: [file],
// //       }
// //       if (navigator.canShare && navigator.canShare(shareData)) {
// //         await navigator.share(shareData)
// //       } else {
// //         console.log("share cancelled")
// //         return;
// //       }
// //     } catch (error) {
// //       console.error("Error sharing photo:", error)
// //       // downloadImage(capturedPhoto.src, `Generali-Here-Now-${capturedPhoto.timestamp}.jpg`)
// //     } finally {
// //       setIsSharing(false)
// //     }
// //   }

// //   // Download photo
// //   const downloadPhoto = () => {
// //     if (!capturedPhoto) return
// //     setIsDownloading(true)
// //     try {
// //       downloadImage(capturedPhoto.src, `Generali-Central-${capturedPhoto.timestamp}.jpg`)
// //     } catch (error) {
// //       console.error("Error downloading photo:", error)
// //     } finally {
// //       setIsDownloading(false)
// //     }
// //   }

// //   // Toggle camera
// //   const toggleCamera = () => {
// //     if (stream) {
// //       stream.getTracks().forEach((track) => track.stop())
// //     }
// //     if (animationFrameRef.current) {
// //       cancelAnimationFrame(animationFrameRef.current)
// //       animationFrameRef.current = null
// //     }
// //     setIsFrontCamera((prev) => !prev)
// //     setIsStreaming(false)
// //     setCapturedPhoto(null)
// //     setVideoSize({ width: 0, height: 0 })
// //     setTimeout(startCamera, 0)
// //   }

// //   // Go home
// //   const goHome = () => {
// //     if (stream) {
// //       stream.getTracks().forEach((track) => track.stop())
// //     }
// //     if (animationFrameRef.current) {
// //       cancelAnimationFrame(animationFrameRef.current)
// //       animationFrameRef.current = null
// //     }
// //     setCapturedPhoto(null)
// //     setIsStreaming(false)
// //     setCurrentScreen("start")
// //   }

// //   // Retake photo
// //   const retakePhoto = () => {
// //     if (inputMethod === "camera") {
// //       setCapturedPhoto(null)
// //       setCurrentScreen("camera")
// //       if (!isStreaming) {
// //         startCamera()
// //       }
// //     } else {
// //       fileInputRef.current?.click()
// //     }
// //   }

// //   // Camera permission denied screen
// //   if (cameraPermission === false) {
// //     return (
// //       <CameraDeniedScreen onReload={() => window.location.reload()} />
// //     )
// //   }

// //   return (
// //     <div className="flex flex-col items-center justify-between h-dvh bg-[#ca140f] text-white">
// //       <main className="flex flex-col items-center justify-between w-full h-full max-w-lg mx-auto p-4 relative">
// //         {/* Hidden elements */}
// //         <video ref={videoRef} autoPlay playsInline muted className="hidden" style={{ objectFit: "cover" }} />
// //         <canvas ref={canvasRef} className="hidden" />
// //         <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} className="hidden" />

// //         {/* Home button (shown on camera and preview screens) */}
// //         {currentScreen !== "start" && (
// //           <button
// //             onClick={goHome}
// //             className="absolute left-4 bottom-8 bg-white text-red-700 p-3 rounded-full z-10"
// //             aria-label="Go to home screen"
// //           >
// //             <Home className="h-6 w-6" />
// //           </button>
// //         )}

// //         {/* Start Screen */}
// //         {currentScreen === "start" && (
// //           <StartScreen
// //             onTakePhoto={() => setCurrentScreen("camera")}
// //             onSelectPhoto={() => fileInputRef.current?.click()}
// //           />
// //         )}

// //         {/* Camera Screen */}
// //         {currentScreen === "camera" && (
// //           <CameraScreen
// //             canvasSize={canvasSize}
// //             previewCanvasRef={previewCanvasRef as React.RefObject<HTMLCanvasElement>}
// //             isStreaming={isStreaming}
// //             overlayLoaded={overlayLoaded}
// //             hasMultipleCameras={hasMultipleCameras}
// //             onToggleCamera={toggleCamera}
// //             onCapturePhoto={capturePhoto}
// //           />
// //         )}

// //         {/* Preview Screen */}
// //         {currentScreen === "preview" && capturedPhoto && (
// //           <PreviewScreen
// //             capturedPhoto={capturedPhoto}
// //             inputMethod={inputMethod}
// //             isSharing={isSharing}
// //             isDownloading={isDownloading}
// //             hasNativeShare={hasNativeShare}
// //             onRetakePhoto={retakePhoto}
// //             onShare={sharePhoto}
// //             onDownload={downloadPhoto}
// //             canvasSize={{
// //               width: canvasSize.width,
// //               height: canvasSize.height
// //             }}
// //           />
// //         )}
// //       </main>
// //     </div>
// //   )
// // }

// "use client";
// import React, { useEffect, useCallback } from "react";
// import {
//   Home,
//   RotateCcw,
//   Share,
//   Download,
//   Upload,
//   Loader2,
// } from "lucide-react";
// import StartScreen from "../components/StartScreen";
// import CameraDeniedScreen from "../components/CameraDeniedScreen";
// import CameraScreen from "../components/CameraScreen";
// import PreviewScreen from "../components/PreviewScreen";
// import { useCamera } from "../hooks/useCamera";
// import { useOverlayImage } from "../hooks/useOverlayImage";

// interface CapturedPhoto {
//   src: string;
//   timestamp: number;
// }

// interface CanvasSize {
//   width: number;
//   height: number;
// }

// export default function CameraApp() {
//   const { overlayImageRef, overlayLoaded } = useOverlayImage();
//   const {
//     videoRef,
//     canvasRef,
//     previewCanvasRef,
//     fileInputRef,
//     containerRef,
//     animationFrameRef,
//     currentScreen,
//     setCurrentScreen,
//     isStreaming,
//     setIsStreaming,
//     cameraPermission,
//     setCameraPermission,
//     capturedPhoto,
//     setCapturedPhoto,
//     isFrontCamera,
//     setIsFrontCamera,
//     stream,
//     setStream,
//     isProcessing,
//     setIsProcessing,
//     setOverlayLoaded,
//     hasMultipleCameras,
//     setHasMultipleCameras,
//     canvasSize,
//     setCanvasSize,
//     videoSize,
//     setVideoSize,
//     hasNativeShare,
//     setHasNativeShare,
//     inputMethod,
//     setInputMethod,
//   } = useCamera();

//   const [isSharing, setIsSharing] = React.useState(false);
//   const [isDownloading, setIsDownloading] = React.useState(false);

//   // Check for native share support
//   useEffect(() => {
//     const checkShareSupport = () => {
//       const isMobile = /iPad|iPhone|iPod|Android/i.test(navigator.userAgent);
//       return !!(typeof navigator.share === "function" && isMobile);
//     };
//     setHasNativeShare(checkShareSupport());
//   }, []);

//   // Calculate optimal canvas size with device pixel ratio
//   const calculateCanvasSize = useCallback((): CanvasSize => {
//     const maxHeight = window.innerHeight - 160;
//     const ideadlWidth = (9 * maxHeight) / 16;
//     const maxWidth = Math.min(window.innerWidth - 32, 500);

//     if (ideadlWidth > maxWidth) {
//       return {
//         width: maxWidth,
//         height: (16 * maxWidth) / 9,
//       };
//     }

//     return {
//       width: ideadlWidth,
//       height: maxHeight,
//     };
//   }, []);

//   // Setup high-quality canvas with proper DPI scaling
//   const setupHighDPICanvas = useCallback(
//     (canvas: HTMLCanvasElement, width: number, height: number) => {
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       const dpr = window.devicePixelRatio || 1;

//       // Set actual canvas size for high DPI
//       canvas.width = width * dpr;
//       canvas.height = height * dpr;

//       // Scale CSS size back down
//       canvas.style.width = `${width}px`;
//       canvas.style.height = `${height}px`;

//       // Scale the drawing context to match DPI
//       ctx.scale(dpr, dpr);

//       // Set high-quality rendering
//       ctx.imageSmoothingEnabled = true;
//       ctx.imageSmoothingQuality = "high";

//       return ctx;
//     },
//     []
//   );

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const newSize = calculateCanvasSize();
//       setCanvasSize(newSize);

//       if (previewCanvasRef.current) {
//         setupHighDPICanvas(
//           previewCanvasRef.current,
//           newSize.width,
//           newSize.height
//         );
//         if (isStreaming && videoRef.current) {
//           startPreview();
//         }
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [calculateCanvasSize, isStreaming, setupHighDPICanvas]);

//   // Load overlay image
//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => {
//       overlayImageRef.current = img;
//       setOverlayLoaded(true);
//     };
//     img.onerror = () => {
//       console.warn("Overlay image failed to load");
//       setOverlayLoaded(true); // Continue without overlay
//     };
//     img.src = "/GeneraliOverlay.png";
//   }, []);

//   // Check for multiple cameras
//   const checkMultipleCameras = async () => {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const videoDevices = devices.filter(
//         (device) => device.kind === "videoinput"
//       );
//       setHasMultipleCameras(videoDevices.length > 1);
//     } catch (error) {
//       console.error("Error checking cameras:", error);
//       setHasMultipleCameras(false);
//     }
//   };

//   // Start camera stream with higher resolution
//   const startCamera = async () => {
//     setInputMethod("camera");
//     try {
//       // Stop existing stream
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }

//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//         animationFrameRef.current = null;
//       }

//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: isFrontCamera ? "user" : "environment",
//           width: { ideal: 1920, min: 1280 },
//           height: { ideal: 1080, min: 720 },
//           aspectRatio: { ideal: 9 / 16 },
//           frameRate: { ideal: 30 },
//         },
//       });

//       setStream(mediaStream);

//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//         videoRef.current.onloadedmetadata = () => {
//           if (videoRef.current) {
//             videoRef.current
//               .play()
//               .then(() => {
//                 setIsStreaming(true);
//                 setCameraPermission(true);
//               })
//               .catch((error) => {
//                 console.error("Error playing video:", error);
//               });
//           }
//         };
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       setCameraPermission(false);
//     }
//   };

//   // Start preview animation with high-quality rendering
//   const startPreview = useCallback(() => {
//     if (!videoRef.current || !previewCanvasRef.current) return;

//     const video = videoRef.current;
//     const canvas = previewCanvasRef.current;

//     // Setup high-DPI canvas
//     const ctx = setupHighDPICanvas(canvas, canvasSize.width, canvasSize.height);
//     if (!ctx) return;

//     const animate = () => {
//       if (!videoRef.current || !previewCanvasRef.current) return;
//       if (!video || !ctx || video.paused || video.ended) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//         return;
//       }

//       const videoWidth = video.videoWidth;
//       const videoHeight = video.videoHeight;

//       if (videoWidth === 0 || videoHeight === 0) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//         return;
//       }

//       const { sx, sy, sWidth, sHeight } = getCropDimensions(
//         videoWidth,
//         videoHeight
//       );

//       ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

//       // Mirror for front camera
//       if (isFrontCamera) {
//         ctx.save();
//         ctx.translate(canvasSize.width, 0);
//         ctx.scale(-1, 1);
//       }

//       // High-quality video drawing
//       ctx.imageSmoothingEnabled = true;
//       ctx.imageSmoothingQuality = "high";
//       ctx.drawImage(
//         video,
//         sx,
//         sy,
//         sWidth,
//         sHeight,
//         0,
//         0,
//         canvasSize.width,
//         canvasSize.height
//       );

//       if (isFrontCamera) {
//         ctx.restore();
//       }

//       // Draw overlay if loaded
//       if (overlayImageRef.current && overlayLoaded) {
//         ctx.imageSmoothingEnabled = true;
//         ctx.imageSmoothingQuality = "high";
//         ctx.drawImage(
//           overlayImageRef.current,
//           0,
//           0,
//           canvasSize.width,
//           canvasSize.height
//         );
//       }

//       // Get name and number from sessionStorage and draw on preview
//       const savedName = sessionStorage.getItem("userName") || "";
//       const savedNumber = sessionStorage.getItem("userNumber") || "";

//       if (savedName || savedNumber) {
//         // Scale font size based on canvas size
//         const fontSize = Math.floor(canvasSize.width * 0.05); // Approximately 5% of width
//         ctx.font = `bold ${fontSize}px Inter, sans-serif`;
//         ctx.fillStyle = "#c21b17"; // red-500
//         ctx.textAlign = "left";
//         ctx.textBaseline = "top";

//         const nameY = canvasSize.height * (1 - 0.24);
//         const numberY = canvasSize.height * (1 - 0.185);
//         const leftX = 8;

//         if (savedName) {
//           ctx.fillText(savedName.toUpperCase(), leftX, nameY);
//         }

//         if (savedNumber) {
//           ctx.fillText(savedNumber.toUpperCase(), leftX, numberY);
//         }
//       }

//       animationFrameRef.current = requestAnimationFrame(animate);
//     };

//     animationFrameRef.current = requestAnimationFrame(animate);
//   }, [canvasSize, isFrontCamera, overlayLoaded, setupHighDPICanvas]);

//   // Get crop dimensions for 9:16 aspect ratio
//   const getCropDimensions = (videoWidth: number, videoHeight: number) => {
//     const targetRatio = 9 / 16;
//     let sx = 0,
//       sy = 0,
//       sWidth = videoWidth,
//       sHeight = videoHeight;

//     const videoRatio = videoWidth / videoHeight;

//     if (videoRatio > 9 / 16) {
//       // Video is wider, crop sides
//       sWidth = videoHeight * targetRatio;
//       sx = (videoWidth - sWidth) / 2;
//     } else {
//       // Video is taller, crop top/bottom
//       sHeight = videoWidth / targetRatio;
//       sy = (videoHeight - sHeight) / 2;
//     }

//     return { sx, sy, sWidth, sHeight };
//   };

//   // Start preview when streaming begins
//   useEffect(() => {
//     if (isStreaming && videoRef.current && previewCanvasRef.current) {
//       const checkVideoReady = () => {
//         const video = videoRef.current;
//         if (video && video.videoWidth > 0 && video.videoHeight > 0) {
//           setVideoSize((prev) => {
//             if (
//               prev.width !== video.videoWidth ||
//               prev.height !== video.videoHeight
//             ) {
//               return { width: video.videoWidth, height: video.videoHeight };
//             }
//             return prev;
//           });
//           startPreview();
//         } else {
//           setTimeout(checkVideoReady, 100);
//         }
//       };
//       checkVideoReady();
//     }
//   }, [isStreaming, startPreview]);

//   // Restart preview after retake
//   useEffect(() => {
//     if (
//       !capturedPhoto &&
//       isStreaming &&
//       videoRef.current &&
//       previewCanvasRef.current &&
//       currentScreen === "camera"
//     ) {
//       const timeout = setTimeout(() => {
//         startPreview();
//       }, 100);
//       return () => clearTimeout(timeout);
//     }
//   }, [capturedPhoto, isStreaming, currentScreen, startPreview]);

//   // Initialize camera when entering camera screen
//   useEffect(() => {
//     if (currentScreen === "camera") {
//       checkMultipleCameras();
//       startCamera();
//     }

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [currentScreen]);

//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current || !isStreaming) return;

//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//       animationFrameRef.current = null;
//     }

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const videoWidth = video.videoWidth;
//     const videoHeight = video.videoHeight;

//     if (videoWidth === 0 || videoHeight === 0) {
//       console.error("Video dimensions not available");
//       return;
//     }

//     // Use higher resolution for final capture
//     const finalWidth = 1080;
//     const finalHeight = 1920;

//     canvas.width = finalWidth;
//     canvas.height = finalHeight;

//     const { sx, sy, sWidth, sHeight } = getCropDimensions(
//       videoWidth,
//       videoHeight
//     );
//     const ctx = canvas.getContext("2d");

//     if (ctx) {
//       // Enable high-quality rendering for final capture
//       ctx.imageSmoothingEnabled = true;
//       ctx.imageSmoothingQuality = "high";

//       // Mirror for front camera
//       if (isFrontCamera) {
//         ctx.save();
//         ctx.translate(canvas.width, 0);
//         ctx.scale(-1, 1);
//       }

//       ctx.drawImage(
//         video,
//         sx,
//         sy,
//         sWidth,
//         sHeight,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );

//       if (isFrontCamera) {
//         ctx.restore();
//       }

//       // Add overlay with high quality
//       if (overlayImageRef.current && overlayLoaded) {
//         ctx.imageSmoothingEnabled = true;
//         ctx.imageSmoothingQuality = "high";
//         ctx.drawImage(
//           overlayImageRef.current,
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//       }

//       // Get name and number from sessionStorage
//       const savedName = sessionStorage.getItem("userName") || "";
//       const savedNumber = sessionStorage.getItem("userNumber") || "";

//       // Draw name and number on canvas
//       if (savedName || savedNumber) {
//         ctx.font = "bold 48px Inter, sans-serif";
//         ctx.fillStyle = "#c21b17"; // red-500
//         ctx.textAlign = "left";
//         ctx.textBaseline = "top";

//         // Calculate positions (matching the CSS positions from CameraScreen)
//         // bottom-[20.5%] means 20.5% from bottom
//         const nameY = finalHeight * (1 - 0.24); // 79.5% from top
//         const numberY = finalHeight * (1 - 0.18); // 85% from top
//         const leftX = 20; // left-2 equivalent

//         if (savedName) {
//           ctx.fillText(savedName.toUpperCase(), leftX, nameY);
//         }

//         if (savedNumber) {
//           ctx.fillText(savedNumber.toUpperCase(), leftX, numberY);
//         }
//       }

//       setCapturedPhoto({
//         src: canvas.toDataURL("image/jpeg", 0.95),
//         timestamp: Date.now(),
//       });
//       setCurrentScreen("preview");
//     }
//   };

//   // Replace the handleFileSelect function in CameraApp.tsx with this:

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMethod("file");
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file");
//       return;
//     }

//     const img = new Image();
//     img.src = URL.createObjectURL(file);
//     img.onload = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       canvas.width = 1080;
//       canvas.height = 1920;

//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       // Enable high-quality rendering
//       ctx.imageSmoothingEnabled = true;
//       ctx.imageSmoothingQuality = "high";

//       const targetRatio = 9 / 16;
//       const imgRatio = img.width / img.height;
//       let sx = 0,
//         sy = 0,
//         sWidth = img.width,
//         sHeight = img.height;

//       if (imgRatio > targetRatio) {
//         sWidth = img.height * targetRatio;
//         sx = (img.width - sWidth) / 2;
//       } else if (imgRatio < targetRatio) {
//         sHeight = img.width / targetRatio;
//         sy = (img.height - sHeight) / 2;
//       }

//       ctx.drawImage(
//         img,
//         sx,
//         sy,
//         sWidth,
//         sHeight,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );

//       // Add overlay with high quality
//       if (overlayImageRef.current && overlayLoaded) {
//         ctx.imageSmoothingEnabled = true;
//         ctx.imageSmoothingQuality = "high";
//         ctx.drawImage(
//           overlayImageRef.current,
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//       }

//       // Get name and number from sessionStorage
//       const savedName = sessionStorage.getItem("userName") || "";
//       const savedNumber = sessionStorage.getItem("userNumber") || "";

//       // Draw name and number on canvas
//       if (savedName || savedNumber) {
//         ctx.font = "bold 48px Inter, sans-serif";
//         ctx.fillStyle = "#c21b17"; // red-500
//         ctx.textAlign = "left";
//         ctx.textBaseline = "top";

//         // Calculate positions (matching the CSS positions from CameraScreen)
//         const nameY = canvas.height * (1 - 0.24);
//         const numberY = canvas.height * (1 - 0.185);
//         const leftX = 20; // left-2 equivalent

//         if (savedName) {
//           ctx.fillText(savedName.toUpperCase(), leftX, nameY);
//         }

//         if (savedNumber) {
//           ctx.fillText(savedNumber.toUpperCase(), leftX, numberY);
//         }
//       }

//       setCapturedPhoto({
//         src: canvas.toDataURL("image/jpeg", 0.95),
//         timestamp: Date.now(),
//       });
//       setCurrentScreen("preview");

//       URL.revokeObjectURL(img.src);
//     };

//     img.onerror = () => {
//       console.error("Error loading image file");
//       alert("Error loading image file");
//     };
//   };

//   // Download image
//   const downloadImage = (src: string, filename: string) => {
//     const link = document.createElement("a");
//     link.href = src;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Share photo
//   const sharePhoto = async () => {
//     if (!capturedPhoto) return;
//     setIsSharing(true);
//     try {
//       const response = await fetch(capturedPhoto.src);
//       const blob = await response.blob();
//       const file = new File(
//         [blob],
//         `Generali-Central-${capturedPhoto.timestamp}.jpg`,
//         {
//           type: "image/jpeg",
//         }
//       );
//       const shareData = {
//         // title: "My Generali Photo",
//         // text: "Celebrating New Beginnings with Generali Center",
//         files: [file],
//       };
//       if (navigator.canShare && navigator.canShare(shareData)) {
//         await navigator.share(shareData);
//       } else {
//         console.log("share cancelled");
//         return;
//       }
//     } catch (error) {
//       console.error("Error sharing photo:", error);
//     } finally {
//       setIsSharing(false);
//     }
//   };

//   // Download photo
//   const downloadPhoto = () => {
//     if (!capturedPhoto) return;
//     setIsDownloading(true);
//     try {
//       downloadImage(
//         capturedPhoto.src,
//         `Generali-Central-${capturedPhoto.timestamp}.jpg`
//       );
//     } catch (error) {
//       console.error("Error downloading photo:", error);
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   // Toggle camera
//   const toggleCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//       animationFrameRef.current = null;
//     }
//     setIsFrontCamera((prev) => !prev);
//     setIsStreaming(false);
//     setCapturedPhoto(null);
//     setVideoSize({ width: 0, height: 0 });
//     setTimeout(startCamera, 0);
//   };

//   // Go home
//   const goHome = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//       animationFrameRef.current = null;
//     }
//     setCapturedPhoto(null);
//     setIsStreaming(false);
//     setCurrentScreen("start");
//   };

//   // Retake photo
//   const retakePhoto = () => {
//     if (inputMethod === "camera") {
//       setCapturedPhoto(null);
//       setCurrentScreen("camera");
//       if (!isStreaming) {
//         startCamera();
//       }
//     } else {
//       fileInputRef.current?.click();
//     }
//   };

//   // Camera permission denied screen
//   if (cameraPermission === false) {
//     return <CameraDeniedScreen onReload={() => window.location.reload()} />;
//   }

//   return (
//     <div className="flex flex-col items-center justify-between h-dvh bg-[#ca140f] text-white">
//       <main className="flex flex-col items-center justify-between w-full h-full max-w-lg mx-auto p-4 relative">
//         {/* Hidden elements */}
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           muted
//           className="hidden"
//           style={{ objectFit: "cover" }}
//         />
//         <canvas ref={canvasRef} className="hidden" />
//         <input
//           type="file"
//           ref={fileInputRef}
//           accept="image/*"
//           onChange={handleFileSelect}
//           className="hidden"
//         />

//         {/* Home button */}
//         {currentScreen !== "start" && (
//           <button
//             onClick={goHome}
//             className="absolute left-4 bottom-8 bg-white text-red-700 p-3 rounded-full z-10"
//             aria-label="Go to home screen"
//           >
//             <Home className="h-6 w-6" />
//           </button>
//         )}

//         {/* Start Screen */}
//         {currentScreen === "start" && (
//           <StartScreen
//             onTakePhoto={() => setCurrentScreen("camera")}
//             onSelectPhoto={() => fileInputRef.current?.click()}
//           />
//         )}

//         {/* Camera Screen */}
//         {currentScreen === "camera" && (
//           <CameraScreen
//             canvasSize={canvasSize}
//             previewCanvasRef={
//               previewCanvasRef as React.RefObject<HTMLCanvasElement>
//             }
//             isStreaming={isStreaming}
//             overlayLoaded={overlayLoaded}
//             hasMultipleCameras={hasMultipleCameras}
//             onToggleCamera={toggleCamera}
//             onCapturePhoto={capturePhoto}
//           />
//         )}

//         {/* Preview Screen */}
//         {currentScreen === "preview" && capturedPhoto && (
//           <PreviewScreen
//             capturedPhoto={capturedPhoto}
//             inputMethod={inputMethod}
//             isSharing={isSharing}
//             isDownloading={isDownloading}
//             hasNativeShare={hasNativeShare}
//             onRetakePhoto={retakePhoto}
//             onShare={sharePhoto}
//             onDownload={downloadPhoto}
//             canvasSize={{
//               width: canvasSize.width,
//               height: canvasSize.height,
//             }}
//           />
//         )}
//       </main>
//     </div>
//   );
// }
// "use client";
// import React, { useEffect, useCallback } from "react"
// import { Home, RotateCcw, Share, Download, Upload, Loader2 } from "lucide-react"
// import StartScreen from "../components/StartScreen"
// import CameraDeniedScreen from "../components/CameraDeniedScreen"
// import CameraScreen from "../components/CameraScreen"
// import PreviewScreen from "../components/PreviewScreen"
// import { useCamera } from "../hooks/useCamera"
// import { useOverlayImage } from "../hooks/useOverlayImage"

// interface CapturedPhoto {
//   src: string
//   timestamp: number
// }

// interface CanvasSize {
//   width: number
//   height: number
// }

// export default function CameraApp() {
//   const { overlayImageRef, overlayLoaded } = useOverlayImage()
//   const {
//     videoRef,
//     canvasRef,
//     previewCanvasRef,
//     fileInputRef,
//     containerRef,
//     // overlayImageRef,
//     animationFrameRef,
//     currentScreen,
//     setCurrentScreen,
//     isStreaming,
//     setIsStreaming,
//     cameraPermission,
//     setCameraPermission,
//     capturedPhoto,
//     setCapturedPhoto,
//     isFrontCamera,
//     setIsFrontCamera,
//     stream,
//     setStream,
//     isProcessing,
//     setIsProcessing,
//     // overlayLoaded,
//     setOverlayLoaded,
//     hasMultipleCameras,
//     setHasMultipleCameras,
//     canvasSize,
//     setCanvasSize,
//     videoSize,
//     setVideoSize,
//     hasNativeShare,
//     setHasNativeShare,
//     inputMethod,
//     setInputMethod,
//   } = useCamera()

//   const [isSharing, setIsSharing] = React.useState(false)
//   const [isDownloading, setIsDownloading] = React.useState(false)

//   // Check for native share support
//   useEffect(() => {
//     const checkShareSupport = () => {
//       const isMobile = /iPad|iPhone|iPod|Android/i.test(navigator.userAgent)
//       return !!(typeof navigator.share === "function" && isMobile)
//     }
//     setHasNativeShare(checkShareSupport())
//   }, [])

//   // Calculate optimal canvas size
//   const calculateCanvasSize = useCallback((): CanvasSize => {
//     const maxHeight = window.innerHeight - 160
//     const idealWidth = (9 * maxHeight) / 16
//     const maxWidth = Math.min(window.innerWidth - 32, 500)

//     if (idealWidth > maxWidth) {
//       return {
//         width: maxWidth,
//         height: (16 * maxWidth) / 9,
//       }
//     }

//     return {
//       width: idealWidth,
//       height: maxHeight,
//     }
//   }, [])

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const newSize = calculateCanvasSize()
//       setCanvasSize(newSize)

//       if (previewCanvasRef.current) {
//         previewCanvasRef.current.width = newSize.width
//         previewCanvasRef.current.height = newSize.height
//         if (isStreaming && videoRef.current) {
//           startPreview()
//         }
//       }
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [calculateCanvasSize, isStreaming])

//   // Load overlay image
//   useEffect(() => {
//     const img = new Image()
//     img.crossOrigin = "anonymous"
//     img.onload = () => {
//       overlayImageRef.current = img
//       setOverlayLoaded(true)
//     }
//     img.onerror = () => {
//       console.warn("Overlay image failed to load")
//       setOverlayLoaded(true) // Continue without overlay
//     }
//     img.src = "/overlay.png" // Place your overlay image in public/overlay.png
//   }, [])

//   // Check for multiple cameras
//   const checkMultipleCameras = async () => {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices()
//       const videoDevices = devices.filter((device) => device.kind === "videoinput")
//       setHasMultipleCameras(videoDevices.length > 1)
//     } catch (error) {
//       console.error("Error checking cameras:", error)
//       setHasMultipleCameras(false)
//     }
//   }

//   // Start camera stream
//   const startCamera = async () => {
//     setInputMethod("camera")
//     try {
//       // Stop existing stream
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop())
//       }

//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current)
//         animationFrameRef.current = null
//       }

//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: isFrontCamera ? "user" : "environment",
//           width: { ideal: 1920 },
//           height: { ideal: 1080 },
//           aspectRatio: { ideal: 9 / 16 },
//         },
//       })

//       setStream(mediaStream)

//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream
//         videoRef.current.onloadedmetadata = () => {
//           if (videoRef.current) {
//             videoRef.current
//               .play()
//               .then(() => {
//                 setIsStreaming(true)
//                 setCameraPermission(true)
//               })
//               .catch((error) => {
//                 console.error("Error playing video:", error)
//               })
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error)
//       setCameraPermission(false)
//     }
//   }

//   // Start preview animation
//   const startPreview = useCallback(() => {
//     if (!videoRef.current || !previewCanvasRef.current) return

//     const video = videoRef.current
//     const canvas = previewCanvasRef.current
//     const ctx = canvas.getContext("2d")

//     if (!ctx) return

//     canvas.width = canvasSize.width
//     canvas.height = canvasSize.height

//     const animate = () => {
//       if (!videoRef.current || !previewCanvasRef.current) return
//       if (!video || !ctx || video.paused || video.ended) {
//         animationFrameRef.current = requestAnimationFrame(animate)
//         return
//       }

//       const videoWidth = video.videoWidth
//       const videoHeight = video.videoHeight

//       if (videoWidth === 0 || videoHeight === 0) {
//         animationFrameRef.current = requestAnimationFrame(animate)
//         return
//       }

//       // Update video size state
//       // (Removed setVideoSize from here to avoid infinite loop)

//       const { sx, sy, sWidth, sHeight } = getCropDimensions(videoWidth, videoHeight)

//       ctx.clearRect(0, 0, canvas.width, canvas.height)

//       // Mirror for front camera
//       if (isFrontCamera) {
//         ctx.save()
//         ctx.translate(canvas.width, 0)
//         ctx.scale(-1, 1)
//       }

//       ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)

//       if (isFrontCamera) {
//         ctx.restore()
//       }

//       // Draw overlay if loaded
//       if (overlayImageRef.current && overlayLoaded) {
//         ctx.imageSmoothingEnabled = true;
//         ctx.imageSmoothingQuality = 'high';
//         ctx.drawImage(overlayImageRef.current, 0, 0, canvas.width, canvas.height)
//       }

//       animationFrameRef.current = requestAnimationFrame(animate)
//     }

//     animationFrameRef.current = requestAnimationFrame(animate)
//   }, [canvasSize, isFrontCamera, overlayLoaded, videoSize])

//   // Get crop dimensions for 9:16 aspect ratio
//   const getCropDimensions = (videoWidth: number, videoHeight: number) => {
//     const targetRatio = 9 / 16
//     let sx = 0,
//       sy = 0,
//       sWidth = videoWidth,
//       sHeight = videoHeight

//     const videoRatio = videoWidth / videoHeight

//     if (videoRatio > 9 / 16) {
//       // Video is wider, crop sides
//       sWidth = videoHeight * targetRatio
//       sx = (videoWidth - sWidth) / 2
//     } else {
//       // Video is taller, crop top/bottom
//       sHeight = videoWidth / targetRatio
//       sy = (videoHeight - sHeight) / 2
//     }

//     return { sx, sy, sWidth, sHeight }
//   }

//   // Start preview when streaming begins
//   useEffect(() => {
//     if (isStreaming && videoRef.current && previewCanvasRef.current) {
//       const checkVideoReady = () => {
//         const video = videoRef.current
//         if (video && video.videoWidth > 0 && video.videoHeight > 0) {
//           // Only update if changed
//           setVideoSize((prev) => {
//             if (prev.width !== video.videoWidth || prev.height !== video.videoHeight) {
//               return { width: video.videoWidth, height: video.videoHeight }
//             }
//             return prev
//           })
//           startPreview()
//         } else {
//           setTimeout(checkVideoReady, 100)
//         }
//       }
//       checkVideoReady()
//     }
//   }, [isStreaming, startPreview])

//   // Restart preview after retake
//   useEffect(() => {
//     if (!capturedPhoto && isStreaming && videoRef.current && previewCanvasRef.current && currentScreen === "camera") {
//       const timeout = setTimeout(() => {
//         startPreview()
//       }, 100)
//       return () => clearTimeout(timeout)
//     }
//   }, [capturedPhoto, isStreaming, currentScreen, startPreview])

//   // Initialize camera when entering camera screen
//   useEffect(() => {
//     if (currentScreen === "camera") {
//       checkMultipleCameras()
//       startCamera()
//     }

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop())
//       }
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current)
//       }
//     }
//   }, [currentScreen])

//   // Capture photo
//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current || !isStreaming) return

//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current)
//       animationFrameRef.current = null
//     }

//     const video = videoRef.current
//     const canvas = canvasRef.current
//     const videoWidth = video.videoWidth
//     const videoHeight = video.videoHeight

//     if (videoWidth === 0 || videoHeight === 0) {
//       console.error("Video dimensions not available")
//       return
//     }

//     canvas.width = 1080
//     canvas.height = 1920

//     const { sx, sy, sWidth, sHeight } = getCropDimensions(videoWidth, videoHeight)
//     const ctx = canvas.getContext("2d")

//     if (ctx) {
//       // Mirror for front camera
//       if (isFrontCamera) {
//         ctx.save()
//         ctx.translate(canvas.width, 0)
//         ctx.scale(-1, 1)
//       }

//       ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)

//       if (isFrontCamera) {
//         ctx.restore()
//       }

//       // Add overlay
//       if (overlayImageRef.current && overlayLoaded) {
//         ctx.imageSmoothingEnabled = true;
//         ctx.imageSmoothingQuality = 'high';
//         ctx.drawImage(overlayImageRef.current, 0, 0, canvas.width, canvas.height)
//       }

//       setCapturedPhoto({
//         src: canvas.toDataURL("image/jpeg", 0.95),
//         timestamp: Date.now(),
//       })
//       setCurrentScreen("preview")
//     }
//   }

//   // Handle file selection - Fixed event handling
//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMethod("file")
//     const file = event.target.files?.[0]
//     if (!file) return

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file")
//       return
//     }

//     const img = new Image()
//     img.src = URL.createObjectURL(file)
//     img.onload = () => {
//       const canvas = canvasRef.current
//       if (!canvas) return

//       canvas.width = 1080
//       canvas.height = 1920

//       const ctx = canvas.getContext("2d")
//       if (!ctx) return

//       const targetRatio = 9 / 16
//       const imgRatio = img.width / img.height
//       let sx = 0,
//         sy = 0,
//         sWidth = img.width,
//         sHeight = img.height

//       if (imgRatio > targetRatio) {
//         sWidth = img.height * targetRatio
//         sx = (img.width - sWidth) / 2
//       } else if (imgRatio < targetRatio) {
//         sHeight = img.width / targetRatio
//         sy = (img.height - sHeight) / 2
//       }

//       ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)

//       // Add overlay
//       if (overlayImageRef.current && overlayLoaded) {
//         ctx.imageSmoothingEnabled = true;
//         ctx.imageSmoothingQuality = 'high';
//         ctx.drawImage(overlayImageRef.current, 0, 0, canvas.width, canvas.height)
//       }

//       setCapturedPhoto({
//         src: canvas.toDataURL("image/jpeg", 0.95),
//         timestamp: Date.now(),
//       })
//       setCurrentScreen("preview")

//       // Clean up the object URL
//       URL.revokeObjectURL(img.src)
//     }

//     img.onerror = () => {
//       console.error("Error loading image file")
//       alert("Error loading image file")
//     }
//   }

//   // Download image
//   const downloadImage = (src: string, filename: string) => {
//     const link = document.createElement("a")
//     link.href = src
//     link.download = filename
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   // Share photo
//   const sharePhoto = async () => {
//     if (!capturedPhoto) return
//     setIsSharing(true)
//     try {
//       const response = await fetch(capturedPhoto.src)
//       const blob = await response.blob()
//       const file = new File([blob], `Generali-Central-${capturedPhoto.timestamp}.jpg`, {
//         type: "image/jpeg",
//       })
//       const shareData = {
//         title: "My Generali Photo",
//         text: "Celebrating New Beginnings with Generali Center",
//         files: [file],
//       }
//       if (navigator.canShare && navigator.canShare(shareData)) {
//         await navigator.share(shareData)
//       } else {
//         console.log("share cancelled")
//         return;
//       }
//     } catch (error) {
//       console.error("Error sharing photo:", error)
//       // downloadImage(capturedPhoto.src, `Generali-Here-Now-${capturedPhoto.timestamp}.jpg`)
//     } finally {
//       setIsSharing(false)
//     }
//   }

//   // Download photo
//   const downloadPhoto = () => {
//     if (!capturedPhoto) return
//     setIsDownloading(true)
//     try {
//       downloadImage(capturedPhoto.src, `Generali-Central-${capturedPhoto.timestamp}.jpg`)
//     } catch (error) {
//       console.error("Error downloading photo:", error)
//     } finally {
//       setIsDownloading(false)
//     }
//   }

//   // Toggle camera
//   const toggleCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop())
//     }
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current)
//       animationFrameRef.current = null
//     }
//     setIsFrontCamera((prev) => !prev)
//     setIsStreaming(false)
//     setCapturedPhoto(null)
//     setVideoSize({ width: 0, height: 0 })
//     setTimeout(startCamera, 0)
//   }

//   // Go home
//   const goHome = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop())
//     }
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current)
//       animationFrameRef.current = null
//     }
//     setCapturedPhoto(null)
//     setIsStreaming(false)
//     setCurrentScreen("start")
//   }

//   // Retake photo
//   const retakePhoto = () => {
//     if (inputMethod === "camera") {
//       setCapturedPhoto(null)
//       setCurrentScreen("camera")
//       if (!isStreaming) {
//         startCamera()
//       }
//     } else {
//       fileInputRef.current?.click()
//     }
//   }

//   // Camera permission denied screen
//   if (cameraPermission === false) {
//     return (
//       <CameraDeniedScreen onReload={() => window.location.reload()} />
//     )
//   }

//   return (
//     <div className="flex flex-col items-center justify-between h-dvh bg-[#ca140f] text-white">
//       <main className="flex flex-col items-center justify-between w-full h-full max-w-lg mx-auto p-4 relative">
//         {/* Hidden elements */}
//         <video ref={videoRef} autoPlay playsInline muted className="hidden" style={{ objectFit: "cover" }} />
//         <canvas ref={canvasRef} className="hidden" />
//         <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} className="hidden" />

//         {/* Home button (shown on camera and preview screens) */}
//         {currentScreen !== "start" && (
//           <button
//             onClick={goHome}
//             className="absolute left-4 bottom-8 bg-white text-red-700 p-3 rounded-full z-10"
//             aria-label="Go to home screen"
//           >
//             <Home className="h-6 w-6" />
//           </button>
//         )}

//         {/* Start Screen */}
//         {currentScreen === "start" && (
//           <StartScreen
//             onTakePhoto={() => setCurrentScreen("camera")}
//             onSelectPhoto={() => fileInputRef.current?.click()}
//           />
//         )}

//         {/* Camera Screen */}
//         {currentScreen === "camera" && (
//           <CameraScreen
//             canvasSize={canvasSize}
//             previewCanvasRef={previewCanvasRef as React.RefObject<HTMLCanvasElement>}
//             isStreaming={isStreaming}
//             overlayLoaded={overlayLoaded}
//             hasMultipleCameras={hasMultipleCameras}
//             onToggleCamera={toggleCamera}
//             onCapturePhoto={capturePhoto}
//           />
//         )}

//         {/* Preview Screen */}
//         {currentScreen === "preview" && capturedPhoto && (
//           <PreviewScreen
//             capturedPhoto={capturedPhoto}
//             inputMethod={inputMethod}
//             isSharing={isSharing}
//             isDownloading={isDownloading}
//             hasNativeShare={hasNativeShare}
//             onRetakePhoto={retakePhoto}
//             onShare={sharePhoto}
//             onDownload={downloadPhoto}
//             canvasSize={{
//               width: canvasSize.width,
//               height: canvasSize.height
//             }}
//           />
//         )}
//       </main>
//     </div>
//   )
// }

"use client";
import React, { useEffect, useCallback } from "react";
import {
  Home,
  RotateCcw,
  Share,
  Download,
  Upload,
  Loader2,
} from "lucide-react";
import StartScreen from "../components/StartScreen";
import CameraDeniedScreen from "../components/CameraDeniedScreen";
import CameraScreen from "../components/CameraScreen";
import PreviewScreen from "../components/PreviewScreen";
import { useCamera } from "../hooks/useCamera";
import { useOverlayImage } from "../hooks/useOverlayImage";

interface CapturedPhoto {
  src: string;
  timestamp: number;
}

interface CanvasSize {
  width: number;
  height: number;
}

export default function CameraApp() {
  const { overlayImageRef, overlayLoaded } = useOverlayImage();
  const {
    videoRef,
    canvasRef,
    previewCanvasRef,
    fileInputRef,
    containerRef,
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
  } = useCamera();

  const [isSharing, setIsSharing] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Check for native share support
  useEffect(() => {
    const checkShareSupport = () => {
      const isMobile = /iPad|iPhone|iPod|Android/i.test(navigator.userAgent);
      return !!(typeof navigator.share === "function" && isMobile);
    };
    setHasNativeShare(checkShareSupport());
  }, []);

  // Calculate optimal canvas size with device pixel ratio
  const calculateCanvasSize = useCallback((): CanvasSize => {
    const maxHeight = window.innerHeight - 160;
    const ideadlWidth = (9 * maxHeight) / 16;
    const maxWidth = Math.min(window.innerWidth - 32, 500);

    if (ideadlWidth > maxWidth) {
      return {
        width: maxWidth,
        height: (16 * maxWidth) / 9,
      };
    }

    return {
      width: ideadlWidth,
      height: maxHeight,
    };
  }, []);

  // Setup high-quality canvas with proper DPI scaling
  const setupHighDPICanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;

      // Set actual canvas size for high DPI
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Scale CSS size back down
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Scale the drawing context to match DPI
      ctx.scale(dpr, dpr);

      // Set high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      return ctx;
    },
    []
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newSize = calculateCanvasSize();
      setCanvasSize(newSize);

      if (previewCanvasRef.current) {
        setupHighDPICanvas(
          previewCanvasRef.current,
          newSize.width,
          newSize.height
        );
        if (isStreaming && videoRef.current) {
          startPreview();
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateCanvasSize, isStreaming, setupHighDPICanvas]);

  // Load overlay image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      overlayImageRef.current = img;
      setOverlayLoaded(true);
    };
    img.onerror = () => {
      console.warn("Overlay image failed to load");
      setOverlayLoaded(true); // Continue without overlay
    };
    img.src = "/GeneraliOverlay.png";
  }, []);

  // Check for multiple cameras (guarded for iOS Safari)
  const checkMultipleCameras = async () => {
    try {
      const hasEnumerate =
        typeof navigator !== "undefined" &&
        (navigator as any).mediaDevices &&
        typeof (navigator as any).mediaDevices.enumerateDevices === "function";

      if (!hasEnumerate) {
        setHasMultipleCameras(false);
        return;
      }

      const devices = await (navigator as any).mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device: MediaDeviceInfo) => device.kind === "videoinput"
      );
      setHasMultipleCameras(videoDevices.length > 1);
    } catch (error) {
      console.error("Error checking cameras:", error);
      setHasMultipleCameras(false);
    }
  };

  // Start camera stream with higher resolution (and iOS fallbacks)
  const startCamera = async () => {
    setInputMethod("camera");
    try {
      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Detect getUserMedia capability (including iOS webkit prefix)
      const mediaDevices = (navigator as any).mediaDevices;
      const webkitGetUserMedia = (navigator as any).webkitGetUserMedia;

      const getUserMedia: ((c: MediaStreamConstraints) => Promise<MediaStream>) | null =
        mediaDevices && typeof mediaDevices.getUserMedia === "function"
          ? (c) => mediaDevices.getUserMedia(c)
          : typeof webkitGetUserMedia === "function"
          ? (c) =>
              new Promise((resolve, reject) =>
                webkitGetUserMedia.call(navigator, c, resolve, reject)
              )
          : null;

      if (!getUserMedia) {
        throw new Error(
          "Camera API not available. Please use Safari 11+ on iOS and ensure HTTPS."
        );
      }

      // Keep constraints simple for iOS Safari compatibility
      const mediaStream = await getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          // aspectRatio and frameRate constraints can cause failures on some iOS builds
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                setIsStreaming(true);
                setCameraPermission(true);
              })
              .catch((error) => {
                console.error("Error playing video:", error);
              });
          }
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermission(false);
    }
  };

  // Start preview animation with high-quality rendering
  const startPreview = useCallback(() => {
    if (!videoRef.current || !previewCanvasRef.current) return;

    const video = videoRef.current;
    const canvas = previewCanvasRef.current;

    // Setup high-DPI canvas
    const ctx = setupHighDPICanvas(canvas, canvasSize.width, canvasSize.height);
    if (!ctx) return;

    const animate = () => {
      if (!videoRef.current || !previewCanvasRef.current) return;
      if (!video || !ctx || video.paused || video.ended) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      if (videoWidth === 0 || videoHeight === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const { sx, sy, sWidth, sHeight } = getCropDimensions(
        videoWidth,
        videoHeight
      );

      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // Mirror for front camera
      if (isFrontCamera) {
        ctx.save();
        ctx.translate(canvasSize.width, 0);
        ctx.scale(-1, 1);
      }

      // High-quality video drawing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        video,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        canvasSize.width,
        canvasSize.height
      );

      if (isFrontCamera) {
        ctx.restore();
      }

      // Draw overlay if loaded
      if (overlayImageRef.current && overlayLoaded) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          overlayImageRef.current,
          0,
          0,
          canvasSize.width,
          canvasSize.height
        );
      }

      // Get name and number from sessionStorage and draw on preview
      const savedName = sessionStorage.getItem("userName") || "";
      const savedNumber = sessionStorage.getItem("userNumber") || "";

      if (savedName || savedNumber) {
        // Scale font size based on canvas size
        const fontSize = Math.floor(canvasSize.width * 0.05); // Approximately 5% of width
        ctx.font = `bold ${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = "#c21b17"; // red-500
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        const nameY = canvasSize.height * (1 - 0.24);
        const numberY = canvasSize.height * (1 - 0.185);
        const leftX = 8;

        if (savedName) {
          ctx.fillText(savedName.toUpperCase(), leftX, nameY);
        }

        if (savedNumber) {
          ctx.fillText(savedNumber.toUpperCase(), leftX, numberY);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [canvasSize, isFrontCamera, overlayLoaded, setupHighDPICanvas]);

  // Get crop dimensions for 9:16 aspect ratio
  const getCropDimensions = (videoWidth: number, videoHeight: number) => {
    const targetRatio = 9 / 16;
    let sx = 0,
      sy = 0,
      sWidth = videoWidth,
      sHeight = videoHeight;

    const videoRatio = videoWidth / videoHeight;

    if (videoRatio > 9 / 16) {
      // Video is wider, crop sides
      sWidth = videoHeight * targetRatio;
      sx = (videoWidth - sWidth) / 2;
    } else {
      // Video is taller, crop top/bottom
      sHeight = videoWidth / targetRatio;
      sy = (videoHeight - sHeight) / 2;
    }

    return { sx, sy, sWidth, sHeight };
  };

  // Start preview when streaming begins
  useEffect(() => {
    if (isStreaming && videoRef.current && previewCanvasRef.current) {
      const checkVideoReady = () => {
        const video = videoRef.current;
        if (video && video.videoWidth > 0 && video.videoHeight > 0) {
          setVideoSize((prev) => {
            if (
              prev.width !== video.videoWidth ||
              prev.height !== video.videoHeight
            ) {
              return { width: video.videoWidth, height: video.videoHeight };
            }
            return prev;
          });
          startPreview();
        } else {
          setTimeout(checkVideoReady, 100);
        }
      };
      checkVideoReady();
    }
  }, [isStreaming, startPreview]);

  // Restart preview after retake
  useEffect(() => {
    if (
      !capturedPhoto &&
      isStreaming &&
      videoRef.current &&
      previewCanvasRef.current &&
      currentScreen === "camera"
    ) {
      const timeout = setTimeout(() => {
        startPreview();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [capturedPhoto, isStreaming, currentScreen, startPreview]);

  // Initialize camera when entering camera screen
  useEffect(() => {
    if (currentScreen === "camera") {
      // Guard: avoid trying camera on environments without support (iOS in-app browsers)
      const mediaDevices = (typeof navigator !== "undefined" && (navigator as any).mediaDevices) || null;
      const hasGum = !!(mediaDevices && typeof mediaDevices.getUserMedia === "function");
      const hasWebkitGum = !!(typeof (navigator as any).webkitGetUserMedia === "function");

      if (!hasGum && !hasWebkitGum) {
        setCameraPermission(false);
        return;
      }

      checkMultipleCameras();
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentScreen]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    if (videoWidth === 0 || videoHeight === 0) {
      console.error("Video dimensions not available");
      return;
    }

    // Use higher resolution for final capture
    const finalWidth = 1080;
    const finalHeight = 1920;

    canvas.width = finalWidth;
    canvas.height = finalHeight;

    const { sx, sy, sWidth, sHeight } = getCropDimensions(
      videoWidth,
      videoHeight
    );
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Enable high-quality rendering for final capture
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Mirror for front camera
      if (isFrontCamera) {
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(
        video,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (isFrontCamera) {
        ctx.restore();
      }

      // Add overlay with high quality
      if (overlayImageRef.current && overlayLoaded) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          overlayImageRef.current,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      // Get name and number from sessionStorage
      const savedName = sessionStorage.getItem("userName") || "";
      const savedNumber = sessionStorage.getItem("userNumber") || "";

      // Draw name and number on canvas
      if (savedName || savedNumber) {
        ctx.font = "bold 48px Inter, sans-serif";
        ctx.fillStyle = "#c21b17"; // red-500
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // Calculate positions (matching the CSS positions from CameraScreen)
        // bottom-[20.5%] means 20.5% from bottom
        const nameY = finalHeight * (1 - 0.24); // 79.5% from top
        const numberY = finalHeight * (1 - 0.18); // 85% from top
        const leftX = 20; // left-2 equivalent

        if (savedName) {
          ctx.fillText(savedName.toUpperCase(), leftX, nameY);
        }

        if (savedNumber) {
          ctx.fillText(savedNumber.toUpperCase(), leftX, numberY);
        }
      }

      setCapturedPhoto({
        src: canvas.toDataURL("image/jpeg", 0.95),
        timestamp: Date.now(),
      });
      setCurrentScreen("preview");
    }
  };

  // Replace the handleFileSelect function in CameraApp.tsx with this:

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMethod("file");
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = 1080;
      canvas.height = 1920;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Enable high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const targetRatio = 9 / 16;
      const imgRatio = img.width / img.height;
      let sx = 0,
        sy = 0,
        sWidth = img.width,
        sHeight = img.height;

      if (imgRatio > targetRatio) {
        sWidth = img.height * targetRatio;
        sx = (img.width - sWidth) / 2;
      } else if (imgRatio < targetRatio) {
        sHeight = img.width / targetRatio;
        sy = (img.height - sHeight) / 2;
      }

      ctx.drawImage(
        img,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Add overlay with high quality
      if (overlayImageRef.current && overlayLoaded) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          overlayImageRef.current,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      // Get name and number from sessionStorage
      const savedName = sessionStorage.getItem("userName") || "";
      const savedNumber = sessionStorage.getItem("userNumber") || "";

      // Draw name and number on canvas
      if (savedName || savedNumber) {
        ctx.font = "bold 48px Inter, sans-serif";
        ctx.fillStyle = "#c21b17"; // red-500
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // Calculate positions (matching the CSS positions from CameraScreen)
        const nameY = canvas.height * (1 - 0.24);
        const numberY = canvas.height * (1 - 0.185);
        const leftX = 20; // left-2 equivalent

        if (savedName) {
          ctx.fillText(savedName.toUpperCase(), leftX, nameY);
        }

        if (savedNumber) {
          ctx.fillText(savedNumber.toUpperCase(), leftX, numberY);
        }
      }

      setCapturedPhoto({
        src: canvas.toDataURL("image/jpeg", 0.95),
        timestamp: Date.now(),
      });
      setCurrentScreen("preview");

      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      console.error("Error loading image file");
      alert("Error loading image file");
    };
  };

  // Download image
  const downloadImage = (src: string, filename: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share photo
  const sharePhoto = async () => {
    if (!capturedPhoto) return;
    setIsSharing(true);
    try {
      const response = await fetch(capturedPhoto.src);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `Generali-Central-${capturedPhoto.timestamp}.jpg`,
        {
          type: "image/jpeg",
        }
      );
      const shareData = {
        // title: "My Generali Photo",
        // text: "Celebrating New Beginnings with Generali Center",
        files: [file],
      };
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        console.log("share cancelled");
        return;
      }
    } catch (error) {
      console.error("Error sharing photo:", error);
    } finally {
      setIsSharing(false);
    }
  };

  // Download photo
  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    setIsDownloading(true);
    try {
      downloadImage(
        capturedPhoto.src,
        `Generali-Central-${capturedPhoto.timestamp}.jpg`
      );
    } catch (error) {
      console.error("Error downloading photo:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsFrontCamera((prev) => !prev);
    setIsStreaming(false);
    setCapturedPhoto(null);
    setVideoSize({ width: 0, height: 0 });
    setTimeout(startCamera, 0);
  };

  // Go home
  const goHome = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setCapturedPhoto(null);
    setIsStreaming(false);
    setCurrentScreen("start");
  };

  // Retake photo
  const retakePhoto = () => {
    if (inputMethod === "camera") {
      setCapturedPhoto(null);
      setCurrentScreen("camera");
      if (!isStreaming) {
        startCamera();
      }
    } else {
      fileInputRef.current?.click();
    }
  };

  // Camera permission denied screen
  if (cameraPermission === false) {
    return <CameraDeniedScreen onReload={() => window.location.reload()} />;
  }

  return (
    <div className="flex flex-col items-center justify-between h-dvh bg-[#ca140f] text-white">
      <main className="flex flex-col items-center justify-between w-full h-full max-w-lg mx-auto p-4 relative">
        {/* Hidden elements */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="hidden"
          style={{ objectFit: "cover" }}
        />
        <canvas ref={canvasRef} className="hidden" />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Home button */}
        {currentScreen !== "start" && (
          <button
            onClick={goHome}
            className="absolute left-4 bottom-8 bg-white text-red-700 p-3 rounded-full z-10"
            aria-label="Go to home screen"
          >
            <Home className="h-6 w-6" />
          </button>
        )}

        {/* Start Screen */}
        {currentScreen === "start" && (
          <StartScreen
            onTakePhoto={() => setCurrentScreen("camera")}
            onSelectPhoto={() => fileInputRef.current?.click()}
          />
        )}

        {/* Camera Screen */}
        {currentScreen === "camera" && (
          <CameraScreen
            canvasSize={canvasSize}
            previewCanvasRef={
              previewCanvasRef as React.RefObject<HTMLCanvasElement>
            }
            isStreaming={isStreaming}
            overlayLoaded={overlayLoaded}
            hasMultipleCameras={hasMultipleCameras}
            onToggleCamera={toggleCamera}
            onCapturePhoto={capturePhoto}
          />
        )}

        {/* Preview Screen */}
        {currentScreen === "preview" && capturedPhoto && (
          <PreviewScreen
            capturedPhoto={capturedPhoto}
            inputMethod={inputMethod}
            isSharing={isSharing}
            isDownloading={isDownloading}
            hasNativeShare={hasNativeShare}
            onRetakePhoto={retakePhoto}
            onShare={sharePhoto}
            onDownload={downloadPhoto}
            canvasSize={{
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          />
        )}
      </main>
    </div>
  );
}
