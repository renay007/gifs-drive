import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { HookApiResponse } from "../types";
import { FileType } from "../../views/Home/components/Files/components/File/types";
import {
  getFiles,
  uploadFile,
  updateFile,
  deleteFile,
  createPublicLink,
  deletePublicLink,
  FileResponseWithDataArray,
} from "../../api/files";
import { processApiMutation, processApiQuery } from "../helper";
import useApiMutation from "../useApiMutation/useApiMutation";

export interface FileQueries {
  getFiles?: HookApiResponse & { data: FileType[] };
}

export type FileMutations = { [key: string]: (...args: any[]) => Promise<any> };

type ApiMutations = {
  [key: string]: UseMutationResult<unknown, unknown, void, unknown>;
};

// type ApiMutations = {
//   [key: string]: (...args: any[]) => Promise<any>;
// };

const queries: FileQueries = {};
let mutations: FileMutations = {};

const useFile = () => {
  queries["getFiles"] = processApiQuery(
    useQuery<FileResponseWithDataArray, Error>(["files"], getFiles)
  );

  // const apis: ApiMutations = {
  //   createPublicLink: useApiMutation(createPublicLink, ["files"]),
  //   deletePublicLinkMutation: useApiMutation(deletePublicLink, ["files"]),
  //   updateFileMutation: useApiMutation(updateFile, ["files"]),
  //   deleteFileMutation: useApiMutation(deleteFile, ["files"]),
  //   uploadFileMutation: useApiMutation(uploadFile, ["files"]),
  // };

  // for (const key in apis) {
  //   mutations[key] = async (variables) =>
  //     processApiMutation(apis[key].mutateAsync, variables);
  // }

  const createPublicLinkMutation = useApiMutation(createPublicLink, [
    ["files"],
  ]);
  const deletePublicLinkMutation = useApiMutation(deletePublicLink, [
    ["files"],
  ]);
  const updateFileMutation = useApiMutation(updateFile, [["files"], ["tags"]]);
  const deleteFileMutation = useApiMutation(deleteFile, [["files"]]);
  const uploadFileMutation = useApiMutation(uploadFile, [["files"]]);
  mutations = {
    createPublicLink: async (obj: any) =>
      processApiMutation(createPublicLinkMutation.mutateAsync(obj)),
    deletePublicLink: async (fileId: any) =>
      processApiMutation(deletePublicLinkMutation.mutateAsync(fileId)),
    updateFile: async (obj) =>
      processApiMutation(updateFileMutation.mutateAsync(obj)),
    deleteFile: async (fileId: any) =>
      processApiMutation(deleteFileMutation.mutateAsync(fileId)),
    uploadFile: async (fileId: any) =>
      processApiMutation(uploadFileMutation.mutateAsync(fileId)),
  };

  return {
    queries,
    mutations,
  };
};

export default useFile;
