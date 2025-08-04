import React, { useState } from 'react';
import '../styles/GlobeMap.css';

const GlobeMap = ({ isOpen, onClose }) => {
  const [activeRegion, setActiveRegion] = useState('Americas');

  const regions = {
    Americas: [
      { name: 'United States', code: 'us' },
      { name: 'Canada', code: 'ca' },
      { name: 'Brazil', code: 'br' },
      { name: 'Mexico', code: 'mx' }
    ],
    Europe: [
      { name: 'Germany', code: 'de' },
      { name: 'France', code: 'fr' },
      { name: 'United Kingdom', code: 'gb' },
      { name: 'Italy', code: 'it' }
    ],
    'Asia Pacific': [
      { name: 'India', code: 'in' },
      { name: 'China', code: 'cn' },
      { name: 'Japan', code: 'jp' },
      { name: 'Australia', code: 'au' }
    ],
    Africa: [
      { name: 'South Africa', code: 'za' },
      { name: 'Nigeria', code: 'ng' },
      { name: 'Kenya', code: 'ke' },
      { name: 'Egypt', code: 'eg' }
    ],
    'Middle East': [
      { name: 'UAE', code: 'ae' },
      { name: 'Saudi Arabia', code: 'sa' },
      { name: 'Qatar', code: 'qa' },
      { name: 'Turkey', code: 'tr' }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="globe-modal-overlay" onClick={onClose}>
      <div className="globe-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-x-btn" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="map-container">
          <img 
            src="https://www.pikpng.com/pngl/b/48-485557_ft-bg-world-map-png-dots-clipart.png" 
            alt="World Map" 
            className="map-image" 
          />
        </div>
        
        <h3>Select Region</h3>
        
        <div className="region-tabs">
          {Object.keys(regions).map((region) => (
            <button
              key={region}
              className={`region-btn ${activeRegion === region ? 'active' : ''}`}
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
        
        <div className="country-list">
          {regions[activeRegion].map((country) => (
            <div key={country.name} className="country-item">
              <img 
                src={`https://flagcdn.com/w40/${country.code}.png`} 
                srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                alt={`${country.name} flag`}
                className="country-flag"
              />
              <span className="country-name">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobeMap;