import { useRef, } from 'react';
import { useAnimationFrame, } from './useAnimationFrame';

export type ByteData = {
  freq: Uint8Array;
  time: Uint8Array;
};

export const useByteData = (analyzer: AnalyserNode, cb?: (data: ByteData) => void) => {
  const freq = useRef(new Uint8Array(analyzer.frequencyBinCount));
  const time = useRef(new Uint8Array(analyzer.frequencyBinCount));

  useAnimationFrame(() => {
    if (analyzer.context.state !== 'suspended') {
      analyzer.getByteFrequencyData(freq.current);
      analyzer.getByteTimeDomainData(time.current);
      cb?.({
        freq: freq.current,
        time: time.current,
      });
    }
  });

  return {
    freq: freq.current,
    time: time.current,
  };
};
