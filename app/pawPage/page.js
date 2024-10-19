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

  const handleCardClick = (question) => {
    console.log("Card clicked, question:", question); // Логируем вопрос
    setMessage(question); // Устанавливаем текст вопроса в инпут
    handleQuestionAsked(); // Скрываем карточки
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Проверка на пустое сообщение

    // Добавляем сообщение пользователя в историю чата
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: message, sender: "user" },
    ]);

    const formData = new FormData();
    formData.append("text", message); // Подготовка данных для отправки

    // Очищаем поле ввода
    setMessage("");

    try {
      // Отправка вопроса на сервер
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Добавляем ответ бота в историю чата
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
    setIsCardSectionVisible(true); // Показываем карточки
  };

  const { isAccessibilityMode } = useAccessibility();

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col items-center ${
        isAccessibilityMode ? "grayscale text-3xl" : "grayscale-0"
      }`}
    >
      <Header />
      <div>
        {isCardSectionVisible && (
          <div className="text-center mt-8">
            <img
              src="/logopaw.png"
              alt="DoctAi Logo"
              className="h-16 w-16 rounded-2xl mx-auto my-10"
            />
            <h1 className="text-2xl font-semibold">
              Могу я тебе чем-нибудь помочь?
            </h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 justify-center mt-6 gap-4">
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
          onShowCards={handleShowCards} // Передаем функцию для показа карточек
          chatHistory={chatHistory} // Передаем историю чата
          message={message} // Передаем текущее сообщение в Chat
          setMessage={setMessage} // Функция для обновления сообщения
          handleSendMessage={handleSendMessage} // Функция для отправки сообщения
        />
      </div>
    </div>
  );
}
