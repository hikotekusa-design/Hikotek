import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa6";
import HikotekLogo from '../assets/Hikotek_Logo.png';



const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10">
      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-4 text-center pb-12">
        <h2 className="text-2xl font-bold">Join Our Newsletter</h2>
        <p className="mt-2 mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <div className="relative w-full sm:w-[600px] mx-auto">
  <input
    type="email"
    placeholder="Your email address"
    className="w-full py-4 pr-32 pl-5 text-base rounded-full border border-gray-300 focus:outline-none"
  />
  <button
    className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow"
  >
    Subscribe
  </button>
</div>

      </div>

      {/* Footer Main */}
      <div className="bg-white py-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {/* Company Info */}
          <div>
             <div className="nav-left">
                      <a href="/">
                        <img src={HikotekLogo} alt="Hikotek Logo" className="logo" />
                      </a>
                    </div>
                    <br />
            
            <p className="mb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in nibh vehicula.</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Fashion Street, New York, NY 10001</p>
            <p className="flex items-center gap-2 mt-1"><FaEnvelope /> hello@example.com</p>
          </div>

          {/* Shop */}
         {/* Shop */}
<div>
  <h4 className="font-semibold mb-3">Shop</h4>
  <ul className="space-y-1">
    <li><a href="/new-arrivals" className="hover:underline">New Arrivals</a></li>
    <li><a href="/bestsellers" className="hover:underline">Bestsellers</a></li>
    <li><a href="/womens-clothing" className="hover:underline">Women's Clothing</a></li>
    <li><a href="/mens-clothing" className="hover:underline">Men's Clothing</a></li>
    <li><a href="/accessories" className="hover:underline">Accessories</a></li>
    <li><a href="/sale" className="hover:underline">Sale</a></li>
  </ul>
</div>

{/* Support */}
<div>
  <h4 className="font-semibold mb-3">Support</h4>
  <ul className="space-y-1">
    <li><a href="/help-center" className="hover:underline">Help Center</a></li>
    <li><a href="/order-status" className="hover:underline">Order Status</a></li>
    <li><a href="/shipping-info" className="hover:underline">Shipping Info</a></li>
    <li><a href="/returns" className="hover:underline">Returns & Exchanges</a></li>
    <li><a href="/size-guide" className="hover:underline">Size Guide</a></li>
    <li><a href="/contact" className="hover:underline">Contact Us</a></li>
  </ul>
</div>

{/* Company */}
<div>
  <h4 className="font-semibold mb-3">Company</h4>
  <ul className="space-y-1">
    <li><a href="/about" className="hover:underline">About Us</a></li>
    <li><a href="/careers" className="hover:underline">Careers</a></li>
    <li><a href="/press" className="hover:underline">Press</a></li>
    <li><a href="/affiliates" className="hover:underline">Affiliates</a></li>
    <li><a href="/responsibility" className="hover:underline">Responsibility</a></li>
    <li><a href="/investors" className="hover:underline">Investors</a></li>
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
              <FaFacebook />
              <FaInstagram />
              <FaXTwitter />
              <FaTiktok />
              <FaPinterest />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
