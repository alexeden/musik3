import React, { useCallback, useState, } from 'react';
import { createUseStyles, } from 'react-jss';
import { useAudioLoaderStore, useMusikStore, } from '../../store';
import SelectSong, { SONGS, } from '../SelectSong';

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
    <div className={'fixed flex flex-row inset-0 z-10 items-center justify-center pointer-events-none'}>

      {!isPlaying && (
        <div className={`flex flex-row pointer-events-auto ${styles.controlWrapper}`}>
          <div className={`relative select-none ${styles.controlHeaderWrapper}`}>
            <h1 className={`${styles.controlHeaderText}`}>musik</h1>
            <h1 className={`${styles.controlHeaderIcon}`}>M</h1> {/* It looks like a 3 I swear */}
          </div>

          <div className={`flex flex-col relative ${styles.controlFormWrapper}`}>
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
        </div>
      )}
    </div>
  );
};

const controlBlockBackdrop = (backdropFilter: string) => ({
  backdropFilter: `${backdropFilter}`,
  bottom: '-2rem',
  content: '""',
  left: '-2rem',
  position: 'absolute',
  right: '-2rem',
  top: '-2rem',
});

const useStyles = createUseStyles({
  controlWrapper: {
    minHeight: '450px',
  },
  controlFormWrapper: {
    margin: '2rem',
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(20deg)'), },
  },
  controlHeaderWrapper: (props: any) => ({
    margin: '2rem',
    width: '210px',
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(-20deg)'), },
  }),
  controlHeaderText: {
    bottom: '50%',
    fontSize: '4rem',
    height: '0',
    left: '-75px',
    letterSpacing: '-1px',
    lineHeight: '0',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'rotate(-90deg)',
    width: '100%',
  },
  controlHeaderIcon: {
    bottom: '50%',
    fontSize: '12rem',
    fontWeight: '300',
    height: '0',
    left: '25px',
    lineHeight: '0',
    position: 'absolute',
    top: '50%',
    transform: 'rotate(90deg)',
  },
});
