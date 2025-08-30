import { useState, useEffect, useCallback } from 'react';

export type ComponentType = 'project' | 'experience' | 'skill' | 'education' | 'research';

export interface TooltipConfig {
  showDelay: number;
  hideDelay: number;
  randomIntervalMin: number;
  randomIntervalMax: number;
}

const DEFAULT_CONFIG: TooltipConfig = {
  showDelay: 2000,
  hideDelay: 3000,
  randomIntervalMin: 15000,
  randomIntervalMax: 30000
};

export const useTooltipManager = (config: Partial<TooltipConfig> = {}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTooltip, setCurrentTooltip] = useState('');
  
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const tooltipMessages = [
    "Hey there! 👋",
    "Have Questions? I'm here!",
    "Let's chat! 💬",
    "Questions? Ask me anything!",
    "What's on your mind? 🤔",
    "Let's talk! 💭"
  ];

  const contextualMessages: Record<ComponentType, string[]> = {
    project: ["Questions about this project? I've read the paper! 🔬"],
    experience: ["I learned so much from this experience! 📚"],
    skill: ["This skill has been really useful in my projects! ⚡"],
    education: ["Ask me anything about my education! 📚"],
    research: ["Questions about this project? I've read the paper! 🔬"]
  };

  const showRandomTooltip = useCallback(() => {
    const randomMessage = tooltipMessages[Math.floor(Math.random() * tooltipMessages.length)];
    setCurrentTooltip(randomMessage);
    setShowTooltip(true);
    
    setTimeout(() => setShowTooltip(false), finalConfig.hideDelay);
  }, [finalConfig.hideDelay]);

  const showContextualTooltip = useCallback((componentType: ComponentType) => {
    const messages = contextualMessages[componentType];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentTooltip(randomMessage);
    setShowTooltip(true);
    
    // Contextual tooltips show longer
    setTimeout(() => setShowTooltip(false), finalConfig.hideDelay + 1000);
  }, [finalConfig.hideDelay]);

  const hideTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  // Auto-show tooltips effect
  useEffect(() => {
    // Show first tooltip after initial delay
    const initialTimer = setTimeout(showRandomTooltip, finalConfig.showDelay);

    // Set up interval to show tooltips randomly
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 
        (finalConfig.randomIntervalMax - finalConfig.randomIntervalMin) + 
        finalConfig.randomIntervalMin;
      setTimeout(showRandomTooltip, randomDelay);
    }, finalConfig.randomIntervalMax);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [finalConfig.showDelay, finalConfig.randomIntervalMin, finalConfig.randomIntervalMax, showRandomTooltip]);

  return {
    showTooltip,
    currentTooltip,
    showRandomTooltip,
    showContextualTooltip,
    hideTooltip,
    contextualMessages
  };
};
