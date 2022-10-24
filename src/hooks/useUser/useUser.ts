import { useQuery } from "@tanstack/react-query";
import { processApiQuery } from "../helper";
import { getUser, UserResponseWithDataObject } from "../../api/users";

const useUser = () => {
  const queries: { [key: string]: any } = {};
  queries["getUser"] = processApiQuery(
    useQuery<UserResponseWithDataObject, Error>(["user"], getUser)
  );

  return {
    queries,
    mutations: {},
  };
};

export default useUser;
