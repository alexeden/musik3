import { ShaderMaterial } from 'three';

export const CopyShader = new ShaderMaterial({

  uniforms: {
    inputBuffer: {
      type: 't',
      value: null,
    },
    opacity:  {
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
    uniform float opacity;
    uniform sampler2D inputBuffer;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D( inputBuffer, vUv );
      gl_FragColor = opacity * texel;
    }
  `,
});
