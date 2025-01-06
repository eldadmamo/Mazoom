import React from 'react';
import { Plus } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-blue-50 rounded-full"></div>
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
          alt="Empty state illustration"
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Empty invitations</h2>
      <p className="text-gray-600">Click on plus to create invitation</p>
      <button className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
        <Plus size={24} />
      </button>
    </div>
  );
}