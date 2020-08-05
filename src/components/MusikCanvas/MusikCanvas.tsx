import React from 'react';
import { Canvas, } from 'react-three-fiber';
import GeoRing from '../GeoRing';
import Levels from '../Levels';

export const MusikCanvas: React.FC = () => (
  <Canvas
    camera={{ fov: 70, near: 100, far: 1000, }}
    gl={{ antialias: false, }}
    gl2
    onCreated={({ gl, camera, }) => {
      gl.setClearColor(0x0);
      camera.position.z = 1000;
    }}
  >
    <GeoRing />
    <Levels count={16} />
  </Canvas>
);
