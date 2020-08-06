/* eslint-disable react/display-name */
import React, {
  forwardRef, useMemo, useLayoutEffect, ForwardRefExoticComponent,
} from 'react';
import { Effect, BlendFunction, BlendMode, } from 'postprocessing';

type EffectProps = {
  blendFunction?: number;
  opacity?: number;
};
export const wrapEffect = <T extends new (...args: any[]) => Effect>(
  EffectCtor: T,
  defaultBlendMode: number = BlendFunction.NORMAL
): ForwardRefExoticComponent<ConstructorParameters<typeof EffectCtor>[0]> =>
  forwardRef((
    {
      blendFunction,
      opacity,
      ...props
    }: React.PropsWithChildren<ConstructorParameters<T>[0]> & EffectProps,
    ref
  ) => {
    const effect: Effect = useMemo(() => new EffectCtor(props), [ props, ]);
    useLayoutEffect(() => {
      effect.blendMode = new BlendMode(blendFunction || defaultBlendMode);
      if (opacity !== undefined) effect.blendMode.opacity.value = opacity;
    }, [ blendFunction, effect.blendMode, opacity, ]);
    return <primitive ref={ref} object={effect} dispose={null} />;
  });

// export const useVector2 = (props: any, key: string): Vector2 => {
//   const vec: ReactThreeFiber.Vector2 = props[key];
//   return useMemo(() => {
//     if (vec instanceof Vector2) {
//       return new Vector2().set(vec.x, vec.y);
//     } if (Array.isArray(vec)) {
//       const [ x, y, ] = vec;
//       return new Vector2().set(x, y);
//     }
//   }, [ vec, ]);
// };
