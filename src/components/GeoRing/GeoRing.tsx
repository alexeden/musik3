import React, { useMemo, useRef, } from 'react';
import { Group, Mesh, MeshBasicMaterial, } from 'three';
import { useLevelData, useBeat, } from '../../hooks/useMusik';

const radiusOut = 500;
const radiusIn = 0.6 * radiusOut;

export const GeoRing: React.FC = () => {
  const scl = useRef(0);
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

  useLevelData(({ levels, volume, }) => {
    const shapes = (shapesRef.current?.children ?? []) as Mesh[];

    shapes.forEach(shape => {
      shape.rotation.z += 0.01;
      const gotoScale = volume * 1.2 + 0.1;
      scl.current += (gotoScale - scl.current) / 3;
      shape.scale.setScalar(scl.current);
    });
  });

  useBeat(({ levels, volume, }) => {
    const shapes = (shapesRef.current?.children ?? []) as Mesh[];

    // random rotation
    shapesRef.current!.rotation.z = Math.random() * Math.PI;

    // hide shapes
    // shapes.forEach(shape => {
    //   shape.rotation.y = Math.PI / 2; // hiding by turning
    // });

    // show a shape sometimes
    // if (Math.random() < 0.5) {
    //   const r = Math.floor(Math.random() * shapes.length);
    //   shapes[r].rotation.y = Math.random() * Math.PI / 4 - Math.PI / 8;
    // }
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
