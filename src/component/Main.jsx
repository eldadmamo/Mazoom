import { ChevronRight, Plus, Settings, Upload } from "lucide-react";  
import { IoAdd } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {processedImages, invitationText } = location.state || {};

  const mergedImagesArray = Object.entries(processedImages || {}).map(([id, { url }]) => ({
    id,
    url,
  }));
  
  const previewImage = mergedImagesArray?.[0]?.url || "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80";
  
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="http://localhost:5173/images/Home.svg" alt="QR Code" className="shadow-none w-16 h-16" />
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

        {
          invitationText ? ( 
          <div>
<main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your invitation</h1>
          <button onClick={() => navigate('/upload')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md">
            <Plus className="w-4 h-4" />
            CREATE INVITATION
          </button>
        </div>

        {/* Invitation List */}
        <div className="space-y-4">
          
            <div
                 className="bg-white rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <img 
                src={previewImage} 
                className="w-12 h-12 rounded-lg object-cover" />
                <span className="font-medium">{invitationText}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                   Invitation
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
        </div>
      </main>
          </div>
          )
          : 
          <main>
        <div className="flex flex-col lg:flex-row justify-between items-center bg-[#F5F5F5]  px-8">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end p-4">
            <div className="relative w-64 h-64 lg:w-[600px] lg:h-[600px]">
              <div className="absolute inset-0 bg-blue-50 rounded-full"></div>
              <img
                src="http://localhost:5173/images/Womens.png"
                alt="Empty state illustration"
                className="absolute w-[500px] h-full object-cover"
              />
            </div>
          </div>
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col mb-10 gap-7 items-center justify-center p-6">
            <div>
              <h2 className="text-5xl flex font-bold mb-4">Empty invitations</h2>
              <p className="text-[20px] flex items-center justify-center text-gray-600 mb-11 ">Click on plus to create invitation</p>
              <div className="flex items-center justify-center">
              <button onClick={()=> navigate('/upload')} className="w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors">
                <IoAdd className="text-2xl" />
              </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          
        </div>
        </main>
        }
        

        {/* Main Content */}
      
      </div>
    </>
  );
};

export default Main;
