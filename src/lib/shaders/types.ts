export interface Uniform {
  type?: string;
  value: any;
}

export interface Shader {
  readonly buildKernel?: (sigma: number) => number[];
  readonly defines?: {
    [def: string]: string;
  };
  readonly uniforms: {
    [uniform: string]: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
