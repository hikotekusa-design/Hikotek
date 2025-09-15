import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { addressApi } from '../services/AddressApi';

const Contact = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [useCustomMap, setUseCustomMap] = useState(true);

  useEffect(() => {
    const fetchActiveAddresses = async () => {
      try {
        setLoading(true);
        const response = await addressApi.getActive();
        
        if (response.success) {
          setOffices(response.data);
          // Select first office by default, if available
          if (response.data.length > 0) {
            setSelectedOffice(response.data[0]);
          }
        } else {
          throw new Error(response.error || 'Failed to load addresses');
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError(err.message || 'Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveAddresses();
  }, []);

  // Function to identify special office addresses (with custom logic)
  const getSpecialOffices = () => {
    // Customize this logic based on how you identify special offices
    // This example prioritizes offices with "office" in the title
    return offices.filter(office => 
      office.title.toLowerCase().includes('office') ||
      office.title.toLowerCase().includes('head') ||
      office.title.toLowerCase().includes('branch') ||
      office.title.toLowerCase().includes('support') ||
      office.title.toLowerCase().includes('main')
    );
  };

  // Filter out special offices for the left-side list (user view addresses)
  const userViewAddresses = offices.filter(
    office => !getSpecialOffices().includes(office)
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

  // Function to get icon based on office title
  const getOfficeIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('head') || lowerTitle.includes('main')) {
      return <FaMapMarkedAlt className="text-xl md:text-2xl mr-2" />;
    } else if (lowerTitle.includes('branch')) {
      return <FaMapMarkedAlt className="text-xl md:text-2xl mr-2" />;
    } else if (lowerTitle.includes('support')) {
      return <FaMapMarkedAlt className="text-xl md:text-2xl mr-2" />;
    }
    
    // Default icon
    return <FaMapMarkedAlt className="text-xl md:text-2xl mr-2" />;
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

  const specialOffices = getSpecialOffices();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white text-gray-900 min-h-screen font-sans">
      <style>{styles}</style>
      
      {/* Office Addresses Section at the Top */}
      {specialOffices.length > 0 && (
        <div className="text-center py-8 md:py-16 px-4 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#104686] mb-6 md:mb-8">Our Offices</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">
            {specialOffices.map((office) => (
              <div key={office.id} className="bg-white rounded-xl p-4 md:p-6 w-full md:w-1/3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100">
                <h3 className="text-lg md:text-xl font-extrabold text-[#104686] mb-3 md:mb-4 flex items-center justify-center md:justify-start">
                  {getOfficeIcon(office.title)} {office.title}
                </h3>
                <p className="text-gray-800 font-semibold text-base md:text-lg mb-2 md:mb-3">{office.name}</p>
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaMapMarkedAlt className="text-sm md:text-lg" />
                  </span>
                  {office.address}
                </p>
                {office.phone && (
                  <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600 mb-2 md:mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                      <FaPhoneAlt className="text-sm md:text-lg" />
                    </span>
                    {office.phone}
                  </p>
                )}
                <p className="flex flex-col md:flex-row items-start md:items-center text-gray-600">
                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-[#104686] mr-2 mb-1 md:mb-0">
                    <FaEnvelope className="text-sm md:text-lg" />
                  </span>
                  {office.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800">
              {error} Please try again later.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-16 pb-16 md:pb-20 max-w-7xl mx-auto gap-6 md:gap-10">
        {/* User View Addresses List (Excluding special offices) */}
        <div className="w-full lg:w-2/5">
          {userViewAddresses.length > 0 ? (
            <div>
              {/* <h2 className="text-xl font-bold text-[#104686] mb-4">Our Locations</h2> */}
              <ul className="space-y-6">
                {userViewAddresses.map((office) => (
                  <li
                    key={office.id || office.title}
                    className={` p-4 rounded-lg  cursor-pointer transition duration-300 ${
                      selectedOffice?.id === office.id 
                        && 'text-[#104686]' 
                        
                    }`}
                    onClick={() => setSelectedOffice(office)}
                  >
                    <h3 className="text-xl font-bold text-[#104686] mb-2">{office.title}</h3>
                    <p className="text-lg text-[#104686] font-medium mb-1">{office.name}</p>
                    <p className="text-lg mb-2 text-[#104686]">{office.address}</p>
                    <div className="space-y-1 text-[#104686]">
                      {office.phone && (
                        <p className="flex items-center text-sm">
                          <FaPhoneAlt className="mr-2 text-sm" /> 
                          <span>{office.phone}</span>
                        </p>
                      )}
                      {office.email && (
                        <p className="flex items-center text-sm">
                          <FaEnvelope className="mr-2 text-sm" /> 
                          <span>{office.email}</span>
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <FaMapMarkedAlt className="text-3xl md:text-4xl text-gray-400 mx-auto mb-3 md:mb-4" />
              <p className="text-gray-600 text-sm md:text-base">No locations available.</p>
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