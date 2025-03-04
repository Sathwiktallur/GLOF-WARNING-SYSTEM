import React, { useEffect, useRef } from 'react';
import { GlobeVisualization } from '@/lib/globe';
import type { GlacialLake } from '@shared/schema';

interface GlobeViewProps {
  lakes: GlacialLake[];
  onSelectLake?: (lake: GlacialLake) => void;
}

export function GlobeView({ lakes, onSelectLake }: GlobeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeVisualization | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    globeRef.current = new GlobeVisualization(containerRef.current);
    globeRef.current.addMarkers(lakes);

    const handleResize = () => {
      if (!containerRef.current || !globeRef.current) return;
      globeRef.current.onResize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [lakes]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[500px]"
    />
  );
}
