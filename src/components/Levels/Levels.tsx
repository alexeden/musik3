import React, { useMemo, useRef, useEffect, } from 'react';
import { Color, Group, } from 'three';
import { useCanvas, useThree, useFrame, } from 'react-three-fiber';

const FILL_FACTOR = 0.8;
const SEGMENTS = 10;

const Level: React.FC<{ i: number; count: number }> = ({ i, count, }) => {
  const geomRef = useRef();
  const { size, } = useThree();
  const planeWidth = Math.sqrt(size.width ** 2 + size.height ** 2);

  useEffect(() => console.log('rerendering cuz size changed!', size), [ size, ]);
  const vertDistance = Math.max(size.height, size.width) / count;

  useFrame(() => {
  });

  return (
    <mesh
      position={[ 0, vertDistance * i - vertDistance * count / 2, 0, ]}
      scale={[ 1, (i + 1) / count * FILL_FACTOR, 1, ]}
    >
      <meshBasicMaterial
        attach="material"
        args={[ { color: new Color().setHSL(i / count, 1.0, 0.5), }, ]}
      />
      <planeBufferGeometry
        attach="geometry"
        ref={geomRef}
        args={[ planeWidth, vertDistance, SEGMENTS, SEGMENTS, ]}
      />
    </mesh>
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
