import React, { useState, useEffect, useRef } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  title: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  showOnClick?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  placement = 'top',
  delay = 300,
  showOnClick = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const calculatePosition = () => {
    if (!ref.current || !tooltipRef.current) return;

    const targetRect = ref.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let newTop = 0;
    let newLeft = 0;

    switch (placement) {
      case 'top':
        newTop = targetRect.top + scrollY - tooltipRect.height - 8;
        newLeft = targetRect.left + scrollX + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        newTop = targetRect.bottom + scrollY + 8;
        newLeft = targetRect.left + scrollX + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        newTop = targetRect.top + scrollY + (targetRect.height - tooltipRect.height) / 2;
        newLeft = targetRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        newTop = targetRect.top + scrollY + (targetRect.height - tooltipRect.height) / 2;
        newLeft = targetRect.right + scrollX + 8;
        break;
    }

    setPosition({ top: newTop, left: newLeft });
  };

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // 延迟计算位置，确保tooltip已经渲染
      setTimeout(calculatePosition, 10);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleClick = () => {
    if (showOnClick) {
      setIsVisible(!isVisible);
      if (!isVisible) {
        setTimeout(calculatePosition, 10);
      }
    }
  };

  const handleMouseEnter = () => {
    if (!showOnClick) {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (!showOnClick) {
      hideTooltip();
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative inline-block"
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            pointerEvents: 'none',
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
