// import React, { RefObject } from "react"
// import { RotateCcw } from "lucide-react"

// interface CameraScreenProps {
//   canvasSize: { width: number; height: number }
//   previewCanvasRef: RefObject<HTMLCanvasElement>
//   isStreaming: boolean
//   overlayLoaded: boolean
//   hasMultipleCameras: boolean
//   onToggleCamera: () => void
//   onCapturePhoto: () => void
// }

// const CameraScreen: React.FC<CameraScreenProps> = ({
//   canvasSize,
//   previewCanvasRef,
//   isStreaming,
//   overlayLoaded,
//   hasMultipleCameras,
//   onToggleCamera,
//   onCapturePhoto,
// }) => (
//   <div className="flex flex-col w-full flex-1 overflow-hidden">
//     <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
//       <div
//         className="relative overflow-hidden rounded-lg shadow-lg"
//         style={{
//           width: `${canvasSize.width}px`,
//           height: `${canvasSize.height}px`,
//           maxHeight: "calc(100vh - 160px)",
//           aspectRatio: "9/16",
//         }}
//       >
//         <div className="w-full h-full relative">
//           <canvas
//             ref={previewCanvasRef}
//             className="absolute inset-0 w-full h-full bg-black rounded-lg"
//             width={canvasSize.width}
//             height={canvasSize.height}
//           />
//         </div>
//       </div>
//     </div>
//     <div className="h-8 mt-2" />
//     <div className="w-full py-4 h-20 flex items-center">
//       <div className="flex items-center justify-between w-full">
//         {hasMultipleCameras ? (
//           <button
//             onClick={onToggleCamera}
//             className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"
//             aria-label="Toggle camera"
//           >
//             <RotateCcw className="h-6 w-6" />
//           </button>
//         ) : (
//           <div className="w-12" />
//         )}
//         <button
//           onClick={onCapturePhoto}
//           disabled={!isStreaming || !overlayLoaded}
//           className={`bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg ${
//             isStreaming && overlayLoaded ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
//           }`}
//           aria-label="Take photo"
//         >
//           <div className="w-14 h-14 rounded-full border-2 border-red-600" />
//         </button>
//         <div className="w-12" />
//       </div>
//     </div>
//   </div>
// )

// export default CameraScreen; 
import React, { RefObject } from "react"
import { RotateCcw } from "lucide-react"

interface CameraScreenProps {
  canvasSize: { width: number; height: number }
  previewCanvasRef: RefObject<HTMLCanvasElement>
  isStreaming: boolean
  overlayLoaded: boolean
  hasMultipleCameras: boolean
  onToggleCamera: () => void
  onCapturePhoto: () => void
}

const CameraScreen: React.FC<CameraScreenProps> = ({
  canvasSize,
  previewCanvasRef,
  isStreaming,
  overlayLoaded,
  hasMultipleCameras,
  onToggleCamera,
  onCapturePhoto,
}) => (
  <div className="flex flex-col w-full flex-1 overflow-hidden">
    <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
      <div
        className="relative overflow-hidden rounded-lg shadow-lg"
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
          maxHeight: "calc(100vh - 160px)",
          aspectRatio: "9/16",
        }}
      >
        <div className="w-full h-full relative">
          <canvas
            ref={previewCanvasRef}
            className="absolute inset-0 w-full h-full bg-black rounded-lg"
            width={canvasSize.width}
            height={canvasSize.height}
            style={{
              // Ensure crisp rendering
              imageRendering: 'pixelated',
              // Alternative for better quality:
              // imageRendering: 'crisp-edges',
              // For high DPI displays
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`,
            }}
          />
        </div>
      </div>
    </div>
    <div className="h-8 mt-2" />
    <div className="w-full py-4 h-20 flex items-center">
      <div className="flex items-center justify-between w-full">
        {hasMultipleCameras ? (
          <button
            onClick={onToggleCamera}
            className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"
            aria-label="Toggle camera"
          >
            <RotateCcw className="h-6 w-6" />
          </button>
        ) : (
          <div className="w-12" />
        )}
        <button
          onClick={onCapturePhoto}
          disabled={!isStreaming || !overlayLoaded}
          className={`bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg ${
            isStreaming && overlayLoaded ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
          }`}
          aria-label="Take photo"
        >
          <div className="w-14 h-14 rounded-full border-2 border-red-600" />
        </button>
        <div className="w-12" />
      </div>
    </div>
  </div>
)

export default CameraScreen;