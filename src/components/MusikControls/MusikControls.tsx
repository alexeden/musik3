import React, { useEffect, } from 'react';
import { useMusik, } from '../../hooks/useMusik';

type Props = {

};

export const MusikControls: React.FC<Props> = props => {
  const musik = useMusik();

  useEffect(() => void musik.load('/hallucinate.mp3'), []); // eslint-disable-line

  return (
    <div>
      <button onClick={() => musik.load('/rabbit-hole.mp3')}>{musik.isLoading ? '...' : 'Load'}</button>
      {!musik.isPlaying && <button onClick={() => musik.play()}>Play</button>}
      {musik.isPlaying && <button onClick={() => musik.pause()}>Pause</button>}
    </div>
  );
};
