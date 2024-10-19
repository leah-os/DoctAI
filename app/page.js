"use client";
import { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import cardData from '../data/cards.json';
import Chat from '../components/Chat';

export default function Home() {
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState(""); // Состояние для ввода сообщения

  const handleQuestionAsked = () => {
    setIsCardSectionVisible(false);
  };

  const handleCardClick = (question) => {
    console.log("Card clicked, question:", question); // Логируем вопрос
    setMessage(question); // Устанавливаем текст вопроса в инпут
    handleQuestionAsked(); // Скрываем карточки
  };

 

  const handleShowCards = () => {
    setIsCardSectionVisible(true); // Показываем карточки
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col items-center">
      <Header />
      <div>
        {isCardSectionVisible && (
          <div className="text-center mt-8">
            <img src="/logouser.png" alt="DoctAi Logo" className="h-16 w-16 rounded-2xl mx-auto my-10" />
            <h1 className="text-2xl font-semibold">Могу я тебе чем-нибудь помочь?</h1>
            <div className="flex justify-center mt-6 gap-4">
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
        <Chat 
          message={message} // Передаем текущее сообщение в Chat
          setMessage={setMessage} 
        />
      </div>
    </div>
  );
}