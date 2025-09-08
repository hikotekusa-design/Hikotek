import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { productApi } from '../services/productApi';

// Helper function to safely extract text from highlight
const getHighlightText = (highlight) => {
  if (typeof highlight === 'string') return highlight;
  if (Array.isArray(highlight)) return highlight[0] || 'No highlights available';
  if (highlight && typeof highlight === 'object') {
    // Try to extract text from object properties
    return highlight.text || highlight.title || highlight.description || 
           highlight.value || 'No highlights available';
  }
  return 'No highlights available';
};

const ProductCard = ({ product }) => (
  <Link to={`/products/${product.id}`} className="block">
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white h-full flex flex-col product-card">
      <div className="flex-grow">
        <img 
          src={product.mainImage} 
          alt={product.name} 
          className="h-48 w-full object-contain mx-auto"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200';
          }}
        />
        <div className="text-center text-xl mt-1 font-semibold">{product.name}</div>
        <h3 className="text-center font-medium text-sm mt-1 px-1 line-clamp-2 text-gray-500">
          {getHighlightText(product.highlight)}
        </h3>
      </div>
    </div>
  </Link>
);

function CategoryProducts() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = location.state?.category;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getShowcaseAllProducts();
      if (response.success) {
        setProducts(response.data);
        
        if (category) {
          const filtered = response.data.filter(product => 
            product.category && product.category.toLowerCase() === category.toLowerCase()
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(response.data);
        }
      } else {
        setError(response.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchProducts}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        {category ? `${category} Products` : 'All Products'}
      </h1>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {category ? `No products found in ${category} category` : 'No products available'}
          </p>
          {category && (
            <Link 
              to="/moreproducts" 
              className="text-blue-900 hover:text-blue-700 mt-4 inline-block"
            >
              View all products
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;