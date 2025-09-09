import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaRegHeart, FaExchangeAlt, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { productApi } from '../services/productApi';

const ProductCard = ({ product }) => (
  <Link to={`/products/${product.id}`}>
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white h-[450px] w-[280px] flex flex-col group cursor-pointer">
      {/* Image container with fixed height */}
      <div className="h-64 w-full flex items-center justify-center mb-4 bg-gray-50 rounded">
        <img 
          src={product.mainImage} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200';
          }}
        />
      </div>

      {/* Product name with proper text handling */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-medium text-black mb-2 break-words line-clamp-3 h-[72px] overflow-hidden">
          {product.name}
        </h3>
        
        {/* Optional highlight text */}
        {product.highlight && (
          <div className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.highlight}
          </div>
        )}
        
        {/* Price and other details would go here */}
        <div className="mt-auto">
          {/* Add price, buttons, etc. here if needed */}
        </div>
      </div>
    </div>
  </Link>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowcaseProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getShowcaseProducts();
        
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

    fetchShowcaseProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-10 px-4 md:px-16 xl:px-32 bg-gray-100 max-w-[1600px] mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 px-4 md:px-16 xl:px-32 bg-gray-100 max-w-[1600px] mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-16 xl:px-32 bg-gray-100 max-w-[1600px] mx-auto">
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {products.map(product => (
            <div key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;