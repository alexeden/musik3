import React, { useMemo, useRef, } from 'react';
import { Group, Mesh, MeshBasicMaterial, } from 'three';
import { useFrame, } from 'react-three-fiber';
import { useLevelData, useBeat, } from '../../hooks/useMusik';
import { MathUtils, } from '../../lib';
import { useMusikStore, } from '../../store';

const radiusOut = 600;
const radiusIn = 0.7 * radiusOut;

export const GeoRing: React.FC = () => {
  const analyzer = useMusikStore(state => state.analyzer);
  const groupRef = useRef<Group>();
  const material = useMemo(() => new MeshBasicMaterial({
    color: 0xFFFFFF,
    depthWrite: false,
    depthTest: false,
    transparent: true,
    opacity: 1,
  }), []);

  useFrame(() => {
    const shapes = (groupRef.current?.children ?? []) as Mesh[];
    shapes.forEach((shape, i) => {
      // Each geo spins at a different speed
      shape.rotation.z += 0.01 * (i + 1);
    });
  });

  useLevelData(analyzer, ({ volume, }) => {
    const shapes = (groupRef.current?.children ?? []) as Mesh[];

    shapes.forEach((shape, i) => {
      // Incrementally move toward the target scale
      // Increasing the denominator here will decrease the speed
      // shape.scale.addScalar((volume - shape.scale.length()) / 3);
      shape.scale.setScalar(MathUtils.lerp(shape.scale.x, 3 * volume ** 4, 0.9));
    });
  });

  useBeat(analyzer, ({ volume, }) => {
    const shapes = (groupRef.current?.children ?? []) as Mesh[];

    // hide all the shapes by turning them
    shapes.forEach(shape => {
      shape.rotation.y = Math.PI / 2;
    });
    // random rotation of whole group
    groupRef.current!.rotation.z = Math.random() * Math.PI;

    // sometimes reveal one of them
    if (Math.random() < Math.max(0.8, volume)) {
      const r = Math.floor(Math.random() * shapes.length);
      shapes[r].rotation.y = Math.random() * Math.PI / 4 - Math.PI / 8;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        material={material}
        rotation-y={Math.PI / 2}
      >
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 3, 1, 0, Math.PI * 2, ]} />
      </mesh>
      <mesh
        material={material}
        rotation-y={Math.PI / 2}
      >
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 4, 1, 0, Math.PI * 2, ]} />
      </mesh>
      <mesh
        material={material}
        rotation-y={Math.PI / 2}
      >
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 6, 1, 0, Math.PI * 2, ]} />
      </mesh>
    </group>
  );
};
