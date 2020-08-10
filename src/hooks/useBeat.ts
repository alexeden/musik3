import { useRef, } from 'react';
import { LevelData, useLevelData, } from './useLevelData';

const BEAT_DECAY = 0.9;
const BEAT_HOLD_TIME = 40;
const BEAT_VOLUME_THRESHOLD = 0.55;

export const useBeat = (analyzer: AnalyserNode, cb: (data: LevelData) => void) => {
  const beatCutOff = useRef(0);
  const beatTime = useRef(0);

  useLevelData(analyzer, ({ levels, volume, }) => {
    if (volume > beatCutOff.current && volume > BEAT_VOLUME_THRESHOLD) {
      cb({ levels, volume, });
      beatCutOff.current = volume * 1.1;
      beatTime.current = 0;
    }
    else if (beatTime.current <= BEAT_HOLD_TIME) {
      beatTime.current++;
    }
    else {
      beatCutOff.current *= BEAT_DECAY;
      beatCutOff.current = Math.max(beatCutOff.current, BEAT_VOLUME_THRESHOLD);
    }
  });
};
