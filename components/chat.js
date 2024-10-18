'use client';  // Указываем, что это компонент, работающий на клиенте

import { useState } from "react";

export default function ChatBot() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);


  const handleFileChange = (ev) => {
    if(ev.target.files) {
      setFile(ev.target.files[0]);
      console.log(ev.target.files[0].type);
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Добавляем сообщение пользователя в чат
    setChatHistory([...chatHistory, { text: message, sender: "user" }]);
    setMessage("");
    setFile(null);

    try {
      // Отправляем запрос на сервер
      const formData = new FormData();
      if(file) {
        formData.append('file',  file)
      }
      formData.append('text', message);

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
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

      <input type="file" onChange={handleFileChange}/>

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
