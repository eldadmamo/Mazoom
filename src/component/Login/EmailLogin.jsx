import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft} from 'lucide-react';

import { useNavigate } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";

const EmailLogin = ({onLogin }) => {

      const navigate = useNavigate();
      const [phoneNumber, setPhoneNumber] = useState('');

      const [showPassword, setShowPassword] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const DUMMY_EMAIL = 'test@example.com';
      const DUMMY_PASSWORD = 'password123';

      const submitForm = (e) => {
        e.preventDefault();
        if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
          onLogin(); // Update login state
          navigate('/main'); // Redirect to main page
        } else {
          setError('Invalid email or password');
        }
      };
    
      const BacktoHome = () => {
        navigate('/')
      }

    return (
        <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 flex justify-between items-center rounded-lg bg-[#ffffff] border-b">
      <div className="flex px-12 items-center gap-2">
      <div className="flex items-center space-x-4">
            
      </div>
      </div>
      <div className="flex items-center gap-4">
      <div className="flex items-center space-x-4">
          <select className="text-sm border-none outline-none cursor-pointer bg-transparent">
          <option value="contact us">Contact Us</option>
          </select>
          
          <select className="text-sm border-none outline-none cursor-pointer  hidden sm:block bg-transparent">
          <option value="en">En</option>
           </select>
            <img src='https://mazoom-sandy.vercel.app/images/Color.svg' />
          </div>
        
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </header> 

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8 sm:pt-16 bg-[#F5F5F5] ">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
        <div className="w-full  lg:w-1/2 flex justify-center">
        {/* Right Image */}
           <div className='hidden md:block'>
            <div className="flex flex-col gap-3">
            <div className='flex flex-wrap gap-3 ml-3'>
                <button onClick={BacktoHome}><ArrowLeft/></button>
                <h4>Back</h4>
            </div>
            <img src="https://mazoom-sandy.vercel.app/images/Home.svg" alt="QR Code" className="shadow-none w-16 h-16" />
            </div>
            <img
              src="https://mazoom-sandy.vercel.app/images/front.png"
              alt="People connecting"
              className="rounded-lg shadow-none w-[500px] h-[500px] items-center"
            />
            <h1 className='top-0 left-0 text-3xl font-semibold'>Welcome Back</h1>
            <h3 className='text-2xl font-semibold text-[#547BA0]'>Your source for personalized invitations.</h3>
            <h4 className='text-lg'>we offer a wide range of stunning designs that perfectly capture the essence of your celebration.</h4>
           </div>
          </div>
          {/* Left Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex justify-center mb-6">
             
          </div>
      
          <h2 className="text-2xl font-semibold mb-6 flex justify-center text-center md:text-left">Sign-in</h2>
            
          <form onSubmit={submitForm}  className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
  
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Sign-In
                </button>
  
                <div className="mt-6 text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account yet?{' '}
                    <a href="/signup" className="text-blue-600 hover:text-blue-800">
                      Sign-up
                    </a>
                  </p>
  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>
  
                  <div className="space-y-3">
                    <button onClick={() => navigate('/what')} className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
                      <IoLogoWhatsapp className="text-green-700 w-5 h-5"/>
                      <span>WhatsApp</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
                      <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" className="w-5 h-5" />
                      <span>Google</span>
                    </button>
                  </div>
                </div>
  
                <p className="text-xs text-center text-gray-500 mt-8">
                  By signing in you accept the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Terms of Use
                  </a>{' '}
                  and acknowledge the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </a>
                </p>
              </form>
    </div>  

          
          
        </div>
      </main>
    </div>
    );
};

export default EmailLogin;