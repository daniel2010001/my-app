"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { CarForm } from "@/components/map/car-form";
import { CollectionCenterForm } from "@/components/map/collection-center-form";
import { ControlPanel } from "@/components/map/control-panel";
import { IncidentForm } from "@/components/map/incident-form";
import { TraceForm } from "@/components/map/trace-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMapStore, useParcelStore } from "@/store";

const MapaInteractivo = dynamic(() => import("@/components/map/map"), { ssr: false });

export default function Home() {
  const { points, lines: routes, bounds } = useMapStore();
  const { parcels } = useParcelStore();
  const [isMarking, setIsMarking] = useState(false);
  const [carForm, setCarForm] = useState(false);
  const [incidentForm, setIncidentForm] = useState(false);
  const [traceForm, setTraceForm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 style={{ textAlign: "center", margin: "10px" }}>Mapa Interactivo</h1>

      <div className="grid grid-cols-4 gap-4 h-full w-full p-8 z-0">
        <div className="col-span-3 h-full">
          <MapaInteractivo
            isMarking={isMarking}
            FormComponent={CollectionCenterForm}
            points={points}
            lines={routes}
            bounds={bounds}
          />
        </div>

        <div className="col-span-1 h-full bg-white z-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Vehículos</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Opciones de Vehículos</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setCarForm((prev) => !prev)}>
                  Agregar Vehículo
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Cargar Vehículos
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Rutas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Opciones de Rutas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setTraceForm((prev) => !prev)}>
                  Trazar Ruta
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Cargar Trazar Ruta
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Incidente</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Opciones de Incidente</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIncidentForm((prev) => !prev)}>
                  Añadir Incidente
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Cargar Incidente
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <ControlPanel isMarking={isMarking} toggleMarking={() => setIsMarking((prev) => !prev)} />
        </div>
        <CarForm isOpen={carForm} toggle={() => setCarForm((prev) => !prev)} />
        <IncidentForm
          isOpen={incidentForm}
          toggle={() => setIncidentForm((prev) => !prev)}
          parcels={parcels}
        />
        <TraceForm
          isOpen={traceForm}
          toggle={() => setTraceForm((prev) => !prev)}
          parcels={parcels}
        />
      </div>
    </div>
  );
}
