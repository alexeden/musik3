import {
  BloomEffect, EffectComposer, EffectPass, RenderPass, ShaderPass,
} from 'postprocessing';
import React, { useEffect, useMemo, useRef, } from 'react';
import { useFrame, useThree, } from 'react-three-fiber';
import { useBeat, useLevelData, } from '../../hooks/useMusik';
import {
  AdditiveBlendShader, BadTvShader, CopyShader, FilmShader, HorizontalBlurShader,
  MirrorShader, RgbShiftShader, VerticalBlurShader,
} from '../../lib';

export const Effects: React.FC = () => {
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
    FilmShader.uniforms.sCount.value = 600;

    const badTvPass = new ShaderPass(BadTvShader);
    BadTvShader.uniforms.rollSpeed.value = 0;
    BadTvShader.uniforms.distortion.value = 0;
    BadTvShader.uniforms.distortion2.value = 0;

    const mirrorPass = new ShaderPass(MirrorShader);

    const rgbShiftPass = new ShaderPass(RgbShiftShader);

    composer.addPass(mirrorPass);
    composer.addPass(badTvPass);
    composer.addPass(rgbShiftPass);
    composer.addPass(filmPass);

    filmPass.renderToScreen = true;

    return composer;
  }, [ camera, gl, scene, size, ]);

  useLevelData(({ volume, }) => {
    RgbShiftShader.uniforms.amount.value = volume ** 4 / 25;
    RgbShiftShader.uniforms.angle.value += 0.1;
  });

  useBeat(({ volume, }) => {
    BadTvShader.uniforms.distortion.value = 4.0;
    BadTvShader.uniforms.distortion2.value = 5.0;
    MirrorShader.uniforms.side.value = Math.floor(4 * Math.random());

    setTimeout(() => {
      BadTvShader.uniforms.distortion.value = 0.0001;
      BadTvShader.uniforms.distortion2.value = 0.0001;
    }, 100);
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
