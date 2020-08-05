import React, { useMemo, useRef, } from 'react';
import { Group, MeshBasicMaterial, Mesh, } from 'three';
import { useFrame, } from 'react-three-fiber';

const radiusOut = 500;
const radiusIn = 0.6 * radiusOut;

export const GeoRing: React.FC = () => {
  const shapesRef = useRef<Group>();
  const material = useMemo(() => (
    new MeshBasicMaterial({
      color: 0xFFFFFF,
      depthWrite: false,
      depthTest: false,
      transparent: true,
      opacity: 1,
    })
  ), []);

  useFrame(() => {
    const shapes = (shapesRef.current?.children ?? []) as Mesh[];

    shapes.forEach(shape => {
      shape.rotation.z += 0.01;
    });
  });

  return (
    <group ref={shapesRef}>
      <mesh material={material}>
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 3, 1, 0, Math.PI * 2, ]} />
      </mesh>
      <mesh material={material}>
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 4, 1, 0, Math.PI * 2, ]} />
      </mesh>
      <mesh material={material}>
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 6, 1, 0, Math.PI * 2, ]} />
      </mesh>
    </group>
  );
};
