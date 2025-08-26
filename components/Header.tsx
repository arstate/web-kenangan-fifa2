
import React from 'react';
import type { User } from '../types';
import { HeartIcon } from './icons';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <HeartIcon className="w-8 h-8 text-rose-500" />
          <h1 className="text-xl font-bold font-serif text-slate-800">Romantic Memories</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-rose-200" />
            <span className="font-semibold hidden sm:inline">{user.name}</span>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-rose-100 text-rose-700 font-semibold rounded-lg hover:bg-rose-200 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
