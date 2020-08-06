import React, { useRef, useMemo, useEffect, } from 'react';
import { extend, useThree, useFrame, } from 'react-three-fiber';
import {
  EffectComposer, RenderPass, BloomEffect, ShaderPass, EffectPass,
} from 'postprocessing';
import { Bloom, } from 'react-postprocessing';
import * as ps from 'postprocessing';
import {
  wrapEffect, CopyShader, HorizontalBlurShader, VerticalBlurShader, AdditiveBlendShader, FilmShader, BadTvShader, MirrorShader, RgbShiftShader, MathUtils,
} from '../../lib';
import { useBeat, } from '../../hooks/useMusik';

(window as any).ps = ps;
// const x: ps.Normal
extend({ BloomEffect, });

// const bloomEffect = wrapEffect(BloomEffect);

export const Effects: React.FC = () => {
  const composerRef = useRef<EffectComposer>();
  (window as any).composerRef = composerRef;
  const {
    scene, gl, size, camera,
  } = useThree();
  const composer = useMemo(() => {
    const renderComposer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const renderCopyPass = new ShaderPass(CopyShader);
    const bloomPass = new EffectPass(camera, new BloomEffect({
      luminanceSmoothing: 1,
      luminanceThreshold: 0,
    }));
    renderComposer.addPass(renderPass);
    renderComposer.addPass(bloomPass);
    // const glowComposer = new EffectComposer(gl);
    // const glowCopyPass = new ShaderPass(CopyShader);
    const hBlurPass = new ShaderPass(HorizontalBlurShader);
    const vBlurPass = new ShaderPass(VerticalBlurShader);
    renderComposer.addPass(bloomPass);
    renderComposer.addPass(hBlurPass);
    renderComposer.addPass(vBlurPass);
    // renderComposer.addPass(hBlurPass);
    // renderComposer.addPass(vBlurPass);

    // const finalComposer = new EffectComposer(gl);
    const blendPass = new ShaderPass(AdditiveBlendShader);
    AdditiveBlendShader.uniforms.tBase.value = renderComposer.outputBuffer;
    // AdditiveBlendShader.uniforms.tAdd.value = glowComposer.outputBuffer;
    AdditiveBlendShader.uniforms.amount.value = 1; // This is the glow value!
    renderComposer.addPass(blendPass);

    const filmPass = new ShaderPass(FilmShader);
    FilmShader.uniforms.grayscale.value = 0;
    FilmShader.uniforms.nIntensity.value = 0.6;
    FilmShader.uniforms.sIntensity.value = 0.7;
    FilmShader.uniforms.sCount.value = 600;

    const badTvPass = new ShaderPass(BadTvShader);
    BadTvShader.uniforms.rollSpeed.value = 1;
    BadTvShader.uniforms.distortion.value = 1;
    BadTvShader.uniforms.distortion2.value = 1;

    const mirrorPass = new ShaderPass(MirrorShader);

    const rgbShiftPass = new ShaderPass(RgbShiftShader);

    renderComposer.addPass(mirrorPass);
    renderComposer.addPass(badTvPass);
    renderComposer.addPass(filmPass);
    renderComposer.addPass(rgbShiftPass);
    renderComposer.addPass(bloomPass);

    // filmPass.renderToScreen = true;
    renderComposer.addPass(renderCopyPass);
    renderCopyPass.renderToScreen = true;

    return renderComposer;
  }, [ camera, gl, scene, ]);

  // const renderPass = useMemo(() => new RenderPass(scene, camera), [ scene, camera, ]);

  useEffect(() => composerRef.current?.setSize(size.width, size.height), [ size, ]);
  useFrame((state, delta) => composerRef.current?.render(delta), 2);

  // Update the blurs according to frame size
  useEffect(() => {
    HorizontalBlurShader.uniforms.h.value = 1 / size.width;
    VerticalBlurShader.uniforms.v.value = 1 / size.height;
  }, [ size, ]);

  useBeat(() => {
    RgbShiftShader.uniforms.amount.value = MathUtils.randomInt(5, 55) / 1000;
    // BadTvShader.uniforms.distortion.value = 4.0;
    // BadTvShader.uniforms.distortion2.value = 5.0;
    MirrorShader.uniforms.side.value = Math.floor(MathUtils.randomInt(0, 3));

    setTimeout(() => {
      RgbShiftShader.uniforms.amount.value = 5 / 1000;
      // BadTvShader.uniforms.distortion.value = 0.0001;
      // BadTvShader.uniforms.distortion2.value = 0.0001;
    }, 100);
  });

  return (
    <primitive
      ref={composerRef}
      object={composer}
      dispose={null}
    />
  /* <primitive
        attachArray="passes"
        object={renderPass}
        dispose={null}

      />
      <bloomEffect
        attachArray="passes"
        luminanceSmoothing={1}
        luminanceThreshold={0}
        renderToScreen
      /> */
  // </primitive>
  // <EffectComposer>

  // </EffectComposer>
  );
};
