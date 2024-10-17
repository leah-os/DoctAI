'use client';  // Указываем, что это компонент, работающий на клиенте

import { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Добавляем сообщение пользователя в чат
    setChatHistory([...chatHistory, { text: message, sender: "user" }]);
    setMessage("");

    try {
      // Отправляем запрос на сервер
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      // Добавляем ответ бота в чат
      setChatHistory([
        ...chatHistory,
        { text: message, sender: "user" },
        { text: data.reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <p className="text-red-500">{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
