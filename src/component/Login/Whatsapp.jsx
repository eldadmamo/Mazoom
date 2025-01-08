import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Whatsapp() {
    const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

  const BacktoHome = () => {
    navigate('/')
  }

  const emallLogin = () => {
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 flex justify-between items-center rounded-lg bg-[#ffffff] border-b">
      <div className="flex px-12 items-center gap-2">
      <div className="flex items-center space-x-4">
            
          </div>
      </div>
      <div className="flex items-center space-x-4">
          <select className="text-sm border-none outline-none cursor-pointer bg-transparent">
          <option value="Contact Us">Contact Us</option>
          </select>
          <select className="text-sm border-none outline-none cursor-pointer  hidden sm:block bg-transparent">
          <option value="en">En</option>
           </select>
            
            <img src='https://mazoom-sandy.vercel.app/images/Color.svg' />
          </div>
    </header> 

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8 sm:pt-16 bg-[#F5F5F5] ">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
        <div className="w-full  lg:w-1/2 flex justify-center">
        {/* Right Image */}
           <div className='hidden md:block'>
            <div className='flex flex-col gap-3'>
            <div className='flex flex-wrap gap-3 ml-3'>
                <button onClick={BacktoHome}><ArrowLeft/></button>
                <h4>Back</h4>
            </div>
            <img src="https://mazoom-sandy.vercel.app/images/Home.svg" alt="QR Code" className="shadow-none w-16 h-16" />
            </div>
            <div className="flex items-center gap-2">
            <img src='' alt='' />
            </div>
            <img
              src="https://mazoom-sandy.vercel.app/images/front.png"
              alt="People connecting"
              className="rounded-lg shadow-none  w-[500px] h-[500px] items-center"
            />
            <h1 className='top-0 left-0 text-3xl font-semibold'>Welcome Back</h1>
            <h3 className='text-2xl font-semibold text-[#547BA0]'>Your source for personalized invitations.</h3>
            <h4 className='text-lg'>we offer a wide range of stunning designs that perfectly capture the essence of your celebration.</h4>
           </div>
      </div>
          {/* Left Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      <div className="flex justify-center mb-6">
        <MessageSquare className="w-12 h-12 text-green-500" />
      </div>
      
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
        Log in using WhatsApp number
      </h1>
      <p className="text-gray-500 text-center mb-8">
        We will send the code
      </p>

      <div className="space-y-6">
        <div className="flex gap-2">
          <select className="w-28 px-3 py-2 border rounded-md">
            <option value="+966">🇸🇦 +966</option>
          </select>
          <input
            type="tel"
            placeholder="000-00-00"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
          Sign-In
        </button>

        <div className="text-center text-sm">
          <p className="text-gray-500 mb-2">
            Don't have an account yet?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign-up
            </a>
          </p>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          <div className="space-y-4">
            <button onClick={emallLogin} className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in you accept the{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>  

          
          
        </div>
      </main>
    </div>
  );
}

export default Whatsapp;