import React from 'react';

export default function MapContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <div className="bg-blue-50 p-6 rounded-full mb-4">
        <span className="text-4xl">🗺️</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900">地图组件</h3>
      <p className="mt-2 text-sm">这里将加载地图可视化内容...</p>
    </div>
  );
}
