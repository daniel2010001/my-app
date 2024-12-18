"use client";

import L from "leaflet";
import { FC, useEffect } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";

import { FormModalContent, FormModalContentProps } from "./form-modal";

import { useMapStore } from "@/store";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface CenterMapComponentProps {
  bounds: [[number, number], [number, number]];
}

const CenterMapComponent: React.FC<CenterMapComponentProps> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  }, [map, bounds]);
  return null;
};

// Ícono de almacén
const parcelIcon = L.icon({
  iconUrl:
    "https://firebasestorage.googleapis.com/v0/b/spotify-lite-2bd06.appspot.com/o/Portadas%2Fistockphoto-1404081207-170667a-removebg-preview.png?alt=media&token=7bde4347-5317-44b9-a460-1822f8bc9a4f",
  iconSize: [70, 50], // Tamaño del ícono
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconAnchor: [22, 94], // Punto del ícono que corresponde a la ubicación del marcador
  popupAnchor: [-3, -76], // Punto desde el cual se abre el popup en relación con el iconAnchor
});

const collectionCenterIcon = L.icon({
  iconUrl:
    "https://media.istockphoto.com/id/1404081207/pt/vetorial/isometric-farm-building-with-agricultural-tractor-cultivated-fields-agriculture-wheat-field.jpg?s=170667a&w=0&k=20&c=HqkWRrJ3fhFFC_Rr6df1Wuf5VjTdNTNuuN_MjbF5VG0=",
  iconSize: [70, 50], // Tamaño del ícono
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconAnchor: [22, 94], // Punto del ícono que corresponde a la ubicación del marcador
  popupAnchor: [-3, -76], // Punto desde el cual se abre el popup en relación con el iconAnchor
});

const icons = {
  parcel: parcelIcon,
  "collection-center": collectionCenterIcon,
};
export const Map: FC<FormModalContentProps> = ({ isMarking, FormComponent }) => {
  const { points, lines, bounds } = useMapStore();

  function generateColor(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
    return "#" + "000000".substring(0, 6 - color.length) + color;
  }

  return (
    <MapContainer
      center={[-17.64, -65.9]}
      zoom={12}
      className="relative w-full h-full rounded-lg border-spacing-1 border-teal-900 border-2"
    >
      {isMarking}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FormModalContent isMarking={isMarking} FormComponent={FormComponent} />
      {lines.length > 0 &&
        lines.map(({ points, id }) => (
          <Polyline key={`polyline-${id}`} positions={points} color={generateColor(id)} />
        ))}
      {points.map((point) => (
        <Marker
          key={`marker-${point.id}`}
          position={[point.lat, point.lng]}
          title={point.name}
          icon={icons[point.icon]}
        />
      ))}
      <CenterMapComponent bounds={bounds} />
    </MapContainer>
  );
};

export default Map;
