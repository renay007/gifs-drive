import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "../api/users";
import usePersistate from "../hooks/usePersistate/usePersistate";

const UserContext = createContext<User>(undefined!);
const UserDispatchContext = createContext<Dispatch<SetStateAction<User>>>(
  undefined!
);

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props): JSX.Element => {
  const [userDetails, setUserDetails] = usePersistate(
    "user",
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext, UserDispatchContext };
