import { useRef, } from 'react';
import { useAnimationFrame, } from './useAnimationFrame';

export const useByteData = (analyzer: AnalyserNode) => {
  const freq = useRef(new Uint8Array(analyzer.frequencyBinCount));
  const time = useRef(new Uint8Array(analyzer.frequencyBinCount));

  useAnimationFrame(() => {
    if (analyzer.context.state !== 'suspended') {
      analyzer.getByteFrequencyData(freq.current);
      analyzer.getByteTimeDomainData(time.current);
    }
  });

  return {
    freq: freq.current,
    time: time.current,
  };
};
