import React, { useState } from 'react';
import type { User, Memory } from '../types';
import Header from './Header';
import MemoryCard from './MemoryCard';
import MemoryModal from './MemoryModal';
import MemoryDetailModal from './MemoryDetailModal';
import { PlusIcon, HeartIcon } from './icons';

interface HomePageProps {
  user: User;
  onLogout: () => void;
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id'>) => void;
  deleteMemory: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogout, memories, addMemory, deleteMemory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800">
      <Header user={user} onLogout={onLogout} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-bold">Our Memories</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white font-semibold rounded-full shadow-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Memory</span>
          </button>
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-lg shadow-inner">
            <HeartIcon className="w-16 h-16 text-rose-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600">Your story begins here.</h3>
            <p className="text-slate-500 mt-2">Click 'Add Memory' to save your first cherished moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memories.map(memory => (
              <MemoryCard 
                key={memory.id} 
                memory={memory} 
                onDelete={deleteMemory}
                onClick={() => setSelectedMemory(memory)}
              />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <MemoryModal
          onClose={() => setIsModalOpen(false)}
          onSave={(memoryData) => {
            addMemory(memoryData);
            setIsModalOpen(false);
          }}
        />
      )}
      
      {selectedMemory && (
        <MemoryDetailModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
