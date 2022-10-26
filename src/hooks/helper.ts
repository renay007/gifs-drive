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
      const data = await mutate;
      resolve(data);
    } catch (error) {
      reject(processApiError(error));
    }
  });
};

export const processApiError = (error: any) => {
  const unkownError = "@error/unknown";
  if (error?.constructor?.name === "AxiosError") {
    const data = error?.response?.data;
    const { code, message } = error;
    if (data && !data?.success) {
      if (typeof data === "string") return { code: unkownError, message: data };
      const { code, message } = data;
      return { code: code || unkownError, message: message };
    }
    return { code, message };
  } else {
    return {
      code: unkownError,
      message: "Unknown error",
    };
  }
};
