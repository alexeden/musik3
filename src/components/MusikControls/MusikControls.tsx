import React, { useEffect, } from 'react';
// import shallow from 'zustand/shallow';
import { useMusik, } from '../../hooks/useMusik';
import { useMusikStore, useAudioLoaderStore, } from '../../store';

export const MusikControls: React.FC = () => {
  const audioLoader = useAudioLoaderStore();
  const musikActions = useMusikStore(store => store.actions);

  const musik = useMusik();
  useEffect(() => {
    (async () => {
      const buffer = await audioLoader.fetchAudioBuffer('/sine-from-above.mp3');
      musikActions.connectSource(buffer);
    })();
  }, []); // eslint-disable-line

  return (
    <div className="fixed flex flex-row inset-0 z-10 items-center justify-center">

      <div className="flex flex-col space-y-32 p-32">
        <button onClick={() => null}>
          {audioLoader.isLoading ? '...' : 'Load'}
        </button>
        {/* {!musik.isPlaying && <button className="white" onClick={() => musik.play()}>Play</button>}
        {musik.isPlaying && <button className="text-white" onClick={() => musik.pause()}>Pause</button>} */}
      </div>
    </div>
  );
};
