import { useState, useEffect } from "react";

export default (storageKey: string, initialState: any) => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const item = localStorage.getItem(storageKey);

    if (item) {
      setInternalState(JSON.parse(item));
    }
  }, []);

  const setState = (newState: any) => {
    localStorage.setItem(storageKey, JSON.stringify(newState || {}));
    setInternalState(newState);
  };

  return [state, setState];
};
