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
  { value: 'UAE', label: 'UAE' },
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Åland Islands', label: 'Åland Islands' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'American Samoa', label: 'American Samoa' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Armenia', label: 'Armenia' },
  { value: 'Aruba', label: 'Aruba' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Azerbaijan', label: 'Azerbaijan' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Belize', label: 'Belize' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Bermuda', label: 'Bermuda' },
  { value: 'Bhutan', label: 'Bhutan' },
  { value: 'Bolivia', label: 'Bolivia (Plurinational State of)' },
  { value: 'Bonaire Sint Eustatius and Saba', label: 'Bonaire Sint Eustatius and Saba' },
  { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'British Indian Ocean Territory', label: 'British Indian Ocean Territory' },
  { value: 'British Virgin Islands', label: 'British Virgin Islands' },
  { value: 'Brunei Darussalam', label: 'Brunei Darussalam' },
  { value: 'Bulgaria', label: 'Bulgaria' },
  { value: 'Burkina Faso', label: 'Burkina Faso' },
  { value: 'Burundi', label: 'Burundi' },
  { value: 'Cambodia', label: 'Cambodia' },
  { value: 'Cameroon', label: 'Cameroon' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Canary Islands', label: 'Canary Islands' },
  { value: 'Cape Verde', label: 'Cape Verde' },
  { value: 'Cayman Islands', label: 'Cayman Islands' },
  { value: 'Central African Republic', label: 'Central African Republic' },
  { value: 'Chad', label: 'Chad' },
  { value: 'Chile', label: 'Chile' },
  { value: 'China', label: 'China' },
  { value: 'Christmas Island', label: 'Christmas Island' },
  { value: 'Cocos Islands', label: 'Cocos (Keeling) Islands' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Comoros', label: 'Comoros' },
  { value: 'Cook Islands', label: 'Cook Islands' },
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: 'Côte d’Ivoire', label: 'Côte d’Ivoire' },
  { value: 'Croatia', label: 'Croatia' },
  { value: 'Cuba', label: 'Cuba' },
  { value: 'Curaçao', label: 'Curaçao' },
  { value: 'Cyprus', label: 'Cyprus' },
  { value: 'Czechia', label: 'Czechia' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Djibouti', label: 'Djibouti' },
  { value: 'Dominica', label: 'Dominica' },
  { value: 'Dominican Republic', label: 'Dominican Republic' },
  { value: 'Ecuador', label: 'Ecuador' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'El Salvador', label: 'El Salvador' },
  { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
  { value: 'Eritrea', label: 'Eritrea' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Eswatini', label: 'Eswatini' },
  { value: 'Ethiopia', label: 'Ethiopia' },
  { value: 'Fiji', label: 'Fiji' },
  { value: 'Finland', label: 'Finland' },
  { value: 'France', label: 'France' },
  { value: 'French Guiana', label: 'French Guiana' },
  { value: 'French Polynesia', label: 'French Polynesia' },
  { value: 'Gabon', label: 'Gabon' },
  { value: 'Gambia', label: 'Gambia' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Greece', label: 'Greece' },
  { value: 'Greenland', label: 'Greenland' },
  { value: 'Grenada', label: 'Grenada' },
  { value: 'Guadeloupe', label: 'Guadeloupe' },
  { value: 'Guam', label: 'Guam' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Guernsey', label: 'Guernsey' },
  { value: 'Guinea', label: 'Guinea' },
  { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
  { value: 'Guyana', label: 'Guyana' },
  { value: 'Haiti', label: 'Haiti' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Iceland', label: 'Iceland' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Iran', label: 'Iran (Islamic Republic of)' },
  { value: 'Iraq', label: 'Iraq' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'Isle of Man', label: 'Isle of Man' },
  // { value: 'Israel', label: 'Israel' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Jersey', label: 'Jersey' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Kazakhstan', label: 'Kazakhstan' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Kiribati', label: 'Kiribati' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'Laos', label: 'Lao People’s Democratic Republic' },
  { value: 'Latvia', label: 'Latvia' },
  // { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Lesotho', label: 'Lesotho' },
  { value: 'Liberia', label: 'Liberia' },
  { value: 'Libya', label: 'Libya' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Macau', label: 'Macao' },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Malawi', label: 'Malawi' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Maldives', label: 'Maldives' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Marshall Islands', label: 'Marshall Islands' },
  { value: 'Martinique', label: 'Martinique' },
  { value: 'Mauritania', label: 'Mauritania' },
  { value: 'Mauritius', label: 'Mauritius' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Micronesia', label: 'Micronesia (Federated States of)' },
  { value: 'Moldova', label: 'Moldova (Republic of)' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Mongolia', label: 'Mongolia' },
  { value: 'Montenegro', label: 'Montenegro' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Morocco', label: 'Morocco' },
  { value: 'Mozambique', label: 'Mozambique' },
  { value: 'Myanmar', label: 'Myanmar' },
  { value: 'Namibia', label: 'Namibia' },
  { value: 'Nauru', label: 'Nauru' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'New Caledonia', label: 'New Caledonia' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Nicaragua', label: 'Nicaragua' },
  { value: 'Niger', label: 'Niger' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Niue', label: 'Niue' },
  { value: 'Norfolk Island', label: 'Norfolk Island' },
  { value: 'North Korea', label: 'North Korea' },
  { value: 'North Macedonia', label: 'North Macedonia' },
  { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Palau', label: 'Palau' },
  // { value: 'Palestine', label: 'Palestine, State of' },
  { value: 'Panama', label: 'Panama' },
  { value: 'Papua New Guinea', label: 'Papua New Guinea' },
  { value: 'Paraguay', label: 'Paraguay' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Philippines', label: 'Philippines' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Puerto Rico', label: 'Puerto Rico' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Réunion', label: 'Réunion' },
  { value: 'Romania', label: 'Romania' },
  { value: 'Russia', label: 'Russian Federation' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'Saint Barthélemy', label: 'Saint Barthélemy' },
  { value: 'Saint Helena', label: 'Saint Helena' },
  { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
  { value: 'Saint Lucia', label: 'Saint Lucia' },
  { value: 'Saint Martin', label: 'Saint Martin (French part)' },
  { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
  { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
  { value: 'Samoa', label: 'Samoa' },
  { value: 'San Marino', label: 'San Marino' },
  { value: 'Sao Tome and Principe', label: 'Sao Tome and Principe' },
  { value: 'Senegal', label: 'Senegal' },
  { value: 'Serbia', label: 'Serbia' },
  { value: 'Seychelles', label: 'Seychelles' },
  { value: 'Sierra Leone', label: 'Sierra Leone' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Sint Maarten', label: 'Sint Maarten (Dutch part)' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Slovenia', label: 'Slovenia' },
  { value: 'Solomon Islands', label: 'Solomon Islands' },
  { value: 'Somalia', label: 'Somalia' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'South Georgia and the South Sandwich Islands', label: 'South Georgia and the South Sandwich Islands' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'South Sudan', label: 'South Sudan' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Sudan', label: 'Sudan' },
  { value: 'Suriname', label: 'Suriname' },
  { value: 'Svalbard and Jan Mayen', label: 'Svalbard and Jan Mayen' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Switzerland', label: 'Switzerland' },
  // { value: 'Syrian Arab Republic', label: 'Syrian Arab Republic' },
  { value: 'Taiwan', label: 'Taiwan, Province of China' },
  { value: 'Tajikistan', label: 'Tajikistan' },
  { value: 'Tanzania', label: 'Tanzania, United Republic of' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Timor-Leste', label: 'Timor-Leste' },
  { value: 'Togo', label: 'Togo' },
  { value: 'Tokelau', label: 'Tokelau' },
  { value: 'Tonga', label: 'Tonga' },
  { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
  { value: 'Tunisia', label: 'Tunisia' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Turkmenistan', label: 'Turkmenistan' },
  { value: 'Turks and Caicos Islands', label: 'Turks and Caicos Islands' },
  { value: 'Tuvalu', label: 'Tuvalu' },
  { value: 'Uganda', label: 'Uganda' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'Uruguay', label: 'Uruguay' },
  { value: 'Uzbekistan', label: 'Uzbekistan' },
  { value: 'Vanuatu', label: 'Vanuatu' },
  { value: 'Vatican City', label: 'Holy See (Vatican City State)' },
  { value: 'Venezuela', label: 'Venezuela (Bolivarian Republic of)' },
  { value: 'Vietnam', label: 'Viet Nam' },
  { value: 'Wallis and Futuna', label: 'Wallis and Futuna' },
  { value: 'Western Sahara', label: 'Western Sahara' },
  // { value: 'Yemen', label: 'Yemen' }
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
                  isSubmitting ? 'bg-[#104686]  ' : 'bg-[#104686]   hover:[#104686]  '
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