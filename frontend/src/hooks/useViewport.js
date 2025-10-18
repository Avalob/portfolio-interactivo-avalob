import { useState, useEffect, useMemo } from 'react';
import { WIDTH, HEIGHT } from '../utils/tiledMapData';
import { TILE_SIZE } from '../utils/mapConfig';

export function useViewport() {
  // Calcular dimensiones del mapa
  const MAP_PIXEL_WIDTH = WIDTH * TILE_SIZE;
  const MAP_PIXEL_HEIGHT = HEIGHT * TILE_SIZE;
  
  const [viewportSize, setViewportSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: MAP_PIXEL_WIDTH, height: MAP_PIXEL_HEIGHT };
    }
    return {
      width: window.visualViewport?.width ?? window.innerWidth,
      height: window.visualViewport?.height ?? window.innerHeight
    };
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 768px) and (hover: none) and (pointer: coarse)').matches;
      setIsMobileDevice(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncViewportMetrics = () => {
      const currentWidth = window.visualViewport?.width ?? window.innerWidth;
      const currentHeight = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--app-vh', `${currentHeight * 0.01}px`);
      setViewportSize(prev => (
        prev.width === currentWidth && prev.height === currentHeight
          ? prev
          : { width: currentWidth, height: currentHeight }
      ));
    };

    syncViewportMetrics();
    window.addEventListener('resize', syncViewportMetrics);
    window.addEventListener('orientationchange', syncViewportMetrics);
    window.visualViewport?.addEventListener?.('resize', syncViewportMetrics);

    return () => {
      window.removeEventListener('resize', syncViewportMetrics);
      window.removeEventListener('orientationchange', syncViewportMetrics);
      window.visualViewport?.removeEventListener?.('resize', syncViewportMetrics);
    };
  }, []);

  const autoPathIntervalMs = useMemo(() => (isMobileDevice ? 190 : 190), [isMobileDevice]);

  return { viewportSize, isMobile, isMobileDevice, autoPathIntervalMs };
}
