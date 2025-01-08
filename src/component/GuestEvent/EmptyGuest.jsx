import React, { useEffect, useState } from 'react';
import { Settings, ChevronLeft, Download, Trash2, Edit, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import GuestCard from './GuestCard';

function EmptyGuest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { guests = [], processedImages = {}, handleClickButton, mergedImages, invitationText } = location.state || {};

  const [editedGuest, setEditedGuest] = useState(null); // Store the guest to edit
  const [newGuestName, setNewGuestName] = useState('');

  useEffect(() => {
    console.log('EmptyGuest received:', { 
      guests, 
      mergedImages, 
      processedImages,
      invitationText 
    });
  }, [guests, mergedImages, invitationText]);

  const guestImages = guests.map(guest => {
    const guestImage = Object.entries(processedImages)
      .find(([key]) => key.includes(`-${guest.id}`));

      return {
        ...guest,
        images: guestImage ? [guestImage[1]] : [] // Wrap in array to maintain component compatibility
      };
  });

  const handleDownload = (imageUrl, guestName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `invitation-${guestName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (guestId) => {
    // Implement delete functionality here
    const updatedGuests = guests.filter(guest => guest.id !== guestId);
    console.log('Updated guests:', updatedGuests);
    
    navigate(location.pathname, { 
      state: { 
        ...location.state, 
        guests: updatedGuests 
      }
    });
  };

  const handleEdit = (guestId) => {
    const guestToEdit = guests.find(guest => guest.id === guestId);
    setEditedGuest(guestToEdit);
    setNewGuestName(guestToEdit.name);
  };
  

  const handleNext = () => {
    navigate('/main', { state: { guests, processedImages, mergedImages, invitationText, handleClickButton } });
  };

  const handleSaveEdit = () => {
    const updatedGuests = guests.map(guest => 
      guest.id === editedGuest.id ? { ...guest, name: newGuestName } : guest
    );
    navigate(location.pathname, { 
      state: { 
        ...location.state, 
        guests: updatedGuests 
      }
    });
    setEditedGuest(null); 
  };

  const handleDeleteAll = () => {
    // Clear all guests
    const updatedGuests = [];
    console.log('All guests deleted:', updatedGuests);
    
    navigate(location.pathname, { 
      state: { 
        ...location.state, 
        guests: updatedGuests 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img onClick={handleNext} src="https://mazoom-sandy.vercel.app/images/Home.svg" alt="QR Code" className="w-16 h-16" />
          </div>
          <div className="flex items-center space-x-4">
          <select className="text-sm border-none outline-none cursor-pointer bg-transparent">
          <option value="en">En</option>
        </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
              Balance: $0.00
            </button>
            <Settings onClick={()=> navigate('/setting')} className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="flex items-center mb-8">
          <button
            className="flex items-center text-gray-600 hover:text-gray-800 transition"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>

        {/* Event Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-blue-600">Event Preview</h1>
          </div>
          <div className="flex space-x-4">
            <button onClick={()=> navigate('/upload')} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
            onClick={handleDeleteAll}
            className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Guests Section */}
        <div className='flex flex-col gap-8'>
        <div className="bg-white rounded-lg shadow-lg p-3 gap-4">
          <div className="flex items-center justify-between  ml-5">
            <h2 className="text-2xl font-medium text-gray-800">Guests</h2>
            <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-2" />
              Add Guests
            </button>
          </div>
        </div>

          <div className='mb-3 flex flex-col'>
          {guestImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {guestImages.map((guest) => (
                <div key={guest.id} className="p-4 bg-gray-50 rounded-lg shadow-md">
                    {guest.images.map((image, index) => (
                      <GuestCard
                      key={guest.id}
                      guest={guest}
                      onDownload={handleDownload}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                    ))}
                  </div>
                
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className=" items-center justify-center text-center">
                <div className='flex flex-wrap gap-5'>
                <img
                  src="https://mazoom-sandy.vercel.app/images/bro.svg"
                  alt="Empty state"
                  className="w-60 h-60 object-cover rounded-lg mb-4"
                />
                <div className='flex flex-col items-center justify-center'>
                <h3 className=" text-3xl font-medium text-gray-900 mb-2">Empty Guest</h3>
                <p className="text-sm text-gray-500 mb-4">Click on plus to add guests</p>
                <button
                  onClick={()=> navigate('/upload')}
                  className="flex items-center px-4 py-2 bg-[#20529B] text-white rounded-md shadow-md hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 text-center flex justify-center" />
                  Add Guests
                </button>
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </main>
      {editedGuest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Guest Name</h2>
            <input
              type="text"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setEditedGuest(null)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmptyGuest;
