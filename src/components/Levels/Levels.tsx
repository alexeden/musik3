import React, { useMemo, useRef, } from 'react';
import { useThree, } from 'react-three-fiber';
import {
  Color, Group, Mesh, Geometry,
} from 'three';
import { useLevelData, useBeat, } from '../../hooks/useMusik';
import { MathUtils, SimplexNoise, } from '../../lib';

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
      meshRef.current.position.y = volume * vertDistance;
      // scale bars on levels
      meshRef.current.scale.y = levels[i] * 0.8;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[ 0, vertDistance * i - vertDistance * count / 2, 0, ]}
      scale={[ 1, (i + 1) / count * 2, 1, ]}
    >
      <mesh ref={meshRef} >
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

  const { size, } = useThree();
  const planeWidth = Math.sqrt(size.width ** 2 + size.height ** 2);

  useBeat(({ levels, volume, }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = Math.PI / 4 * MathUtils.randomInt(0, 4);
    // slight Y rotate
    groupRef.current.rotation.y = MathUtils.randomRange(-Math.PI / 4, Math.PI / 4);

    // randomize z displacements
    const MAX_DISPLACEMENT = Math.random() * 600;
    const rnd = Math.random();
    const levelGeoms = groupRef.current.children
      .filter(group => group instanceof Group)
      .flatMap(group => group.children)
      .filter((mesh): mesh is Mesh => mesh instanceof Mesh)
      .flatMap(mesh => mesh.geometry)
      .filter((geom): geom is Geometry => geom instanceof Geometry);

    levelGeoms.forEach(geometry => {
      geometry.vertices.forEach(vertex => {
        vertex.z = noise.noise(vertex.x / planeWidth * 100, rnd) * MAX_DISPLACEMENT;
      });
      geometry.verticesNeedUpdate = true;
    });
  });

  return (
    <group ref={groupRef} position-z={300}>
      {indices.map(i => (
        <Level key={i} count={count} i={i} />
      ))}
    </group>
  );
};
