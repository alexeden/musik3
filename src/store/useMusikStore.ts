import * as THREE from 'three';
import create from 'zustand';

export type MusikState = Readonly<{
  analyzer: AnalyserNode;
  audioBuffer: AudioBuffer | null;
  clock: THREE.Clock;
  isPlaying: boolean;
  actions: {
    // connectSource: (buffer: AudioBuffer) => AudioBufferSourceNode;
    play: (buffer: AudioBuffer) => Promise<void>;
    pause: () => void;
  };
}>;

export const [ useMusikStore, musikApi, ] = create<MusikState>((set, get, _api) => {
  const context = new AudioContext();
  const analyzer = context.createAnalyser();
  analyzer.smoothingTimeConstant = 0; // smooths out bar chart movement over time
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
    isPlaying: false,
    actions: {
      play: async buffer => {
        source?.disconnect();
        source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyzer);
        source.start();
        return context.resume();
      },
      pause: () => context.suspend(),
    },
  };
});
