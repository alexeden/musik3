import React, { useEffect, } from 'react';
import { useMusik, } from '../../hooks/useMusik';

export const MusikControls: React.FC = () => {
  const musik = useMusik();
  useEffect(() => void musik.load('/sine-from-above.mp3'), []); // eslint-disable-line

  return (
    <div className="absolute z-10 inset-auto">
      <button onClick={() => musik.load('/hallucinate.mp3')}>{musik.isLoading ? '...' : 'Load'}</button>
      {!musik.isPlaying && <button className="white" onClick={() => musik.play()}>Play</button>}
      {musik.isPlaying && <button className="text-white" onClick={() => musik.pause()}>Pause</button>}
    </div>
  );
};
