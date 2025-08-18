import { BASE_URL } from './base_urls';

export const submitEnquiry = async (enquiryData) => {
  try {
    const response = await fetch(`${BASE_URL}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit enquiry');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw error;
  }

  
};

