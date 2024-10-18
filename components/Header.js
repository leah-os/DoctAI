"use client";
import SwitchButton from "./SwitchButton";
import { useAccessibility } from "../context/AccessibilityContext";

export default function Header() {
  const { isAccessibilityMode, setAccessibilityMode } = useAccessibility();

  const toggleAccessibilityMode = () => {
    setAccessibilityMode((prevMode) => !prevMode);
  };

  const context = useAccessibility();
  console.log(context);

  return (
    <div
      className={`w-full py-4 bg-transparent flex justify-between items-center px-8 ${
        isAccessibilityMode ? "grayscale bg-black" : "grayscale-0"
      }`}
    >
      <div className="flex items-center">
        <img src="/logo.png" alt="DoctAi Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-xl  font-bold text-black">DoctAi</h1>
      </div>

      <button onClick={toggleAccessibilityMode} className="">
        <img src="/eye.png" alt="DoctAi Logo" className="h-8 w-8 mr-2" />
      </button>
      <SwitchButton />
    </div>
  );
}
