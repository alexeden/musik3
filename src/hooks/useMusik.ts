import { useRef, useState, } from 'react';
import { useRefFunctions, } from './useRefFunctions';

const useAudioAnalyzer = (() => {
  const context = new AudioContext();
  const analyzer = context.createAnalyser();
  analyzer.smoothingTimeConstant = 0.3; // smooths out bar chart movement over time
  analyzer.fftSize = 1024;
  return () => ({
    analyzer,
    context,
  });
})();

const useAudioBufferSourceNode = () => {
  const { analyzer, context, } = useAudioAnalyzer();
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  return {
    source: sourceRef.current,
    connect: (buffer: AudioBuffer) => {
      sourceRef.current?.disconnect();
      const source = context.createBufferSource();
      source.connect(analyzer);
      source.buffer = buffer;
      source.loop = true;
      sourceRef.current = source;
      analyzer.connect(context.destination);
      return source;
    },
  };
};

export const useMusik = () => {
  const useRefFunction = useRefFunctions();
  const { analyzer, context, } = useAudioAnalyzer();
  const { connect, } = useAudioBufferSourceNode();
  const [ isLoading, setIsLoading, ] = useState(false);

  return {
    isLoading,
    load: useRefFunction('load', (url: string) => {
      setIsLoading(true);

      return fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => analyzer.context.decodeAudioData(buffer))
        .then(audioBuffer => {
          connect(audioBuffer);
          return audioBuffer;
        })
        .finally(() => setIsLoading(false));
    }),
  };
};
