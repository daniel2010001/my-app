"use client";

import L from "leaflet";
import { FC } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

import { Line, Point } from "@/models";
import { FormModalContent, FormModalContentProps } from "./form-modal";

import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps extends FormModalContentProps {
  points: Point[];
  lines: Line[];
}

export const Map: FC<MapProps> = ({ isMarking, FormComponent, points, lines }) => {
  return (
    <MapContainer
      center={[-17.64, -65.9]}
      zoom={12}
      className="relative w-full h-full rounded-lg border-spacing-1 border-teal-900 border-2"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FormModalContent isMarking={isMarking} FormComponent={FormComponent} />
      {lines.length > 0 && <Polyline positions={lines.map(({ points }) => points)} color="blue" />}
      {points.length > 0 &&
        points.map((punto, index) => (
          <Marker key={index} position={[punto.lat, punto.lng]} title={punto.name} />
        ))}
    </MapContainer>
  );
};

export default Map;
