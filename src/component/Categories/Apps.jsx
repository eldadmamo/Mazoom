import React, { useState } from 'react';
import UploadImage from '../UploadImage/UploadImage';
import Categories from './Categories';

function Merge() {
  const [currentStep, setCurrentStep] = useState('upload');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImagesUploaded = (images) => {
    setUploadedImages(images);
    setCurrentStep('categories');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentStep === 'upload' ? (
        <UploadImage onNext={handleImagesUploaded} />
      ) : (
        <Categories uploadedImages={uploadedImages} />
      )}
    </div>
  );
}

export default Merge;