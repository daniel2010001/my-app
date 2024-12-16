import { APIResponse, APIResponseError } from "@/models";

export class ResponseAdapter {
  static isResponse<T>(response: unknown): response is APIResponse<T> {
    return (response as APIResponse<T>)?.success !== undefined;
  }

  static isError<T>(response: unknown): response is APIResponseError<T> {
    return (response as APIResponse<T>)?.success === false;
  }

  static toResponse<T>(response: unknown): T {
    if (!ResponseAdapter.isResponse<T>(response)) throw "Invalid response";
    if (ResponseAdapter.isError<T>(response)) throw "Invalid response";
    return response.result;
  }
}
