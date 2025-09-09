import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { addressApi } from '../services/AddressApi';

const Contact = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [useCustomMap, setUseCustomMap] = useState(true); // State to toggle between custom and address-based maps

  useEffect(() => {
    const fetchActiveAddresses = async () => {
      try {
        setLoading(true);
        const response = await addressApi.getActive();
        
        if (response.success) {
          setOffices(response.data);
          // Select first non-special office by default, if available
          const nonSpecialOffices = response.data.filter(
            office => !['Head Office', 'Branch Office', 'Support Office'].includes(office.title)
          );
          if (nonSpecialOffices.length > 0) {
            setSelectedOffice(nonSpecialOffices[0]);
          } else if (response.data.length > 0) {
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
          },
          {
            id: 'fallback-2',
            title: 'Branch Office',
            name: 'Hikotek Instruments Pvt Ltd',
            address: '#5678, Secondary Street, Mumbai - 400001',
            phone: '+91 98765 43211',
            email: 'branch@hikotek.com',
          },
          {
            id: 'fallback-3',
            title: 'Support Office',
            name: 'Hikotek Instruments Pvt Ltd',
            address: '#9012, Support Lane, Delhi - 110001',
            phone: '+91 98765 43212',
            email: 'support@hikotek.com',
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

  // Helper function to get office by title
  const getOfficeByTitle = (title) => {
    return offices.find(office => office.title === title);
  };

  // Filter out special offices for the left-side list
  const otherOffices = offices.filter(
    office => !['Head Office', 'Branch Office', 'Support Office'].includes(office.title)
  );

  const getMapUrl = (address) => {
    // Use custom map if enabled
    if (useCustomMap) {
      return "https://www.google.com/maps/d/embed?mid=1r_Fd-9Qt-pjc9Z1_OHB9NDnaIyrTrcE&ehbc=2E312F&noprof=1";
    }
    
    // Fallback to address-based map if no custom map
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
      
      {/* Office Addresses Section at the Top */}
      <div className="text-center py-8 md:py-16 px-4 animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#104686] mb-6 md:mb-8">Our Offices</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">
          {/* Head Office */}
          <div className="bg-white rounded-xl p-4 md:p-6 w-full md:w-1/3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100">
            <h3 className="text-lg md:text-xl font-extrabold text-[#104686] mb-3 md:mb-4 flex items-center justify-center md:justify-start">
              <FaMapMarkedAlt className="text-xl md:text-2xl mr-2" /> Head Office
            </h3>
            {getOfficeByTitle('Head Office') ? (
              <>
                <p className="text-gray-800 font-semibold text-base md:text-lg mb-2 md:mb-3">{getOfficeByTitle('Head Office').name}</p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaMapMarkedAlt className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Head Office').address}
                </p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaPhoneAlt className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Head Office').phone}
                </p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaEnvelope className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Head Office').email}
                </p>
              </>
            ) : (
              <p className="text-gray-500 italic">No Head Office address available</p>
            )}
          </div>
          
          {/* Branch Office */}
          <div className="bg-white rounded-xl p-4 md:p-6 w-full md:w-1/3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100">
            <h3 className="text-lg md:text-xl font-extrabold text-[#104686] mb-3 md:mb-4 flex items-center justify-center md:justify-start">
              <FaMapMarkedAlt className="text-xl md:text-2xl mr-2" /> Branch Office
            </h3>
            {getOfficeByTitle('Branch Office') ? (
              <>
                <p className="text-gray-800 font-semibold text-base md:text-lg mb-2 md:mb-3">{getOfficeByTitle('Branch Office').name}</p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaMapMarkedAlt className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Branch Office').address}
                </p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaPhoneAlt className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Branch Office').phone}
                </p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaEnvelope className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Branch Office').email}
                </p>
              </>
            ) : (
              <p className="text-gray-500 italic">No Branch Office address available</p>
            )}
          </div>
          
          {/* Support Office */}
          <div className="bg-white rounded-xl p-4 md:p-6 w-full md:w-1/3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100">
            <h3 className="text-lg md:text-xl font-extrabold text-[#104686] mb-3 md:mb-4 flex items-center justify-center md:justify-start">
              <FaMapMarkedAlt className="text-xl md:text-2xl mr-2" /> Support Office
            </h3>
            {getOfficeByTitle('Support Office') ? (
              <>
                <p className="text-gray-800 font-semibold text-base md:text-lg mb-2 md:mb-3">{getOfficeByTitle('Support Office').name}</p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaMapMarkedAlt className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Support Office').address}
                </p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaPhoneAlt className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Support Office').phone}
                </p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaEnvelope className="text-sm md:text-lg" />
                  </span>
                  {getOfficeByTitle('Support Office').email}
                </p>
              </>
            ) : (
              <p className="text-gray-500 italic">No Support Office address available</p>
            )}
          </div>
        </div>
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

      <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-16 pb-16 md:pb-20 max-w-7xl mx-auto gap-6 md:gap-10">
        {/* Other Office Cards (Excluding Head, Branch, Support) */}
        <div className="w-full lg:w-2/5 space-y-4 md:space-y-6">
          {otherOffices.length > 0 ? (
            otherOffices.map((office) => (
              <div
                key={office.id || office.title}
                className={`bg-white rounded-xl md:rounded-2xl shadow-md transition duration-300 p-4 md:p-6 border cursor-pointer ${
                  selectedOffice?.id === office.id 
                    ? 'border-blue-400 shadow-lg transform -translate-y-1' 
                    : 'border-gray-100 hover:shadow-lg hover:-translate-y-1'
                }`}
                onClick={() => setSelectedOffice(office)}
              >
                <h3 className="text-lg md:text-xl font-bold text-[#104686] mb-2 md:mb-3">
                  {office.title}
                </h3>
                <p className="text-gray-700 font-medium mb-1 md:mb-2 text-sm md:text-base">{office.name}</p>
                <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">{office.address}</p>
                <div className="space-y-1 md:space-y-2">
                  {office.phone && (
                    <p className="flex items-center text-[#104686] text-sm md:text-base">
                      <FaPhoneAlt className="mr-2 md:mr-3 text-sm md:text-base" /> 
                      <span>{office.phone}</span>
                    </p>
                  )}
                  {office.email && (
                    <p className="flex items-center text-[#104686] text-sm md:text-base">
                      <FaEnvelope className="mr-2 md:mr-3 text-sm md:text-base" /> 
                      <span>{office.email}</span>
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 md:py-8 bg-white rounded-xl md:rounded-2xl shadow-md">
              <FaMapMarkedAlt className="text-3xl md:text-4xl text-gray-400 mx-auto mb-3 md:mb-4" />
              <p className="text-gray-600 text-sm md:text-base">No additional contact information available.</p>
            </div>
          )}
        </div>

        {/* Interactive Map */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
            <div className="h-64 sm:h-80 md:h-96 lg:h-[500px]">
              <iframe
                title="Office Location"
                src={getMapUrl(selectedOffice?.address)}
                className="w-full h-full"
                loading="lazy"
                style={{ filter: 'grayscale(20%) contrast(110%) brightness(95%)' }}
                allowFullScreen
              ></iframe>
            </div>
            {selectedOffice && !useCustomMap && (
              <div className="p-3 md:p-4 bg-white border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div>
                    <h4 className="font-semibold text-[#104686] text-sm md:text-base">{selectedOffice.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{selectedOffice.address}</p>
                  </div>
                  <a
                    href={getMapUrl(selectedOffice.address).replace('embed', 'view')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 text-xs md:text-sm"
                  >
                    Open in Maps <FaExternalLinkAlt className="ml-1 text-xs md:text-sm" />
                  </a>
                </div>
              </div>
            )}
            {useCustomMap && (
              <div className="p-3 md:p-4 bg-white border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div>
                    <h4 className="font-semibold text-[#104686] text-sm md:text-base">Our Locations</h4>
                    <p className="text-xs md:text-sm text-gray-600">View all our office locations</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/d/viewer?mid=1r_Fd-9Qt-pjc9Z1_OHB9NDnaIyrTrcE&ehbc=2E312F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 text-xs md:text-sm"
                  >
                    Open in Maps <FaExternalLinkAlt className="ml-1 text-xs md:text-sm" />
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