# Chat Bubble Component

## Overview
The ChatBubble component is a floating chat interface that appears as a button in the bottom-right corner of your portfolio. When clicked, it opens a chat interface where users can send messages.

## Features
- **Floating Button**: Always visible in the bottom-right corner
- **Animated Interface**: Smooth animations using Framer Motion
- **Responsive Design**: Works on all screen sizes
- **Message History**: Displays conversation history
- **Timestamp**: Shows when messages were sent
- **Keyboard Support**: Press Enter to send messages

## Customization

### Replacing the Chat Bubble Image
1. Replace the file `public/chat-bubble.png` with your own image
2. Recommended size: 24x24 pixels or 32x32 pixels
3. The image will be used in both the floating button and chat header

### Styling
The component uses Tailwind CSS classes and can be customized by modifying:
- Button colors: Change the `from-blue-500 to-purple-600` gradient
- Chat interface colors: Modify the background, border, and text colors
- Animations: Adjust the Framer Motion transition values

### API Integration
To connect to your external API:
1. Replace the placeholder code in the `handleSendMessage` function
2. Update the API endpoint and request format
3. Handle the response and update the messages state accordingly

## Current Implementation
- **Floating Button**: Blue-to-purple gradient with hover effects
- **Chat Interface**: Glassmorphism design with backdrop blur
- **Messages**: User messages (blue) and bot responses (gray)
- **Animations**: Spring animations for smooth interactions
- **Responsive**: Fixed positioning with proper z-index

## Usage
The component is automatically included in your main page and will appear on all pages that use the Layout component.

## Dependencies
- React 19+
- Framer Motion
- Lucide React (for icons)
- Tailwind CSS
