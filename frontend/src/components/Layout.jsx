import React from 'react';
import { PartyPopper } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-snow text-coal font-sans flex flex-col">
      <header className="bg-holly p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PartyPopper className="text-white w-8 h-8" />
          <h1 className="text-2xl font-bold text-white">Unqualified Opinions™️</h1>
        </div>
        <div className="text-white text-sm hidden sm:block">
          Toxic Christmas Edition 🎄
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      
      <footer className="bg-mistletoe p-4 text-center text-sm text-coal/70">
        Made with 0% empathy for Code At Christmas.
      </footer>
    </div>
  );
};

export default Layout;
