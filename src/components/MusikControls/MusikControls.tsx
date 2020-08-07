import React, { useEffect, } from 'react';
import { useMusik, } from '../../hooks/useMusik';

export const MusikControls: React.FC = () => {
  const musik = useMusik();

  useEffect(() => void musik.load('/sine-from-above.mp3'), []); // eslint-disable-line

  return (
    <div>
      <button onClick={() => musik.load('/hallucinate.mp3')}>{musik.isLoading ? '...' : 'Load'}</button>
      {!musik.isPlaying && <button onClick={() => musik.play()}>Play</button>}
      {musik.isPlaying && <button onClick={() => musik.pause()}>Pause</button>}
    </div>
  );
};
