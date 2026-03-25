'use client';
import Link from 'next/link';
import { BookOpen, Brain, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">タイ語タイピング練習</h1>
      
      <div className="w-full max-w-md space-y-4">
        <Link href="/practice" className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">練習モード</h2>
            <p className="text-sm text-gray-500">タイ語と発音記号を見ながらタイピング</p>
          </div>
        </Link>

        <Link href="/memorize" className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-purple-100 p-3 rounded-lg mr-4">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">暗記モード</h2>
            <p className="text-sm text-gray-500">日本語・英語だけを見てタイピング</p>
          </div>
        </Link>

        <Link href="/manage" className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-gray-100 p-3 rounded-lg mr-4">
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">フレーズ管理</h2>
            <p className="text-sm text-gray-500">フレーズの追加・編集・削除</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
