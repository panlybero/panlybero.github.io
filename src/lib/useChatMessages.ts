import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatHistory {
  messages: Message[];
  addMessage: (message: Message) => void;
  addUserMessage: (text: string) => Message;
  addBotMessage: (text: string) => Message;
  clearMessages: () => void;
  getLastMessage: () => Message | undefined;
  getMessageCount: () => number;
}

const DEFAULT_WELCOME_MESSAGE: Message = {
  id: '1',
  text: 'Hi! How can I help?',
  isUser: false,
  timestamp: new Date()
};

export const useChatMessages = (initialMessages: Message[] = [DEFAULT_WELCOME_MESSAGE]): ChatHistory => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const addUserMessage = useCallback((text: string): Message => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    addMessage(userMessage);
    return userMessage;
  }, [addMessage]);

  const addBotMessage = useCallback((text: string): Message => {
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text,
      isUser: false,
      timestamp: new Date()
    };
    addMessage(botMessage);
    return botMessage;
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
  }, []);

  const getLastMessage = useCallback((): Message | undefined => {
    return messages[messages.length - 1];
  }, [messages]);

  const getMessageCount = useCallback((): number => {
    return messages.length;
  }, [messages]);

  return {
    messages,
    addMessage,
    addUserMessage,
    addBotMessage,
    clearMessages,
    getLastMessage,
    getMessageCount
  };
};
