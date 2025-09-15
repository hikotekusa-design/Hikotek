import { BASE_URL } from './base_urls';

export const HomeApi = {

  // Get all items for a section
  getAll: async (section) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch(`${BASE_URL}/admin/home/${section}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Failed to fetch items from ${section}`);
      }

      return data;
    } catch (error) {
      console.error(`API Get Items Error (${section}):`, error);
      throw error;
    }
  },

  // Get single item by ID in a section
  getById: async (section, id) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch(`${BASE_URL}/admin/home/${section}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Failed to fetch item from ${section}`);
      }

      return data;
    } catch (error) {
      console.error(`API Get Item Error (${section}/${id}):`, error);
      throw error;
    }
  },
    getPublicCarousel: async () => {
    try {
      const response = await fetch(`${BASE_URL}/home/carousel`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch carousel items');
      }

      // Handle different response structures
      if (Array.isArray(data)) return { data };
      if (data.data) return data;
      return data;
    } catch (error) {
      console.error('API Get Public Carousel Error:', error);
      throw error;
    }
  },
   getPublicTopImages: async () => {
    try {
      const response = await fetch(`${BASE_URL}/home/topImages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch top images');
      }

      // Handle different response structures
      if (Array.isArray(data)) return { data };
      if (data.data) return data;
      return data;
    } catch (error) {
      console.error('API Get Public Top Images Error:', error);
      throw error;
    }
  },

getPublicBottomImages: async () => {
    try {
      const response = await fetch(`${BASE_URL}/home/bottomImages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch bottom images');
      }

      return data;
    } catch (error) {
      console.error('API Get Public Bottom Images Error:', error);
      throw error;
    }
  },
}