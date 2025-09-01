import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { addressApi } from '../services/AddressApi';

const Contact = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);

  useEffect(() => {
    const fetchActiveAddresses = async () => {
      try {
        setLoading(true);
        const response = await addressApi.getActive();
        
        if (response.success) {
          setOffices(response.data);
          // Select first office by default
          if (response.data.length > 0) {
            setSelectedOffice(response.data[0]);
          }
        } else {
          throw new Error(response.error || 'Failed to load addresses');
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError(err.message || 'Failed to load contact information');
        
        // Fallback data
        const fallbackOffices = [
          {
            id: 'fallback-1',
            title: 'Head Office',
            name: 'Hikotek Instruments Pvt Ltd',
            address: '#1234, Main Street, Bengaluru - 560001',
            phone: '+91 98765 43210',
            email: 'info@hikotek.com',
          }
        ];
        setOffices(fallbackOffices);
        setSelectedOffice(fallbackOffices[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveAddresses();
  }, []);

  const getMapUrl = (address) => {
    if (!address) return 'https://www.openstreetmap.org/export/embed.html';
    
    // Encode address for Google Maps
    const encodedAddress = encodeURIComponent(address);
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white text-gray-900 min-h-screen font-sans flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-700">Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white text-gray-900 min-h-screen font-sans">
      <style>{styles}</style>
      
      <div className="text-center py-14 px-4 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-[#104686] bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 mb-4 drop-shadow-sm">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-700 font-medium max-w-xl mx-auto">
          Whether you have a question or just want to connect, our team is here for you.
        </p>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800">
              {error} Showing available contact information.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-16 pb-20 max-w-7xl mx-auto gap-10">
        {/* Office Cards */}
        <div className="w-full lg:w-2/5 space-y-6">
          {offices.length > 0 ? (
            offices.map((office) => (
              <div
                key={office.id || office.title}
                className={`bg-white rounded-2xl shadow-md transition duration-300 p-6 border cursor-pointer ${
                  selectedOffice?.id === office.id 
                    ? 'border-blue-400 shadow-lg transform -translate-y-1' 
                    : 'border-gray-100 hover:shadow-lg hover:-translate-y-1'
                }`}
                onClick={() => setSelectedOffice(office)}
              >
                <h3 className="text-xl font-bold text-[#104686] mb-3">
                  {office.title}
                </h3>
                <p className="text-gray-700 font-medium mb-2">{office.name}</p>
                <p className="text-gray-600 mb-4">{office.address}</p>
                <div className="space-y-2">
                  {office.phone && (
                    <p className="flex items-center text-[#104686]">
                      <FaPhoneAlt className="mr-3" /> 
                      <span>{office.phone}</span>
                    </p>
                  )}
                  {office.email && (
                    <p className="flex items-center text-[#104686]">
                      <FaEnvelope className="mr-3" /> 
                      <span>{office.email}</span>
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl shadow-md">
              <FaMapMarkedAlt className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No contact information available.</p>
            </div>
          )}
        </div>

        {/* Interactive Map */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
            <div className="h-96 md:h-[500px]">
              <iframe
                title="Office Location"
                src={getMapUrl(selectedOffice?.address)}
                className="w-full h-full"
                loading="lazy"
                style={{ filter: 'grayscale(20%) contrast(110%) brightness(95%)' }}
                allowFullScreen
              ></iframe>
            </div>
            {selectedOffice && (
              <div className="p-4 bg-white border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#104686]">{selectedOffice.title}</h4>
                    <p className="text-sm text-gray-600">{selectedOffice.address}</p>
                  </div>
                  <a
                    href={getMapUrl(selectedOffice.address).replace('embed', 'view')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Open in Maps <FaExternalLinkAlt className="ml-1" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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