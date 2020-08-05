import { MutableRefObject, useRef, } from 'react';

function useMap<V>() {
  const map = useRef(new Map<string, V>());
  return {
    set: (key: string, value: V) => map.current.set(key, value),
    has: (key: string) => map.current.has(key),
    get: (key: string) => map.current.get(key),
    keys: () => [ ...map.current.keys(), ],
  };
}

type Callback = (...args: any[]) => any;
type SelfReferencedCallback = Callback | MutableRefObject<Callback>;

export function useRefFunctions() {
  const callbackRefs = useMap<SelfReferencedCallback>();

  return (cacheKey: string, current: Callback): Callback => {
    if (!callbackRefs.has(cacheKey)) {
      const callback: SelfReferencedCallback = (...args) => (
        (callback as Exclude<SelfReferencedCallback, Function>).current(...args) as Callback
      );
      callbackRefs.set(cacheKey, callback);
    }

    (callbackRefs.get(cacheKey) as Exclude<SelfReferencedCallback, Function>).current = current;

    return callbackRefs.get(cacheKey) as Callback;
  };
}
