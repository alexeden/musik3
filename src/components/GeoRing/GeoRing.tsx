import React, { useMemo, useRef, } from 'react';
import { Group, Mesh, MeshBasicMaterial, } from 'three';
import { useLevelData, useBeat, } from '../../hooks/useMusik';

const radiusOut = 800;
const radiusIn = 0.6 * radiusOut;

export const GeoRing: React.FC = () => {
  const groupRef = useRef<Group>();
  const material = useMemo(() => (
    new MeshBasicMaterial({
      color: 0xFFFFFF,
      depthWrite: false,
      depthTest: false,
      transparent: true,
      opacity: 1,
    })
  ), []);

  useLevelData(({ volume, }) => {
    const shapes = (groupRef.current?.children ?? []) as Mesh[];

    shapes.forEach((shape, i) => {
      // Each geo spins at a different speed
      shape.rotation.z += 0.01 * (i + 1);
      // Incrementally move toward the target scale
      // Increasing the denominator here will decrease the speed
      shape.scale.addScalar((volume - shape.scale.x) / 5);
    });
  });

  useBeat(() => {
    const shapes = (groupRef.current?.children ?? []) as Mesh[];

    // random rotation of whole group
    groupRef.current!.rotation.z = Math.random() * Math.PI;

    // hide all the shapes by turning them
    shapes.forEach(shape => {
      shape.rotation.y = Math.PI / 2;
    });

    // sometimes reveal one of them
    if (Math.random() < 0.7) {
      const r = Math.floor(Math.random() * shapes.length);
      shapes[r].rotation.y = Math.random() * Math.PI / 4 - Math.PI / 8;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        material={material}
        rotation={[ 0, Math.PI / 2, 0, ]}
      >
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 3, 1, 0, Math.PI * 2, ]} />
      </mesh>
      <mesh
        material={material}
        rotation={[ 0, Math.PI / 2, 0, ]}
      >
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 4, 1, 0, Math.PI * 2, ]} />
      </mesh>
      <mesh
        material={material}
        rotation={[ 0, Math.PI / 2, 0, ]}
      >
        <ringBufferGeometry attach="geometry" args={[ radiusIn, radiusOut, 6, 1, 0, Math.PI * 2, ]} />
      </mesh>
    </group>
  );
};
