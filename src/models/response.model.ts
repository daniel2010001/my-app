export type APIResponseError<T> = {
  success: false;
  error: Partial<Record<keyof T, string[]>> & { __type: string; message?: string };
};

export type APIResponse<T> = { success: true; result: T } | APIResponseError<T>;
