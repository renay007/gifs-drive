import { ConstructionOutlined } from "@mui/icons-material";
import {
  UseBaseMutationResult,
  UseMutateAsyncFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { UseQueryResponseAny } from "./types";

export const processApiQuery = (query: UseQueryResponseAny) => {
  const { isLoading, error: _error, data } = query;

  const error = _error || !data?.success;

  let message = error
    ? _error?.message || `${data?.code}: ${data?.message}`
    : "";

  return {
    isLoading,
    error: message,
    data: data?.data || [],
  };
};

export const processApiMutation = async (mutate: any, variables?: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const data = await mutate(variables);
      const data = await mutate;
      resolve(data);
    } catch (error) {
      reject(processApiError(error));
    }
  });
};

export const processApiError = (error: any) => {
  if (error?.constructor?.name === "AxiosError") {
    const data = error?.response?.data;
    const { code, message } = error;
    if (data && !data?.success) {
      return data;
    }
    return { code, message };
  } else {
    return {
      code: "unknown",
      message: "Unknown error",
    };
  }
};

// mutations = {
//   createPublicLink: async (fileId) =>
//     useApiMutation(createPublicLink, ["files"]).mutateAsync(fileId),
//   deletePublicLink: async (fileId) =>
//     useApiMutation(deletePublicLink, ["files"]).mutateAsync(fileId),
//   updateFile: async (fileId, data) =>
//     useApiMutation(updateFile, ["files"]).mutateAsync(fileId, data),
//   deleteFile: async (fileId) =>
//     useApiMutation(deletePublicLink, ["files"]).mutateAsync(fileId),
//   uploadFile: async (fileId) =>
//     useApiMutation(deletePublicLink, ["files"]).mutateAsync(fileId),
// };
