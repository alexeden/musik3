import React, { useEffect, useCallback, } from 'react';
// import shallow from 'zustand/shallow';
import { createUseStyles, } from 'react-jss';
import { useMusikStore, useAudioLoaderStore, } from '../../store';
import SelectSong from '../SelectSong';

const useStyles = createUseStyles({
  controlBackdrop: {
    pointerEvents: 'none',
  },
  controlWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px) brightness(13%) saturate(50)',
    pointerEvents: 'all',
  },
});

export const MusikControls: React.FC = () => {
  const styles = useStyles();
  const audioLoader = useAudioLoaderStore();
  const musikActions = useMusikStore(store => store.actions);
  const isPlaying = useMusikStore(state => state.isPlaying);
  const { pause, play, } = useMusikStore(store => store.actions);

  const load = useCallback(async () => {
    const buffer = await audioLoader.fetchAudioBuffer('/sine-from-above.mp3');
    musikActions.connectSource(buffer);
  }, [ audioLoader, musikActions, ]);

  return (
    <div className={`fixed flex flex-row inset-0 z-10 items-center justify-center ${styles.controlBackdrop}`}>

      {!isPlaying && (
        <div className={`flex flex-col space-y-32 p-32 ${styles.controlWrapper}`}>
          <SelectSong />
          <button onClick={load}>
            {audioLoader.isLoading ? '...' : 'Load'}
          </button>
          <button className="white" onClick={() => play()}>Play</button>
        </div>
      )}
    </div>
  );
};
