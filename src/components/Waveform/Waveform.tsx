import React, { useRef, useDebugValue, } from 'react';
import { useWindowWidth, } from '../../hooks';

const Waveform: React.FC = () => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rectRef = useRef(document.body.getBoundingClientRect());
  const width = useDebugValue(useWindowWidth());
  // const { size, } = useThree();
  // console.log('size: ', size);
  return (
    <canvas
      // height={`${size?.height ?? 100}px`}
      height="144px"
      width={`${width}px`}
      ref={canvas => {
        if (!canvas) return;
        ctxRef.current = canvas.getContext('2d');
      // ctxRef.current.
      // deviceP
      // console.log('REF!', r);
      }}

      style={{
        backgroundColor: 'white',
        position: 'fixed',
        bottom: '0',
        height: '144px',
        left: '0',
        right: '0',
        width: '100vw',
      }}

    />
  );
};

export default Waveform;
