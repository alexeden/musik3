import { useEffect, useRef, } from 'react';

export const useAnimationFrame = (cb: FrameRequestCallback, cleanup?: () => void) => {
  const stopRef = useRef(false);
  useEffect(() => {
    const next = (t: number) => {
      cb(t);
      if (!stopRef.current) requestAnimationFrame(next);
    };

    next(performance.now());

    return () => {
      cleanup?.();
      console.log('useAnimationFrame has is cleaning up'); // eslint-disable-line
      stopRef.current = true;
    };
  }, [ cb, cleanup, ]);
};
