import { useCallback, useEffect, useRef, useState } from 'react';

interface UseBottomSheetProps {
  minHeight: number;
  maxHeight: number;
  initialHeight: number;
  headerHeight: number;
  onHeightChange?: (height: number) => void;
}

export function useBottomSheet({
  minHeight,
  maxHeight,
  initialHeight,
  onHeightChange,
}: UseBottomSheetProps) {
  // dvh를 픽셀로 변환하는 함수
  const dvhToPixels = (dvh: number) => {
    const dvhUnit = window.innerHeight * 0.01;
    return dvh * dvhUnit;
  };

  const [sheetHeight, setSheetHeight] = useState(dvhToPixels(initialHeight));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const currentHeightRef = useRef<number>(initialHeight);

  useEffect(() => {
    const handleResize = () => {
      setSheetHeight(dvhToPixels(currentHeightRef.current));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    onHeightChange?.(sheetHeight);
  }, [sheetHeight, onHeightChange]);

  const handleDragStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      startYRef.current = clientY;
      currentHeightRef.current = sheetHeight;

      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDrag);
      document.addEventListener('touchend', handleDragEnd);
    },
    [sheetHeight],
  );

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const delta = startYRef.current - clientY;
      const newHeight = currentHeightRef.current + delta;

      if (newHeight < dvhToPixels(minHeight)) {
        setIsCollapsed(true);
        setSheetHeight(dvhToPixels(minHeight));
      } else if (newHeight > dvhToPixels(maxHeight)) {
        setSheetHeight(dvhToPixels(maxHeight));
      } else {
        setIsCollapsed(false);
        setSheetHeight(newHeight);
      }
    },
    [minHeight, maxHeight],
  );

  const handleDragEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', handleDragEnd);
  }, [handleDrag]);

  useEffect(() => {
    const dragHandle = dragHandleRef.current;
    if (dragHandle) {
      dragHandle.addEventListener('mousedown', handleDragStart);
      dragHandle.addEventListener('touchstart', handleDragStart);

      return () => {
        dragHandle.removeEventListener('mousedown', handleDragStart);
        dragHandle.removeEventListener('touchstart', handleDragStart);
      };
    }
  }, [handleDragStart]);

  return {
    sheetRef,
    dragHandleRef,
    sheetHeight,
    isCollapsed,
  };
}
