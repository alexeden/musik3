import { useState, useLayoutEffect, } from 'react';

const getSize = () => [
  document.documentElement.clientWidth,
  document.documentElement.clientHeight,
] as const;

export const useWindowSize = (): readonly [number, number] => {
  const [ size, setSize, ] = useState(getSize());

  useLayoutEffect(() => {
    window.addEventListener('resize', () => setSize(getSize()));
    window.addEventListener('orientationchange', () => setSize(getSize()));

    return () => {
      window.removeEventListener('resize', () => setSize(getSize()));
      window.removeEventListener('orientationchange', () => setSize(getSize()));
    };
  });

  return size;
};

export const useWindowHeight = (): number => useWindowSize()[1];

export const useWindowWidth = (): number => useWindowSize()[0];
