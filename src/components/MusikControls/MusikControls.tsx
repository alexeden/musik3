import React, { useEffect, } from 'react';
// import shallow from 'zustand/shallow';
import { useMusik, } from '../../hooks/useMusik';
import { useMusikStore, } from '../../store';

export const MusikControls: React.FC = () => {
  const load = useMusikStore(store => store.actions.load);
  const isLoading = useMusikStore(store => store.isLoading);

  const musik = useMusik();
  useEffect(() => void load('/sine-from-above.mp3'), []); // eslint-disable-line

  return (
    <div className="fixed flex flex-row inset-0 z-10 items-center justify-center">

      <div className="flex flex-col space-y-32 p-32">
        <button onClick={() => musik.load('/hallucinate.mp3')}>
          {isLoading ? '...' : 'Load'}
        </button>
        {!musik.isPlaying && <button className="white" onClick={() => musik.play()}>Play</button>}
        {musik.isPlaying && <button className="text-white" onClick={() => musik.pause()}>Pause</button>}
      </div>
    </div>
  );
};
