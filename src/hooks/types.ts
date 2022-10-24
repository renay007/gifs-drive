export interface HookApiResponse {
  isLoading: boolean;
  error: string;
}

export interface UseQueryResponseAny {
  isLoading: boolean;
  error: any;
  data: any;
}

export interface ApiError {
  success: boolean;

}