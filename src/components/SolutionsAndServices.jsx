import React, { useState, useEffect } from 'react';
import { FaToolbox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { HomeApi } from '../services/HomeApi';
import '../styles/SolutionsAndServices.css';

const SolutionsAndServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBottomImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await HomeApi.getPublicBottomImages();
        const bottomImages = response.data || [];
        console.log('Fetched bottom images:', bottomImages);
        // Map bottomImages to services structure
        const mappedServices = bottomImages.map((item, index) => ({
          title: item.title || `Service ${index + 1}`,
          icon: <FaToolbox size={40} />,
          image: item.imageUrl || 'https://via.placeholder.com/500x350?text=Fallback+Image',
          path: '/moreproducts',
        }));
        setServices(mappedServices);
      } catch (err) {
        console.error('Error fetching bottom images:', err);
        setError('Failed to load services. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBottomImages();
  }, []);

  const handleCardClick = (path, index) => {
    if (active === index) {
      navigate(path);
    }
  };

  return (
    <div className="solutions-section">
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center py-8 text-red-600">{error}</div>}
      {!loading && !error && (
        <div className="solutions-container">
          {services.map((service, index) => (
            <div
              className={`solution-card ${active === index ? 'active' : ''}`}
              key={index}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onClick={() => handleCardClick(service.path, index)}
            >
              <img src={service.image} alt={service.title} />
              <div className="card-content">
                <div className="card-icon">{service.icon}</div>
                <h3 className="card-title">{service.title}</h3>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No services found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SolutionsAndServices;