import { createContext, Dispatch, SetStateAction } from "react";
// import { ProgressDrawer } from "../api/progresss";
import usePersistate from "../hooks/usePersistate/usePersistate";

const ProgressDrawerContext = createContext<any>(undefined!);
const ProgressDrawerDispatchContext = createContext<
  Dispatch<SetStateAction<any>>
>(undefined!);

interface Props {
  children: React.ReactNode;
}

const ProgressDrawerProvider = ({ children }: Props): JSX.Element => {
  const [progressDetails, setProgressDrawerDetails] = usePersistate(
    "progressDetails",
    JSON.parse(localStorage.getItem("progressDetails") || "{}")
  );

  return (
    <ProgressDrawerContext.Provider value={progressDetails}>
      <ProgressDrawerDispatchContext.Provider value={setProgressDrawerDetails}>
        {children}
      </ProgressDrawerDispatchContext.Provider>
    </ProgressDrawerContext.Provider>
  );
};

export {
  ProgressDrawerProvider,
  ProgressDrawerContext,
  ProgressDrawerDispatchContext,
};
