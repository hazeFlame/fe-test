import React from 'react';

export default function ChatContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <div className="bg-green-50 p-6 rounded-full mb-4">
        <span className="text-4xl">💬</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900">聊天窗口</h3>
      <p className="mt-2 text-sm">这里将显示实时消息对话...</p>
    </div>
  );
}
