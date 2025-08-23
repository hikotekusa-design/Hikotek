import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../services/productApi';

function ProductDropdown() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productApi.getShowcaseAllProducts();
        console.log('Showcase products response:', result); // Debug log
        if (result.success && result.data && result.data.length > 0) {
          const categoryMap = {};
          result.data.forEach((product) => {
            const rawCategory = product.category;
            console.log(`Product: ${product.name}, Category: ${rawCategory}`); // Debug category
            const catKey = rawCategory?.trim().toLowerCase() || 'uncategorized';
            if (!categoryMap[catKey]) {
              categoryMap[catKey] = { category: rawCategory?.trim() || 'Uncategorized', items: [] };
            }
            categoryMap[catKey].items.push({
              id: product.id,
              name: product.name,
            });
          });
          const uniqueCategories = Object.values(categoryMap).sort((a, b) =>
            a.category.localeCompare(b.category)
          );
          setCategories(uniqueCategories);
          setActiveCategory(uniqueCategories[0] || null);
        } else {
          console.log('No products found or empty data');
          setCategories([]);
          setActiveCategory(null);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="relative">
        <a className="text-blue-950 py-2 cursor-pointer hover:text-blue-800 transition-colors flex items-center">
          Products
          <i className="fa-solid fa-caret-down ml-1 text-sm"></i>
        </a>
        <div className="absolute left-0 top-full shadow-lg w-[600px] z-50 flex border border-gray-200 bg-white rounded-md p-4">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <a className="text-blue-950 py-2 cursor-pointer hover:text-blue-800 transition-colors flex items-center">
          Products
          <i className="fa-solid fa-caret-down ml-1 text-sm"></i>
        </a>
        <div className="absolute left-0 top-full shadow-lg w-[600px] z-50 flex border border-gray-200 bg-white rounded-md p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="relative">
        <a className="text-blue-950 py-2 cursor-pointer hover:text-blue-800 transition-colors flex items-center">
          Products
          <i className="fa-solid fa-caret-down ml-1 text-sm"></i>
        </a>
        <div className="absolute left-0 top-full shadow-lg w-[600px] z-50 flex border border-gray-200 bg-white rounded-md p-4">
          No products available
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <a className="text-blue-950 py-2 cursor-pointer hover:text-blue-800 transition-colors flex items-center">
        Products
        <i className="fa-solid fa-caret-down ml-1 text-sm"></i>
      </a>
      {visible && (
        <div className="absolute left-0 top-full shadow-lg w-[600px] z-50 flex border border-gray-200 bg-white rounded-md">
          <div className="w-1/3 bg-white p-0">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`cursor-pointer px-4 py-2 transition-colors relative border-b border-gray-100 ${
                  activeCategory?.category === cat.category
                    ? 'bg-gray-100 text-blue-800 font-medium'
                    : 'hover:bg-gray-100'
                }`}
                onMouseEnter={() => setActiveCategory(cat)}
              >
                {cat.category}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
              </div>
            ))}
          </div>
          <div className="w-2/3 p-4 bg-gray-100">
            <div className="flex flex-col space-y-2">
              {activeCategory?.items.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onClick={() => {
                    setVisible(false);
                    navigate(`/products/${item.id}`);
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