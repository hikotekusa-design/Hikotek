import { BASE_URL } from './base_urls';

export const DistributorApi = {
  submitApplication: async (applicationData) => {
    try {
      const response = await fetch(`${BASE_URL}/distributor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      return await response.json();
    } catch (error) {
      console.error('Application submission error:', error);
      throw error;
    }
  }
}