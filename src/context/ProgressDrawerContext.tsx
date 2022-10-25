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

export interface CustomFileError {
  code: string;
  message: string;
}

export interface CustomFile {
  name: string;
  size: number;
  type: string;
  dateAdded: Date;
}

export interface FileUpload {
  file: CustomFile;
  errors: CustomFileError[];
}

const ProgressDrawerProvider = ({ children }: Props): JSX.Element => {
  const initialState: FileUpload[] = [];
  const stateString = JSON.stringify(initialState);
  const [progressDetails, setProgressDrawerDetails] = usePersistate(
    "progressDetails",
    JSON.parse(localStorage.getItem("progressDetails") || stateString)
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
