import create from 'zustand';
import { musikApi, } from './useMusikStore';

export type AudioLoaderState = {
  isLoading: boolean;
  fetchAudioBuffer: (url: string) => Promise<AudioBuffer>;
};

export const [ useAudioLoaderStore, audioLoaderApi, ] = create<AudioLoaderState>(set => ({
  isLoading: false,
  fetchAudioBuffer: url => {
    set(() => ({ isLoading: true, }));

    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => musikApi.getState().context.decodeAudioData(buffer))
      .finally(() => set(() => ({ isLoading: false, })));
  },
}));
