import React from 'react';
import { 
  MapIcon, 
  MusicalNoteIcon, 
  ChatBubbleBottomCenterIcon 
} from '@heroicons/react/24/outline';
import { cn } from "@/lib/utils";

// 静态配置仅用于查找图标和名称
export const MENU_CONFIG = {
  map: { id: 'map', name: 'Map', icon: MapIcon },
  music: { id: 'music', name: 'Music', icon: MusicalNoteIcon },
  chat: { id: 'chat', name: 'Chat', icon: ChatBubbleBottomCenterIcon },
};

interface SidebarProps {
  // 接收排好序的 ID 列表
  orderedIds: string[];
  // 接收当前激活/可见的 ID 列表
  visibleIds: string[];
  onTabClick: (id: string) => void;
}

export default function Sidebar({ orderedIds, visibleIds, onTabClick }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 w-20 bg-white border-r border-gray-200 z-30 hidden md:block">
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
          {orderedIds.map((id) => {
            const config = MENU_CONFIG[id as keyof typeof MENU_CONFIG];
            if (!config) return null;

            const isActive = visibleIds.includes(id);
            
            return (
              <button
                key={id}
                onClick={() => onTabClick(id)}
                className={cn(
                  "w-full flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all duration-500 ease-in-out group relative",
                  isActive 
                    ? "bg-primary-50 text-primary-600 shadow-sm scale-100" 
                    : "text-gray-400 opacity-60 hover:bg-gray-50 hover:text-gray-900 hover:opacity-100 hover:scale-105"
                )}
              >
                <config.icon 
                  className={cn(
                    "w-7 h-7 mb-1 transition-all duration-300",
                    isActive ? "text-primary-600 rotate-0" : "text-gray-400 group-hover:text-gray-600 -rotate-3 group-hover:rotate-0"
                  )} 
                />
                <span className="text-[10px] font-semibold uppercase tracking-wider transition-opacity duration-300">
                  {config.name}
                </span>
                {isActive && (
                  <div className="absolute left-0 w-1 h-8 bg-primary-600 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}