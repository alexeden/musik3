import React, { useCallback, useState, } from 'react';
import { createUseStyles, } from 'react-jss';
import { useAudioLoaderStore, useMusikStore, } from '../../store';
import SelectSong, { SONGS, } from '../SelectSong';

export const MusikControls: React.FC = () => {
  const styles = useStyles();
  const audioLoader = useAudioLoaderStore();
  const isPlaying = useMusikStore(state => state.isPlaying);
  const [ isLoading, setIsLoading, ] = useState(false);
  const play = useMusikStore(store => store.actions.play);
  const [ selectedSong, setSelectedSong, ] = useState(SONGS[0]);

  const loadAndPlay = useCallback(async (url: string) => {
    setIsLoading(true);
    const buffer = await audioLoader.fetchAudioBuffer(url);
    await play(buffer);
    setIsLoading(false);
  }, [ audioLoader, play, ]);

  return (
    <div className={'fixed flex flex-row inset-0 z-10 items-center justify-center pointer-events-none'}>
      {!isPlaying && (
        <div className={styles.controlWrapper}>
          <div className={styles.controlHeaderWrapper}>
            <h1 className={`${styles.controlHeaderText}`}>musik</h1>
            <h1 className={`${styles.controlHeaderIcon}`}>M</h1> {/* It looks like a 3 I swear */}
          </div>

          <div className={`${styles.controlFormWrapper}`}>
            {!isLoading && (
              <>
                <SelectSong
                  onChange={song => setSelectedSong(song)}
                  song={selectedSong}
                />
                <div className={'flex flex-row justify-center'}>
                  <button className="text-2xl" onClick={() => loadAndPlay(selectedSong.path)}>Play</button>
                </div>
              </>
            )}
            {isLoading && <h5 className="text-3xl text-center">Loading</h5>}
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
    boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.5)',
    composes: [ 'flex', 'flex-row', 'pointer-events-auto', ],
  },
  controlFormWrapper: {
    margin: '2rem',
    composes: [ 'flex', 'flex-col', 'justify-around', 'align-center', 'relative', ],
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(20deg)'), },
  },
  controlHeaderWrapper: (props: any) => ({
    margin: '2rem',
    width: '210px',
    composes: [ 'relative', 'select-none', 'hidden', 'md:block', ],
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(-20deg)'), },
    '& *': {
      textShadow: '1rem 1px rgba(255, 255, 255, 0.4)',
    },
  }),
  controlHeaderText: {
    bottom: '50%',
    fontSize: '4rem',
    fontWeight: '900',
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
