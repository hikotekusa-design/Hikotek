import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaFileDownload } from 'react-icons/fa';
import EnquiryForm from '../components/EnquiryForm';
import { productApi } from '../services/productApi';

const ProductPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState('');
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const imageRef = useRef(null);
  const [transform, setTransform] = useState({ scale: 1, originX: '50%', originY: '50%' });

  const tabs = useMemo(() => {
    const availableTabs = ['description'];
    if (product?.downloads?.length > 0) availableTabs.push('downloads');
    return availableTabs;
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await productApi.getById(id);
        if (response.success && response.data) {
          setProduct({
            ...response.data,
            descriptionAlignment: ['left', 'center', 'right', 'justify'].includes(response.data.descriptionAlignment)
              ? response.data.descriptionAlignment
              : 'left',
          });
          setSelectedImage(response.data.images?.[0] || response.data.mainImage || '');
        } else {
          setError('Failed to fetch product details.');
        }
      } catch (err) {
        setError(
          err.message.includes('PERMISSION_DENIED')
            ? 'Permission denied. Please check your credentials or contact support.'
            : err.message || 'Failed to fetch product details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const parseProductData = useMemo(() => {
    if (!product) return product;
    const parsedProduct = { ...product };
    if (typeof parsedProduct.specifications === 'string') {
      try {
        parsedProduct.specifications = JSON.parse(parsedProduct.specifications);
      } catch (e) {
        console.error('Error parsing specifications:', e);
        parsedProduct.specifications = [];
      }
    }
    if (typeof parsedProduct.highlights === 'string') {
      try {
        parsedProduct.highlights = JSON.parse(parsedProduct.highlights);
      } catch (e) {
        console.error('Error parsing highlights:', e);
        parsedProduct.highlights = [];
      }
    }
    parsedProduct.descriptionAlignment = ['left', 'center', 'right', 'justify'].includes(parsedProduct.descriptionAlignment)
      ? parsedProduct.descriptionAlignment
      : 'left';
    return parsedProduct;
  }, [product]);

  const toggleEnquiryModal = () => {
    setShowEnquiryModal(!showEnquiryModal);
  };

  const handleDownload = (url, name = `File`) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const originX = (x / rect.width) * 100; // Convert to percentage
    const originY = (y / rect.height) * 100; // Convert to percentage
    setTransform({ scale: 1.5, originX: `${originX}%`, originY: `${originY}%` });
  };

  const handleMouseLeave = () => {
    setTransform({ scale: 1, originX: '50%', originY: '50%' });
  };

  const renderContent = () => {
    if (!parseProductData) return null;

    switch (activeTab) {
      case 'description':
        return (
          <div className="text-gray-700 leading-relaxed">
            <div
              className={`mb-4 text-lg text-${parseProductData.descriptionAlignment} whitespace-pre-wrap`}
              style={{ textAlign: parseProductData.descriptionAlignment }}
            >
              {parseProductData.description || 'No description available.'}
            </div>
            {parseProductData.specifications?.length > 0 && (
              <>
                <p className="font-semibold text-[#104686] mt-6 text-xl">SPECIFICATIONS</p>
                <ul className="list-disc ml-8">
                  {parseProductData.specifications.map((spec, idx) => (
                    <li
                      key={idx}
                      className={`text-base mb-2 text-${spec.alignment || 'left'}`}
                      style={{ textAlign: spec.alignment || 'left' }}
                    >
                      {typeof spec === 'object' ? spec.text : spec}
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
            {parseProductData.downloads?.length > 0 ? (
              parseProductData.downloads.map((download, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDownload(download.url || download, download.name || `File ${idx + 1}`)}
                  className="mt-2 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border-2 border-[#104686] text-[#104686] hover:bg-[#104686] hover:text-white hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
                >
                  <FaFileDownload />
                  {download.name || `Download File ${idx + 1}`}
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
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex">
              <div className="flex flex-col gap-3 mr-3">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="flex-1 h-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-2 mb-6">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
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
              onClick={() => fetchProduct()}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4" role="dialog" aria-modal="true">
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
              {product.images?.length > 0 ? (
                product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 rounded-md cursor-pointer overflow-hidden transition-all duration-300 border-2 ${
                      selectedImage === img ? 'border-[#104686]' : 'border-gray-300 opacity-70 hover:opacity-100'
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
                      loading="lazy"
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
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt={product.name}
                    className="w-85 h-full object-contain transition-transform duration-300 ease-in-out"
                    style={{ transform: `scale(${transform.scale})`, transformOrigin: `${transform.originX} ${transform.originY}` }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="text-gray-500">No image available</div>
              )}
            </div>
          </div>

          <div className="bg-[#f6f6f6]">
            <h2 className="text-3xl mb-4">{product.name}</h2>
            {parseProductData.highlights?.length > 0 && (
              <ul className="list-disc ml-5 space-y-2 mb-6">
                {parseProductData.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className={`text-gray-700 text-${highlight.alignment || 'left'}`}
                    style={{ textAlign: highlight.alignment || 'left' }}
                  >
                    {typeof highlight === 'object' ? highlight.text : highlight}
                  </li>
                ))}
              </ul>
            )}
            {parseProductData.showPrice && !isNaN(parseFloat(parseProductData.price)) && (
              <p className="text-black font-bold text-2xl mt-6">
                Price: ${parseFloat(parseProductData.price).toFixed(2)} USD
              </p>
            )}
            <button
              onClick={toggleEnquiryModal}
              className="mt-6 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border-2 border-[#104686] text-[#104686] hover:bg-[#104686] hover:text-white hover:shadow-lg"
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
              role="tab"
              aria-selected={activeTab === tab}
              className={`px-6 py-3 capitalize text-lg font-medium transition duration-200 relative
                ${activeTab === tab ? 'text-[#104686] font-semibold' : 'text-gray-500 hover:text-blue-500'}
              `}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute left-0 bottom-0 h-1 w-full bg-[#104686] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-[#f6f6f6] p-8 rounded-lg" role="tabpanel">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;