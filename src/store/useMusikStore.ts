import * as THREE from 'three';
import create from 'zustand';

export type MusikState = Readonly<{
  analyzer: AnalyserNode;
  audioBuffer: AudioBuffer | null;
  canResume: boolean;
  clock: THREE.Clock;
  isPlaying: boolean;
  actions: {
    pause: () => void;
    play: (buffer: AudioBuffer) => Promise<void>;
    resume: () => void;
  };
}>;

export const [ useMusikStore, musikApi, ] = create<MusikState>((set, get, _api) => {
  const context = new AudioContext();
  const analyzer = context.createAnalyser();
  analyzer.smoothingTimeConstant = 0.1;
  analyzer.fftSize = 1024;
  analyzer.connect(context.destination);

  let source: AudioBufferSourceNode | null = null;

  context.addEventListener('statechange', () => {
    set({
      canResume: context.state === 'suspended' && !!source?.buffer,
      isPlaying: context.state === 'running' && !!source?.buffer,
    });
  });

  return {
    analyzer,
    audioBuffer: null,
    canResume: false,
    clock: new THREE.Clock(),
    isPlaying: false,
    actions: {
      play: async buffer => {
        await context.suspend();
        source?.disconnect();
        source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyzer);
        source.start();
        return context.resume();
      },
      pause: () => context.suspend(),
      resume: () => context.resume(),
    },
  };
});
