import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, GripVertical, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
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
  const [chatSize, setChatSize] = useState({ width: 320, height: 384 }); // 80 * 4.8 = 384px (h-96)
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<'horizontal' | 'vertical' | 'corner' | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, addUserMessage, addBotMessage, clearMessages } = useChatMessages();
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

  const handleClearChat = () => {
    clearMessages();
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

  // Auto-submit transcript when user leaves the website
  useEffect(() => {
    const submitTranscriptIfNeeded = () => {
      // Only submit if there are messages beyond the default welcome message
      if (messages.length > 1) {
        const chatHistory: ChatMessage[] = messages.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        }));
        
        const result = chatApiService.submitTranscript(chatHistory);
        if (result.success) {
          console.log('Transcript submitted successfully on exit');
        } else {
          console.warn('Failed to submit transcript on exit:', result.error);
        }
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      submitTranscriptIfNeeded();
      // Note: We don't prevent the default behavior to avoid annoying users
    };

    const handleVisibilityChange = () => {
      // Submit when page becomes hidden (user switches tabs, minimizes, etc.)
      if (document.visibilityState === 'hidden') {
        submitTranscriptIfNeeded();
      }
    };

    const handlePageHide = () => {
      // Additional fallback for when the page is being unloaded
      submitTranscriptIfNeeded();
    };

    // Add event listeners with multiple strategies
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [messages]);

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent, direction: 'horizontal' | 'vertical' | 'corner') => {
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: chatSize.width,
      height: chatSize.height
    });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !resizeDirection) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;

    if (resizeDirection === 'horizontal' || resizeDirection === 'corner') {
      newWidth = Math.max(280, Math.min(600, resizeStart.width - deltaX));
    }
    if (resizeDirection === 'vertical' || resizeDirection === 'corner') {
      newHeight = Math.max(300, Math.min(600, resizeStart.height - deltaY));
    }

    setChatSize({ width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, resizeStart, resizeDirection]);

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
            className="fixed bottom-24 right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-50 flex flex-col"
            style={{
              width: `${chatSize.width}px`,
              height: `${chatSize.height}px`
            }}
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
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="Clear chat history"
                >
                  <Trash2 size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
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
                    } ${!message.isUser ? 'max-w-md' : ''}`}
                  >
                    <div className={`chat-markdown ${message.isUser ? 'user-message' : ''}`}>
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
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

            {/* Resize handles */}
            {/* Left resize handle */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize transition-colors group ${
                isResizing && resizeDirection === 'horizontal' ? 'bg-blue-500/50' : 'hover:bg-blue-500/30'
              }`}
              onMouseDown={(e) => handleResizeStart(e, 'horizontal')}
            >
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400/50 rounded-full transition-opacity ${
                isResizing && resizeDirection === 'horizontal' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </div>
            
            {/* Top resize handle */}
            <div
              className={`absolute top-0 left-0 right-0 h-2 cursor-ns-resize transition-colors group ${
                isResizing && resizeDirection === 'vertical' ? 'bg-blue-500/50' : 'hover:bg-blue-500/30'
              }`}
              onMouseDown={(e) => handleResizeStart(e, 'vertical')}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-blue-400/50 rounded-full transition-opacity ${
                isResizing && resizeDirection === 'vertical' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </div>
            
            {/* Corner resize handle */}
            <div
              className={`absolute top-0 left-0 w-6 h-6 cursor-se-resize transition-colors rounded-tr group ${
                isResizing && resizeDirection === 'corner' ? 'bg-blue-500/50' : 'hover:bg-blue-500/30'
              }`}
              onMouseDown={(e) => handleResizeStart(e, 'corner')}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-blue-400/50 rounded transition-opacity flex items-center justify-center ${
                isResizing && resizeDirection === 'corner' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <GripVertical size={16} className="text-white rotate-90" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBubble;

