"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { ControlPanel } from "@/components/map/control-panel";
import { ParcelForm } from "@/components/map/parcel-form";

const MapaInteractivo = dynamic(() => import("@/components/map/map"), { ssr: false });

export default function Home() {
  const [isMarking, setIsMarking] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 style={{ textAlign: "center", margin: "10px" }}>Mapa Interactivo</h1>

      <div className="grid grid-cols-4 gap-4 h-full w-full p-8 z-0">
        <div className="col-span-3 h-full">
          <MapaInteractivo isMarking={isMarking} FormComponent={ParcelForm} />
        </div>

        <div className="col-span-1 h-full bg-white z-0">
          <ControlPanel isMarking={isMarking} toggleMarking={() => setIsMarking((prev) => !prev)} />
        </div>
      </div>
    </div>
  );
}
