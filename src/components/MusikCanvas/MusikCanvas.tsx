import React from 'react';
import { Canvas, } from 'react-three-fiber';
import GeoRing from '../GeoRing';
import Levels from '../Levels';
import Effects from '../Effects';

export const MusikCanvas: React.FC = () => (
  <Canvas
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
