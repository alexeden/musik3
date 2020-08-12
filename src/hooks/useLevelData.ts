import { useAnimationFrame, } from './useAnimationFrame';
import { useByteData, } from './useByteData';

const GAIN = 1.7;

export const LEVELS_COUNT = 24;

export interface LevelData {
  levels: number[];
  /**
   * Value between 0 and 1.
   */
  volume: number;
}

export const useLevelData = (analyzer: AnalyserNode, cb: (data: LevelData) => void) => {
  /** 32 bins per level for 16 levels, 512 bins */
  const binsPerLevel = Math.floor(analyzer.frequencyBinCount / LEVELS_COUNT);

  useByteData(analyzer, ({ freq, }) => {
    // if (analyzer.context.state === 'suspended') return;

    const data: number[] = [];

    for (let i = 0; i < LEVELS_COUNT; i++) {
      let levelSum = 0;
      for (let j = 0; j < binsPerLevel; j++) {
        levelSum += freq[i * binsPerLevel + j];
      }
      data[i] = levelSum / binsPerLevel / 256 * GAIN;
    }

    const sum = data.slice(0, LEVELS_COUNT).reduce((s, x) => s + x, 0);

    cb({
      levels: data,
      volume: sum / LEVELS_COUNT,
    });
  });
};
