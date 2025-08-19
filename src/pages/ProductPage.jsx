import React, { useEffect, useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import EnquiryForm from '../components/EnquiryForm';

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(
    'https://static.vecteezy.com/system/resources/thumbnails/008/535/268/small_2x/calliper-isolated-over-white-png.png'
  );
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = ['description', 'downloads'];

  const toggleEnquiryModal = () => {
    setShowEnquiryModal(!showEnquiryModal);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4 text-lg">
              Mitutoyo offers a complete selection of Bore Gauges. The 511 series bore gauges come
              standard with interchangeable anvils and necessary accessories to perform close
              tolerance ID measurements.
            </p>
            <p className="font-semibold text-orange-600 mt-6 text-xl">SPECIFICATIONS</p>
            <ul className="list-disc ml-8">
              <li className="text-base mb-2">Range: 18-35mm</li>
              <li className="text-base mb-2">Graduations: 0.01mm</li>
              <li className="text-base mb-2">Accuracy: 5µm</li>
              <li className="text-base mb-2">Indication Stability: 2µm</li>
              <li className="text-base mb-2">Anvils: 9</li>
              <li className="text-base mb-2">Spacers: 2</li>
            </ul>
          </div>
        );
      case 'downloads':
        return (
          <div className="text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center justify-center mx-auto gap-3 text-lg hover:bg-blue-700 transition">
              <FaFileDownload />
              511-XXX
            </button>
          </div>
        );
      default:
        return null;
    }
  };

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
              {[
                'https://static.vecteezy.com/system/resources/thumbnails/008/535/268/small_2x/calliper-isolated-over-white-png.png',
                'https://goodwill.in/pub/media/catalog/product/cache/affde3bad6fff216fce8dd9a3ef91de9/p/b/pb_8326.png',
              ].map((img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-md cursor-pointer overflow-hidden transition-all duration-300 ${selectedImage === img
                      ? ''
                      : 'opacity-70 hover:opacity-100'
                    }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 overflow-hidden max-h-[400px] rounded-lg flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Product"
                className="w-85 h-full object-contain"
              />
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="bg-[#f6f6f6]">
            <h2 className="text-3xl mb-4">
              Mitutoyo 511-711 Standard Dial Bore Gauge
            </h2>

            <ul className="list-disc ml-5 space-y-2 mb-6">
              <li className="text-gray-700">Premium quality construction</li>
              <li className="text-gray-700">High precision measurements</li>
              <li className="text-gray-700">Includes all necessary accessories</li>
              <li className="text-gray-700">Easy-to-read dial display</li>
              <li className="text-gray-700">Durable and long-lasting</li>
            </ul>

            <p className="text-black font-bold text-2xl mt-6">
              Price: $212.00 USD
            </p>

            <button
              onClick={toggleEnquiryModal}
              className="mt-6 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg"
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-12 mb-8 flex-wrap gap-4 border-b border-gray-300 bg-[#f6f6f6]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize text-lg font-medium transition duration-200 relative
                ${activeTab === tab
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-blue-500'
                }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#f6f6f6] p-8 rounded-lg">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProductPage;