import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from "@/lib/utils";

interface ColumnProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
}

export default function Column({ title, onClose, children, dragHandleProps, isDragging }: ColumnProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* 列头部 - 添加 dragHandleProps 使其可拖拽 */}
      <div 
        {...dragHandleProps}
        className={cn(
          "h-12 flex items-center justify-between px-4 border-b border-gray-100 bg-gray-50/50 flex-shrink-0 select-none transition-colors",
          isDragging ? "cursor-grabbing bg-gray-100" : "cursor-move hover:bg-gray-100"
        )}
      >
        {/* 使用不可见的占位符来保证标题绝对居中 */}
        <div className="w-5" /> 
        
        <span className="text-sm font-medium text-gray-700">
          {title}
        </span>
        
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors"
          aria-label={`关闭 ${title}`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      {/* 列内容 */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {children}
      </div>
    </div>
  );
}
