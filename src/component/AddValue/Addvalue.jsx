import React, { useState } from 'react';
import { ChevronLeft, QrCode, Settings, Globe2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Addvalue = () => {
  const [guestNames, setGuestNames] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { mergedImages, invitationText, handleClickButton } = location.state || {};

  const handleNext = async () => {

    const guests = guestNames
      .split(',')
      .map((name, index) => ({
        id: index + 1,
        name: name.trim(),
      }))
      .filter((guest) => guest.name.length > 0);

    const imageEntries = Object.entries(mergedImages);
    const processedImages = {};

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < guests.length; i++) {
      const guest = guests[i];
      // Use modulo to cycle through available images if we have more guests than images
      const [imageId, imageUrl] = imageEntries[i % imageEntries.length];

      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add guest name
      ctx.font = '80px Arial';
      ctx.fillStyle = 'black';
      
      if (handleClickButton === true) {
        ctx.textAlign = 'top';
        ctx.fillText(guest.name, 0, 0);
      } else {
        ctx.textAlign = 'bottom';
        ctx.fillText(guest.name, 300, 1800);
      }

      // Store only one processed image per guest
      const guestImageId = `${imageId}-${guest.id}`;
      processedImages[guestImageId] = {
        url: canvas.toDataURL('image/png'),
        guestName: guest.name
      };
    }
      

      console.log('Navigating to guest with:', { 
        guests, 
        mergedImages, 
        invitationText 
      });
  
    navigate('/guest', { state: { 
      guests, 
      processedImages,
      originalImages: mergedImages,
      invitationText 
    } });
  };
  

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://mazoom-sandy.vercel.app/images/Home.svg" alt="QR Code" className="w-16 h-16" />
          </div>
          <div className="flex items-center space-x-4">
           <select className="text-sm border-none outline-none cursor-pointer bg-transparent">
           <option value="en">En</option>
          </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Balance: $0.00
            </button>
            <Settings onClick={()=> navigate('/setting')} className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pt-8">
        {/* Back Button */}
        <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-6">
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-12">Add Names</h1>

        {/* Input Section */}
        <div className="mb-8">
          <p className="text-center mb-4">
            Please <span className="text-blue-600">Add Name</span> Or{' '}
            <span className="text-blue-600">Paste Them</span> Here Separate Each Guest Name With A Line
          </p>
          <textarea
            className="w-full h-48 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add Guest Name..."
            value={guestNames}
            onChange={(e) => setGuestNames(e.target.value)}
          />
        </div>

        {/* Next Button */}
        <div className="flex justify-end mb-8">
          <button
          onClick={handleNext}
          disabled={!guestNames.trim()}
          className={`px-8 py-2 rounded-lg transition-colors ${
            guestNames.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default Addvalue;