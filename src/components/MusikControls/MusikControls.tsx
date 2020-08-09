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
    minHeight: '450px',
  },
  controlHeaderWrapper: {
    position: 'relative',
    height: '350px',
    width: '210px',
    userSelect: 'none',
  },
  controlHeaderText: {
    position: 'absolute',
    height: '0',
    lineHeight: '0',
    top: '50%',
    bottom: '50%',
    width: '100%',
    textAlign: 'center',
    transform: 'rotate(-90deg)',
    left: '-75px',
    fontSize: '4rem',
    letterSpacing: '-1px'
    // backdropFilter: 'blur(10px) saturate(50) hue-rotate(45deg)',
    // pointerEvents: 'all',
  },
  controlHeaderIcon: {
    position: 'absolute',
    height: '0',
    lineHeight: '0',
    top: '50%',
    left: '25px',
    fontWeight: '300',
    bottom: '50%',
    transform: 'rotate(90deg)',
    fontSize: '12rem',
    // transform: 'rotate(-90deg)',
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
        <div className={`flex flex-row space-x-32 p-16 ${styles.controlWrapper}`}>
          <div className={`${styles.controlHeaderWrapper}`}>
            <h1 className={`text-6xl ${styles.controlHeaderText}`}>
              musik
            </h1>
            <h1 className={`${styles.controlHeaderIcon}`}>
              M
            </h1>
          </div>
          <SelectSong
            onChange={song => setSelectedSong(song)}
            song={selectedSong}
          />
          <div className={'flex flex-row justify-between'}>
            <button className="text-2xl" onClick={load}>
              {audioLoader.isLoading ? '...' : 'Load'}
            </button>
            <button className="text-2xl" onClick={() => play()}>Play</button>

          </div>
        </div>
      )}
    </div>
  );
};
