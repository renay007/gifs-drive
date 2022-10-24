import { useQuery } from "@tanstack/react-query";
import { HookApiResponse } from "../types";
import { Tag } from "../../views/Home/components/Files/components/File/types";
import { getTags, TagResponseWithDataArray } from "../../api/tags";
import { processApiQuery } from "../helper";

export interface TagQueries {
  getTags?: HookApiResponse & { data: Tag[] };
}

const queries: TagQueries = {};
const mutations = {};

const useTag = () => {
  queries["getTags"] = processApiQuery(
    useQuery<TagResponseWithDataArray, Error>(["tags"], getTags)
  );

  return {
    queries,
    mutations,
  };
};

export default useTag;
