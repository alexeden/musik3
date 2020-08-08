import * as THREE from 'three';
import create from 'zustand';

export type MusikState = {
  analyzer: AnalyserNode;
  audioBuffer: AudioBuffer | null;
  clock: THREE.Clock;
  context: AudioContext;
  isLoading: boolean;
  actions: {
    load: (url: string) => Promise<AudioBuffer>;
  };
};

export const [ useMusikStore, musikApi, ] = create<MusikState>((set, get, _api) => {
  const context = new AudioContext();
  const analyzer = context.createAnalyser();
  analyzer.smoothingTimeConstant = 0.3; // smooths out bar chart movement over time
  analyzer.fftSize = 1024;

  return {
    analyzer,
    audioBuffer: null,
    clock: new THREE.Clock(),
    context,
    isLoading: false,
    actions: {
      load: url => {
        set(() => ({ isLoading: true, }));

        return fetch(url)
          .then(response => response.arrayBuffer())
          .then(buffer => analyzer.context.decodeAudioData(buffer))
          .then(audioBuffer => {
            set(() => ({ audioBuffer, }));
            return audioBuffer;
          })
          .finally(() => set(() => ({ isLoading: false, })));
      },
    },
  };
});
