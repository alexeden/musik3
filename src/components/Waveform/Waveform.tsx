import React, { useRef, } from 'react';
import { useWindowWidth, useLevelData, useMusikStore, } from '../../hooks';

const Waveform: React.FC = () => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const analyzer = useMusikStore(state => state.analyzer);
  const width = useWindowWidth();
  const height = 144;

  useLevelData(analyzer, ({ levels, volume, }) => {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    const levelWidth = Math.floor(width / levels.length);

    levels.forEach((level, i) => {
      const y = height - (level * height);
      ctx.moveTo(levelWidth * i, y);
      ctx.lineTo(levelWidth * (i + 1), y);
    });

    ctx.stroke();
  });

  return (
    <canvas
      height={`${height}px`}
      width={`${width}px`}
      ref={canvas => {
        if (!canvas) return;
        ctxRef.current = canvas.getContext('2d');
      }}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'fixed',
        bottom: '0',
        height: `${height}px`,
        left: '0',
        right: '0',
        width: `${width}px`,
      }}
    />
  );
};

export default Waveform;
