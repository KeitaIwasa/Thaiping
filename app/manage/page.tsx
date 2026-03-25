'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phrase, loadPhrases, savePhrases } from '@/lib/store';
import { generatePhraseDetails } from '@/lib/gemini';
import { ArrowLeft, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

export default function ManagePhrases() {
  const router = useRouter();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<Partial<Phrase>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPhrases(loadPhrases());
  }, []);

  const handleSave = async () => {
    if (!editingPhrase.thai) {
      alert('Thai is required.');
      return;
    }

    setIsLoading(true);
    try {
      let finalPhrase = { ...editingPhrase };
      
      // Generate missing fields
      if (!finalPhrase.romanization || !finalPhrase.japanese || !finalPhrase.english) {
        const generated = await generatePhraseDetails(
          finalPhrase.thai!,
          finalPhrase.japanese,
          finalPhrase.english
        );
        finalPhrase = {
          ...finalPhrase,
          romanization: finalPhrase.romanization || generated.romanization,
          japanese: finalPhrase.japanese || generated.japanese,
          english: finalPhrase.english || generated.english,
        };
      }

      const newPhrases = [...phrases];
      if (finalPhrase.id) {
        const idx = newPhrases.findIndex(p => p.id === finalPhrase.id);
        if (idx >= 0) {
          newPhrases[idx] = finalPhrase as Phrase;
        }
      } else {
        newPhrases.unshift({
          ...finalPhrase,
          id: Math.random().toString(36).substr(2, 9),
          memorizedUntil: { practice: null, memorization: null }
        } as Phrase);
      }

      setPhrases(newPhrases);
      savePhrases(newPhrases);
      setIsEditing(false);
      setEditingPhrase({});
    } catch (error) {
      console.error(error);
      alert('Failed to generate phrase details. Please check your API key settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this phrase?')) {
      const newPhrases = phrases.filter(p => p.id !== id);
      setPhrases(newPhrases);
      savePhrases(newPhrases);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
        <button onClick={() => router.push('/')} className="p-2 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Phrase Manager</h1>
        <button
          onClick={() => { setEditingPhrase({}); setIsEditing(true); }}
          className="ml-auto p-2 bg-blue-600 text-white rounded-full shadow-sm"
        >
          <Plus className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 p-4 max-w-2xl w-full mx-auto space-y-4">
        {phrases.map(phrase => (
          <div key={phrase.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <div className="text-lg font-thai font-bold truncate">{phrase.thai}</div>
              <div className="text-sm text-gray-500 truncate">{phrase.japanese} / {phrase.english}</div>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button onClick={() => { setEditingPhrase(phrase); setIsEditing(true); }} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Edit2 className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(phrase.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </main>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold">{editingPhrase.id ? 'Edit Phrase' : 'Add Phrase'}</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thai (Required)</label>
                <input
                  type="text"
                  value={editingPhrase.thai || ''}
                  onChange={e => setEditingPhrase({...editingPhrase, thai: e.target.value})}
                  className="w-full p-3 border rounded-xl font-thai"
                  placeholder="e.g. สวัสดี"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Japanese (Optional)</label>
                <input
                  type="text"
                  value={editingPhrase.japanese || ''}
                  onChange={e => setEditingPhrase({...editingPhrase, japanese: e.target.value})}
                  className="w-full p-3 border rounded-xl"
                  placeholder="e.g. こんにちは"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">English (Optional)</label>
                <input
                  type="text"
                  value={editingPhrase.english || ''}
                  onChange={e => setEditingPhrase({...editingPhrase, english: e.target.value})}
                  className="w-full p-3 border rounded-xl"
                  placeholder="e.g. Hello"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Romanization (Optional)</label>
                <input
                  type="text"
                  value={editingPhrase.romanization || ''}
                  onChange={e => setEditingPhrase({...editingPhrase, romanization: e.target.value})}
                  className="w-full p-3 border rounded-xl"
                  placeholder="Auto-generated if left blank"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 p-3 border rounded-xl font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 p-3 bg-blue-600 text-white rounded-xl font-medium flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Empty fields are automatically generated by AI.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
