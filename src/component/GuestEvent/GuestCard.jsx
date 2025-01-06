import React from 'react';
import { Download, Trash2, Share2, Edit, Pen } from 'lucide-react';

function GuestCard({ guest, onDownload, onDelete, onEdit }) {
  // Each guest should only have one image
  const image = guest.images[0];

  return (
    <>
      <div className="p-4 bg-gray-50 rounded-lg shadow-none">
        <div className="relative flex flex-col bg-gray-50 rounded-lg justify-center items-center">
          <div className="relative group w-[150px] h-[150px] flex justify-center items-center">
            <img
              src={image.url}
              alt={`Invitation for ${guest.name}`}
              className="w-full h-full object-cover rounded-full shadow-sm"
            />
            <button
            //   onClick={() => onShare(guest.id)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-3 group-hover:p-2 hover:bg-opacity-70"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <Share2 className="w-6 h-6 group-hover:w-5 group-hover:h-5 transition-all duration-200" />
            </button>
            {/* Edit Button at Bottom Center */}
            <button
              onClick={() => onEdit(guest.id)}
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-green-600 bg-opacity-80 rounded-full p-1 shadow-md"
            >
              <Pen className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">{guest.name}</h3>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onDownload(image.url, guest.name)}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(guest.id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

export default GuestCard;
