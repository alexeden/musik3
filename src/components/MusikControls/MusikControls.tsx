import React, { useEffect, useCallback, useState, } from 'react';
// import shallow from 'zustand/shallow';
import { createUseStyles, } from 'react-jss';
import { useMusikStore, useAudioLoaderStore, } from '../../store';
import SelectSong, { SONGS, } from '../SelectSong';

const useStyles = createUseStyles({
  controlBackdrop: {
    pointerEvents: 'none',
  },
  controlWrapper: {
    backdropFilter: 'blur(10px) brightness(5%) saturate(50) hue-rotate(60deg)',
    pointerEvents: 'all',
  },
  controlHeader: {
    // backdropFilter: 'blur(10px) saturate(50) hue-rotate(45deg)',
    // pointerEvents: 'all',
  },
});

export const MusikControls: React.FC = () => {
  const styles = useStyles();
  const audioLoader = useAudioLoaderStore();
  const musikActions = useMusikStore(store => store.actions);
  const isPlaying = useMusikStore(state => state.isPlaying);
  const { pause, play, } = useMusikStore(store => store.actions);
  const [ selectedSong, setSelectedSong, ] = useState(SONGS[0]);

  const load = useCallback(async () => {
    const buffer = await audioLoader.fetchAudioBuffer('/sine-from-above.mp3');
    musikActions.connectSource(buffer);
  }, [ audioLoader, musikActions, ]);

  return (
    <div className={`fixed flex flex-row inset-0 z-10 items-center justify-center ${styles.controlBackdrop}`}>

      {!isPlaying && (
        <div className={`flex flex-col space-y-32 p-32 ${styles.controlWrapper}`}>
          <h1 className={`text-6xl text-center ${styles.controlHeader}`}>MUSIK3</h1>
          <SelectSong
            onChange={song => setSelectedSong(song)}
            song={selectedSong}
          />
          <button onClick={load}>
            {audioLoader.isLoading ? '...' : 'Load'}
          </button>
          <button className="white" onClick={() => play()}>Play</button>
        </div>
      )}
    </div>
  );
};
