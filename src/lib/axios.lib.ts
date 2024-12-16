import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
  Method,
} from "axios";
import { toast } from "sonner";

import { ResponseAdapter } from "@/adapters";
import { AxiosCall, axiosInstance, codeMatcher } from "@/models";
import { useDBStore } from "@/store";
import { ComponentError } from "@/components/custom-error";

/**
 * Función para obtener el mensaje de error personalizado de un código de error
 * @param code Código de error
 * @returns Mensaje de error personalizado
 */
function getCustomErrorCode(code: string): string {
  const response = codeMatcher[code];
  if (!response) console.error(code);
  return codeMatcher[code] || codeMatcher.ERR_UNKNOWN;
}

/**
 * Función para obtener un AbortController
 * @returns AbortController
 */
function loadAbort(): AbortController {
  return new AbortController();
}

/**
 * Función para realizar una petición y obtener su resultado
 * @param call Llamada a la API
 * @returns Resultado de la petición
 * @throws Error de la petición
 */
async function loadAbortable<T = unknown, D = undefined>({ call, controller }: AxiosCall<T, D>) {
  let value: Awaited<AxiosCall<T, D>["call"]>;
  try {
    value = await call;
    controller?.abort();
  } catch (e) {
    if (isAxiosError<T, D>(e)) value = e;
    else return;
  }
  return value;
}

/**
 * Función para crear una llamada a la API
 * @param method Método de la petición
 * @param url URL de la petición
 * @param data Datos de la petición
 * @param config Configuración de la petición
 * @returns Instancia para ser utilizada en "loadAbortable"
 */
function createAxiosCall<T = unknown, D = undefined>(
  method: Method,
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): AxiosCall<T, D> | never {
  const controller = loadAbort();
  const call = axiosInstance.request<T, Awaited<AxiosCall<T, D>["call"]>, D>({
    method,
    url,
    data,
    signal: controller.signal,
    ...config,
  });
  return { call, controller };
}

/**
 * Función para actualizar el header de la petición
 * @param request Configuración de la petición
 * @returns Configuración de la petición
 */
const updateHeader = (request: InternalAxiosRequestConfig) => {
  // Add custom headers here
  // request.headers["DataBase"] = useDBStore.getState().db;
  if (!request.headers["Content-Type"]) request.headers["Content-Type"] = "application/json";
  return request;
};

/** Interceptor para la petición */
axiosInstance.interceptors.request.use((request) => {
  if (request.url?.includes("assets")) return request;
  return updateHeader(request);
});

/** Interceptor para la respuesta */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (ResponseAdapter.isResponse(response.data)) {
      const apiResponse = response.data;
      if (ResponseAdapter.isError(apiResponse)) throw apiResponse.error;
      response.data = ResponseAdapter.toResponse(apiResponse);
      useDBStore.getState().setDB(response.headers["DataBase"]);
    }
    return response;
  },
  async (error: unknown) => {
    if (isAxiosError(error) && error.code) {
      const request = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      if (request && !request._retry && !request.url?.includes("refresh"))
        if (ResponseAdapter.isError(error.response?.data)) {
          toast.error("Error en la petición: ", {
            description: () => ComponentError(error.response?.data.error),
          });
        } else if (error.response?.status === 401) {
          request._retry = true;
          // refresh token here
          return await axios(request);
        } else if (!request?.signal?.aborted) {
          toast.error("Ah ocurrido un error inesperado!", {
            description: getCustomErrorCode(error.code),
          });
        }
    } else console.error("Error Interceptor", error);
    return Promise.reject(error);
  }
);

export { axiosInstance, createAxiosCall, loadAbortable };