import React, { useEffect, } from 'react';
import { useMusik, } from '../../hooks/useMusik';

type Props = {

};

export const MusikControls: React.FC<Props> = props => {
  const musik = useMusik();

  useEffect(() => {
    (async () => {
      const buffer = await musik.load('/src/assets/hallucinate.mp3');
      console.log(buffer);

    })();
  }, [ musik, ]);

  return (
    <div>
      <h1>MusikControls</h1>
    </div>
  );
};
