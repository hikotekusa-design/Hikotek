import React, { useEffect, useState } from 'react';
import { FaStar, FaFileDownload } from 'react-icons/fa';
import EnquiryForm from '../components/EnquiryForm';

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState('https://www.faithfulltools.com/images/full/FAICALVER.jpg');
  const [zoomStyle, setZoomStyle] = useState({});
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = ['description', 'downloads'];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.5)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center center',
    });
  };

  const toggleEnquiryModal = () => {
    setShowEnquiryModal(!showEnquiryModal);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4 text-lg">
              Mitutoyo offers a complete selection of Bore Gauges. The 511 series bore gauges come standard with interchangeable anvils and necessary accessories to perform close tolerance ID measurements.
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

    }
  };

  return (
    <>
   {showEnquiryModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4">
    <EnquiryForm onClose={toggleEnquiryModal} className="relative z-[1001] w-full max-w-2xl" />
  </div>
)}


      <div className="max-w-[1400px] mx-auto w-full mt-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Thumbnails and Main Image */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {[
                'https://www.faithfulltools.com/images/full/FAICALVER.jpg',
                'https://goodwill.in/pub/media/catalog/product/cache/affde3bad6fff216fce8dd9a3ef91de9/p/b/pb_8326.png'
              ].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-20 h-20 object-contain rounded-lg cursor-pointer border ${selectedImage === img ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Zoom Image */}
            <div
              className="overflow-hidden w-full max-h-[500px] rounded-lg shadow-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={selectedImage}
                alt="Product"
                className="w-full h-full object-contain transition-transform duration-300"
                style={zoomStyle}
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">Mitutoyo 511-711 Standard Dial Bore Gauge</h2>
            <p className="text-gray-600 text-lg"><strong>Brand:</strong> Mitutoyo</p>
            <p className="text-gray-600 text-lg"><strong>Model No:</strong> 511-711</p>
            <p className="text-gray-600 text-lg"><strong>Range:</strong> 18–35mm</p>
            <p className="text-gray-600 text-lg"><strong>Warranty:</strong> 1 Year</p>
            <p className="text-green-600 font-medium mt-4 text-xl">In Stock</p>
            <p className="text-blue-600 font-bold text-2xl mt-6">Price: 795.00 SAR (Including VAT)</p>
            <button
              onClick={toggleEnquiryModal}
              className="bg-blue-700 text-white mt-6 px-8 py-3 rounded-lg text-lg hover:bg-blue-800 transition"
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-12 mb-8 flex-wrap gap-4 border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize text-lg font-medium transition duration-200 relative
                ${activeTab === tab ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default ProductPage;