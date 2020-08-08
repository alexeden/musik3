import { useEffect, } from 'react';

export const useAnimationFrame = (cb: FrameRequestCallback, cleanup?: () => void) => {
  useEffect(() => {
    let stop = false;

    const next = (t: number) => {
      cb(t);
      if (!stop) requestAnimationFrame(next);
    };

    next(performance.now());

    return () => {
      cleanup?.();
      stop = true;
    };
  }, [ cb, cleanup, ]);
};
