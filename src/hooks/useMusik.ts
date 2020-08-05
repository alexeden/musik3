import {
  useRef, useState, useCallback, useEffect,
} from 'react';
import { useFrame, } from 'react-three-fiber';
import { useRefFunctions, } from './useRefFunctions';

const levelsCount = 16;
const BEAT_MIN = 0.15; // level less than this is no beat
const msecsAvg = 633; // time between beats (msec)

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
  const sourceRef = useRef<AudioBufferSourceNode>(context.createBufferSource());

  return {
    source: sourceRef.current,
    connect: (buffer: AudioBuffer) => {
      sourceRef.current?.disconnect();
      sourceRef.current.buffer = buffer;
      sourceRef.current.loop = true;
      sourceRef.current.connect(analyzer);
      analyzer.connect(context.destination);
      return sourceRef.current;
    },
  };
};

const useFreqTimeData = () => {
  const { analyzer, } = useAudioAnalyzer();
  const freq = useRef(new Uint8Array(analyzer.frequencyBinCount));
  const time = useRef(new Uint8Array(analyzer.frequencyBinCount));

  useEffect(() => {
    let stop = false;
    const captureData = () => {
      analyzer.getByteFrequencyData(freq.current); // <-- bar chart
      analyzer.getByteTimeDomainData(time.current); // <-- waveform
      if (!stop) requestAnimationFrame(captureData);
    };

    captureData();
    return () => {
      stop = true;
    };
  });

  return {
    freq: freq.current,
    time: time.current,
  };
};

export const useMusik = () => {
  const useRefFunction = useRefFunctions();
  const { analyzer, context, } = useAudioAnalyzer();
  const { connect, source, } = useAudioBufferSourceNode();
  const { freq, time, } = useFreqTimeData();
  const [ isLoading, setIsLoading, ] = useState(false);

  const onAudioBuffer = useCallback((buffer: AudioBuffer) => {
    connect(buffer).start(0);
  }, [ connect, ]);

  (window as any).source = source;
  return {
    isLoading,
    play: () => source.start(),
    pause: () => source.stop(),
    load: useRefFunction('load', (url: string) => {
      setIsLoading(true);

      return fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => analyzer.context.decodeAudioData(buffer))
        .then(audioBuffer => {
          onAudioBuffer(audioBuffer);
          return audioBuffer;
        })
        .finally(() => setIsLoading(false));
    }),
  };
};
