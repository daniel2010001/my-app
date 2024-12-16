/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

import { AxiosCall } from "@/models";

/**
 * UseEffect que se ejecuta solo una vez después de montar el componente
 * @param effect función de efecto a ejecutar
 * @param deps Arreglo de dependencias creadas con useState
 */
export const useEffectAfterMount = (effect: EffectCallback, deps?: DependencyList) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    effect();
  }, deps);
};

type useEffectAsyncProps<T, D = unknown> = {
  asyncFunction: () => AxiosCall<T, D>["call"];
  successFunction: (data: T) => void;
  errorFunction?: (error: unknown) => void;
  returnFunction?: EffectCallback;
  deps?: DependencyList;
};

/**
 * Función para manejar operaciones asíncronas usando useEffect. Ejecuta la petición de
 * axios y maneja el resultado siempre y cuando se tenga montado el componente.
 *
 * También captura los errores y los maneja en el contexto de error.
 *
 * @param asyncFunction Petición de axios que se desea ejecutar
 * @param successFunction Función que se ejecuta cuando se resuelve la petición, recibe como parámetro los datos obtenidos
 * @param errorFunction Función que se ejecuta cuando se produce un error, recibe como parámetro el error
 * @param returnFunction Función que se ejecuta cuando el componente se desmonta o si cambian las dependencias
 * @param deps Array de dependencias que se pasa al useEffect
 */
export const useEffectAsync = <T, D = unknown>({
  asyncFunction,
  successFunction,
  errorFunction = () => {},
  returnFunction = () => {},
  deps = [],
}: useEffectAsyncProps<T, D>) => {
  useEffect(() => {
    let isActive = true;
    asyncFunction()
      .then((result) => {
        if (!isActive) return;
        if (result instanceof Error) return errorFunction(result);
        successFunction(result.data);
      })
      .catch((error) => {
        if (isActive) errorFunction(error);
      });
    return () => {
      if (!!returnFunction) returnFunction();
      isActive = false;
    };
  }, deps);
};
