import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useDidUpdate = (effect: EffectCallback, deps?: DependencyList) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    effect();
  }, deps);
};

export default useDidUpdate;
