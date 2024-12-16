import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.lib";

export interface Ruta {
  id: number;
  id_origen: number;
  id_destino: number;
  texto: string;
  distancia_km: number;
  tiempo_estimado: number;
  costo: number;
}

export const useRutas = () => {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await axiosInstance.get<Ruta[]>("/api/rutas");
        setRutas(response.data);
      } catch (err) {
        console.log(err);

        setError("Error fetching rutas");
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  return { rutas, loading, error };
};
