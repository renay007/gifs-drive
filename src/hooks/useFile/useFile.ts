import { useQuery } from "@tanstack/react-query";
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

const useFile = () => {
  const queries: FileQueries = {};
  queries["getFiles"] = processApiQuery(
    useQuery<FileResponseWithDataArray, Error>(["files"], getFiles)
  );
  const createPublicLinkMutation = useApiMutation(createPublicLink, [
    ["files"],
  ]);
  const deletePublicLinkMutation = useApiMutation(deletePublicLink, [
    ["files"],
  ]);
  const updateFileMutation = useApiMutation(updateFile, [["files"], ["tags"]]);
  const deleteFileMutation = useApiMutation(deleteFile, [["files"]]);
  const uploadFileMutation = useApiMutation(uploadFile, [["files"]]);
  const mutations = {
    createPublicLink: async (obj: any) =>
      processApiMutation(createPublicLinkMutation.mutateAsync(obj)),
    deletePublicLink: async (obj: any) =>
      processApiMutation(deletePublicLinkMutation.mutateAsync(obj)),
    updateFile: async (obj: any) =>
      processApiMutation(updateFileMutation.mutateAsync(obj)),
    deleteFile: async (obj: any) =>
      processApiMutation(deleteFileMutation.mutateAsync(obj)),
    uploadFile: async (obj: any) =>
      processApiMutation(uploadFileMutation.mutateAsync(obj)),
  };

  return {
    queries,
    mutations,
  };
};

export default useFile;
