import axios from "axios";
import { UserResponseWithDataObject, UserSignIn, UserSignUp } from "../users";

export const signin = (
  form: UserSignIn
): Promise<UserResponseWithDataObject> => {
  return axios.post("/api/signin", form).then((res) => res.data);
};

export const signup = (
  form: UserSignUp
): Promise<UserResponseWithDataObject> => {
  return axios.post("/api/signup", form).then((res) => res.data);
};
