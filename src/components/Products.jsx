import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaRegHeart, FaExchangeAlt, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { productApi } from '../services/productApi';

const ProductCard = ({ product }) => (
  <Link to={`/products/${product.id}`}>
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white min-h-[380px] group cursor-pointer">
      {/* Image */}
      <img 
        src={product.mainImage} 
        alt={product.title} 
        className="max-h-full max-w-full object-contain"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200';
        }}
      />

      <div className="text-center text-2xl text-black mt-1">{product.name}</div> <br />

      <div className="text-center font-medium text-sm mt-1 px-1 line-clamp-2 text-gray-500">
        {product.highlight}
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
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Featured Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 group">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;