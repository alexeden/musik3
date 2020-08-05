import React, { useRef, } from 'react';
import { Mesh, } from 'three';
import styles from './GeoRing.scss';

export const GeoRing: React.FC = () => {
  const mesh = useRef<Mesh>();
  return (
    <mesh ref={mesh}>
      <meshBasicMaterial
        color={0xFFFFFF}
        depthWrite={false}
        depthTest={false}
        transparent
        opacity={1}
      />

    </mesh>
  );
};
