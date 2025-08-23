import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DistributorApi } from '../services/Distributor'; 

const DistributorApply = () => {
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    title: '',
    email: '',
    phone: '',
    channels: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await DistributorApi.submitApplication(formData);
      setSubmitSuccess(true);
      // Reset form on success
      setFormData({
        company: '',
        contactName: '',
        title: '',
        email: '',
        phone: '',
        channels: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to form when clicking "Apply now"
  const scrollToForm = () => {
    document.getElementById('application-form').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white font-sans text-gray-800">
      {/* Banner Section */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Business Partnership"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#104686] to-[#104686]  flex items-center justify-center">
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow mb-4">
              Become a Distributor
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join our global partner network and grow your business with our premium products.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Application Process Section */}
      <section className="px-4 md:px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Application Process
            </h2>
            <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
              We're looking for passionate partners to represent our brand. Complete our simple application process to get started.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="lg:w-1/4 flex flex-col items-start"
            >
              <button 
                onClick={scrollToForm}
                className="bg-[#104686]  hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition duration-300 shadow-lg flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                Apply now
              </button>
            </motion.div>

            <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Online Application',
                  desc: 'Complete our simple online form with your company details and background.'
                },
                {
                  title: 'Discovery Call',
                  desc: 'Let’s discuss how we can work together to achieve mutual success.'
                },
                {
                  title: 'Final Approval',
                  desc: 'Welcome to our partner network! Let’s start this exciting journey together.'
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:border-blue-200 transition relative overflow-hidden group"
                >
                  <div className="absolute -right-10 -top-10 w-28 h-28 bg-blue-100 rounded-full opacity-30 group-hover:opacity-50 transition" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 text-xl font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-xl text-[#104686]  mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Distributor Application Form</h2>

          {submitSuccess ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Application Submitted!</h3>
              <p className="text-green-600">Thank you for your application. Our team will review your information and contact you soon.</p>
            </motion.div>
          ) : (
            <div className="border border-gray-200 rounded-2xl shadow-xl p-8 bg-white">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="company" className="font-medium text-gray-700 mb-2">Company *</label>
                  <input 
                    type="text" 
                    id="company" 
                    required 
                    value={formData.company}
                    onChange={handleChange}
                    className="p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="contactName" className="font-medium text-gray-700 mb-2">Contact Name *</label>
                    <input 
                      type="text" 
                      id="contactName" 
                      required 
                      value={formData.contactName}
                      onChange={handleChange}
                      className="p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="title" className="font-medium text-gray-700 mb-2">Title</label>
                    <input 
                      type="text" 
                      id="title" 
                      value={formData.title}
                      onChange={handleChange}
                      className="p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="font-medium text-gray-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="font-medium text-gray-700 mb-2">Phone *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      className="p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="channels" className="font-medium text-gray-700 mb-2">
                    What channels/markets do you currently (or anticipate selling) sell into? *
                  </label>
                  <textarea 
                    id="channels" 
                    required 
                    value={formData.channels}
                    onChange={handleChange}
                    className="p-4 border border-gray-300 rounded-lg text-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="text-center pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`bg-[#104686]  hover:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DistributorApply;