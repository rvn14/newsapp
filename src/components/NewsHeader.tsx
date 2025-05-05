"use client";

import { useState } from 'react';
import { Button } from './ui/button';

export default function NewsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">News App</h1>
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="px-4 py-2 text-white rounded"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </Button>
      </div>
      
      {isMenuOpen && (
        <nav className="mt-4">
          <ul className="flex flex-col space-y-2">
            <li>Home</li>
            <li>Top Stories</li>
            <li>Categories</li>
            <li>About</li>
          </ul>
        </nav>
      )}
    </header>
  );
}
