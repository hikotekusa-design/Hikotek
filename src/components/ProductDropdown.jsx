import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../services/productApi';

function ProductDropdown() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productApi.getShowcaseAllProducts();
        if (result.success && result.data && result.data.length > 0) {
          const categoryMap = {};
          result.data.forEach((product) => {
            if (product.category && typeof product.category === 'string') {
              const rawCategory = product.category;
              const catKey = rawCategory.trim().toLowerCase();
              if (catKey && !categoryMap[catKey]) {
                categoryMap[catKey] = rawCategory.trim();
              }
            }
          });
          
          const uniqueCategories = Object.values(categoryMap).sort((a, b) =>
            a.localeCompare(b)
          );
          setCategories(uniqueCategories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setVisible(false);
    navigate('/categoryproducts', { state: { category } });
  };

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
        <div className="absolute left-0 top-full shadow-lg z-50 border border-gray-200 bg-white rounded-md min-w-[200px] max-h-60 overflow-y-auto">
          <div className="p-2">
            {loading ? (
              <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
            ) : error ? (
              <div className="px-4 py-2 text-red-500 text-sm">{error}</div>
            ) : categories.length > 0 ? (
              categories.map((category, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer px-4 py-2 transition-colors hover:bg-gray-100 rounded-md text-sm"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No categories available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDropdown;