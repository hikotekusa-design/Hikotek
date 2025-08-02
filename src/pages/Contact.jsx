import React, { useState } from 'react';
import GallerySlider from '../components/GallerySlider';

const products = [
  { name: 'Vernier Caliper', image: "https://www.faithfulltools.com/images/full/FAICALVER.jpg" },
  { name: 'Digital Torque Driver', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkmmhpHTq408nP2US0CqAitsA6RWHSKUb0A&s' },
  { name: 'PB 8326 Set A1', image: 'https://goodwill.in/pub/media/catalog/product/cache/affde3bad6fff216fce8dd9a3ef91de9/p/b/pb_8326.png' },
  { name: 'Jetech Bits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtv6_1kyROIOuD_FEkduwbdHy6yGD4ZauaA&s' },
  { name: 'Mechanical External Micrometer', image: 'https://bakergauges.com/wp-content/uploads/2015/08/prod-feat-micromet-mech-0-200-2b.jpg' },
];

const Contact = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % products.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + products.length) % products.length);

  return (
    <div className="min-h-screen bg-blue-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-6xl font-extrabold text-center mb-16 tracking-wide">Contact Us</h1>

        {/* Gallery Slider */}
        <div className="mb-20">
          <div className="bg-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <GallerySlider products={products} />
          </div>
        </div>

        {/* Company Details */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">Hikotek</h2>
          <p className="text-xl leading-relaxed">HSR Layout<br />Bangalore, Karnataka, India</p>
          <p className="text-xl mt-4">
            Phone: <a href="tel:987654321" className="text-yellow-300 hover:underline">987654321</a> | 
            Email: <a href="mailto:example@gmail.com" className="text-yellow-300 hover:underline">example@gmail.com</a>
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enquiry Form */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
            <h3 className="text-4xl font-semibold mb-8">Send Your Enquiry</h3>
            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-4 bg-white text-black rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
              />
              <input 
                type="text" 
                placeholder="Your Address" 
                className="w-full p-4 bg-white text-black rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
              />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full p-4 bg-white text-black rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
              />
              <textarea 
                placeholder="Your Message" 
                rows="5" 
                className="w-full p-4 bg-white text-black rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
              />
              <button 
                type="button" 
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px] transform hover:scale-105 transition-transform duration-500">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.654790644579!2d46.675295314426835!3d24.71355108410879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f04f6ae4e95bb%3A0x8fcda9cf69c019ae!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1616595405694!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
