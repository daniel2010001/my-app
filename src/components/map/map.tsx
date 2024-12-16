"use client";

import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { useMapStore } from "@/store";
import { PointFormModal } from "./point-form";

import "leaflet/dist/leaflet.css";
import { Point } from "@/models";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ClickHandler({ isMarking }: { isMarking: boolean }) {
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

  return clickedPosition ? (
    <PointFormModal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setClickedPosition(null);
      }}
      lat={clickedPosition[0]}
      lng={clickedPosition[1]}
    />
  ) : null;
}

const createRoutineMachineLayer = (props: { origin: Point; destination: Point }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.origin.lat, props.origin.lng),
      L.latLng(props.destination.lat, props.destination.lng),
    ],
    lineOptions: { styles: [{ color: "#6FA1EC", weight: 4 }] },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

interface MapProps {
  isMarking: boolean;
}

export default function Map({ isMarking }: MapProps) {
  const points = useMapStore((state) => state.points);
  return (
    <MapContainer center={[40.4168, -3.7038]} zoom={13} className="relative w-full h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickHandler isMarking={isMarking} />
      {points.map((punto, index) => (
        <Marker key={index} position={[punto.lat, punto.lng]} title={punto.name} />
      ))}
      <Marker position={[40.4168, -3.7038]} title="Madrid" />
      <Marker position={[41.3851, 2.1734]} title="Barcelona" />
      <RoutingMachine />
    </MapContainer>
  );
}
