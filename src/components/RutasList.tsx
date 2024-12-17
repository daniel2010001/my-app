import { useEffectAsync } from "@/hooks";
import { axiosInstance } from "@/models";
import { Ruta } from "@prisma/client";
import { useState } from "react";

const RutasList = () => {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRutas = () => {
    return axiosInstance.get("/api/rutas");
  };

  useEffectAsync({
    asyncFunction: fetchRutas,
    successFunction: (data) => {
      setRutas(data);
      setLoading(false);
    },
    errorFunction: (error) => {
      console.log(error);
      setError("Error fetching data");
      setLoading(false);
    },
    deps: [],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Rutas</h1>
      <ul>
        {rutas.map((ruta) => (
          <li key={ruta.id}>
            {ruta.texto} - {ruta.distancia_km.toString()} km
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RutasList;
