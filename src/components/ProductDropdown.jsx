import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const productData = [
  {
    category: 'Dimension',
    items: [
      { name: 'Vernier Caliper' },
      { name: 'Digital Torque Driver' },
      { name: 'PB 8326 Set A1' },
      { name: 'Jetech Bits' },
      { name: 'Mechanical External Micrometer' },
    ],
  },
  {
    category: 'Environment',
    items: [
      { name: 'PB 8326 Set A1' },
      { name: 'Vernier Caliper' },
      { name: 'Mechanical External Micrometer' },
      { name: 'Digital Torque Driver' },
      { name: 'Jetech Bits' },
    ],
  },
  {
    category: 'Electrical & Electronics',
    items: [
      { name: 'Digital Torque Driver' },
      { name: 'Vernier Caliper' },
      { name: 'Jetech Bits' },
      { name: 'PB 8326 Set A1' },
      { name: 'Mechanical External Micrometer' },
    ],
  },
  {
    category: 'Material Testing',
    items: [
      { name: 'Vernier Caliper' },
      { name: 'Digital Torque Driver' },
      { name: 'PB 8326 Set A1' },
      { name: 'Jetech Bits' },
      { name: 'Mechanical External Micrometer' },
    ],
  },
];

function ProductDropdown() {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(productData[0]);
  const navigate = useNavigate();

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <a className="text-blue-950 px-4 py-2 cursor-pointer hover:text-blue-800 transition-colors flex items-center">
        Products
        <i className="fa-solid fa-caret-down ml-1 text-sm"></i>
      </a>

      {visible && (
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 shadow-lg w-[600px] z-50 flex border border-gray-200 bg-white rounded-md">
          {/* Categories Column */}
          <div className="w-1/3 bg-gray-50 p-4 border-r border-gray-200">
            {productData.map((cat, idx) => (
              <div
                key={idx}
                className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
                  activeCategory.category === cat.category 
                    ? 'bg-blue-100 text-blue-800 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
                onMouseEnter={() => setActiveCategory(cat)}
              >
                {cat.category}
              </div>
            ))}
          </div>

          {/* Products Column */}
          <div className="w-2/3 p-4">
            <div className="flex flex-col space-y-2">
              {activeCategory.items.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onClick={() => {
                    setVisible(false);
                    navigate('/products');
                  }}
                >
                  <span className="cursor-pointer text-gray-800 group-hover:text-blue-700 transition-colors relative inline-block px-2 py-1">
                    {item.name}
                    <span className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDropdown;