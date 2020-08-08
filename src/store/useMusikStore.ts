import * as THREE from 'three';
import create from 'zustand';

export type MusikState = {
  analyzer: AnalyserNode;
  audioBuffer: AudioBuffer | null;
  clock: THREE.Clock;
  context: AudioContext;
  isPlaying: boolean;
  actions: {
    connectSource: (buffer: AudioBuffer) => void;
    play: () => void;
    pause: () => void;
  };
};

export const [ useMusikStore, musikApi, ] = create<MusikState>((set, get, _api) => {
  const context = new AudioContext();
  const analyzer = context.createAnalyser();
  analyzer.smoothingTimeConstant = 0.3; // smooths out bar chart movement over time
  analyzer.fftSize = 1024;
  analyzer.connect(context.destination);

  context.addEventListener('statechange', () => {
    set({ isPlaying: context.state === 'running', });
  });

  let source: AudioBufferSourceNode | null = null;

  return {
    analyzer,
    audioBuffer: null,
    clock: new THREE.Clock(),
    context,
    isPlaying: false,
    actions: {
      connectSource: buffer => {
        source?.disconnect();
        source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyzer);
        source.start();
        console.log('SOURCE CONNECTED AND STARTED');
      },
      play: () => context.resume(),
      pause: () => context.suspend(),
    },
  };
});
