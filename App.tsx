
import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import type { User, Memory } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    // Attempt to load memories from localStorage on initial render
    try {
      const savedMemories = localStorage.getItem('romanticMemories');
      if (savedMemories) {
        setMemories(JSON.parse(savedMemories));
      }
    } catch (error) {
      console.error("Failed to load memories from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    // Save memories to localStorage whenever they change
    try {
      localStorage.setItem('romanticMemories', JSON.stringify(memories));
    } catch (error) {
      console.error("Failed to save memories to localStorage:", error);
    }
  }, [memories]);

  const handleLogin = useCallback(() => {
    // This is a simulated Google login
    const mockUser: User = {
      name: 'Beloved User',
      email: 'user@example.com',
      avatarUrl: 'https://picsum.photos/100',
    };
    setUser(mockUser);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const addMemory = useCallback((memory: Omit<Memory, 'id'>) => {
    const newMemory: Memory = { ...memory, id: Date.now().toString() };
    setMemories(prev => [newMemory, ...prev]);
  }, []);

  const deleteMemory = useCallback((id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  }, []);

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <HomePage
      user={user}
      onLogout={handleLogout}
      memories={memories}
      addMemory={addMemory}
      deleteMemory={deleteMemory}
    />
  );
};

export default App;
