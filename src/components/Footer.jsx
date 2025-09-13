import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa6";
import HikotekLogo from '../assets/Hikotek_Logo.png';
import { publicFooterApi } from '../services/FooterApi';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch footer data on component mount
  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicFooterApi.getActiveFooter();
      
      if (response.success) {
        setFooterData(response.data);
      } else {
        setError('Failed to load footer data');
      }
    } catch (err) {
      console.error('Error fetching footer data:', err);
      setError('Failed to load footer information');
    } finally {
      setLoading(false);
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
          />
          <button
            className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-[#104686] text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Main */}
      <div className="bg-white py-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          
          {/* Company Info */}
          <div>
            <a href="/">
              <img src={HikotekLogo} alt="Hikotek Logo" className="w-32" />
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
                <FaEnvelope /> {data.email}
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
                <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              )}
              {data.instagram && (
                <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              )}
              {data.twitter && (
                <a href={data.twitter} target="_blank" rel="noopener noreferrer">
                  <FaXTwitter />
                </a>
              )}
              {data.youtube && (
                <a href={data.youtube} target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              )}
            </div>
            
            {/* Optional: Add social media follow text */}
            <p className="text-xs text-gray-500 mt-2">
              Follow us for updates and promotions
            </p>
          </div>
        </div>
      </div>

      

      {/* Error message (hidden by default) */}
      {error && (
        <div className="hidden">
          <p>Footer data error: {error}</p>
        </div>
      )}
    </footer>
  );
};

export default Footer;