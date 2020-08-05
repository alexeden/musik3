import React from 'react';
import { Canvas, useFrame, } from 'react-three-fiber';
import { Color, } from 'three';
import GeoRing from '../GeoRing';

export const MusikCanvas: React.FC = () => (
  <Canvas
    camera={{ fov: 70, near: 1, far: 10000, }}
    gl={{ antialias: false, }}
    gl2
    onCreated={({ gl, camera, }) => {
      gl.setClearColor(0x0);
      camera.position.setZ(1000);
    }}
  >
    <fog color={new Color(0x0)} near={2000} far={3000} />
    <GeoRing />
  </Canvas>
);
