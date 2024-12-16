import axios from 'axios';

export interface AxiosCall<T = unknown, D = undefined> {
  call: Promise<T>;
  controller: AbortController;
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});