import create from 'zustand';

export type MusikState = Readonly<{
  analyzer: AnalyserNode;
  canResume: boolean;
  isPlaying: boolean;
  actions: {
    pause: () => void;
    playBuffer: (buffer: AudioBuffer) => Promise<void>;
    playStream: (buffer: AudioBuffer) => Promise<void>;
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
    canResume: false,
    isPlaying: false,
    actions: {
      pause: () => context.suspend(),
      playBuffer: async buffer => {
        await context.suspend();
        source?.disconnect();
        source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyzer);
        source.start();
        return context.resume();
      },
      playStream: async () => {

      },
      resume: () => context.resume(),
    },
  };
});
