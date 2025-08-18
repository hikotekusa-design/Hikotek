import React, { useState } from 'react';
import { submitEnquiry } from '../services/allApis';

const EnquiryForm = ({ onClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    comments: '',
    subscribe: true
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.comments.trim()) newErrors.comments = 'Comments are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        await submitEnquiry({
          ...formData,
          createdAt: new Date().toISOString()
        });
        
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          // Reset form after successful submission
          setFormData({
            fullName: '',
            email: '',
            company: '',
            phone: '',
            country: '',
            comments: '',
            subscribe: true
          });
          setSubmitSuccess(false);
        }, 2000);
      } catch (error) {
        setSubmitError(error.message || 'Failed to submit enquiry. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // List of countries for the dropdown
  const countries = [
    { value: '', label: '-- Select Country --' },
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'UAE', label: 'UAE' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-2xl relative shadow-xl overflow-y-auto max-h-[100vh] mx-4">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl transition"
          aria-label="Close"
        >
          &times;
        </button>

        {submitSuccess ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
            <p className="text-gray-600">Your enquiry has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Request Information</h2>
            
            {/* Error message display */}
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company *"
                    className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.company}
                    onChange={handleChange}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                  )}
                </div>

                {/* Phone (optional) */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Country Dropdown */}
                <div className="md:col-span-2">
                  <select
                    name="country"
                    className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.country}
                    onChange={handleChange}
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                  )}
                </div>
              </div>

              {/* Comments */}
              <div>
                <textarea
                  name="comments"
                  placeholder="Comments *"
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.comments ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="4"
                  value={formData.comments}
                  onChange={handleChange}
                ></textarea>
                {errors.comments && (
                  <p className="text-red-500 text-sm mt-1">{errors.comments}</p>
                )}
              </div>

              {/* Subscription Checkbox */}
              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="subscribe"
                  className="mt-1"
                  checked={formData.subscribe}
                  onChange={handleChange}
                />
                Yes, email me the latest news, training and deals from Hikotek.
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${
                  isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'SUBMIT'
                )}
              </button>

              {/* Legal Notice */}
              <p className="text-xs text-gray-500 mt-2">
                By submitting you agree to Hikotek's{' '}
                <a href="#" className="underline hover:text-blue-600">privacy policy</a> and{' '}
                <a href="#" className="underline hover:text-blue-600">cookie policy</a>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;