import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white text-gray-900 min-h-screen font-sans">
      <style>{styles}</style>
      
      {/* Heading with Animation */}
      <div className="text-center py-14 px-4 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-[#104686] bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 mb-4 drop-shadow-sm">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-700 font-medium max-w-xl mx-auto">
          Whether you have a question or just want to connect, our team is here for you.
        </p>
      </div>

      {/* Main Content - List on Left, Map on Right */}
      <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-16 pb-20 max-w-7xl mx-auto gap-10">
        {/* Left Column - Office Cards */}
        <div className="w-full lg:w-2/5 space-y-8">
          {offices.map((office, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#104686] mb-4 border-b pb-2">
                {office.title}
              </h3>
              <p className="text-gray-700 font-medium">{office.name}</p>
              <p className="text-gray-600">{office.address}</p>
              <div className="mt-4 space-y-1">
                <p className="flex items-center text-[#104686]">
                  <FaPhoneAlt className="mr-2" /> <span className="text-[#104686] ">{office.phone}</span>
                </p>
                <p className="flex items-center text-[#104686]">
                  <FaEnvelope className="mr-2" /> <span className="text-[#104686] ">{office.email}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Map */}
        <div className="w-full lg:w-3/5">
          <div className="h-full rounded-2xl overflow-hidden shadow-xl border border-blue-200">
            <iframe
              title="World Map"
              src="https://www.openstreetmap.org/export/embed.html"
              className="w-full h-full min-h-[500px]"
              loading="lazy"
              style={{ filter: 'grayscale(20%) contrast(110%) brightness(95%)' }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

// Office data
const offices = [
  {
    title: 'Head Office',
    name: 'Hikotek Instruments Pvt Ltd',
    // address: '#1234, Main Street, Bengaluru - 560001',
    phone: '+91 98765 43210',
    email: 'info@hikotek.com',
  },
  {
    title: 'Middle East Office',
    name: 'Hikotek ME LLC',
    // address: 'Al Qusais Industrial Area, Dubai, UAE',
    phone: '+971 50 123 4567',
    email: 'dubai@hikotek.com',
  },
  {
    title: 'Support Office',
    name: 'Hikotek Instruments',
    // address: 'Plot No. 45, Sector 22, Noida - 201301',
    phone: '+91 99999 88888',
    email: 'support@hikotek.com',
  },
];

// Animation CSS
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-out;
  }
`;

export default Contact;