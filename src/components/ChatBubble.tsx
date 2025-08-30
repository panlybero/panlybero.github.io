import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useChatMessages, type Message } from '../lib/useChatMessages';
import { useTooltipManager, type ComponentType } from '../lib/useTooltipManager';
import { chatApiService, type ChatMessage } from '../lib/chatApi';

// Utility function for component hover detection
const createComponentHoverHandler = (showContextualTooltip: (type: ComponentType) => void) => {
  return (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    const componentTypes: ComponentType[] = ['project', 'experience', 'skill', 'education', 'research'];
    
    for (const type of componentTypes) {
      if (target.closest(`[data-component="${type}"]`)) {
        showContextualTooltip(type);
        break;
      }
    }
  };
};

const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, addUserMessage, addBotMessage } = useChatMessages();
  const { showTooltip, currentTooltip, showRandomTooltip, showContextualTooltip } = useTooltipManager();

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = addUserMessage(inputText);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare chat history for API
      const chatHistory: ChatMessage[] = [...messages, userMessage].map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));

      const result = await chatApiService.sendMessage({
        messages: chatHistory,
        currentMessage: currentInput
      });
      
      if (result.success) {
        addBotMessage(result.message || 'Thanks for your message! I\'ll get back to you soon.');
      } else {
        addBotMessage('Sorry, I\'m having trouble connecting right now. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addBotMessage('Sorry, I\'m having trouble connecting right now. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Tooltip management effects
  useEffect(() => {
    // Show first tooltip after 2 seconds
    const initialTimer = setTimeout(showRandomTooltip, 2000);

    // Set up interval to show tooltips every 15-30 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 15000 + 15000; // 15-30 seconds
      setTimeout(showRandomTooltip, randomDelay);
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showRandomTooltip]);

  // Component hover detection
  useEffect(() => {
    const handleComponentHover = createComponentHoverHandler(showContextualTooltip);
    
    document.addEventListener('mouseover', handleComponentHover);
    
    return () => {
      document.removeEventListener('mouseover', handleComponentHover);
    };
  }, [showContextualTooltip]);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip Bubble */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-gray-200/50 min-w-[200px] max-w-[280px]"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <p className="text-sm text-gray-800 font-medium">{currentTooltip}</p>
              {/* Arrow pointing down */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <img src="/chat-blue.png" alt="Chat" className="w-16 h-16" />
        </motion.button>
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-50 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <img src="/chat-blue.png" alt="Chat" className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-800">Chat with me</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="max-w-xs px-3 py-2 rounded-2xl bg-gray-100 text-gray-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-500">AI is thinking...</p>
                  </div>
                </motion.div>
              )}
              
              {/* Invisible div for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBubble;
