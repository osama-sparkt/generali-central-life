// import { Camera, Upload } from "lucide-react";
// import React from "react"
// import Image from 'next/image'

// interface StartScreenProps {
//   onTakePhoto: () => void
//   onSelectPhoto: () => void
// }

// const StartScreen: React.FC<StartScreenProps> = ({ onTakePhoto, onSelectPhoto }) => (
//   <div className="flex flex-col items-center justify-center h-full w-full">
//     <h1 className="text-xl md:text-2xl font-bold mb-5 text-center">Celebrating New Beginnings with</h1>
//     <div className="mb-10">
//       <Image
//               className=" object-cover"
//               height={112}
//               width={200}
//               alt=""
//               src="/generali-central-logo-white.png"
//             />
//     </div>
//     <div className="mb-5">
//       hello
//     </div>
//     <div className="flex flex-col gap-6 w-full max-w-xs">
//       <button
//         onClick={onTakePhoto}
//         className="bg-white flex items-center justify-center text-red-800 py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:bg-white/90"
//       >
//         <Camera size={20} className=" mr-2 flex-shrink-0" />
//         Take a Photo
//       </button>
//       <button
//         onClick={onSelectPhoto}
//         className="bg-gray-700 flex items-center justify-center text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-600"
//       >
//          <Upload size={20} className=" mr-2 flex-shrink-0" />
//         Select a Photo
//       </button>
//     </div>
//   </div>
// )

// export default StartScreen;
import { Camera, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface StartScreenProps {
  onTakePhoto: () => void;
  onSelectPhoto: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  onTakePhoto,
  onSelectPhoto,
}) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  useEffect(() => {
    const savedName = sessionStorage.getItem('userName')
    const savedNumber = sessionStorage.getItem('userNumber')
    
    if (savedName) setName(savedName)
    if (savedNumber) setNumber(savedNumber)
  }, [])
  const handleSaveAndProceed = (callback: () => void) => {
    // Validate inputs
    if (!name.trim() || !number.trim()) {
      alert("Please fill in both name and number fields");
      return;
    }

    // Save to sessionStorage
    sessionStorage.setItem("userName", name);
    sessionStorage.setItem("userNumber", number);

    console.log("Data saved to sessionStorage:", { name, number });
    callback();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-5 text-center">
        Celebrating New Beginnings with
      </h1>
      <div className="mb-10">
        <Image
          className="object-cover"
          height={112}
          width={200}
          alt=""
          src="/generali-central-logo-white.png"
        />
      </div>
      <div className="mb-5 w-full max-w-xs">
        <form className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-900"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-900"
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Button
          disabled={name === "" || number === ""}
          onClick={() => handleSaveAndProceed(onTakePhoto)}
          className="bg-white flex items-center justify-center text-red-800 rounded-lg font-bold text-lg shadow-lg hover:bg-white/90"
        >
          <Camera size={20} className="mr-2 flex-shrink-0" />
          Take a Photo
        </Button>
        <Button
          disabled={name === "" || number === ""}
          onClick={() => handleSaveAndProceed(onSelectPhoto)}
          className="bg-gray-700 flex items-center justify-center text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-600"
        >
          <Upload size={20} className="mr-2 flex-shrink-0" />
          Select a Photo
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
