"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";


export default function Chat({ message, setMessage, isCardSectionVisible, setIsCardSectionVisible }) {  

  const [chatHistory, setChatHistory] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // Для отображения файла

  const pathname = usePathname();
  const botLogoSrc = pathname === "/pawPage" ? "/logopaw.png" : "/logouser.png";

  function handleFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Если это изображение, показываем его предварительный просмотр
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result); // Сохраняем превью изображения
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(selectedFile.name); // Отображаем имя файла, если это не изображение
      }
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim() && !file) return;

    setIsCardSectionVisible(false);

    if (message.trim()) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: message, sender: "user" },
      ]);
    }

    const formData = new FormData();
    formData.append("text", message);
    if (file) {
      formData.append("file", file);
      
      // Добавляем файл в чат
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: filePreview, sender: "user", isFile: true },
      ]);
    }

    setMessage("");
    setFile(null);
    setFilePreview(null);

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
    setFilePreview(null);
    setIsNewChat(true);
    setIsCardSectionVisible(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-scroll px-4 py-2 lg:max-h-[700px] max-h-full my-5">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex items-center ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <Image
                src={botLogoSrc}
                alt="Bot Logo"
                className="h-8 w-8 mr-2 rounded-2xl"
                width={42}
                height={42}
              />
            )}
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {msg.isFile ? (
                <>{msg.text.startsWith("data:image/") ? <img src={msg.text} alt="uploaded" className="w-20 h-20 object-cover" /> : msg.text}</>
              ) : (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 w-full px-4 sticky bottom-5">
        <div className="flex bg-white my-5 items-center border border-gray-300 rounded-full px-4 py-2">
          <button onClick={handleNewChat} className="">
            <Image
              src="/new.png"
              alt="New Chat"
              className="h-8 w-8 mr-2"
              width={42}
              height={42}
            />
          </button>
          <label>
            <Image
              src="/link.png"
              alt="Link"
              className="h-8 w-8 mr-2"
              width={42}
              height={42}
            />
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          <div className="flex-grow ml-4">
            {filePreview && (
              <div className="mb-2">
                {filePreview.startsWith("data:image/") ? (
                  <img src={filePreview} alt="Preview" className="w-16 h-16 object-cover" />
                ) : (
                  <p>{filePreview}</p>
                )}
              </div>
            )}
            <input
              type="text"
              placeholder="Спрашивай, что хочешь..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={1000}
              className="w-full text-black bg-white placeholder:text-gray-700 placeholder:text-opacity-50 focus:outline-none"
            />
          </div>

          <p className="text-gray-400 ml-4">{message.length}/1000</p>
          <button onClick={handleSendMessage} className="ml-4 text-white">
            <Image
              src="/send.png"
              alt="Send"
              className="h-8 w-8"
              width={42}
              height={42}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
