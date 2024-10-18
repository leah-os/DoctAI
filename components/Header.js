"use client";  // Клиентский компонент

import { useState } from "react";
import SwitchButton from "./SwitchButton";
import Image from "next/image";

export default function Header() {
  const [showBanner, setShowBanner] = useState(false); // Состояние для управления баннером

  const handleEyeClick = () => {
    setShowBanner(!showBanner); // Меняем состояние при клике на глаз
  };

  return (
    <div className="w-full py-4 bg-transparent flex flex-col items-center">
      {/* Верхняя панель с логотипом и кнопками */}
      <div className="w-full flex justify-between items-center px-20">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="DoctAi Logo"
            className="h-8 w-8 mr-2"
            width={42}
            height={42}
          />
          <h1 className="text-xl font-bold">DoctAi</h1>
        </div>

        {/* Иконка глаза с обработчиком клика */}
        <div className="relative"> {/* Контейнер для относительного позиционирования */}
          <img
            src="/eye.png"
            alt="Eye Icon"
            className="h-8 w-8 mr-2 cursor-pointer"
            onClick={handleEyeClick} // Обрабатываем клик
          />

          {/* Баннер для слабовидящих */}
          {showBanner && (
            <div className="absolute top-10 right-0 bg-gray-200 text-black p-2 rounded-lg shadow-lg z-10 " >
              <p className="text-sm font-medium">Режим для слабовидящих включен</p>
            </div>
          )}
        </div>

        {/* Компонент SwitchButton */}
        <SwitchButton />
      </div>
    </div>
  );
}