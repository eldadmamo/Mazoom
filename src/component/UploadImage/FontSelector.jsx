import React from 'react';

const fonts = [
  { id: 'noto-sans', name: 'Noto Sans' },
  { id: 'poppins', name: 'Poppins' },
  { id: 'arial', name: 'Arial' },
  { id: 'times', name: 'Times' },
  { id: 'roboto', name: 'Roboto' },
];

const FontSelector = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {fonts.map((font) => (
        <button
          key={font.id}
          className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          {font.name}
        </button>
      ))}
    </div>
  );
};

export default FontSelector;