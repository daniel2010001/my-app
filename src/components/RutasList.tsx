import { useRutas } from '../hooks/useRutas';

const RutasList = () => {
  const { rutas, loading, error } = useRutas();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Rutas</h1>
      <ul>
        {rutas.map((ruta) => (
          <li key={ruta.id}>
            {ruta.texto} - {ruta.distancia_km} km
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RutasList;