import React, { useCallback, useState, } from 'react';
import { createUseStyles, } from 'react-jss';
import { useAudioLoaderStore, useMusikStore, } from '../../hooks';
import { SONGS, } from './constants';
import { SelectSong, } from './SelectSong';
import { controlBlockBackdrop, squareButton, roundButton, } from './styles';
import Branding from './Branding';

export const MusikControls: React.FC = () => {
  const styles = useStyles();
  const audioLoader = useAudioLoaderStore();
  const canResume = useMusikStore(state => state.canResume);
  const isPlaying = useMusikStore(state => state.isPlaying);
  const { playBuffer, playStream, resume, } = useMusikStore(state => state.actions);
  const [ isLoading, setIsLoading, ] = useState(false);
  const [ selectedSong, setSelectedSong, ] = useState(SONGS[0]);

  const loadBufferAndPlay = useCallback(async (url: string) => {
    setIsLoading(true);
    const buffer = await audioLoader.fetchAudioBuffer(url);
    await playBuffer(buffer);
    setIsLoading(false);
  }, [ audioLoader, playBuffer, ]);

  const createAndPlayStream = useCallback(async () => {
    setIsLoading(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false, });
    await playStream(stream);
    setIsLoading(false);
  }, [ playStream, ]);

  return (
    <div className={'fixed flex flex-row inset-0 z-10 items-center justify-center pointer-events-none'}>
      {!isPlaying && !isLoading && (
        <div className={styles.controlWrapper} >
          <Branding />
          <div className={`${styles.formWrapper}`}>
            <div className="flex flex-col items-start space-y-8">
              <SelectSong onChange={song => setSelectedSong(song)} value={selectedSong} />
            </div>
            <div className={'flex flex-row justify-around'}>
              <button
                className={styles.playButton}
                onClick={() => loadBufferAndPlay(selectedSong.path)}
              >
                Play
              </button>
              {canResume && (
                <button className={styles.playButton} onClick={resume}>
                  Resume
                </button>
              )}
            </div>
            <div className={'flex flex-row justify-around'}>
              <button className={styles.useMicButton} onClick={createAndPlayStream}>
                Use Microphone
              </button>
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
    '& a': { ...roundButton(), },
  },
  formWrapper: {
    margin: '2rem',
    composes: [ 'flex', 'flex-col', 'justify-around', 'align-center', 'relative', 'space-y-8', ],
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(20deg)'), },
  },
  playButton: {
    ...roundButton(),
  },
  useMicButton: {
    ...squareButton(),
  },
});
