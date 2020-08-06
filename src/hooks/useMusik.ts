import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useRefFunctions, } from './useRefFunctions';

const LEVELS_COUNT = 16;
const BEAT_MIN = 0.15; // level less than this is no beat
const BEAT_HOLD_TIME = 40;
const BEAT_DECAY = 0.9;
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
      sourceRef.current = context.createBufferSource();
      sourceRef.current.buffer = buffer;
      sourceRef.current.connect(analyzer);
      analyzer.connect(context.destination);
      return sourceRef.current;
    },
  };
};

const useAnimationFrame = (cb: FrameRequestCallback) => {
  useEffect(() => {
    let stop = false;
    const next = (t: number) => {
      cb(t);
      if (!stop) requestAnimationFrame(next);
    };

    next(performance.now());

    return () => {
      stop = true;
    };
  }, [ cb, ]);
};

export const useFreqTimeData = () => {
  const { analyzer, context, } = useAudioAnalyzer();
  const freq = useRef(new Uint8Array(analyzer.frequencyBinCount));
  const time = useRef(new Uint8Array(analyzer.frequencyBinCount));
  context.onstatechange = () => {
    if (context.state === 'suspended') {
      freq.current = new Uint8Array(analyzer.frequencyBinCount);
      time.current = new Uint8Array(analyzer.frequencyBinCount);
    }
  };

  useAnimationFrame(() => {
    if (context.state !== 'suspended') {
      analyzer.getByteFrequencyData(freq.current); // <-- bar chart
      analyzer.getByteTimeDomainData(time.current); // <-- waveform
    }
  });

  return {
    freq: freq.current,
    time: time.current,
  };
};

export interface LevelData {
  levels: number[];
  volume: number;
}

export const useLevelData = (cb: (data: LevelData) => void) => {
  const { analyzer, context, } = useAudioAnalyzer();
  const { freq, } = useFreqTimeData();
  const levelBins = Math.floor(analyzer.frequencyBinCount / LEVELS_COUNT); // #bins in each level

  useAnimationFrame(() => {
    if (context.state === 'suspended') return;

    const data: number[] = [];

    for (let i = 0; i < LEVELS_COUNT; i++) {
      let levelSum = 0;
      for (let j = 0; j < levelBins; j++) {
        levelSum += freq[i * levelBins + j];
      }
      data[i] = levelSum / levelBins / 256; // freqData maxs at 256
    }

    // GET AVG LEVEL
    const sum = data.slice(0, LEVELS_COUNT).reduce((s, x) => s + x, 0);
    cb({
      levels: data,
      volume: sum / LEVELS_COUNT,
    });
  });
};

export const useBeat = (cb: (data: LevelData) => void) => {
  const beatCutOff = useRef(0);
  const beatTime = useRef(0);

  useLevelData(({ levels, volume, }) => {
    if (volume > beatCutOff.current && volume > BEAT_MIN) {
      cb({ levels, volume, });
      beatCutOff.current = volume * 1.1;
      beatTime.current = 0;
    }
    else if (beatTime.current <= BEAT_HOLD_TIME) {
      beatTime.current++;
    }
    else {
      beatCutOff.current *= BEAT_DECAY;
      beatCutOff.current = Math.max(beatCutOff.current, BEAT_MIN);
    }
  });
};

export const useMusik = () => {
  const useRefFunction = useRefFunctions();
  const { analyzer, context, } = useAudioAnalyzer();
  const { connect, source, } = useAudioBufferSourceNode();
  const [ isLoading, setIsLoading, ] = useState(false);

  const onAudioBuffer = useCallback((buffer: AudioBuffer) => {
    connect(buffer).start(0);
  }, [ connect, ]);

  (window as any).analyzer = analyzer;
  (window as any).source = source;
  (window as any).context = context;
  return {
    isLoading,
    play: () => context.resume(),
    pause: () => context.suspend(),
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