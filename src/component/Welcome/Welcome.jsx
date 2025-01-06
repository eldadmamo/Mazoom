import { QrCode, Menu, Settings } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
    const navigate = useNavigate();

    const [showOff, setShowOff] = useState(true)
    
    const LoginEmail = () => {
        navigate('/signin')
    }

    return (
        <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="http://localhost:5173/images/Home.svg" alt="QR Code" className="shadow-none w-16 h-16" />
          </div>
          <div className="flex items-center space-x-4">
          <button className="text-blue-700 hover:text-blue-800 font-medium">Log in</button>
            <img src=' http://localhost:5173/images/Color.svg' />
          </div>
        </div>
      </header>   

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8 sm:pt-16 bg-[#F5F5F5]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
          {/* Left Content */}
          <div className="flex flex-col items-center text-center max-w-xl">
            <h1 className="text-5xl sm:text-4xl lg:text-5xl font-bold text-blue-700 mb-6">
              Welcome to Invite Smart App
            </h1>
            <p className="text-gray-600 mb-8">
              Please choose one of the options below
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={()=>navigate('/what')} className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors w-full sm:w-auto">
                Login With Phone
              </button>
              <button onClick={LoginEmail} className="px-6 py-3 bg-white text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto">
                Login With Email
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="http://localhost:5173/images/front.png"
              alt="People connecting"
              className="rounded-lg shadow-none max-w-full h-auto"
            />
          </div>
        </div>
      </main>

      {/* Notification Toast */}
      {
        showOff ? <div className="fixed bottom-4 right-4 max-w-md bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex items-start gap-3">
        <QrCode className="w-6 h-6 text-blue-700 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-900">INVITE SMART</h3>
          <p className="text-sm text-gray-600">
            You can now use Add Invite button to connect and invite your loved ones in your celebration!
          </p>
        </div>
        <button onClick={() => setShowOff(!showOff)} className="text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div> : ''
      }
    </div>
    );
};

export default Welcome;