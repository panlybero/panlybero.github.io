export interface ChatApiResponse {
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatApiRequest {
  messages: ChatMessage[];
  currentMessage: string;
}

export interface ChatApiResult {
  success: boolean;
  message?: string;
  error?: string;
}

class ChatApiService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async sendMessage(request: ChatApiRequest): Promise<ChatApiResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (response.ok) {
        const data: ChatApiResponse = await response.json();
        console.log('data', data);
        return { success: true, message: data.message };
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send message' 
      };
    }
  }

  // Method to handle retry logic
  async sendMessageWithRetry(request: ChatApiRequest, maxRetries: number = 3): Promise<ChatApiResult> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await this.sendMessage(request);
      
      if (result.success) {
        return result;
      }
      
      if (attempt === maxRetries) {
        return result;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
    
    return { success: false, error: 'Max retries exceeded' };
  }
}

// Export a singleton instance
export const chatApiService = new ChatApiService('http://0.0.0.0:8080');

// Export the class for testing or custom instances
export { ChatApiService };
