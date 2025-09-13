import { BASE_URL } from './base_urls';

export const productApi = {
  // Get showcase products (public, unchanged)
  getShowcaseProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/showcase`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch showcase products');
      }

      return data;
    } catch (error) {
      console.error('API Get Showcase Products Error:', error);
      throw error;
    }
  },

  // Get single product by ID (public, renamed from getPublicAll)
  getById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch product');
      }

      return data;
    } catch (error) {
      console.error('API Get Product Error:', error);
      throw error;
    }
  },

  searchProducts: async (name) => {
  try {
    // Validate input
    if (!name || name.trim() === '') {
      return { success: false, data: [], error: 'Search term is required' };
    }

    const params = new URLSearchParams();
    params.append('name', name.trim());

    const url = `${BASE_URL}/products/search?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Failed to search products (HTTP ${response.status})`);
    }

    // Validate response structure
    if (!data || typeof data !== 'object' || !Array.isArray(data.data)) {
      throw new Error('Invalid response format from server');
    }

    return {
      success: true,
      data: data.data, // Array of { id, name }
    };
  } catch (error) {
    console.error('API Search Products Error:', {
      message: error.message,
      searchTerm: name,
      url: `${BASE_URL}/products/search?name=${encodeURIComponent(name?.trim() || '')}`,
    });
    return { success: false, data: [], error: error.message };
  }
},

getShowcaseAllProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/showcaseall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch all showcase products');
      }

      return data;
    } catch (error) {
      console.error('API Get Showcase All Products Error:', error);
      throw error;
    }
  },
  getPublic: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/public/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch product');
      }

      return data;
    } catch (error) {
      console.error('API Get Product Error:', error);
      throw error;
    }
  },
  getFeatured: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/featured`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch featured products');
      }

      return data;
    } catch (error) {
      console.error('API Get Featured Products Error:', error);
      throw error;
    }
  },

}
