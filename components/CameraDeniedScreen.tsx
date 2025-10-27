import React from "react"

interface CameraDeniedScreenProps {
  onReload: () => void
}

const CameraDeniedScreen: React.FC<CameraDeniedScreenProps> = ({ onReload }) => (
  <div className="flex flex-col items-center justify-center h-dvh p-4 bg-red-50 text-red-900">
    <h1 className="text-2xl font-bold mb-4">Camera Access Denied</h1>
    <p className="text-center mb-6">
      We need camera access to take photos. Please allow camera access in your browser settings and reload the page.
    </p>
    <button
      onClick={onReload}
      className="bg-red-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-700"
    >
      Reload Page
    </button>
  </div>
)

export default CameraDeniedScreen; 