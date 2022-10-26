export interface HookApiResponse {
  isLoading: boolean;
  error: string;
}

export interface UseQueryResponseAny {
  status: string;
  isLoading: boolean;
  error: any;
  data: any;
}

export interface ApiError {
  success: boolean;
}
