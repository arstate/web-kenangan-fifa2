
import React from 'react';
import { GoogleIcon, HeartIcon } from './icons';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-rose-50 overflow-hidden relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?blur=5&grayscale')" }}></div>
      <div className="absolute inset-0 bg-rose-100 opacity-60"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md mx-4 transition-transform transform hover:scale-105 duration-300">
        <HeartIcon className="w-20 h-20 text-rose-400 mb-4" />
        <h1 className="text-4xl font-bold font-serif text-slate-800 mb-2">Romantic Memories</h1>
        <p className="text-slate-600 mb-8">
          Your private vault to cherish every moment of your love story.
        </p>
        <button
          onClick={onLogin}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-rose-100 text-slate-700 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
        >
          <GoogleIcon className="w-6 h-6" />
          <span>Sign In with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
