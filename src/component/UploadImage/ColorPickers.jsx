import React from 'react';
import { X } from 'lucide-react';

const colors = [
  { id: 'white', color: 'bg-white border-2 border-gray-200' },
  { id: 'beige', color: 'bg-[#F5D0C5]' },
  { id: 'lightPink', color: 'bg-[#F7CAC9]' },
  { id: 'darkGray', color: 'bg-[#666666]' },
  { id: 'brown', color: 'bg-[#8B4513]' },
  { id: 'tan', color: 'bg-[#D2B48C]' },
  { id: 'darkBrown', color: 'bg-[#654321]' },
  { id: 'copper', color: 'bg-[#B87333]' },
  { id: 'black', color: 'bg-black' },
];

const ColorPickers = () => {
  return (
    <div className="flex items-center space-x-2">
      <button className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300">
        <X className="w-4 h-4 text-gray-400" />
      </button>
      {colors.map((color) => (
        <button
          key={color.id}
          className={`w-8 h-8 rounded-full ${color.color} hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all`}
        />
      ))}
    </div>
  );
};

export default ColorPickers;