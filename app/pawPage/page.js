"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import cardData from "@/data/cards.json";
import Chat from "@/components/Chat";
import { useAccessibility } from "../../context/AccessibilityContext";


export default function Home() {
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState(""); // Состояние для ввода сообщения

  const handleQuestionAsked = () => {
    setIsCardSectionVisible(false);
  };

  const { isAccessibilityMode } = useAccessibility();
   

  const handleCardClick = (question) => {
    console.log("Card clicked, question:", question); // Логируем вопрос
    setMessage(question); // Устанавливаем текст вопроса в инпут
  };

 

  const handleShowCards = () => {
    setIsCardSectionVisible(true); // Показываем карточки
  };

  return (
    <div
    className={`min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col items-center ${
      isAccessibilityMode ? "grayscale text-3xl" : "grayscale-0"
    }`}
  >
      <Header />
      <div className="flex-grow"> {/* Убедитесь, что этот div заполняет пространство */}
        {isCardSectionVisible && (
          <div className="text-center mt-8">
            <img src="/logopaw.png" alt="DoctAi Logo" className="h-16 w-16 rounded-2xl mx-auto my-10" />
            <h1 className="text-2xl text-[#464646] font-semibold">Могу я тебе чем-нибудь помочь?</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center mt-6 gap-4">
              {cardData.map((card, index) => (
                <Card 
                  key={index} 
                  title={card.title} 
                  icon={card.icon} 
                  onClick={() => handleCardClick(card.title)} // Передаем текст вопроса
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Chat 
        message={message} // Передаем текущее сообщение в Chat
        setMessage={setMessage}
        isCardSectionVisible={isCardSectionVisible}
        setIsCardSectionVisible={setIsCardSectionVisible}
        className="fixed bottom-4 right-4" // Примените фиксированное положение
      />
    </div>
  );
  
  
}