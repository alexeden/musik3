import React, { useEffect, useCallback, } from 'react';
// import shallow from 'zustand/shallow';
import { useMusikStore, useAudioLoaderStore, } from '../../store';

export const MusikControls: React.FC = () => {
  const audioLoader = useAudioLoaderStore();
  const musikActions = useMusikStore(store => store.actions);
  const isPlaying = useMusikStore(state => state.isPlaying);
  const { pause, play, } = useMusikStore(store => store.actions);

  const load = useCallback(async () => {
    const buffer = await audioLoader.fetchAudioBuffer('/sine-from-above.mp3');
    musikActions.connectSource(buffer);
  }, [ audioLoader, musikActions, ]);
  // useEffect(() => {
  //   (async () => {
  //   })();
  // }, []); // eslint-disable-line

  return (
    <div className="fixed flex flex-row inset-0 z-10 items-center justify-center">

      <div className="flex flex-col space-y-32 p-32">
        <button onClick={load}>
          {audioLoader.isLoading ? '...' : 'Load'}
        </button>
        {!isPlaying && <button className="white" onClick={() => play()}>Play</button>}
        {isPlaying && <button className="text-white" onClick={() => pause()}>Pause</button>}
      </div>
    </div>
  );
};
