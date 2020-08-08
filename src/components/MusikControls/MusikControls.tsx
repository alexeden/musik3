import React, { useEffect, } from 'react';
import shallow from 'zustand/shallow';
import { useMusik, } from '../../hooks/useMusik';
import { useStore, } from '../../store';

export const MusikControls: React.FC = () => {
  const load = useStore(store => store.actions.load);
  const isLoading = useStore(store => store.isLoading);

  const musik = useMusik();
  useEffect(() => void load('/sine-from-above.mp3'), []); // eslint-disable-line

  return (
    <div className="absolute z-10 inset-auto">
      <button onClick={() => musik.load('/hallucinate.mp3')}>{isLoading ? '...' : 'Load'}</button>
      {!musik.isPlaying && <button className="white" onClick={() => musik.play()}>Play</button>}
      {musik.isPlaying && <button className="text-white" onClick={() => musik.pause()}>Pause</button>}
    </div>
  );
};
