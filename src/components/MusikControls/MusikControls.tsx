import React, { useEffect, } from 'react';
import { useMusik, } from '../../hooks/useMusik';

type Props = {

};

export const MusikControls: React.FC<Props> = props => {
  const { load, isLoading, ...musik } = useMusik();

  useEffect(() => void load('/hallucinate.mp3'), []); // eslint-disable-line

  return (
    <div>
      <h1>MusikControls</h1>
      <button onClick={() => load('/rabbit-hole.mp3')}>{isLoading ? '...' : 'Load'}</button>
      <button onClick={() => musik.play()}>Play</button>
      <button onClick={() => musik.pause()}>Pause</button>
    </div>
  );
};
