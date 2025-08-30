# Chat API Specification

## Overview
This document describes how the chat system works and what the backend API needs to implement.

## How It Works

### 1. **Chat Flow**
1. User types a message and sends it
2. Frontend sends the message + chat history to the backend
3. Backend processes the message and generates a response
4. Frontend receives the response and displays it in the chat

### 2. **API Endpoint**
- **URL**: `/api/chat`
- **Method**: `POST`
- **Content-Type**: `application/json`

### 3. **Request Format**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    },
    {
      "role": "assistant", 
      "content": "I'm doing well, thank you! How can I help you today?"
    }
  ],
  "currentMessage": "Tell me about your experience"
}
```

#### Request Fields:
- `messages`: Array of previous conversation messages
- `currentMessage`: The new message the user just sent
- `role`: Either "user" (from user) or "assistant" (from AI/bot)
- `content`: The actual message text

### 4. **Response Format**
```json
{
  "message": "I have experience in web development, machine learning, and research. I've worked on projects involving React, Python, and data analysis. What specific area would you like to know more about?"
}
```

#### Response Fields:
- `message`: The AI's response text that will be displayed to the user

### 5. **Expected Behavior**

#### **Message Processing**
- Backend receives the current message + full conversation history
- Backend should use this context to generate a relevant response
- Response should be natural and conversational
- Response should reference the user's question and provide helpful information

#### **Context Awareness**
- The system sends the full conversation history, so the AI can:
  - Remember what was discussed earlier
  - Provide consistent responses
  - Build on previous conversation
  - Avoid repeating information already shared

#### **Response Quality**
- Responses should be helpful and informative
- Keep responses conversational and friendly
- Provide specific, relevant information about the portfolio owner
- If the question is unclear, ask for clarification

### 6. **Example Conversation Flow**

#### **Request 1:**
```json
{
  "messages": [],
  "currentMessage": "Hello"
}
```

#### **Response 1:**
```json
{
  "message": "Hello! I'm here to help you learn more about my background, experience, and projects. What would you like to know?"
}
```

#### **Request 2:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hello! I'm here to help you learn more about my background, experience, and projects. What would you like to know?"}
  ],
  "currentMessage": "Tell me about your research"
}
```

#### **Response 2:**
```json
{
  "message": "I've worked on several research projects in machine learning and data science. My main areas include natural language processing, computer vision, and predictive modeling. I've published papers and presented at conferences. Would you like me to elaborate on any specific research area or project?"
}
```

### 7. **Error Handling**

#### **Success Response**
- HTTP Status: `200 OK`
- Include the response message in JSON format

#### **Error Response**
- HTTP Status: `4xx` or `5xx` as appropriate
- Frontend will show a fallback message to the user
- Log the error on the backend for debugging

### 8. **Performance Considerations**
- Response time should be reasonable (under 2-3 seconds)
- The API should handle concurrent requests
- Consider implementing rate limiting if needed
- Cache common responses if possible

### 9. **Security Considerations**
- Validate input data
- Sanitize user messages to prevent injection attacks
- Implement appropriate authentication if needed
- Log requests for monitoring and debugging

### 10. **Testing**
Test your API with various scenarios:
- Empty conversation (first message)
- Long conversations (many messages)
- Different types of questions
- Edge cases (very long messages, special characters)
- Error conditions

## Summary
The chat system is straightforward: it sends conversation history + new message, expects a relevant response back. The key is maintaining context awareness and providing helpful, conversational responses that enhance the user's understanding of the portfolio owner's background and experience.
