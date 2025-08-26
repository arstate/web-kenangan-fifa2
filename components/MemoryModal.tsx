import React, { useState, useCallback } from 'react';
import { getRomanticTitleSuggestion } from '../services/geminiService';
import { XIcon, SparklesIcon, CameraIcon } from './icons';

interface MemoryModalProps {
  onClose: () => void;
  onSave: (memory: { title: string; date: string; story: string; imageUrls: string[] }) => void;
}

const MAX_IMAGES = 10;

const MemoryModal: React.FC<MemoryModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [story, setStory] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;

    const newImageUrls: string[] = [];
    const filesToProcess = Array.from(files).slice(0, MAX_IMAGES - imageUrls.length);

    if (files.length + imageUrls.length > MAX_IMAGES) {
      alert(`You can only upload a maximum of ${MAX_IMAGES} images.`);
    }

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImageUrls.push(e.target.result as string);
          if (newImageUrls.length === filesToProcess.length) {
            setImageUrls(prev => [...prev, ...newImageUrls]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !story || imageUrls.length === 0) {
      alert('Please fill out all fields and upload at least one photo.');
      return;
    }
    onSave({ title, date, story, imageUrls });
  };

  const handleSuggestTitle = async () => {
    if (!story) {
        alert("Please write your memory's story first to get a title suggestion.");
        return;
    }
    setIsSuggesting(true);
    try {
        const suggestion = await getRomanticTitleSuggestion(story);
        setTitle(suggestion);
    } catch (error) {
        console.error("Failed to get title suggestion:", error);
        alert("Could not generate a title. Please try again.");
    } finally {
        setIsSuggesting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold font-serif mb-6 text-slate-800">Add a New Memory</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
            <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                  required
                />
                <button
                    type="button"
                    onClick={handleSuggestTitle}
                    disabled={isSuggesting}
                    className="flex-shrink-0 px-3 py-2 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200 disabled:bg-slate-100 disabled:text-slate-400 transition-colors flex items-center gap-2"
                    title="Suggest a title with AI"
                >
                    <SparklesIcon className="w-5 h-5"/>
                    {isSuggesting && <div className="w-4 h-4 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin"></div>}
                </button>
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              required
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700">Photos ({imageUrls.length}/{MAX_IMAGES})</label>
             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-slate-400"/>
                    <div className="flex text-sm text-slate-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500">
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={(e) => handleImageChange(e.target.files)} disabled={imageUrls.length >= MAX_IMAGES} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
          </div>
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                        <img src={url} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md"/>
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                           <XIcon className="w-4 h-4"/>
                        </button>
                    </div>
                ))}
            </div>
          )}

          <div>
            <label htmlFor="story" className="block text-sm font-medium text-slate-700">Our Story</label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={6}
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              placeholder="Describe that special moment..."
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-rose-500 text-white font-semibold rounded-lg shadow-md hover:bg-rose-600 transition-colors"
            >
              Save Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemoryModal;
