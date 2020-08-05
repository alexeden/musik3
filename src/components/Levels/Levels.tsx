import React, { useMemo, useRef, } from 'react';
import { useThree, } from 'react-three-fiber';
import { Color, Group, Mesh, Geometry, } from 'three';
import { useLevelData, useBeat, } from '../../hooks/useMusik';
import { MathUtils, SimplexNoise } from '../../lib';

const FILL_FACTOR = 0.8;
const SEGMENTS = 10;
const noise = new SimplexNoise(Math);

const Level: React.FC<{ i: number; count: number }> = ({ i, count, }) => {
  const groupRef = useRef<Group | undefined>();
  const meshRef = useRef<Mesh | undefined>();
  const { size, } = useThree();
  const planeWidth = Math.sqrt(size.width ** 2 + size.height ** 2);
  const vertDistance = Math.max(size.height, size.width) / count;

  useLevelData(({ levels, volume, }) => {
    if (meshRef.current) {
      // slowly move up
      meshRef.current.position.y = volume * vertDistance;
      // scale bars on levels
      meshRef.current.scale.y = levels[i] * levels[i] + 0.01;
    }
  });

  useBeat(({ levels, volume, }) => {
    if (meshRef.current) {
      groupRef.current!.rotation.z = Math.PI / 4 * MathUtils.randomInt(0, 4);
      groupRef.current!.rotation.y = MathUtils.randomRange(-Math.PI / 4, Math.PI / 4); // slight Y rotate
      // rejigger z disps
      const MAX_DISP = Math.random() * 600;
      const rnd = Math.random();
      const geometry = (window as any).geom = meshRef.current.geometry as Geometry;
      geometry.vertices.forEach(vertex => {
        vertex.z = noise.noise(vertex.x / planeWidth * 100, rnd) * MAX_DISP;
      });
      geometry.verticesNeedUpdate = true;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[ 0, vertDistance * i - vertDistance * count / 2, 0, ]}
      scale={[ 1, (i + 1) / count * FILL_FACTOR, 1, ]}
    >
      <mesh
        ref={meshRef}
      >
        <meshBasicMaterial
          attach="material"
          args={[ { color: new Color().setHSL(i / count, 1.0, 0.5), }, ]}
        />
        <planeGeometry
          attach="geometry"
          args={[ planeWidth, vertDistance, SEGMENTS, SEGMENTS, ]}
        />
      </mesh>
    </group>
  );
};

export const Levels: React.FC<{ count: number }> = ({ count, }) => {
  const groupRef = useRef<Group>();
  const indices = useMemo(() => [ ...Array(count).keys(), ], [ count, ]);

  return (
    <group
      ref={groupRef}
      position={[ 0, 0, 300, ]}
      rotation={[ 0, 0, Math.PI / 4, ]}
    >
      {indices.map(i => (
        <Level key={i} count={count} i={i} />
      ))}
    </group>
  );
};
