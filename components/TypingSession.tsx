'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Phrase, loadPhrases, savePhrases } from '@/lib/store';
import { ArrowLeft, CheckCircle2, SkipForward, Volume2 } from 'lucide-react';

type Mode = 'practice' | 'memorization';

export default function TypingSession({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const playAudio = useCallback(() => {
    if (!currentPhrase) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(currentPhrase.thai);
      msg.lang = 'th-TH';
      msg.rate = 0.85;
      window.speechSynthesis.speak(msg);
    }
  }, [currentPhrase]);

  useEffect(() => {
    if (currentPhrase) {
      const timer = setTimeout(playAudio, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPhrase, playAudio]);

  useEffect(() => {
    if (isCorrect) {
      playAudio();
    }
  }, [isCorrect, playAudio]);

  useEffect(() => {
    const allPhrases = loadPhrases();
    const now = Date.now();
    // Filter out memorized phrases
    const available = allPhrases.filter(p => {
      const memorizedUntil = p.memorizedUntil[mode];
      return !memorizedUntil || memorizedUntil < now;
    });
    
    // Shuffle
    const shuffled = available.sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhrases(shuffled);
    if (shuffled.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPhrase(shuffled[0]);
    }
  }, [mode]);

  const handleNext = () => {
    setInput('');
    setIsCorrect(null);
    setPhrases(prev => {
      const next = prev.slice(1);
      if (next.length > 0) {
        setCurrentPhrase(next[0]);
      } else {
        setCurrentPhrase(null);
      }
      return next;
    });
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleMemorized = () => {
    if (!currentPhrase) return;
    const allPhrases = loadPhrases();
    const updated = allPhrases.map(p => {
      if (p.id === currentPhrase.id) {
        return {
          ...p,
          memorizedUntil: {
            ...p.memorizedUntil,
            [mode]: Date.now() + 5 * 24 * 60 * 60 * 1000 // 5 days
          }
        };
      }
      return p;
    });
    savePhrases(updated);
    handleNext();
  };

  const checkInput = (val: string) => {
    setInput(val);
    if (!currentPhrase) return;
    
    if (val === currentPhrase.thai) {
      setIsCorrect(true);
    } else if (currentPhrase.thai.startsWith(val)) {
      setIsCorrect(null); // typing in progress
    }
  };

  if (phrases.length === 0 && !currentPhrase) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">完了！</h2>
        <p className="text-gray-600 mb-8">学習可能なフレーズがありません。</p>
        <button onClick={() => router.push('/')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">
          ホームに戻る
        </button>
      </div>
    );
  }

  if (!currentPhrase) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center p-4 bg-white shadow-sm">
        <button onClick={() => router.push('/')} className="p-2 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">{mode === 'practice' ? '練習モード' : '暗記モード'}</h1>
        <div className="ml-auto text-sm text-gray-500">
          残り: {phrases.length}
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col max-w-md w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex-1 flex flex-col justify-center items-center text-center space-y-4 relative">
          <button 
            onClick={playAudio}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="音声を再生"
          >
            <Volume2 className="w-6 h-6" />
          </button>
          
          <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {currentPhrase.english}
          </div>
          <div className="text-xl font-bold text-gray-800">
            {currentPhrase.japanese}
          </div>
          
          {mode === 'practice' && (
            <div className="mt-6 space-y-2">
              <div className="text-4xl font-thai text-gray-900">
                {currentPhrase.thai}
              </div>
              <div className="text-lg text-gray-500 font-mono">
                {currentPhrase.romanization}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => checkInput(e.target.value)}
              placeholder="タイ語を入力..."
              className={`w-full p-4 text-2xl font-thai text-center border-2 rounded-xl focus:outline-none transition-colors ${
                isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 focus:border-blue-500'
              }`}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {isCorrect && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            )}
          </div>

          {isCorrect ? (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
              <button
                onClick={handleNext}
                className="p-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                次へ
              </button>
              <button
                onClick={handleMemorized}
                className="p-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                覚えた (5日間非表示)
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center px-2">
              <button
                onClick={handleNext}
                className="flex items-center text-gray-500 hover:text-gray-700 p-2"
              >
                <SkipForward className="w-5 h-5 mr-1" />
                スキップ
              </button>
              
              {mode === 'memorization' && (
                <button
                  onClick={() => {
                    setInput(currentPhrase.thai);
                    setIsCorrect(true);
                  }}
                  className="text-blue-600 text-sm font-medium p-2"
                >
                  答えを見る
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
