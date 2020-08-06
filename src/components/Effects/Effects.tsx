import React, { useRef, useMemo, useEffect, } from 'react';
import { extend, useThree, useFrame, } from 'react-three-fiber';
import { EffectComposer, RenderPass, } from 'postprocessing';
// import { EffectComposer, } from 'react-postprocessing';
import * as ps from 'postprocessing';
import { wrapEffect, } from '../../lib';

(window as any).ps = ps;
// const x: ps.Normal
// extend({ EffectComposer, });

export const Effects: React.FC = () => {
  const composerRef = useRef<EffectComposer>();
  (window as any).composerRef = composerRef;
  const {
    scene, gl, size, camera,
  } = useThree();
  const composer = useMemo(() => new EffectComposer(gl), [ gl, ]);
  const renderPass = useMemo(() => new RenderPass(scene, camera), [ scene, camera, ]);

  useEffect(() => composerRef.current?.setSize(size.width, size.height), [ size, ]);
  useFrame((state, delta) => composerRef.current?.render(delta), 2);

  return (
    <primitive
      ref={composerRef}
      object={composer}
      dispose={null}
    >
      <primitive
        attachArray="passes"
        object={renderPass}
        dispose={null}
        renderToScreen
      />
      {/* <renderPass scene={scene} camera={camera} /> */}

    </primitive>
    // <EffectComposer>

  // </EffectComposer>
  );
};
