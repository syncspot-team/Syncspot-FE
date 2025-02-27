import { ReactNode } from 'react';
import { useBottomSheet } from '@src/hooks/useBottomSheet';

interface BottomSheetProps {
  children: ReactNode;
  minHeight?: number;
  maxHeight?: number;
  initialHeight?: number;
  headerHeight?: number;
  onHeightChange?: (height: number) => void;
}

export default function BottomSheet({
  children,
  minHeight = 30,
  maxHeight = 90,
  initialHeight = 50,
  headerHeight = 32,
  onHeightChange,
}: BottomSheetProps) {
  const { sheetRef, dragHandleRef, sheetHeight, isCollapsed } = useBottomSheet({
    minHeight,
    maxHeight,
    initialHeight,
    headerHeight,
    onHeightChange,
  });

  // vh를 dvh로 변환
  const heightStyle = `${(sheetHeight / window.innerHeight) * 100}dvh`;

  return (
    <>
      {!isCollapsed && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" />
      )}

      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 bg-white-default rounded-t-[1.25rem] shadow-lg transition-transform z-50 lg:hidden`}
        style={{
          height: heightStyle,
          touchAction: 'none',
        }}
      >
        <div
          ref={dragHandleRef}
          className="flex justify-center w-full pt-3 pb-5 cursor-grab active:cursor-grabbing"
          style={{ height: `${(headerHeight / window.innerHeight) * 100}dvh` }}
        >
          <div className="w-10 h-1 rounded-full bg-gray-normal" />
        </div>
        <div
          className="overflow-y-auto"
          style={{
            height: `calc(100% - ${(headerHeight / window.innerHeight) * 100}dvh)`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
