import { Settings } from "lucide-react";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

function Categories() {
  const [selectedImage, setSelectedImage] = useState(2);
  const [selectedType, setSelectedType] = useState("Name"); 

  const location = useLocation();
  const navigate = useNavigate();
  const { mergedImages, invitationText } = location.state || {};

  const mergedImagesArray = Object.entries(mergedImages || {}).map(([id, url]) => ({
    id,
    url
  }));

  const previewImage = mergedImagesArray?.[0]?.url || "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80";
  
  const images = [
    {
      id: 1,
      label: "Numbers",
      type: "Number",
      url: previewImage,
    },
    {
      id: 2,
      label: "Name",
      type: "Name",
      url: previewImage,
    },
  ];

  const handleButtonClick = (type) => {
    setSelectedType(type);
    const matchingImage = images.find(img => img.type === type);
    if (matchingImage) {
      setSelectedImage(matchingImage.id);
    }
  };

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
    const clickedImage = images.find(img => img.id === imageId);
    if (clickedImage) {
      setSelectedType(clickedImage.type);
    }
  };

  const generateRandomGuests = () => {
    const numberOfGuests = Math.floor(Math.random() * 10) + 1; // Generate 1-10 guests
    return Array.from({ length: numberOfGuests }, (_, index) => ({
      id: index + 1,
      name: `Guest ${Math.floor(Math.random() * 100) + 1}` // Random numbers 1-100
    }));
  };

  return (
    <div className="min-h-screen bg-white relative">
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
      <main className="max-w-6xl mx-auto p-8 mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-8">
          <IoArrowBack className="mr-2" />
          Back
        </button>

        <h1 className="text-2xl font-semibold mb-8">Choose Type</h1>

        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          {/* Left Side Info */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit hidden md:block">
            <p className="text-gray-600 uppercase text-sm">
              CHOOSE YOUR INVITATION STYLE BY NAME OR NUMBER FOR A QUICK AND
              PERSONALIZED SELECTION.
            </p>
          </div>

          {/* Right Side Preview Cards */}
          <div className="space-y-8">
            <div className="flex flex-wrap gap-7">
              <div className="flex flex-col gap-6">
                {/* Preview Cards */}
                {images.map((image) => (
                  <div
                    key={image.id}
                    className={`relative group cursor-pointer transition-all duration-300 ${
                      selectedImage && selectedImage !== image.id
                        ? "opacity-70 blur-sm"
                        : ""
                    } hidden lg:block`} // Show on large screens, hide on mobile
                    onClick={() => handleImageClick(image.id)}
                  >
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-[200px] rounded-lg shadow-md"
                    />
                    <div className="absolute bottom-2 left-2 bg-gray-800/60 text-white px-2 py-1 text-sm rounded">
                      {image.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Image with Label Inside */}
              <div className="flex flex-col gap-3 -mb-7">
                {selectedImage && (
                  <div className="relative">
                    <img
                      src={images.find((image) => image.id === selectedImage)?.url}
                      alt="Selected Preview"
                      className="w-[430px] rounded-lg shadow-md"
                    />
                    {/* Display label inside the image */}
                    <div className="absolute bottom-4 left-4 bg-gray-800/60 text-white px-4 py-2 text-sm rounded">
                      {images.find((image) => image.id === selectedImage)?.label}
                    </div>
                  </div>
                )}
                <div className="flex justify-center items-center gap-7">
                  <button
                    className={`w-full px-8 py-3 rounded-md transition-all duration-300 ${
                      selectedType === "Name"
                        ? "bg-[#27437D] text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-[#27437D] hover:text-white"
                    }`}
                    onClick={() => handleButtonClick("Name")}
                  >
                    Name
                  </button>
                  <button
                    className={`w-full px-8 py-3 rounded-md transition-all duration-300 ${
                      selectedType === "Number"
                        ? "bg-[#27437D] text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-[#27437D] hover:text-white"
                    }`}
                    onClick={() => handleButtonClick("Number")}
                  >
                    Number
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Button positioned at the bottom right */}
      <div className="p-[5%]">
      <button
  className={`absolute flex items-center justify-center p-4 w-[90%] sm:w-[200px] md:right-28 lg:right-28 px-11 py-3 rounded-md transition-all duration-300 ${
    selectedType
      ? "bg-[#27437D] text-white hover:bg-[#1e3266]"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
  disabled={!selectedType}
  onClick={() => {
    if (selectedType === "Name") {
      navigate('/addname', {
        state: {
          invitationType: selectedType,
          mergedImages,
          invitationText,
        },
      });
    } else if (selectedType === "Number") {
      const randomGuests = generateRandomGuests();
      navigate('/guest', {
        state: {
          guests: randomGuests,
          mergedImages,
          invitationText,
          processedImages: Object.fromEntries(
            Object.entries(mergedImages || {}).map(([imageId, url]) => 
              randomGuests.map(guest => [
                `${imageId}-${guest.id}`,
                {
                  url,
                  guestName: guest.name
                }
              ])
            ).flat()
          )
        },
      });
    }
  }}
>
  Create
</button>

      </div>
    </div>
  );
}

export default Categories;
