import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const productData = [
  {
    category: 'Dimension',
    items: [
          { name: 'Vernier Caliper', image: "https://www.faithfulltools.com/images/full/FAICALVER.jpg" },
    { name: 'Digital Torque Driver', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkmmhpHTq408nP2US0CqAitsA6RWHSKUb0A&s' },
    { name: 'PB 8326 Set A1', image: 'https://goodwill.in/pub/media/catalog/product/cache/affde3bad6fff216fce8dd9a3ef91de9/p/b/pb_8326.png' },
    { name: 'Jetech Bits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtv6_1kyROIOuD_FEkduwbdHy6yGD4ZauaA&s' },
    { name: 'Mechanical External Micrometer', image: 'https://bakergauges.com/wp-content/uploads/2015/08/prod-feat-micromet-mech-0-200-2b.jpg' },
    ],
  },
  {
    category: 'Environment',
    items: [],
  },
  {
    category: 'Electrical & Electronics',
    items: [],
  },
  {
    category: 'Material Testing',
    items: [],
  },
  // Add more as needed
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
      <a className="text-blue-950 px-4 py-2" >Products
        <i class="fa-solid fa-caret-down"></i>
      </a>

      {visible && (
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 shadow-lg w-[800px] z-50 flex border bg-gray-100 border-gray-300">
          <div className="w-1/3 bg-gray-100 p-4 border border-right">
            {productData.map((cat, idx) => (
              <div
                key={idx}
                className={`cursor-pointer px-3 py-2  ${
                  activeCategory.category === cat.category ? '' : ''
                }`}
                onMouseEnter={() => setActiveCategory(cat)}
              >
                {cat.category}
              </div>
            ))}
          </div>

          <div className="w-2/3 p-4 grid grid-cols-3 gap-4 bg-gray-100">
           {activeCategory.items.map((item, index) => (
  <div
    key={index}
    className="flex items-center space-x-2 bg-gray-100 cursor-pointer"
    onClick={() => {
      setVisible(false); // hide dropdown immediately
      navigate('/products');
    }}
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-8 h-8 object-contain cursor-pointer"
    />
    <span>{item.name}</span>
  </div>
))}

          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDropdown;
