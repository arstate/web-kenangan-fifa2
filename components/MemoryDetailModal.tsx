import React, { useState } from 'react';
import type { Memory } from '../types';
import { XIcon } from './icons';

interface MemoryDetailModalProps {
  memory: Memory;
  onClose: () => void;
}

const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({ memory, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col lg:flex-row relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-20 bg-white/50 rounded-full p-1">
          <XIcon className="w-6 h-6" />
        </button>

        <div className="w-full lg:w-2/3 bg-black flex items-center justify-center rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <img 
            src={memory.imageUrls[activeIndex]} 
            alt={`Memory photo ${activeIndex + 1}`}
            className="max-h-[50vh] lg:max-h-[90vh] w-auto h-auto object-contain"
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col p-6 overflow-y-auto">
          <div className="flex-grow">
            <p className="text-sm text-slate-500 mb-2">{new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <h2 className="text-3xl font-bold font-serif mb-4 text-slate-800">{memory.title}</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{memory.story}</p>
          </div>
          
          {memory.imageUrls.length > 1 && (
            <div className="flex-shrink-0 pt-4 mt-4 border-t">
              <h4 className="text-sm font-semibold mb-2 text-slate-700">Gallery</h4>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {memory.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${activeIndex === index ? 'border-rose-500' : 'border-transparent'} hover:border-rose-300`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryDetailModal;
