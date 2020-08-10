import {
  BloomEffect, EffectComposer, EffectPass, RenderPass, ShaderPass,
} from 'postprocessing';
import React, { useEffect, useMemo, useRef, } from 'react';
import { useFrame, useThree, } from 'react-three-fiber';
import { useBeat, useLevelData, useMusikStore, } from '../../hooks';
import {
  AdditiveBlendShader, BadTvShader, CopyShader, FilmShader, HorizontalBlurShader,
  MirrorShader, RgbShiftShader, VerticalBlurShader,
} from '../../lib';

export const Effects: React.FC = () => {
  const analyzer = useMusikStore(state => state.analyzer);
  const mainComposerRef = useRef<EffectComposer>();
  const glowComposerRef = useRef<EffectComposer>();
  const renderComposerRef = useRef<EffectComposer>();

  const {
    scene, gl, size, camera,
  } = useThree();

  const composerMemo = useMemo(() => {
    const renderComposer = new EffectComposer(gl);
    renderComposerRef.current = renderComposer;
    const renderPass = new RenderPass(scene, camera);
    const bloomEffect = new BloomEffect({
      luminanceSmoothing: 1,
      luminanceThreshold: 0,
      height: size.height / 3,
      width: size.width / 3,
    });

    const bloomPass = new EffectPass(camera, bloomEffect);
    renderComposer.addPass(renderPass);
    renderComposer.addPass(bloomPass);
    renderComposer.addPass(new ShaderPass(CopyShader));

    const glowComposer = new EffectComposer(gl);
    glowComposerRef.current = glowComposer;
    const hBlurPass = new ShaderPass(HorizontalBlurShader);
    const vBlurPass = new ShaderPass(VerticalBlurShader);
    glowComposer.addPass(new ShaderPass(CopyShader));
    glowComposer.addPass(renderPass);
    glowComposer.addPass(bloomPass);
    glowComposer.addPass(hBlurPass);
    glowComposer.addPass(vBlurPass);
    glowComposer.addPass(hBlurPass);
    glowComposer.addPass(vBlurPass);

    const composer = new EffectComposer(gl);
    const blendPass = new ShaderPass(AdditiveBlendShader);
    AdditiveBlendShader.uniforms.tBase.value = renderComposer.outputBuffer;
    AdditiveBlendShader.uniforms.tAdd.value = glowComposer.outputBuffer;
    AdditiveBlendShader.uniforms.amount.value = 1; // This is the glow value!
    composer.addPass(blendPass);

    const filmPass = new ShaderPass(FilmShader);
    FilmShader.uniforms.grayscale.value = 0;
    FilmShader.uniforms.nIntensity.value = 0.6;
    FilmShader.uniforms.sIntensity.value = 0.7;
    FilmShader.uniforms.sCount.value = 0.7 * size.height;

    const badTvPass = new ShaderPass(BadTvShader);
    const mirrorPass = new ShaderPass(MirrorShader);
    const rgbShiftPass = new ShaderPass(RgbShiftShader);

    composer.addPass(mirrorPass);
    composer.addPass(badTvPass);
    composer.addPass(rgbShiftPass);
    composer.addPass(filmPass);

    filmPass.renderToScreen = true;

    return composer;
  }, [ camera, gl, scene, size, ]);

  useLevelData(analyzer, ({ volume, }) => {
    RgbShiftShader.uniforms.amount.value = volume ** 4 / 25;
    RgbShiftShader.uniforms.angle.value += 0.1;
    BadTvShader.uniforms.distortion.value = 10 * volume ** 4;
    BadTvShader.uniforms.distortion2.value = 4 * Math.random() * volume;
  });

  useBeat(analyzer, ({ volume, }) => {
    MirrorShader.uniforms.side.value = Math.floor(4 * Math.random());
  });

  /** Resize update */
  useEffect(() => {
    HorizontalBlurShader.uniforms.h.value = 3 / size.width;
    VerticalBlurShader.uniforms.v.value = 3 / size.height;
    mainComposerRef.current?.setSize(size.width, size.height);
    glowComposerRef.current?.setSize(size.width / 4, size.height / 4);
    renderComposerRef.current?.setSize(size.width, size.height);
  }, [ size, ]);

  /** Render! */
  useFrame((_, delta) => {
    FilmShader.uniforms.time.value += delta;
    BadTvShader.uniforms.time.value += delta;
    renderComposerRef.current?.render(delta);
    glowComposerRef.current?.render(delta);
    mainComposerRef.current?.render(delta);
  }, 2);

  return (
    <primitive
      ref={mainComposerRef}
      object={composerMemo}
      dispose={null}
    />
  );
};
