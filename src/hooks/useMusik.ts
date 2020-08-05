import { useRef, useState, } from 'react';

const useAudioAnalyzer = () => {
  const context = useRef(new AudioContext());
  const analyzer = context.current.createAnalyser();
  analyzer.smoothingTimeConstant = 0.3; // smooths out bar chart movement over time
  analyzer.fftSize = 1024;
  analyzer.connect(context.current.destination);

  return [ analyzer, context.current, ] as const;
};

export const useMusik = () => {
  const [ analyzer, context, ] = useAudioAnalyzer();

  const [ isLoading, setIsLoading, ] = useState(false);
  /**
   * An audio asset created from an audio file using the AudioContext.decodeAudioData() method. Once
   * in an AudioBuffer, the audio can then be played by being passed into an AudioBufferSourceNode.
   */

  return {
    isLoading,
    load: (url: string) =>
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => analyzer.context.decodeAudioData(buffer)),
  };
};
