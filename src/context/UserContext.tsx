import { createContext, Dispatch, SetStateAction, useState } from "react";

const UserContext = createContext<User>(undefined!);
const UserDispatchContext = createContext<Dispatch<SetStateAction<User>>>(
  undefined!
);

interface Props {
  children: React.ReactNode;
}

interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

const UserProvider = ({ children }: Props): JSX.Element => {
  const [userDetails, setUserDetails] = useState<User>({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    token: "",
  });

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext, UserDispatchContext };
