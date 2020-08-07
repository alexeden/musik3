import { ShaderMaterial, } from 'three';

export const AdditiveBlendShader = new ShaderMaterial({
  uniforms: {
    tBase: {
      type: 't',
      value: null,
    },
    tAdd: {
      type: 't',
      value: null,
    },
    amount: {
      type: 'f',
      value: 1.0,
    },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform sampler2D tBase;
    uniform sampler2D tAdd;
    uniform float amount;
    varying vec2 vUv;
    void main() {
      vec4 texel1 = texture2D( tBase, vUv );
      vec4 texel2 = texture2D( tAdd, vUv );
      gl_FragColor = texel1 + texel2 * amount;
    }
  `,
});
