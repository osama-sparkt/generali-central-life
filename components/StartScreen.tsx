// import { Camera, Upload } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "./ui/button";

// interface StartScreenProps {
//   onTakePhoto: () => void;
//   onSelectPhoto: () => void;
// }

// const StartScreen: React.FC<StartScreenProps> = ({
//   onTakePhoto,
//   onSelectPhoto,
// }) => {
//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   useEffect(() => {
//     const savedName = sessionStorage.getItem("userName");
//     const savedNumber = sessionStorage.getItem("userNumber");

//     if (savedName) setName(savedName);
//     if (savedNumber) setNumber(savedNumber);
//   }, []);

//   const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // Only allow digits and limit to 10 characters
//     if (value.length <= 10) {
//       setNumber(value);
//     }
//   };
//   const handleSaveAndProceed = (callback: () => void) => {
//     // Validate inputs
//     if (!name.trim() || !number.trim()) {
//       alert("Please fill in both name and number fields");
//       return;
//     }

//     // Save to sessionStorage
//     sessionStorage.setItem("userName", name);
//     sessionStorage.setItem("userNumber", number);

//     console.log("Data saved to sessionStorage:", { name, number });
//     callback();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full w-full">
//       <h1 className="text-xl md:text-2xl font-bold mb-5 text-center">
//         Celebrating New Beginnings with
//       </h1>
//       <div className="mb-10">
//         <Image
//           className="object-cover"
//           height={112}
//           width={200}
//           alt=""
//           src="/generali-central-logo-white.png"
//         />
//       </div>
//       <div className="mb-5 w-full max-w-xs">
//         <form className="flex flex-col gap-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-900"
//             />
//           </div>
//           <div>
//             {/* <input
//               type="number"
//               placeholder="Enter your number"
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-900"
//             /> */}
//             <input
//               type="tel"
//               placeholder="Enter your number"
//               value={number}
//               onChange={handleNumberChange}
//               className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-900"
//               maxLength={10}
//               pattern="[0-9]*"
//               inputMode="numeric"
//             />
//           </div>
//         </form>
//       </div>
//       <div className="flex flex-col gap-6 w-full max-w-xs">
//         <Button
//           disabled={name === "" || number === ""}
//           onClick={() => handleSaveAndProceed(onTakePhoto)}
//           className="bg-white flex items-center justify-center text-red-800 rounded-lg font-bold text-lg shadow-lg hover:bg-white/90"
//         >
//           <Camera size={20} className="mr-2 flex-shrink-0" />
//           Take a Photo
//         </Button>
//         <Button
//           disabled={name === "" || number === ""}
//           onClick={() => handleSaveAndProceed(onSelectPhoto)}
//           className="bg-gray-700 flex items-center justify-center text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-600"
//         >
//           <Upload size={20} className="mr-2 flex-shrink-0" />
//           Select a Photo
//         </Button>
//       </div>
//     </div>
//   );
// };

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
  const [error, setError] = useState("");

  useEffect(() => {
    const savedName = sessionStorage.getItem("userName");
    const savedNumber = sessionStorage.getItem("userNumber");

    if (savedName) setName(savedName);
    if (savedNumber) setNumber(savedNumber);
  }, []);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // allow only digits
    if (value.length <= 10) {
      setNumber(value);
      if (value.length !== 10 && value.length > 0) {
        setError("Number must be exactly 10 digits");
      } else {
        setError("");
      }
    }
  };

  const handleSaveAndProceed = (callback: () => void) => {
    if (!name.trim() || !number.trim()) {
      alert("Please fill in both name and number fields");
      return;
    }

    if (number.length !== 10) {
      setError("Number must be exactly 10 digits");
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
              type="tel"
              placeholder="Enter your number"
              value={number}
              onChange={handleNumberChange}
              className={`w-full py-3 px-4 rounded-lg border ${
                error ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-900`}
              maxLength={10}
              pattern="[0-9]*"
              inputMode="numeric"
            />
            {error && <p className="text-white text-sm mt-1">{error}</p>}
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Button
          disabled={!name || !number}
          onClick={() => handleSaveAndProceed(onTakePhoto)}
          className="bg-white flex items-center justify-center text-red-800 rounded-lg font-bold text-lg shadow-lg hover:bg-white/90 disabled:opacity-60"
        >
          <Camera size={20} className="mr-2 flex-shrink-0" />
          Take a Photo
        </Button>
        <Button
          disabled={!name || !number}
          onClick={() => handleSaveAndProceed(onSelectPhoto)}
          className="bg-gray-700 flex items-center justify-center text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-600 disabled:opacity-60"
        >
          <Upload size={20} className="mr-2 flex-shrink-0" />
          Select a Photo
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
