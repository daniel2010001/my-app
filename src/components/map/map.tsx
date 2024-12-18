"use client";

import L from "leaflet";
import { FC, useEffect } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";

import { Line, Point } from "@/models";
import { FormModalContent, FormModalContentProps } from "./form-modal";

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

interface MapProps extends FormModalContentProps, CenterMapComponentProps {
  points: Point[];
  lines: Line[];
}

export const Map: FC<MapProps> = ({ isMarking, FormComponent, points, lines, bounds }) => {
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
      {points.map((punto) => (
        <Marker key={`marker-${punto.id}`} position={[punto.lat, punto.lng]} title={punto.name} />
      ))}
      <CenterMapComponent bounds={bounds} />
    </MapContainer>
  );
};

export default Map;
