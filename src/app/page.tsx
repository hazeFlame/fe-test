"use client";
import React, { useState } from 'react';
import Sidebar, { MENU_CONFIG } from '@/components/Sidebar';
import SortableColumn from '@/components/SortableColumn';
import Column from '@/components/Column';
import MapContent from '@/components/features/MapContent';
import MusicContent from '@/components/features/MusicContent';
import ChatContent from '@/components/features/ChatContent';

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

const FEATURE_COMPONENTS: Record<string, React.ComponentType> = {
  map: MapContent,
  music: MusicContent,
  chat: ChatContent,
};

export default function Home() {
  // 1. 维护所有项的顺序
  const [itemOrder, setItemOrder] = useState<string[]>(['map', 'music', 'chat']);
  
  // 2. 维护可见性集合，默认不开启任何模块
  const [visibleSet, setVisibleSet] = useState<Set<string>>(new Set());

  // 3. 记录当前正在拖拽的 ID
  const [activeId, setActiveId] = useState<string | null>(null);

  // 计算当前显示的列
  const visibleColumns = itemOrder.filter(id => visibleSet.has(id));

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // 切换显示状态
  const toggleColumn = (id: string) => {
    setVisibleSet(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 关闭某一列
  const closeColumn = (id: string) => {
    setVisibleSet(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // 处理拖拽结束事件
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = itemOrder.indexOf(active.id as string);
      const newIndex = itemOrder.indexOf(over.id as string);
      
      setItemOrder((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar 
        orderedIds={itemOrder} 
        visibleIds={visibleColumns} 
        onTabClick={toggleColumn} 
      />

      <div className="flex flex-1 md:pl-20 overflow-x-auto">
        <DndContext
          id="dnd-context-id"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <div className="flex h-full min-w-full">
             <SortableContext 
                items={visibleColumns}
                strategy={horizontalListSortingStrategy}
             >
                {visibleColumns.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400 select-none w-full">
                    请点击左侧菜单打开功能模块
                  </div>
                ) : (
                  visibleColumns.map((colId) => {
                    const config = MENU_CONFIG[colId as keyof typeof MENU_CONFIG];
                    if (!config) return null;

                    const ContentComponent = FEATURE_COMPONENTS[colId];

                    return (
                      <SortableColumn 
                        key={colId} 
                        id={colId}
                        title={config.name} 
                        onClose={() => closeColumn(colId)}
                      >
                        {ContentComponent ? <ContentComponent /> : null}
                      </SortableColumn>
                    );
                  })
                )}
             </SortableContext>
          </div>

          <DragOverlay adjustScale={false}>
            {activeId ? (
              <div className="h-full flex flex-col min-w-[300px] border-r border-gray-200 bg-white shadow-2xl rounded-lg scale-[1.05] ring-1 ring-black/5 rotate-1 transition-transform cursor-grabbing">
                {(() => {
                  const config = MENU_CONFIG[activeId as keyof typeof MENU_CONFIG];
                  const ContentComponent = FEATURE_COMPONENTS[activeId];
                  return (
                    <Column 
                      title={config?.name || ''} 
                      onClose={() => {}}
                      isDragging
                    >
                      {ContentComponent ? <ContentComponent /> : null}
                    </Column>
                  );
                })()}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
