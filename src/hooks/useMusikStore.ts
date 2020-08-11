import create from 'zustand';

export type MusikState = Readonly<{
  analyzer: AnalyserNode;
  canResume: boolean;
  isPlaying: boolean;
  actions: {
    pause: () => void;
    playBuffer: (buffer: AudioBuffer) => Promise<void>;
    playStream: (stream: MediaStream) => Promise<void>;
    resume: () => void;
  };
}>;

export const [ useMusikStore, musikApi, ] = create<MusikState>((set, get, _api) => {
  const context = new AudioContext();
  const analyzer = context.createAnalyser();
  analyzer.smoothingTimeConstant = 0.1;
  analyzer.fftSize = 1024;
  analyzer.connect(context.destination);

  let source: AudioBufferSourceNode | MediaStreamAudioSourceNode | null = null;

  const stopSource = () => {
    source?.disconnect();

    if (source instanceof MediaStreamAudioSourceNode) {
      source.mediaStream.getTracks().map(track => track.stop());
    }
  };

  context.addEventListener('statechange', () => {
    const isBufferSource = source instanceof AudioBufferSourceNode;
    set({
      canResume: context.state === 'suspended' && !!(source as AudioBufferSourceNode | null)?.buffer,
      isPlaying: context.state === 'running' && !!source && (isBufferSource ? !!(source as any).buffer : true),
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
        stopSource();
        source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyzer).addEventListener('ended', () => {
          source = null;
          void context.suspend();
        });
        source.start();
        return context.resume();
      },
      playStream: async stream => {
        await context.suspend();
        stopSource();
        source = context.createMediaStreamSource(stream);
        source.connect(analyzer);
        return context.resume();
      },
      resume: () => context.resume(),
    },
  };
});
