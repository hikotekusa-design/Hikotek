import React, { useState } from 'react';
import '../styles/GlobeMap.css';

const GlobeMap = ({ isOpen, onClose }) => {
  const [activeRegion, setActiveRegion] = useState('Americas');

  const regions = {
    Americas: [
      { name: 'United States', code: 'us' },
      { name: 'Canada', code: 'ca' },
      { name: 'Brazil', code: 'br' },
      { name: 'Mexico', code: 'mx' },
      { name: 'Argentina', code: 'ar' },
      { name: 'Chile', code: 'cl' },
      { name: 'Colombia', code: 'co' },
      { name: 'Peru', code: 'pe' },
      { name: 'Venezuela', code: 've' },
      { name: 'Ecuador', code: 'ec' },
      { name: 'Guatemala', code: 'gt' },
      { name: 'Cuba', code: 'cu' },
      { name: 'Dominican Republic', code: 'do' },
      { name: 'Honduras', code: 'hn' },
      { name: 'Paraguay', code: 'py' },
      { name: 'El Salvador', code: 'sv' }
    ],
    Europe: [
      { name: 'Germany', code: 'de' },
      { name: 'France', code: 'fr' },
      { name: 'United Kingdom', code: 'gb' },
      { name: 'Italy', code: 'it' },
      { name: 'Spain', code: 'es' },
      { name: 'Netherlands', code: 'nl' },
      { name: 'Sweden', code: 'se' },
      { name: 'Poland', code: 'pl' },
      { name: 'Belgium', code: 'be' },
      { name: 'Greece', code: 'gr' },
      { name: 'Portugal', code: 'pt' },
      { name: 'Czech Republic', code: 'cz' },
      { name: 'Hungary', code: 'hu' },
      { name: 'Austria', code: 'at' },
      { name: 'Switzerland', code: 'ch' },
      { name: 'Denmark', code: 'dk' }
    ],
    'Asia Pacific': [
      { name: 'India', code: 'in' },
      { name: 'China', code: 'cn' },
      { name: 'Japan', code: 'jp' },
      { name: 'Australia', code: 'au' },
      { name: 'South Korea', code: 'kr' },
      { name: 'Indonesia', code: 'id' },
      { name: 'Philippines', code: 'ph' },
      { name: 'Malaysia', code: 'my' },
      { name: 'Thailand', code: 'th' },
      { name: 'Vietnam', code: 'vn' },
      { name: 'Singapore', code: 'sg' },
      { name: 'New Zealand', code: 'nz' },
      { name: 'Bangladesh', code: 'bd' },
      { name: 'Pakistan', code: 'pk' },
      { name: 'Sri Lanka', code: 'lk' },
      { name: 'Nepal', code: 'np' }
    ],
    Africa: [
      { name: 'South Africa', code: 'za' },
      { name: 'Nigeria', code: 'ng' },
      { name: 'Kenya', code: 'ke' },
      { name: 'Egypt', code: 'eg' },
      { name: 'Ghana', code: 'gh' },
      { name: 'Morocco', code: 'ma' },
      { name: 'Ethiopia', code: 'et' },
      { name: 'Tanzania', code: 'tz' },
      { name: 'Algeria', code: 'dz' },
      { name: 'Angola', code: 'ao' },
      { name: 'Uganda', code: 'ug' },
      { name: 'Sudan', code: 'sd' },
      { name: 'Cameroon', code: 'cm' },
      { name: 'Ivory Coast', code: 'ci' },
      { name: 'Madagascar', code: 'mg' },
      { name: 'Zimbabwe', code: 'zw' }
    ],
    'Middle East': [
      { name: 'UAE', code: 'ae' },
      { name: 'Saudi Arabia', code: 'sa' },
      { name: 'Qatar', code: 'qa' },
      { name: 'Turkey', code: 'tr' },
      { name: 'Israel', code: 'il' },
      { name: 'Iran', code: 'ir' },
      { name: 'Iraq', code: 'iq' },
      { name: 'Oman', code: 'om' },
      { name: 'Kuwait', code: 'kw' },
      { name: 'Jordan', code: 'jo' },
      { name: 'Lebanon', code: 'lb' },
      { name: 'Bahrain', code: 'bh' },
      { name: 'Syria', code: 'sy' },
      { name: 'Yemen', code: 'ye' },
      { name: 'Palestine', code: 'ps' }
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
            <div
              key={region}
              className={`region-link ${activeRegion === region ? 'active' : ''}`}
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </div>
          ))}
        </div>
        
        <div className="country-list-container">
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
    </div>
  );
};

export default GlobeMap;