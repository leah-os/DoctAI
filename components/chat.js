'use client';  
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function Chat({ onQuestionAsked }) {  
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [file, setFile] = useState(null);

  const pathname = usePathname(); 
  const botLogoSrc = pathname === '/pawPage' ? '/logopaw.png' : '/logouser.png'; 

  function handleFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim() && !file) return; 

    if (message.trim()) {
      setChatHistory((prevHistory) => [...prevHistory, { text: message, sender: "user" }]);
    }

    const formData = new FormData();
    formData.append('text', message);
    if (file) {
      formData.append('file', file);
    }

    setMessage(""); 
    setFile(null); 

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

  const handleNewChat = () => {
    setChatHistory([]); 
    setMessage(""); 
    setFile(null); 
    setIsNewChat(true); 
    onQuestionAsked(); 
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(); 
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-scroll px-4 py-2 h-full">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-2 flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && (
              <Image
                src={botLogoSrc}
                alt="Bot Logo"
                className="h-8 w-8 mr-2 rounded-2xl"
                width={42}
                height={42}
              />
            )}
            <p className={`inline-block px-4 py-2 rounded-lg ${
              msg.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
            }`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 w-full px-4">
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
          <button onClick={handleNewChat} className="">
            <Image src="/new.png" alt="New Chat" className="h-8 w-8 mr-2" width={42} height={42}/>
          </button>
          <label>
            <Image src="/link.png" alt="Link" className="h-8 w-8 mr-2" width={42} height={42}/>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <input
            type="text"
            placeholder="Спрашивай, что хочешь..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={1000} 
            className="flex-grow ml-4 bg-transparent placeholder:text-gray-700 placeholder:text-opacity-50 focus:outline-none"
          />
          <p className="text-gray-400 ml-4">{message.length}/1000</p>
          <button onClick={handleSendMessage} className="ml-4 text-white">
            <Image src="/send.png" alt="Send" className="h-8 w-8" width={42} height={42}/>
          </button>
        </div>
      </div>
    </div>
  );
}
