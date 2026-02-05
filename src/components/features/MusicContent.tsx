import React from 'react';

export default function MusicContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <div className="bg-purple-50 p-6 rounded-full mb-4">
        <span className="text-4xl">🎵</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900">音乐播放器</h3>
      <p className="mt-2 text-sm">这里将加载播放列表和控制条...</p>
    </div>
  );
}
