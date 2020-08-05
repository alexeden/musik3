import React, { useEffect, } from 'react';
import { useMusik, } from '../../hooks/useMusik';

type Props = {

};

export const MusikControls: React.FC<Props> = props => {
  const { load, isLoading, } = useMusik();

  useEffect(() => void load('/hallucinate.mp3'), []); // eslint-disable-line

  return (
    <div>
      <h1>MusikControls</h1>
      <button onClick={() => load('/hallucinate.mp3')}>{isLoading ? '...' : 'Load'}</button>
    </div>
  );
};
