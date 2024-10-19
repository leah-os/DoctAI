"use client"; // Клиентский компонент
import { useState } from "react";
import SwitchButton from "./SwitchButton";
import Image from "next/image";
import { useAccessibility } from "../context/AccessibilityContext";

export default function Header() {
  const [showBanner, setShowBanner] = useState(false); // Состояние для управления баннером

  const handleEyeClick = () => {
    setShowBanner(!showBanner); // Меняем состояние при клике на глаз
  };

  const toggleAccessibilityMode = () => {
    setAccessibilityMode((prevMode) => !prevMode);
  };

  const { isAccessibilityMode, setAccessibilityMode } = useAccessibility();

  const logoSrc = "/logo.png";

  return (
    <div
      className={`w-full py-4 bg-transparent flex flex-col items-center  ${
        isAccessibilityMode ? "grayscale bg-black " : "grayscale-0 "
      }`}
    >
      <div className="w-full flex justify-between items-center lg:px-20 px-5">
        <div className="flex items-center">
          <Image
            src={logoSrc}
            alt="DoctAi Logo"
            className="h-12 w-12 mr-2 rounded-2xl"
            width={42}
            height={42}
          />
          <h1 className="text-xl font-bold">DoctAi</h1>
        </div>

  
        <div className="relative">
          <button onClick={toggleAccessibilityMode}>
            {" "}
         
            <Image
              src="/eye.png"
              alt="Eye Icon"
              className="h-8 w-8 mr-2 cursor-pointer"
              width={32}
              height={32}
              onClick={handleEyeClick}
            />
           
            {showBanner && (
              <div className="absolute top-10 right-0 bg-gray-200 text-black p-2 rounded-lg shadow-lg z-10 ">
                <p className="text-sm font-medium">
                  Режим для слабовидящих включен
                </p>
              </div>
            )}
          </button>
        </div>

        {/* Компонент SwitchButton */}
        <SwitchButton />
      </div>
    </div>
  );
}
