import React, { useRef, } from 'react';
import { useByteData, useMusikStore, useWindowWidth, } from '../../hooks';

const Waveform: React.FC = () => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const analyzer = useMusikStore(state => state.analyzer);
  const width = useWindowWidth();
  const height = 144;
  const fullVolumeHeight = height;

  useByteData(analyzer, ({ freq, }) => {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    const levels = [ ...freq.values(), ].slice(0, 100).map(l => l / 256);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    const levelWidth = Math.ceil(width / levels.length);

    levels.forEach((level, i) => {
      ctx.beginPath();
      ctx.strokeStyle = level >= 1
        ? 'rgb(255, 0, 0)'
        : 'rgb(255, 255, 255)';
      const y = height - (level * fullVolumeHeight);
      ctx.moveTo(levelWidth * i, y);
      ctx.lineTo(levelWidth * (i + 1), y);
      ctx.stroke();
    });
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
