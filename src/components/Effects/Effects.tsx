import React, { useRef, useMemo, useEffect, } from 'react';
import { extend, useThree, useFrame, } from 'react-three-fiber';
import {
  EffectComposer, RenderPass, BloomEffect, ShaderPass, EffectPass,
} from 'postprocessing';
import { Bloom, } from 'react-postprocessing';
import * as ps from 'postprocessing';
import {
  wrapEffect, CopyShader, HorizontalBlurShader, VerticalBlurShader, AdditiveBlendShader, FilmShader, BadTvShader, MirrorShader, RgbShiftShader,
} from '../../lib';

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
    const bloomEffect = new BloomEffect({ });
    bloomEffect.luminanceMaterial.smoothing = 1;
    bloomEffect.luminanceMaterial.threshold = 0;
    const bloomPass = new EffectPass(camera, bloomEffect);
    renderComposer.addPass(renderPass);
    renderComposer.addPass(bloomPass);
    renderComposer.addPass(renderCopyPass);
    renderCopyPass.renderToScreen = true;
    // const glowComposer = new EffectComposer(gl);
    // const glowCopyPass = new ShaderPass(CopyShader);
    // const blurriness = 3;
    // const hBlurPass = new ShaderPass(HorizontalBlurShader);
    // const vBlurPass = new ShaderPass(VerticalBlurShader);
    // glowComposer.addPass(glowCopyPass);
    // glowComposer.addPass(renderPass);
    // glowComposer.addPass(bloomPass);
    // glowComposer.addPass(hBlurPass);
    // glowComposer.addPass(vBlurPass);
    // glowComposer.addPass(hBlurPass);
    // glowComposer.addPass(vBlurPass);

    // const finalComposer = new EffectComposer(gl);
    // const blendPass = new ShaderPass(AdditiveBlendShader);
    // AdditiveBlendShader.uniforms.tBase.value = renderComposer.outputBuffer;
    // AdditiveBlendShader.uniforms.tAdd.value = glowComposer.outputBuffer;
    // AdditiveBlendShader.uniforms.amount.value = 1; // This is the glow value!
    // finalComposer.addPass(blendPass);

    // const filmPass = new ShaderPass(FilmShader);
    // FilmShader.uniforms.grayscale.value = 0;
    // FilmShader.uniforms.nIntensity.value = 0.6;
    // FilmShader.uniforms.sIntensity.value = 0.7;
    // FilmShader.uniforms.sCount.value = 600;

    // const badTvPass = new ShaderPass(BadTvShader);
    // BadTvShader.uniforms.rollSpeed.value = 0;
    // BadTvShader.uniforms.distortion.value = 0;
    // BadTvShader.uniforms.distortion2.value = 0;

    // const mirrorPass = new ShaderPass(MirrorShader);

    // const rgbShiftPass = new ShaderPass(RgbShiftShader);

    // finalComposer.addPass(mirrorPass);
    // finalComposer.addPass(badTvPass);
    // finalComposer.addPass(rgbShiftPass);
    // finalComposer.addPass(filmPass);

    // filmPass.renderToScreen = true;
    return renderComposer;
  }, [ camera, gl, scene, ]);

  // const renderPass = useMemo(() => new RenderPass(scene, camera), [ scene, camera, ]);

  useEffect(() => composerRef.current?.setSize(size.width, size.height), [ size, ]);
  useFrame((state, delta) => composerRef.current?.render(delta), 2);

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
