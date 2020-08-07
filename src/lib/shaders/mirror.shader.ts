import { ShaderMaterial, } from 'three';

export const MirrorShader = new ShaderMaterial({
  uniforms: {
    inputBuffer: { type: 't', value: null, },
    side: { type: 'i', value: 1, },
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
    uniform int side;
    varying vec2 vUv;
    void main() {
      vec2 p = vUv;
      if (side == 0) {
        if (p.x > 0.5) p.x = 1.0 - p.x;
      }
      else if (side == 1) {
        if (p.x < 0.5) p.x = 1.0 - p.x;
      }
      else if (side == 2) {
        if (p.y < 0.5) p.y = 1.0 - p.y;
      }
      else if (side == 3) {
        if (p.y > 0.5) p.y = 1.0 - p.y;
      }
      vec4 color = texture2D(inputBuffer, p);
      gl_FragColor = color;
    }
  `,
});
