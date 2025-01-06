import React from 'react';
import { Settings, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center space-x-2">
        <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
          <span>En</span>
          <ChevronDown size={16} />
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-1">
          <span>Instance</span>
          <ChevronDown size={16} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}