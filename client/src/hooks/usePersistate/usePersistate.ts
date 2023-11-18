import { useState, useEffect, useRef } from "react";

export default (storageKey: string, initialState: any) => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const item = localStorage.getItem(storageKey);

    if (item) {
      setInternalState(JSON.parse(item));
    }
  }, []);

  const setState = (newState: any) => {
    const item = JSON.parse(
      localStorage.getItem(storageKey) || JSON.stringify(initialState)
    );
    const current = typeof newState === "function" ? newState(item) : newState;
    localStorage.setItem(storageKey, JSON.stringify(current));
    setInternalState(current);
  };

  return [state, setState];
};
