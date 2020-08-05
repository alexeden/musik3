import React, { useMemo, useRef, } from 'react';
import {
  MeshBasicMaterial, Group, Color, PlaneBufferGeometry,
} from 'three';

const BAR_COUNT = 16;
const FILL_FACTOR = 0.8;
const PLANE_WIDTH = 2000;
const SEGMENTS = 10;
const VERT_DISTANCE = 1580 / BAR_COUNT;

const Level: React.FC<{ i: number }> = ({ i, }) => {
  const geomRef = useRef();
  return (
    <mesh
      position={[ 0, VERT_DISTANCE * i - VERT_DISTANCE * BAR_COUNT / 2, 0, ]}
      scale={[ 1, (i + 1) / BAR_COUNT * FILL_FACTOR, 1, ]}
    >
      <meshBasicMaterial
        attach="material"
        args={[ { color: new Color().setHSL(i / BAR_COUNT, 1.0, 0.5), }, ]}
      />
      <planeBufferGeometry
        attach="geometry"
        ref={geomRef}
        args={[ PLANE_WIDTH, VERT_DISTANCE, SEGMENTS, SEGMENTS, ]}
      />
    </mesh>
  );
};

export const Levels: React.FC = () => {
  const indices = useMemo(() => [ ...Array(BAR_COUNT).keys(), ], []);

  return (
    <group position={[ 0, 0, 300, ]} rotation={[ 0, 0, Math.PI / 4, ]} >
      {indices.map(i => (
        <Level
          key={i}
          i={i}
        />
      ))}
    </group>

  );
};
