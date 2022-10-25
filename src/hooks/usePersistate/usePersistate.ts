import { useState, useEffect, useRef } from "react";

export default (storageKey: string, initialState: any) => {
  const ref = useRef(initialState);
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const item = localStorage.getItem(storageKey);

    if (item) {
      setInternalState(JSON.parse(item));
    }
  }, []);

  const setState = (newState: any) => {
    ref.current = typeof newState === "function" ? newState(state) : newState;
    localStorage.setItem(storageKey, JSON.stringify(ref.current || {}));
    setInternalState(ref.current);
  };

  return [state, setState];
};
