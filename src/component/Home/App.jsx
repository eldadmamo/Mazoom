import React from 'react';
import Header from './Header';
import EmptyState from './EmptyState';

function WelcomeHome() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your invitation</h1>
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <EmptyState />
        </div>
      </main>
    </div>
  );
}

export default WelcomeHome;