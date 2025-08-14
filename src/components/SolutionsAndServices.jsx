import React, { useState } from 'react';
import { FaToolbox, FaCogs, FaWrench } from 'react-icons/fa';
import '../styles/SolutionsAndServices.css';

const services = [
  {
    title: 'Technical Support',
    icon: <FaToolbox size={40} />, 
    image: 'https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/loBplKmolkSRjlrnomrliq/Magnetic-Measurement-Banner.png',
    description: 'Get expert help with equipment setup and maintenance.',
  },
  {
    title: 'Custom Solutions',
    icon: <FaCogs size={40} />, 
    image: 'https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/lqBplKmolkSRmkmoljnkip/3.png',
    description: 'We design tailored solutions to meet your business needs.',
  },
  
];

const SolutionsAndServices = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="solutions-section">
      <h2 className="solutions-title">Solutions and Services</h2>
      <div className="solutions-container">
        {services.map((service, index) => (
          <div
            className={`solution-card ${active === index ? 'active' : ''}`}
            key={index}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <img src={service.image} alt={service.title} />
            <div className="service-info">
              <div className="service-icon">{service.icon}</div>
              <h4>{service.title}</h4>
              {active === index && <p>{service.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsAndServices;