import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { processApiError } from "../helper";

const useApiMutation = (mutationFunction: any, keys?: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation(mutationFunction, {
    onSuccess: async (data) => {
      if (keys)
        return await Promise.all(
          keys.map((el: string[]) => queryClient.invalidateQueries(el))
        );
    },
    onError: (error) => {
      const { code, message } = processApiError(error);
      enqueueSnackbar([code, message].join(": "), { variant: "error" });
    },
  });
};

export default useApiMutation;
