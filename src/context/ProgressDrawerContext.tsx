import { createContext, Dispatch, SetStateAction, useState } from "react";

const ProgressDrawerContext = createContext<ProgressDrawer>(undefined!);
const ProgressDrawerDispatchContext = createContext<Dispatch<SetStateAction<ProgressDrawer>>>(
  undefined!
);

interface Props {
  children: React.ReactNode;
}

interface ProgressDrawer {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

const ProgressDrawerProvider = ({ children }: Props): JSX.Element => {
  const [userDetails, setProgressDrawerDetails] = useState<ProgressDrawer>({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    token: "",
  });

  return (
    <ProgressDrawerContext.Provider value={userDetails}>
      <ProgressDrawerDispatchContext.Provider value={setProgressDrawerDetails}>
        {children}
      </ProgressDrawerDispatchContext.Provider>
    </ProgressDrawerContext.Provider>
  );
};

export { ProgressDrawerProvider, ProgressDrawerContext, ProgressDrawerDispatchContext };
