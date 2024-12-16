"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { ControlPanel } from "@/components/map/control-panel";
import RutasList from "@/components/RutasList";

const MapaInteractivo = dynamic(() => import("@/components/map/map"), {
  ssr: false,
});

export default function Home() {
  const [isMarking, setIsMarking] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 style={{ textAlign: "center", margin: "10px" }}>Mapa Interactivo</h1>

      <div className="w-3/4 h-3/4 bg-white z-0">
        <MapaInteractivo isMarking={isMarking} />
      </div>

      <div className="w-1/4 h-3/4 bg-white z-0">
        <ControlPanel
          isMarking={isMarking}
          toggleMarking={() => setIsMarking((prev) => !prev)}
        />
      </div>

      <div>
        <RutasList />
      </div>
    </div>
  );
}
