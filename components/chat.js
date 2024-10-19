"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { AssistantStream } from "openai/lib/AssistantStream";
import Markdown from "react-markdown";

const Chat = ({ userInput, setUserInput, setIsCardSectionVisible }) => {
  const [messages, setMessages] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");

  const handleNewChat = () => {
    setMessages([]);
    setUserInput("");
    setIsCardSectionVisible(true);
  };

  // automatically scroll to bottom of chat
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // create a new threadID when chat component created
  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  const sendMessage = async (text) => {
    setIsCardSectionVisible(false);
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          content: text,
        }),
      }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const submitActionResult = async (runId, toolCallOutputs) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          runId: runId,
          toolCallOutputs: toolCallOutputs,
        }),
      }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userInput },
    ]);
    setUserInput("");
    setInputDisabled(true);
    scrollToBottom();
  };

  // textCreated - create new assistant message
  const handleTextCreated = () => {
    appendMessage("assistant", "");
  };

  // textDelta - append text to last assistant message
  const handleTextDelta = (delta) => {
    if (delta.value != null) {
      appendToLastMessage(delta.value);
    };
    if (delta.annotations != null) {
      annotateLastMessage(delta.annotations);
    }
  };

  // imageFileDone - show image in chat
  const handleImageFileDone = (image) => {
    appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
  }

  // toolCallCreated - log new tool call
  const toolCallCreated = (toolCall) => {
    if (toolCall.type != "code_interpreter") return;
    appendMessage("code", "");
  };

  // toolCallDelta - log delta and snapshot for the tool call
  const toolCallDelta = (delta) => {
    if (delta.type != "code_interpreter") return;
    if (!delta.code_interpreter.input) return;
    appendToLastMessage(delta.code_interpreter.input);
  };

  // handleRequiresAction - handle function call
  const handleRequiresAction = async (event) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    // loop over tool calls and call function handler
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async (toolCall) => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      })
    );
    setInputDisabled(true);
    submitActionResult(runId, toolCallOutputs);
  };

  // handleRunCompleted - re-enable the input form
  const handleRunCompleted = () => {
    setInputDisabled(false);
  };

  const handleReadableStream = (stream) => {
    // messages
    stream.on("textCreated", handleTextCreated);
    stream.on("textDelta", handleTextDelta);

    // image
    stream.on("imageFileDone", handleImageFileDone);

    // code interpreter
    stream.on("toolCallCreated", toolCallCreated);
    stream.on("toolCallDelta", toolCallDelta);

    // events without helpers yet (e.g. requires_action and run.done)
    stream.on("event", (event) => {
      if (event.event === "thread.run.requires_action")
        handleRequiresAction(event);
      if (event.event === "thread.run.completed") handleRunCompleted();
    });
  };

  const appendToLastMessage = (text) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  const appendMessage = (role, text) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const annotateLastMessage = (annotations) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
      };
      annotations.forEach((annotation) => {
        if (annotation.type === 'file_path') {
          updatedLastMessage.text = updatedLastMessage.text.replaceAll(
            annotation.text,
            `/api/files/${annotation.file_path.file_id}`
          );
        }
      })
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
    
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !inputDisabled) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const pathname = usePathname();
  const botLogoSrc = pathname === "/pawPage" ? "/logopaw.png" : "/logouser.png";

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-scroll px-4 py-2 lg:max-h-[700px] max-h-full my-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex items-center ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
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
                msg.role === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
            <Markdown>{msg.text}</Markdown>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 w-full px-4 sticky bottom-5">
        <div className="flex bg-white my-5 items-center border border-gray-300 rounded-full px-4 py-2">
          <button onClick={handleNewChat}  disabled={inputDisabled} className="">
            <Image
              src="/new.png"
              alt="New Chat"
              className="h-8 w-8 mr-2"
              width={42}
              height={42}
            />
          </button>

          <div className="flex-grow ml-4">
            <input
              type="text"
              placeholder="Спрашивай, что хочешь..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={1000}
              className="w-full text-black bg-white placeholder:text-gray-700 placeholder:text-opacity-50 focus:outline-none"
            />
          </div>

          <p className="text-gray-400 ml-4">{userInput.length}/1000</p>
          <button onClick={handleSubmit} disabled={inputDisabled} className="ml-4 text-white">
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
};

export default Chat;