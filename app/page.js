"use client"
import { useState } from 'react';

import Header from '../components/Header';
import Card from '../components/Card';
import cardData from '../data/cards.json'
import Chat from '../components/chat';

export default function Home() {
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(true);

  // Функция для скрытия секции с карточками, когда задаётся вопрос
  const handleQuestionAsked = () => {
    setIsCardSectionVisible(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col items-center">
      <Header />
      <div>
      
      {isCardSectionVisible && (
        <div className="text-center mt-8">
          <img src="/logo.png" alt="DoctAi Logo" className="h-16 w-16 mx-auto my-10" />
          <h1 className="text-2xl font-semibold">Могу я тебе чем-нибудь помочь?</h1>
          <div className="flex justify-center mt-6 gap-4">
            {cardData.map((card, index) => (
              <Card key={index} title={card.title} icon={card.icon} />
            ))}
          </div>
        </div>
      )}

     <Chat onQuestionAsked={handleQuestionAsked}/>
     </div>
    </div>
  );
}
