import React from 'react';
import { Canvas, } from 'react-three-fiber';
import { useMusikStore, } from '../../hooks';
import Effects from '../Effects';
import GeoRing from '../GeoRing';
import Levels from '../Levels';
import { LEVELS_COUNT, } from '../../hooks/useLevelData';

export const MusikCanvas: React.FC = () => {
  const canResume = useMusikStore(state => state.canResume);
  const isPlaying = useMusikStore(state => state.isPlaying);
  const resume = useMusikStore(state => state.actions.resume);
  const { pause, } = useMusikStore(store => store.actions);

  return (
    <Canvas
      onClick={() => isPlaying && pause() || canResume && resume()}
      camera={{ fov: 70, near: 100, far: 2000, }}
      gl={{ antialias: false, }}
      gl2
      onCreated={({ gl, camera, }) => {
        gl.setClearColor(0x0);
        camera.position.z = 1000;
      }}
    >
      <GeoRing />
      <Levels count={LEVELS_COUNT} />
      <Effects />
    </Canvas>
  );
};
