import React from "react"
import { Upload, Download, Share2, Loader2, Camera } from "lucide-react"

interface PreviewScreenProps {
  canvasSize: { width: number; height: number }
  capturedPhoto: { src: string; timestamp: number }
  inputMethod: "camera" | "file"
  isSharing: boolean
  isDownloading: boolean
  hasNativeShare: boolean
  onRetakePhoto: () => void
  onShare: () => void
  onDownload: () => void
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({
  canvasSize,
  capturedPhoto,
  inputMethod,
  isSharing,
  isDownloading,
  hasNativeShare,
  onRetakePhoto,
  onShare,
  onDownload,
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
          <img
            className="rounded-lg w-full h-full object-contain"
            src={capturedPhoto.src}
            alt="Captured photo"
          />
        </div>
      </div>
    </div>
    <div className="h-8 mt-2" />
    <div className="w-full py-4 h-20 flex items-center">
      <div className="flex gap-2 md:gap-4 items-stretch justify-between w-full">
        <div className="w-12" />
        <button
          onClick={onRetakePhoto}
          disabled={isSharing || isDownloading}
          className={`bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center shadow-md hover:bg-gray-600 min-h-12 flex-1 ${
            isSharing || isDownloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label={inputMethod === "camera" ? "Retake photo" : "Select another file"}
        >
          <div className="flex items-center justify-center">
             {inputMethod === "camera" ? (
                <Camera className="h-5 w-5 min-w-5 mr-2 flex-shrink-0" />
              ) : (
                <Upload className="h-5 w-5 min-w-5 mr-2 flex-shrink-0" />
              )}
            <span className={`${inputMethod !== "camera" ?"text-sm" :"text-base"}`} >{inputMethod === "camera" ? "Retake" : "Select Another"}</span>
          </div>
        </button>
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className={`bg-white text-red-800 py-3 px-4 rounded-full md:rounded-lg flex items-center justify-center shadow-md hover:bg-white/90 min-h-12 md:flex-1 ${
            isDownloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Download photo"
        >
          {isDownloading ? (
            <div className="flex items-center justify-center w-full">
              <Loader2 className="animate-spin h-5 w-5 min-w-5 md:mr-2 flex-shrink-0" />
              <span className="hidden md:inline-block">Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
                <Download className="h-5 w-5 min-w-5 md:mr-2 flex-shrink-0" />
              <span className="text-center hidden md:inline-block">Download</span>
            </div>
          )}
        </button>
        {hasNativeShare ? (
            <button
              onClick={onShare}
              disabled={isSharing}
              className={`bg-white text-red-800 py-3 px-4 rounded-full md:rounded-lg flex items-center justify-center shadow-md hover:bg-white/90 min-h-12 md:flex-1 ${
                isSharing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Share photo"
            >
              {isSharing ? (
                <div className="flex items-center justify-center w-full">
                  <Loader2 className="animate-spin h-5 w-5 min-w-5 md:mr-2 flex-shrink-0" />
                  <span className="hidden md:inline-block">Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                    <Share2 className="h-5 w-5 min-w-5 mr-0 md:mr-2 flex-shrink-0" />
                </div>
              )}
            </button>
          ) : (
            ''
        )}


        {/* <button
          onClick={onShareOrDownload}
          disabled={isProcessing}
          className={`bg-white text-red-800 py-3 px-4 rounded-full md:rounded-lg flex items-center justify-center shadow-md hover:bg-white/90 min-h-12 md:flex-1 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label={hasNativeShare ? "Share photo" : "Download photo"}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center w-full">
              <Loader2 className="animate-spin h-5 w-5 min-w-5 mr-2 flex-shrink-0" />
              <span className="hidden md:inline-block">Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              {hasNativeShare ? (
                <Share2 className="h-5 w-5 min-w-5 md:mr-2 flex-shrink-0" />
              ) : (
                <Download className="h-5 w-5 min-w-5 md:mr-2 flex-shrink-0" />
              )}
              <span className="text-center hidden md:inline-block">{hasNativeShare ? "Share" : "Download"}</span>
            </div>
          )}
        </button> */}

      </div>
    </div>
  </div>
)

export default PreviewScreen; 