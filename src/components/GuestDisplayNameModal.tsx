import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (name: string) => void;
}

export const GuestDisplayNameModal: React.FC<Props> = ({ isOpen, onClose, onContinue }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Welcome!</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"><X className="w-5 h-5 text-zinc-500" /></button>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">What should we call you during this session?</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter display name..."
          className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
        <button
          onClick={() => {
            if (name.trim()) onContinue(name.trim());
          }}
          disabled={!name.trim()}
          className="w-full py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold disabled:opacity-50"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};
