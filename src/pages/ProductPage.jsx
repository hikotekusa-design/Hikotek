import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFileDownload } from 'react-icons/fa';
import EnquiryForm from '../components/EnquiryForm';
import { productApi } from '../services/productApi';

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState('');
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tabs = ['description', 'downloads'];

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await productApi.getById(id);
        if (response.success && response.data) {
          setProduct(response.data);
          setSelectedImage(response.data.images?.[0] || response.data.mainImage || '');
        } else {
          setError('Failed to fetch product details.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleEnquiryModal = () => {
    setShowEnquiryModal(!showEnquiryModal);
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (!product) return null;

    switch (activeTab) {
      case 'description':
        return (
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4 text-lg">
              {product.description || 'No description available.'}
            </p>
            {product.specifications && product.specifications.length > 0 && (
              <>
                <p className="font-semibold text-[#104686] mt-6 text-xl">SPECIFICATIONS</p>
                <ul className="list-disc ml-8">
                  {product.specifications.map((spec, idx) => (
                    <li key={idx} className="text-base mb-2">
                      {spec}
                    </li>
                  ))}
                </ul>
              </>
            )}
            
          </div>
        );
      case 'downloads':
        return (
          <div className="text-center">
            {product.downloads && product.downloads.length > 0 ? (
              product.downloads.map((download, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDownload(download)}
                  className="mt-2 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border-2 border-[#104686]   text-[#104686]   hover:bg-[#104686] hover:text-white hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
                >
                  <FaFileDownload />
                  {`Download File ${idx + 1}`}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No downloads available.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        <div className="mx-auto w-full pt-4 pb-12 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-700">Loading product details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        <div className="mx-auto w-full pt-4 pb-12 px-4">
          <div className="text-center text-red-600">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        <div className="mx-auto w-full pt-4 pb-12 px-4">
          <div className="text-center text-gray-700">
            Product not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4">
          <EnquiryForm
            onClose={toggleEnquiryModal}
            className="relative z-[1001] w-full max-w-2xl"
          />
        </div>
      )}

      <div className="mx-auto w-full pt-4 pb-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 bg-[#f6f6f6] p-6 rounded-lg">
          <div className="flex">
            <div className="flex flex-col gap-3 mr-3">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 rounded-md cursor-pointer overflow-hidden transition-all duration-300 ${
                      selectedImage === img ? '' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100';
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                  No Images
                </div>
              )}
            </div>

            <div className="flex-1 overflow-hidden max-h-[400px] rounded-lg flex items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-85 h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
              ) : (
                <div className="text-gray-500">No image available</div>
              )}
            </div>
          </div>

          <div className="bg-[#f6f6f6]">
            <h2 className="text-3xl mb-4">{product.name}</h2>

            {product.highlights && product.highlights.length > 0 && (
              <ul className="list-disc ml-5 space-y-2 mb-6">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-gray-700">
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {product.showPrice && product.price && (
              <p className="text-black font-bold text-2xl mt-6">
                Price: ${product.price.toFixed(2)} USD
              </p>
            )}

            <button
              onClick={toggleEnquiryModal}
              className="mt-6 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border-2 border-[#104686]   text-[#104686]  hover:bg-[#104686]   hover:text-white hover:shadow-lg"
            >
              Enquire Now
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-12 mb-8 flex-wrap gap-4 border-b border-gray-300 bg-[#f6f6f6]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize text-lg font-medium transition duration-200 relative
                ${activeTab === tab ? 'text-[#104686]  font-semibold' : 'text-gray-500 hover:text-blue-500'}
              `}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute left-0 bottom-0 h-1 w-full bg-[#104686]  rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-[#f6f6f6] p-8 rounded-lg">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProductPage;