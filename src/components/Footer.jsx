import React from 'react';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa6";
import HikotekLogo from '../assets/Hikotek_Logo.png';

const Footer = () => {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in nibh vehicula.
            </p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Fashion Street, New York, NY 10001</p>
            <p className="flex items-center gap-2 mt-1"><FaEnvelope /> hello@example.com</p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/moreproducts" className="hover:underline">Products</a></li>
              <li><a href="/distributor" className="hover:underline">Distributor Apply</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="font-semibold mb-3">Customer Service</h4>
            <ul className="space-y-1">
              <li><a href="/support" className="hover:underline">Product Support</a></li>
              <li><a href="/warranty" className="hover:underline">Product Warranty</a></li>
              <li><a href="/registration" className="hover:underline">Product Registration</a></li>
              <li><a href="/tech-support" className="hover:underline">Technical Support</a></li>
              <li><a href="/downloads" className="hover:underline">Downloads</a></li>
            </ul>
          </div>

          {/* App Download + Social */}
          <div>
            <h4 className="font-semibold mb-3">Download Our App</h4>
            <p className="mb-3">Shop on the go with our mobile app</p>
            <div className="flex gap-3 mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_%28black%29_SVG.svg" alt="App Store" className="w-28" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="w-28" />
            </div>
            <div className="flex gap-4 text-gray-600 text-lg">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaXTwitter /></a>
              <a href="#"><FaTiktok /></a>
              <a href="#"><FaPinterest /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;