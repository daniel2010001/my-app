"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { FormModal } from "@/components/map/form-modal";
import { ParcelForm } from "@/components/map/parcel-form";
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
import { cn, loadAbortable } from "@/lib";
import { useMapStore, useParcelStore } from "@/store";
import { getCars, getCollectionCenters, getIncidents, getParcels } from "@/services";
import {
  CarsAdapter,
  CollectionCentersAdapter,
  IncidentsAdapter,
  ParcelsAdapter,
} from "@/adapters";
import { toast } from "sonner";
import { useCollectionCenterStore } from "@/store/collection-center.store";
import { useIncidentStore } from "@/store/incident.store";
import { useRouteStore } from "@/store/route.store";
import { RoutesAdapter } from "@/adapters/route.adapter";
import { getRoutes } from "@/services/route.service";
import { useCarStore } from "@/store/car.store";

const MapaInteractivo = dynamic(() => import("@/components/map/map"), { ssr: false });

export default function Home() {
  const { points, lines, bounds, addPoint } = useMapStore();
  const { parcels, addParcel } = useParcelStore();
  const { addCollectionCenter } = useCollectionCenterStore();
  const { addCar } = useCarStore();
  const { addIncident } = useIncidentStore();
  const { addRoute } = useRouteStore();
  const [isMarking, setIsMarking] = useState(false);
  const [openParcelForm, setParcelForm] = useState(false);
  const [openCollectionCenterForm, setCollectionCenterForm] = useState(false);
  const [openCarForm, setCarForm] = useState(false);
  const [openIncidentForm, setIncidentForm] = useState(false);
  const [openTraceForm, setTraceForm] = useState(false);
  const currentForm = useRef(ParcelForm);
  const setCurrentForm = (newFormModal: FormModal) => {
    currentForm.current = newFormModal;
  };
  function toggleMarking() {
    setIsMarking((prev) => !prev);
    setParcelForm(false);
    setCollectionCenterForm(false);
  }

  async function loadParcels() {
    const response = await loadAbortable(getParcels());
    if (!response || response instanceof Error) return toast.error("Error al cargar parcelas");
    addParcel(response.data.map(ParcelsAdapter.toParcel));
    addPoint(response.data.map(ParcelsAdapter.toPoint));
    toast.success("Parcelas cargadas correctamente");
  }

  async function loadCollectionCenters() {
    const response = await loadAbortable(getCollectionCenters());
    if (!response || response instanceof Error)
      return toast.error("Error al cargar centros de acopio");
    addCollectionCenter(response.data.map(CollectionCentersAdapter.toCollectionCenters));
    toast.success("Centros de acopio cargados correctamente");
  }

  async function loadCars() {
    const response = await loadAbortable(getCars());
    if (!response || response instanceof Error) return toast.error("Error al cargar vehículos");
    addCar(response.data.map(CarsAdapter.toCar));
    toast.success("Vehículos cargados correctamente");
  }

  async function loadIncidents() {
    const response = await loadAbortable(getIncidents());
    if (!response || response instanceof Error) return toast.error("Error al cargar incidencias");
    addIncident(response.data.map(IncidentsAdapter.toIncident));
    toast.success("Incidencias cargadas correctamente");
  }

  async function loadRoutes() {
    const response = await loadAbortable(getRoutes());
    if (!response || response instanceof Error) return toast.error("Error al cargar rutas");
    addRoute(response.data.map(RoutesAdapter.toRoute));
    toast.success("Rutas cargadas correctamente");
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 style={{ textAlign: "center", margin: "10px" }}>Path-Logic</h1>

      <div className="grid grid-cols-4 gap-4 h-full w-full p-8 z-0">
        <div className="col-span-3 h-full">
          <MapaInteractivo
            isMarking={isMarking}
            FormComponent={currentForm.current}
            points={points}
            lines={lines}
            bounds={bounds}
          />
        </div>

        <div className="col-span-1 flex flex-col h-full bg-white z-0 gap-2">
          <DropdownMenu onOpenChange={() => setCurrentForm(ParcelForm)}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {openParcelForm ? "Agregando Parcela..." : "Parcelas"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Opciones de Parcelas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={toggleMarking}
                  className={cn(
                    openParcelForm && "text-white bg-red-500 focus:text-black focus:bg-red-300"
                  )}
                >
                  {openParcelForm ? "Cancelar" : "Agregar Parcela"}
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={loadParcels}>
                  Cargar Parcelas
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu onOpenChange={() => setCurrentForm(CollectionCenterForm)}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {openCollectionCenterForm ? "Agregando Centro de Acopio..." : "Centro de Acopio"}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Opciones de Centro de Acopio</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={toggleMarking}
                  className={cn(
                    openCollectionCenterForm &&
                      "text-white bg-red-500 focus:text-black focus:bg-red-300"
                  )}
                >
                  {openCollectionCenterForm ? "Cancelar" : "Agregar Centro de Acopio"}
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={loadCollectionCenters}>
                  Cargar Centro de Acopio
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
                <DropdownMenuItem onClick={loadCars}>
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
                <DropdownMenuItem onClick={loadRoutes}>
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
                <DropdownMenuItem onClick={loadIncidents}>
                  Cargar Incidente
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <ControlPanel isMarking={isMarking} toggleMarking={toggleMarking} />
        </div>
        <CarForm isOpen={openCarForm} toggle={() => setCarForm((prev) => !prev)} />
        <IncidentForm
          isOpen={openIncidentForm}
          toggle={() => setIncidentForm((prev) => !prev)}
          parcels={parcels}
        />
        <TraceForm
          isOpen={openTraceForm}
          toggle={() => setTraceForm((prev) => !prev)}
          parcels={parcels}
        />
      </div>
    </div>
  );
}
