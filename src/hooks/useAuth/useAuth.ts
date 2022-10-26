import { processApiMutation } from "../helper";
import useApiMutation from "../useApiMutation/useApiMutation";
import { signin, signup } from "../../api/auth";
import { UserDispatchContext } from "../../context/UserContext";
import { useContext } from "react";

const useAuth = () => {
  const setUserDetails = useContext(UserDispatchContext);
  const signinMutation = useApiMutation(signin);
  const signupMutation = useApiMutation(signup);

  const mutations = {
    signin: async (obj: any) =>
      processApiMutation(signinMutation.mutateAsync(obj)),
    signup: async (obj: any) =>
      processApiMutation(signupMutation.mutateAsync(obj)),
    logout: async () => {
      setUserDetails(null);
      localStorage.clear();
    },
  };

  return {
    queries: {},
    mutations,
  };
};

export default useAuth;
