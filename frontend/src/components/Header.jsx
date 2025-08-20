import React from 'react';

function Header() {
  return (
    <>
      <div className="w-full h-16 bg-white drop-shadow-2xl flex items-center justify-between px-6">
      
        <div>
          <h1 className="font-serif font-bold text-xl text-violet-500">Edura</h1>
        </div>

        
        <div className="relative w-64 ">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 drop-shadow-2xl"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default Header;
