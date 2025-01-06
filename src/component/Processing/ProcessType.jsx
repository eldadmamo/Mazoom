import { Settings } from 'lucide-react';
import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';

function ProcessType() {
  const [selectedType, setSelectedType] = useState<'name' | 'number'>('name');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="http://localhost:5173/images/Home.svg" alt="QR Code" className="w-16 h-16" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Balance: $0.00
            </button>
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        <button className="flex items-center text-gray-600 mb-8">
          <IoArrowBack className="mr-2" />
          Back
        </button>

        <h1 className="text-2xl font-semibold mb-8">Choose Type</h1>

        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          {/* Left Side Info */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <p className="text-gray-600 uppercase text-sm">
              CHOOSE YOUR INVITATION STYLE BY NAME OR NUMBER FOR A QUICK AND PERSONALIZED SELECTION.
            </p>
          </div>

          {/* Right Side Preview Cards */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Preview Cards */}
              <div className="relative group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80" 
                  alt="Preview" 
                  className="w-full rounded-lg shadow-md"
                />
                <div className="absolute bottom-2 left-2 bg-gray-800/60 text-white px-2 py-1 text-sm rounded">
                  Numbers
                </div>
              </div>

              <div className="relative group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80" 
                  alt="Preview" 
                  className="w-full rounded-lg shadow-md"
                />
                <div className="absolute bottom-2 left-2 bg-gray-800/60 text-white px-2 py-1 text-sm rounded">
                  Name
                </div>
              </div>
            </div>

            {/* Selection Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedType('name')}
                className={`px-8 py-3 rounded-md transition-colors ${
                  selectedType === 'name'
                    ? 'bg-[#27437D] text-white'
                    : 'text-[#27437D]'
                }`}
              >
                Name
              </button>
              <button
                onClick={() => setSelectedType('number')}
                className={`px-8 py-3 rounded-md transition-colors ${
                  selectedType === 'number'
                    ? 'bg-[#27437D] text-white'
                    : 'text-[#27437D]'
                }`}
              >
                Number
              </button>
            </div>

            {/* Create Button */}
            <button className="w-full md:w-auto px-8 py-3 bg-[#27437D] text-white rounded-md hover:bg-[#1e3266] transition-colors">
              Create
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProcessType;