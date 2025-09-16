import { BASE_URL } from './base_urls';

// Public footer API calls (no authentication needed)
export const publicFooterApi = {
  // Get active footer details for public display
  getActiveFooter: async () => {
    try {
      const response = await fetch(`${BASE_URL}/footer`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch footer details');
      }

      return data;
    } catch (error) {
      console.error('API Get Footer Error:', error);
      // Return fallback data if API fails
      return {
        success: false,
        data: null
      };
    }
  },
  subscribe: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      return data;
    } catch (error) {
      console.error('API Subscribe Error:', error);
      // Return fallback response if API fails
      return {
        success: false,
        error: error.message
      };
    }
  }

};

