import { useEffect, useRef, } from 'react';

export const useAnimationFrame = (cb: FrameRequestCallback, cleanup?: () => void) => {
  useEffect(() => {
    // const stopRef = useRef(false);
    let stop = false;

    const next = (t: number) => {
      cb(t);
      if (!stop) requestAnimationFrame(next);
    };

    next(performance.now());

    return () => {
      cleanup?.();
      console.log('useAnimationFrame has is cleaning up'); // eslint-disable-line
      stop = true;
    };
  }, [ cb, cleanup, ]);
};
