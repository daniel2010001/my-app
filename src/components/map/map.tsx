"use client";

import L from "leaflet";
import { FC, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet";

import { useMapStore } from "@/store";
import { FormModal, FormModalContent } from "./form-modal";

import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  isMarking: boolean;
  FormComponent: FormModal;
}

function ClickHandler({ isMarking, FormComponent }: MapProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      if (isMarking) {
        setClickedPosition([e.latlng.lat, e.latlng.lng]);
        setIsModalOpen(true);
      }
    },
  });

  function onClose() {
    setIsModalOpen(false);
    setClickedPosition(null);
  }

  return clickedPosition ? (
    <FormModalContent
      open={isModalOpen}
      onOpenChange={onClose}
      FormComponent={FormComponent}
      lat={clickedPosition[0]}
      lng={clickedPosition[1]}
    />
  ) : null;
}

export const Map: FC<MapProps> = ({ isMarking, FormComponent }) => {
  const points = useMapStore((state) => state.points);
  const routePoints = useMapStore((state) => state.routePoints);
  return (
    <MapContainer
      center={[-17.392352, -66.159042]}
      zoom={13}
      className="relative w-full h-full rounded-lg border-spacing-1 border-teal-900 border-2"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickHandler isMarking={isMarking} FormComponent={FormComponent} />
      {routePoints.length > 0 && <Polyline positions={routePoints} color="blue" />}
      {points.map((punto, index) => (
        <Marker key={index} position={[punto.lat, punto.lng]} title={punto.name} />
      ))}
    </MapContainer>
  );
};

export default Map;
