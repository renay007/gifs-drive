import axios from "axios";
import { Response } from "../types";

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  token?: string;
}

export interface UserSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export type UserResponseWithDataObject = Response & { data: User };

export const getUser = (): Promise<UserResponseWithDataObject> => {
  return axios.post("/api/users/me").then((res) => res.data);
};
