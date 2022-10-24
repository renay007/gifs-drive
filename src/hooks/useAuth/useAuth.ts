import { processApiMutation } from "../helper";
import useApiMutation from "../useApiMutation/useApiMutation";
import { signin, signup } from "../../api/auth";

const useAuth = () => {
  const signinMutation = useApiMutation(signin);
  const signupMutation = useApiMutation(signup);

  const mutations = {
    signin: async (obj: any) =>
      processApiMutation(signinMutation.mutateAsync(obj)),
    signup: async (obj: any) =>
      processApiMutation(signupMutation.mutateAsync(obj)),
    logout: async () => {},
  };

  return {
    queries: {},
    mutations,
  };
};

export default useAuth;
