import { useState, useEffect } from "react";

export default (storageKey: string, initialState: any) => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const item = localStorage.getItem(storageKey);
    console.log("item key", storageKey);
    console.log("item", JSON.parse(item || "{}"));

    if (item) {
      setInternalState(JSON.parse(item));
    }
  }, []);

  // Create a replacement method that will set the state like normal, but that also saves the new state into the store.
  const setState = (newState: any) => {
    localStorage.setItem(storageKey, JSON.stringify(newState));
    setInternalState(newState);
  };

  return [state, setState];
};
