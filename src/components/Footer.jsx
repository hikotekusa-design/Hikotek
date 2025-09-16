import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaTimes } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa6";
import HikotekLogo from '../assets/Hikotek_Logo.png';
import { publicFooterApi } from '../services/FooterApi';
import { AboutApi } from '../services/AboutApi';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-lg flex items-center justify-between min-w-[300px] z-50 transition-all duration-300`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <FaTimes />
      </button>
    </div>
  );
};

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Close toast notification
  const closeToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  // Fetch footer and about data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch footer data
      const footerResponse = await publicFooterApi.getActiveFooter();
      if (footerResponse.success) {
        setFooterData(footerResponse.data);
      } else {
        setError('Failed to load footer data');
      }

      // Fetch about data for logo
      const aboutResponse = await AboutApi.get();
      if (aboutResponse.success && aboutResponse.data) {
        setAboutData(aboutResponse.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load information');
    } finally {
      setLoading(false);
    }
  };

  // Handle newsletter subscription
  const handleSubscribe = async () => {
    if (!subscriberEmail || !/\S+@\S+\.\S+/.test(subscriberEmail)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setSubscribeLoading(true);

    try {
      const response = await publicFooterApi.subscribe(subscriberEmail);
      if (response.success) {
        showToast('Subscribed successfully! You will receive updates soon.');
        setSubscriberEmail('');
      } else {
        showToast(response.error || 'Failed to subscribe. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Error subscribing:', err);
      showToast('Failed to subscribe. Please try again later.', 'error');
    } finally {
      setSubscribeLoading(false);
    }
  };

  // Handle Enter key press in email input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  // Fallback data in case API fails or during loading
  const fallbackData = {
    description: "Hikotek LLC - Premium quality products and innovative solutions for your needs.",
    email: "hello@hikotek.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, New York, NY 10001",
    facebook: "https://facebook.com/hikotek",
    instagram: "https://www.instagram.com/hikotek_llc/",
    twitter: "https://x.com/hikotek",
    youtube: "https://youtube.com/hikotek"
  };

  // Use fetched data or fallback data
  const data = footerData || fallbackData;

  // Get logo from about data or use fallback logo
  const logoUrl = aboutData?.logo || HikotekLogo;

  if (loading) {
    return (
      <footer className="bg-gray-100 text-gray-700 pt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p>Loading footer...</p>
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer className="bg-gray-100 text-gray-700 pt-10">
        {/* Newsletter */}
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Join Our Newsletter</h2>
          <p className="mt-2 mb-4 text-sm md:text-base text-gray-600">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full py-3 pr-32 pl-4 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              required
            />
            <button
              className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-[#104686] text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 hover:bg-[#0d3a6d] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubscribe}
              disabled={subscribeLoading}
            >
              {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </div>

        {/* Footer Main */}
        <div className="bg-white py-10 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

            {/* Company Info */}
            <div>
              <a href="/">
                <img
                  src={logoUrl}
                  alt="Hikotek Logo"
                  className="w-32"
                  onError={(e) => {
                    e.target.src = HikotekLogo;
                  }}
                />
              </a>
              <p className="mt-4 mb-4 text-sm">
                {data.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in nibh vehicula."}
              </p>
              {data.address && (
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {data.address}
                </p>
              )}
              {data.email && (
                <p className="flex items-center gap-2 mt-1">
                  <FaEnvelope />
                  <a
                    href={`mailto:${data.email}`}
                    // className="text-blue-600 hover:underline"
                    aria-label={`Email ${data.email}`}
                  >
                    {data.email}
                  </a>
                </p>
              )}
              {data.phone && (
                <p className="flex items-center gap-2 mt-1">
                  <FaPhone /> {data.phone}
                </p>
              )}
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-1">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/moreproducts" className="hover:underline">Products</a></li>
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                <li><a href="/distributor" className="hover:underline">Join our Network</a></li>
              </ul>
            </div>

            {/* Customer Service Links */}
            <div>
              <h4 className="font-semibold mb-3">Customer Service</h4>
              <ul className="space-y-1">
                <li><a href="/contact" className="hover:underline">Product Support</a></li>
                <li><a href="/contact" className="hover:underline">Technical Support</a></li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-4 text-gray-600 text-lg mb-4">
                {data.facebook && (
                  <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    <FaFacebook />
                  </a>
                )}
                {data.instagram && (
                  <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
                    <FaInstagram />
                  </a>
                )}
                {data.twitter && (
                  <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                    <FaXTwitter />
                  </a>
                )}
                {data.youtube && (
                  <a href={data.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                    <FaYoutube />
                  </a>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Follow us for updates and promotions
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-gray-800 text-white py-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Hikotek LLC. All rights reserved.</p>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </>
  );
};

export default Footer;