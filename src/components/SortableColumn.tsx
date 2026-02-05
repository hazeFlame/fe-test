import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from "@/lib/utils";
import Column from './Column';

interface SortableColumnProps {
  id: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SortableColumn({ id, title, onClose, children }: SortableColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // 拖拽时，原始位置的组件变为半透明占位符
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={cn(
        "h-full flex flex-col flex-1 min-w-[300px] border-r border-gray-200 last:border-r-0 bg-white",
        isDragging ? "z-10" : "z-auto"
      )}
    >
      <Column 
        title={title} 
        onClose={onClose}
        dragHandleProps={{ ...attributes, ...listeners }}
        isDragging={isDragging}
      >
        {children}
      </Column>
    </div>
  );
}
