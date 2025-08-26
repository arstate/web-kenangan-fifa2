import React from 'react';
import type { Memory } from '../types';
import { TrashIcon } from './icons';

interface MemoryCardProps {
  memory: Memory;
  onDelete: (id: string) => void;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete, onClick }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card's onClick from firing when deleting
    onDelete(memory.id);
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img className="w-full h-56 object-cover" src={memory.imageUrls[0]} alt={memory.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <button 
            onClick={handleDelete}
            className="p-2 bg-white/50 rounded-full text-slate-700 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Delete memory"
          >
            <TrashIcon className="w-5 h-5"/>
          </button>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-500 mb-1">{new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">{memory.title}</h3>
        <p className="text-slate-600 leading-relaxed line-clamp-3">
          {memory.story}
        </p>
      </div>
    </div>
  );
};

export default MemoryCard;
