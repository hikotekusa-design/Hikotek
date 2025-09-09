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
  }
};