import { ShaderMaterial, } from 'three';

export const RgbShiftShader = new ShaderMaterial({
  uniforms: {
    inputBuffer: {
      type: 't',
      value: null,
    },
    amount: {
      type: 'f',
      value: 0.005,
    },
    angle: {
      type: 'f',
      value: 0.0,
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
    uniform sampler2D inputBuffer;
    uniform float amount;
    uniform float angle;
    varying vec2 vUv;
    void main() {
      vec2 offset = amount * vec2( cos(angle), sin(angle));
      vec4 cr = texture2D(inputBuffer, vUv + offset);
      vec4 cga = texture2D(inputBuffer, vUv);
      vec4 cb = texture2D(inputBuffer, vUv - offset);
      gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
    }
  `,
});
