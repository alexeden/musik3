import create from 'zustand';

export const [ useStore, api, ] = create((set, get) => {
  const audioContext = new AudioContext();
  const analyzer = audioContext.createAnalyser();
  analyzer.smoothingTimeConstant = 0.3; // smooths out bar chart movement over time
  analyzer.fftSize = 1024;

  return {
    audioContext,
    analyzer,
  };
});
