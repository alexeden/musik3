import React from 'react';
import { Canvas, } from 'react-three-fiber';
import Effects from '../Effects';
import GeoRing from '../GeoRing';
import Levels from '../Levels';
import { useMusik, } from '../../hooks/useMusik';

export const MusikCanvas: React.FC = () => {
  const musik = useMusik();
  return (
    <Canvas
      onClick={() => (musik.isPlaying ? musik.pause() : musik.play())}
      camera={{ fov: 70, near: 100, far: 2000, }}
      gl={{ antialias: false, }}
      gl2
      onCreated={({ gl, camera, }) => {
        gl.setClearColor(0x0);
        camera.position.z = 1000;
      }}
    >
      <GeoRing />
      <Levels count={16} />
      <Effects />
    </Canvas>
  );
};
