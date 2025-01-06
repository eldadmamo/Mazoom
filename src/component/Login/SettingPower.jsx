import { useState } from "react";
import {
  Globe,
  ChevronRight,
  Share2,
  Phone,
  Pencil,
  Trash2,
  Settings,
} from "lucide-react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

function SettingPower() {
  const [language, setLanguage] = useState("En");
  const [selectedImage, setSelectedImage] = useState(2);
  const [selectedType, setSelectedType] = useState("Name");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("authToken"); 
    navigate("/signin"); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="http://localhost:5173/images/Home.svg"
              alt="QR Code"
              className="w-15 h-15"
            />
          </div>
          <div className="flex items-center space-x-4">
          <select className="text-sm border-none outline-none cursor-pointer bg-transparent">
          <option value="en">En</option>
           </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Balance: $0.00
            </button>
            <Settings onClick={()=> navigate('/setting')} className="w-6 h-6 hover:bg-black text-gray-600 cursor-pointer hover:text-gray-800" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}  
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <IoArrowBack className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Choose Type</h2>

        <div className="grid md:grid-cols-[200px,1fr]  gap-9">
          {/* Sidebar */}
          <div className="bg-transparent p-4 rounded-lg shadow-hidden hidden md:block">
            <nav>
              <ul>
              <li className="mb-3">
                  <button className="font-bold text-[20px] text-gray-400 hover:text-[#245192]">Settings</button>
                </li>
                <li className="mb-3">
                  <button onClick={handleLogout} className="font-bold text-[20px] text-gray-400 hover:text-[#245192]">Logout</button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Settings Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">User Settings</h3>

              {/* Email */}
              <div className="flex flex-wrap justify-between">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[21px] text-[#245192]">Email:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[#245192]"> Abebe.Kebede@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[21px] text-[#245192]">Password:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[#245192]">• • • • • • • • • •</span>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              </div>

              {/* Contact */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[20px] text-[#245192]">Contact:</label>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/w20/sa.png"
                      alt="Saudi Flag"
                      className="w-5"
                    />
                    <select className="bg-gray-50 border rounded px-2 py-1 text-[#245192] text-sm">
                      <option value="+966">+966</option>
                    </select>
                    <span className="text-[#245192]">999-99-99</span>
                  </div>
                </div>
                <p className="text-sm text-red-500 mt-1">Has your number/Email Changed?</p>
              </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
              {/* Languages */}
              <div className="">
                <button 
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="w-full flex justify-between items-center py-2 text-[#245192] hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-8 h-8" />
                    <span className="text-xl">Languages</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                
              </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
  {/* Action Buttons */}
  <div className="flex flex-col gap-4 pt-4 border-t sm:flex-row sm:justify-between sm:items-center">
    <div className="flex flex-col gap-4 sm:flex-row">
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
        <Share2 className="w-8 h-8 text-[#245192]" /> Share
      </button>
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
        <Phone className="w-8 h-8 text-[#245192]" /> Contact us
      </button>
    </div>
    <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
      <Trash2 className="w-8 h-8 text-[#245192]" /> Delete Account
    </button>
    </div>
  </div>
  <div className="bg-white rounded-lg shadow p-6 sm:hidden md:hidden">
    <button
    onClick={handleLogout} // Replace with your logout logic
    className="w-full py-4 text-center text-white bg-[#245192] hover:bg-blue-500 text-lg font-bold"
    >
    Logout
  </button>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingPower;