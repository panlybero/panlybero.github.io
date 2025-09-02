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

export interface TranscriptSubmissionResult {
  success: boolean;
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

  // Method to submit conversation transcript using synchronous XMLHttpRequest
  // This is the most reliable method for page unload scenarios
  submitTranscript(messages: ChatMessage[]): TranscriptSubmissionResult {
    try {
      const transcriptData = {
        messages: messages,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      console.log('Attempting to submit transcript:', transcriptData);
      console.log('Target URL:', `${this.baseUrl}/api/submit-transcript`);

      // Use synchronous XMLHttpRequest - this is the most reliable for page unload
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.baseUrl}/api/submit-transcript`, false); // false = synchronous
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      // Add error handling for the request
      xhr.onerror = function() {
        console.error('XMLHttpRequest network error');
      };
      
      xhr.send(JSON.stringify(transcriptData));
      
      console.log('XMLHttpRequest completed. Status:', xhr.status);
      console.log('Response:', xhr.responseText);
      
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('Transcript submitted successfully via XMLHttpRequest');
        return { success: true };
      } else {
        console.error(`Transcript submission failed with status: ${xhr.status}`);
        console.error('Response text:', xhr.responseText);
        return { success: false, error: `HTTP ${xhr.status}: ${xhr.responseText}` };
      }
    } catch (error) {
      console.error('Error submitting transcript:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit transcript' 
      };
    }
  }

  // Test method to verify backend connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Backend connection test successful:', data);
        return true;
      } else {
        console.error('Backend connection test failed with status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Backend connection test error:', error);
      return false;
    }
  }

  // Alternative method using fetch for cases where sendBeacon is not available
  async submitTranscriptWithFetch(messages: ChatMessage[]): Promise<TranscriptSubmissionResult> {
    try {
      const transcriptData = {
        messages: messages,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      const response = await fetch(`${this.baseUrl}/api/submit-transcript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transcriptData),
        keepalive: true // This helps with reliability when page is unloading
      });

      if (response.ok) {
        console.log('Transcript submitted successfully via fetch');
        return { success: true };
      } else {
        throw new Error(`Transcript submission failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting transcript:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit transcript' 
      };
    }
  }
}

// Export a singleton instance
//export const chatApiService = new ChatApiService('https://portfolio-chat-backend-1064111493675.us-central1.run.app/');
export const chatApiService = new ChatApiService('http://localhost:8080');

// Export the class for testing or custom instances
export { ChatApiService };
