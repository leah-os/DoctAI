"use client";
import { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import cardData from '../data/cards.json';
import Chat from '../components/Chat';

export default function Home() {
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");

  const handleQuestionAsked = () => {
    setIsCardSectionVisible(false);
  };

  const handleCardClick = (question) => {
    console.log("Card clicked, question:", question);
    setMessage(question);
    handleQuestionAsked();
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setChatHistory((prevHistory) => [...prevHistory, { text: message, sender: "user" }]);

    const formData = new FormData();
    formData.append('text', message);

    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: data.reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Ошибка:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: "Ошибка: не удалось отправить сообщение", sender: "bot" },
      ]);
    }
  };

  const handleShowCards = () => {
    console.log("Showing card section");
    setIsCardSectionVisible(true);
    setChatHistory([]); // Очищаем историю чата при показе карточек
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
                <Card 
                  key={index} 
                  title={card.title} 
                  icon={card.icon} 
                  onClick={() => handleCardClick(card.title)} 
                />
              ))}
            </div>
          </div>
        )}
        <Chat 
          onShowCards={handleShowCards} 
          chatHistory={chatHistory} 
          message={message} 
          setMessage={setMessage} 
          handleSendMessage={handleSendMessage} 
        />
      </div>
    </div>
  );
}
