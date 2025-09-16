import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { productApi } from '../services/productApi';

// Helper function to safely extract text from highlight
const getHighlightText = (highlight) => {
  if (typeof highlight === 'string') return highlight;
  if (Array.isArray(highlight)) return highlight[0] || 'No highlights available';
  if (highlight && typeof highlight === 'object') {
    // Extract text from object properties
    return highlight.text || highlight.title || highlight.description || 
           highlight.value || 'No highlights available';
  }
  return 'No highlights available';
};

// Product Card Component
const ProductCard = ({ product }) => (
  <Link to={`/products/${product.id}`} className="block">
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white h-full flex flex-col product-card mt-4">
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
        {/* <h3 className="text-center font-medium text-sm mt-1 px-1 line-clamp-2 text-gray-500">
          {getHighlightText(product.highlight)}
        </h3> */}
      </div>
    </div>
  </Link>
);

// Main Component
function MoreProductsPg() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchShowcaseProducts();
  }, []);

  const fetchShowcaseProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getShowcaseAllProducts();
      console.log('API Response:', response);
      if (response.success) {
        setProducts(response.data);
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
            onClick={fetchShowcaseProducts}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-4 md:px-8 pb-12">
        {products.length > 0 && (
          <div>
            {/* <h2 className="text-2xl font-semibold mb-6">All Products</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map(product => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .product-card {
          height: 430px;
        }
        
        @media (max-width: 640px) {
          .product-card {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
}

export default MoreProductsPg;