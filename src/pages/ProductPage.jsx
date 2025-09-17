import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaFileDownload, FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EnquiryForm from '../components/EnquiryForm';
import { productApi } from '../services/productApi';

const ProductPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const imageRef = useRef(null);
  const [transform, setTransform] = useState({ scale: 1, originX: '50%', originY: '50%' });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showZoomControls, setShowZoomControls] = useState(false);

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
        const response = await productApi.getPublic(id);
        if (response.success && response.data) {
          setProduct({
            ...response.data,
            descriptionAlignment: ['left', 'center', 'right', 'justify'].includes(response.data.descriptionAlignment)
              ? response.data.descriptionAlignment
              : 'left',
          });
          const firstImage = response.data.images?.[0] || response.data.mainImage || '';
          setSelectedImage(firstImage);
          setSelectedImageIndex(0);
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
    
    // Parse specifications
    if (typeof parsedProduct.specifications === 'string') {
      try {
        parsedProduct.specifications = JSON.parse(parsedProduct.specifications);
      } catch (e) {
        console.error('Error parsing specifications:', e);
        parsedProduct.specifications = [];
      }
    }
    
    // Parse highlights
    if (typeof parsedProduct.highlights === 'string') {
      try {
        parsedProduct.highlights = JSON.parse(parsedProduct.highlights);
      } catch (e) {
        console.error('Error parsing highlights:', e);
        parsedProduct.highlights = [];
      }
    }
    
    // Ensure showPrice is a boolean
    if (parsedProduct.showPrice !== undefined) {
      parsedProduct.showPrice = parsedProduct.showPrice === true || 
                               parsedProduct.showPrice === 'true' || 
                               parsedProduct.showPrice === 1;
    }
    
    // Ensure price is a number
    if (parsedProduct.price !== undefined && parsedProduct.price !== null) {
      parsedProduct.price = parseFloat(parsedProduct.price);
    }
    
    parsedProduct.descriptionAlignment = ['left', 'center', 'right', 'justify'].includes(parsedProduct.descriptionAlignment)
      ? parsedProduct.descriptionAlignment
      : 'left';
      
    return parsedProduct;
  }, [product]);

  // Debug function to check product data
  // const debugProductData = () => {
  //   console.log('Product Data:', parseProductData);
  //   console.log('Show Price:', parseProductData?.showPrice, typeof parseProductData?.showPrice);
  //   console.log('Price:', parseProductData?.price, typeof parseProductData?.price);
  // };

  const toggleEnquiryModal = () => {
    setShowEnquiryModal(!showEnquiryModal);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      // Reset zoom when entering full screen
      setTransform({ scale: 1, originX: '50%', originY: '50%' });
    }
  };

  const handleDownload = (url, name = `File`) => {
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = name;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    window.open(url, '_blank');
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || isFullScreen) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const originX = (x / rect.width) * 100;
    const originY = (y / rect.height) * 100;
    setTransform({ scale: 1.5, originX: `${originX}%`, originY: `${originY}%` });
  };

  const handleMouseLeave = () => {
    if (!isFullScreen) {
      setTransform({ scale: 1, originX: '50%', originY: '50%' });
    }
  };

  const handleImageClick = () => {
    if (!isFullScreen) {
      toggleFullScreen();
    }
  };

  const handleThumbnailClick = (img, index) => {
    setSelectedImage(img);
    setSelectedImageIndex(index);
  };

  const navigateImage = (direction) => {
    if (!product?.images?.length) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (selectedImageIndex + 1) % product.images.length;
    } else {
      newIndex = (selectedImageIndex - 1 + product.images.length) % product.images.length;
    }
    
    setSelectedImage(product.images[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  // Close full screen when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        toggleFullScreen();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullScreen]);

  // Navigate with arrow keys in full screen mode
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (isFullScreen && product?.images?.length > 1) {
        if (e.key === 'ArrowRight') {
          navigateImage('next');
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev');
        }
      }
    };

    document.addEventListener('keydown', handleArrowKeys);
    return () => document.removeEventListener('keydown', handleArrowKeys);
  }, [isFullScreen, selectedImageIndex, product]);

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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <EnquiryForm
            onClose={toggleEnquiryModal}
            className="relative z-[1001] w-full max-w-2xl"
          />
        </div>
      )}

      {/* Full Screen Image Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-[1010] flex flex-col items-center justify-center p-4">
          {/* Close Button */}
          <button 
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full z-10"
            title="Close"
          >
            <FaTimes size={24} />
          </button>

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800';
              }}
            />
            
            {/* Navigation Arrows */}
            {product.images?.length > 1 && (
              <>
                <button 
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full"
                  title="Previous Image"
                >
                  <FaChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full"
                  title="Next Image"
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images?.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 p-4 overflow-x-auto">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-md cursor-pointer overflow-hidden transition-all duration-300 border-2 ${
                    selectedImageIndex === idx ? 'border-white' : 'border-gray-500 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleThumbnailClick(img, idx)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Debug button - remove in production */}
      {/* <button 
        onClick={debugProductData}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded text-xs z-50"
        style={{display: process.env.NODE_ENV === 'development' ? 'block' : 'none'}}
      >
        Debug Data
      </button> */}

      <div className="mx-auto w-full pt-4 pb-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 bg-[#f6f6f6] p-6 rounded-lg">
          <div className="flex">
            <div className="flex flex-col gap-3 mr-3">
              {product.images?.length > 0 && (
                product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 rounded-md cursor-pointer overflow-hidden transition-all duration-300 border-2 ${
                      selectedImage === img ? 'border-[#104686]' : 'border-gray-300 opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => handleThumbnailClick(img, idx)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100';
                      }}
                      loading="lazy"
                    />
                  </div>
                ))
              )}
            </div>

            <div 
              className="flex-1 overflow-hidden max-h-[400px] rounded-lg flex items-center justify-center relative"
              onMouseEnter={() => setShowZoomControls(true)}
              onMouseLeave={() => setShowZoomControls(false)}
            >
              {selectedImage ? (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt={product.name}
                    className="w-85 h-full object-contain transition-transform duration-300 ease-in-out cursor-zoom-in"
                    style={{ 
                      transform: `scale(${transform.scale})`,
                      transformOrigin: `${transform.originX} ${transform.originY}`
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleImageClick}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                    loading="lazy"
                  />
                  
                  {/* Full Screen Button */}
                  {(showZoomControls || transform.scale > 1) && !isFullScreen && (
                    <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-lg p-2">
                      <button 
                        onClick={toggleFullScreen}
                        className="p-1 text-gray-700 hover:bg-gray-200 rounded"
                        title="Full Screen"
                      >
                        <FaExpand size={16} />
                      </button>
                    </div>
                  )}
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
            
            {/* SIMPLIFIED PRICE DISPLAY - Always show for debugging */}
            {parseProductData.price !== null && 
             parseProductData.price !== undefined && 
             !isNaN(parseProductData.price) && (
              <p className="text-black font-bold text-2xl mt-6">
                Price: {parseProductData.price.toFixed(2)} USD
              </p>
            )}

            <button
  onClick={toggleEnquiryModal}
  className="mt-4 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 bg-gradient-to-r from-[#104686] to-[#2a6bb8] text-white hover:from-[#2a6bb8] hover:to-[#104686] hover:shadow-md hover:scale-105 active:scale-95 animate-pulse hover:animate-none border-2 border-transparent shadow-sm"
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