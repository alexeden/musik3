import React, { useCallback, useState, } from 'react';
import { createUseStyles, } from 'react-jss';
import { useAudioLoaderStore, useMusikStore, } from '../../hooks';
import { SONGS, } from './constants';
import { SelectSong, } from './SelectSong';
import { UploadAudio, } from './UploadAudio';

export const MusikControls: React.FC = () => {
  const styles = useStyles();
  const audioLoader = useAudioLoaderStore();
  const canResume = useMusikStore(state => state.canResume);
  const isPlaying = useMusikStore(state => state.isPlaying);
  const resume = useMusikStore(state => state.actions.resume);
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
      {!isPlaying && !isLoading && (
        <div className={styles.controlWrapper} >
          <div className={styles.headerWrapper}>
            <h1 className={`${styles.headerText}`}>musik</h1>
            <h1 className={`${styles.headerIcon}`}>3</h1>
          </div>
          <div className={`${styles.formWrapper}`}>
            <div className="flex flex-col items-start space-y-8">
              <div className="flex flex-col space-y-2">
                <SelectSong
                  onChange={song => setSelectedSong(song)}
                  value={selectedSong}
                />
              </div>
              <UploadAudio
                onChange={setSelectedSong}
              />
            </div>
            <div className={'flex flex-row justify-around'}>
              <button
                className={styles.playButton}
                onClick={() => loadAndPlay(selectedSong.path)}
              >
                Play
              </button>
              {canResume && (
                <button
                  className={styles.playButton}
                  onClick={resume}
                >
                  Resume
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {!isPlaying && (
        <div className={styles.footer}>
          <a
            className="text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/alexeden/musik3"
          >
            Code ↗
          </a>
        </div>
      )}
      {isLoading && (
        <div className={styles.loadingWrapper}>
          <h5 className="text-3xl text-center">Loading</h5>
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
    boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.5)',
    minHeight: '400px',
    composes: [ 'flex', 'flex-row', 'pointer-events-auto', ],
  },
  loadingWrapper: {
    backdropFilter: 'blur(10px) brightness(5%) saturate(50) hue-rotate(20deg)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.5)',
    composes: [ 'p-16', ],
  },
  footer: {
    composes: [ 'absolute', 'flex', 'flex-row', 'inset-x-0', 'items-center', 'justify-center', 'pointer-events-auto', ],
    bottom: '0.5rem',
    '& a': {
      alignItems: 'center',
      backdropFilter: 'blur(10px) brightness(5%) saturate(50) hue-rotate(20deg)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      boxShadow: '0px 0px 0.5rem 1px rgba(255, 255, 255, 0.2)',
      color: '#ffffff',
      display: 'flex',
      fontFamily: 'MuseoModerno',
      fontSize: '1.25rem',
      fontWeight: '900',
      height: '100px',
      justifyContent: 'center',
      width: '100px',
    },
    '& a:hover': {
      backdropFilter: 'saturate(50) hue-rotate(-20deg)',
      boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.2)',
    },
  },
  formWrapper: {
    margin: '2rem',
    composes: [ 'flex', 'flex-col', 'justify-around', 'align-center', 'relative', ],
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(20deg)'), },
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    boxShadow: '0px 0px 0.5rem 1px rgba(255, 255, 255, 0.2)',
    composes: [ 'text-xl', 'relative', ],
    display: 'flex',
    height: '100px',
    justifyContent: 'center',
    width: '100px',
    '&:hover': {
      backdropFilter: 'saturate(50) hue-rotate(-20deg)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.2)',
    },
  },
  headerWrapper: {
    margin: '2rem',
    width: '210px',
    composes: [ 'relative', 'select-none', 'hidden', 'md:block', ],
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(-20deg)'), },
  },
  headerText: {
    bottom: '50%',
    fontSize: '4rem',
    fontWeight: '900',
    height: '0',
    left: '-60px',
    letterSpacing: '-1px',
    lineHeight: '0',
    position: 'absolute',
    textAlign: 'center',
    textShadow: '1rem 1px rgba(255, 255, 255, 0.4)',
    top: '50%',
    transform: 'rotate(-90deg)',
    width: '100%',
  },
  headerIcon: {
    bottom: '50%',
    fontSize: '16rem',
    fontWeight: '300',
    height: '0',
    left: '60px',
    lineHeight: '0',
    position: 'absolute',
    textShadow: '1px 1rem rgba(255, 255, 255, 0.4)',
    top: '50%',
    transform: 'rotate(0deg)',
  },
});
