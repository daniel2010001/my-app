"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { toast } from "sonner";

const MapaInteractivo = dynamic(() => import("@/components/map/map"), { ssr: false });

import {
  CarsAdapter,
  CollectionCentersAdapter,
  IncidentsAdapter,
  ParcelsAdapter,
  RecollectionsAdapter,
  RoutesAdapter,
} from "@/adapters";
import { CarForm } from "@/components/map/car-form";
import { CollectionCenterForm } from "@/components/map/collection-center-form";
import { FormModal } from "@/components/map/form-modal";
import { GenericTable } from "@/components/map/generic-table";
import { IncidentForm } from "@/components/map/incident-form";
import { ParcelForm } from "@/components/map/parcel-form";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, loadAbortable } from "@/lib";
import { Car, CollectionCenter, Incident, Parcel, Recollection, Route } from "@/models";
import {
  getCars,
  getCollectionCenters,
  getIncidents,
  getParcels,
  getRecollections,
  getRoutes,
  removeCar,
  removeCollectionCenter,
  removeIncident,
  removeParcel,
  removeRecollection,
  removeRoute,
} from "@/services";
import {
  useCarStore,
  useCollectionCenterStore,
  useIncidentStore,
  useMapStore,
  useParcelStore,
  useRecollectionStore,
  useRouteStore,
} from "@/store";
import { RecollectionForm } from "@/components/map";

export default function Home() {
  const { addPoint, deletePoint } = useMapStore();

  const { parcels, addParcel, deleteParcel, clearParcels } = useParcelStore();
  const { collectionCenters, addCollectionCenter, deleteCollectionCenter, clearCollectionCenters } =
    useCollectionCenterStore();
  const { cars, addCar, deleteCar, clearCars } = useCarStore();
  const { incidents, addIncident, deleteIncident, clearIncidents } = useIncidentStore();
  const { routes, addRoute, deleteRoute, clearRoutes } = useRouteStore();
  const { recollections, addRecollection, deleteRecollection, clearRecollections } =
    useRecollectionStore();

  const [isMarking, setIsMarking] = useState(false);
  const [openParcelForm, setParcelForm] = useState(false);
  const [openCollectionCenterForm, setCollectionCenterForm] = useState(false);
  const [openCarForm, setCarForm] = useState(false);
  const [openIncidentForm, setIncidentForm] = useState(false);
  const [openTraceForm, setTraceForm] = useState(false);
  const [openRecollectionForm, setRecollectionForm] = useState(false);

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
    addPoint(response.data.map(CollectionCentersAdapter.toPoint));
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

  async function loadRecollections() {
    const response = await loadAbortable(getRecollections());
    if (!response || response instanceof Error) return toast.error("Error al cargar recolecciones");
    addRecollection(response.data.map(RecollectionsAdapter.toRecollection));
    toast.success("Recolecciones cargadas correctamente");
  }

  const handleDeleteParcel = async ({ id }: Parcel) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este punto?")) return;
    const response = await loadAbortable(removeParcel(id));
    if (!response || response instanceof Error) return toast.error("Error al borrar puntos");
    deleteParcel(id);
    toast.success("Se borraron todos los puntos");
  };

  const handleDeleteRecollection = async ({ id }: Recollection) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar esta recolección?")) return;
    const response = await loadAbortable(removeRecollection(id));
    if (!response || response instanceof Error) return toast.error("Error al borrar recolecciones");
    deleteRecollection(id);
    toast.success("Se borraron todas las recolecciones");
  };

  const handleDeleteIncident = async ({ id }: Incident) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este incidente?")) return;
    const response = await loadAbortable(removeIncident(id));
    if (!response || response instanceof Error) return toast.error("Error al borrar incidentes");
    deleteIncident(id);
    toast.success("Se borraron todos los incidentes");
  };

  const handleDeleteRoute = async ({ id }: Route) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar esta ruta?")) return;
    const response = await loadAbortable(removeRoute(id));
    if (!response || response instanceof Error) return toast.error("Error al borrar rutas");
    deleteRoute(id);
    toast.success("Se borraron todas las rutas");
  };

  const handleDeleteCar = async ({ id }: Car) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este vehículo?")) return;
    const response = await loadAbortable(removeCar(id));
    if (!response || response instanceof Error) return toast.error("Error al borrar vehículos");
    deleteCar(id);
    toast.success("Se borraron todos los vehículos");
  };

  const handleDeleteCollectionCenter = async ({ id }: CollectionCenter) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este centro de acopio?")) return;
    const response = await loadAbortable(removeCollectionCenter(id));
    if (!response || response instanceof Error)
      return toast.error("Error al borrar centros de acopio");
    deleteCollectionCenter(id);
    toast.success("Se borraron todos los centros de acopio");
  };

  const handleClearParcels = async () => {
    parcels.forEach((parcel) => deletePoint(`parcel-${parcel.id}`));
    clearParcels();
    toast.success("Se limpiaron todas las parcelas");
  };

  const handleClearCollectionCenters = async () => {
    collectionCenters.forEach((center) => deletePoint(`collection-center-${center.id}`));
    clearCollectionCenters();
    toast.success("Se limpiaron todos los centros de acopio");
  };

  return (
    <Tabs defaultValue="tab1" className="w-full h-[calc(100vh-6rem)]">
      <TabsList className="flex flex-row items-center justify-centerw-full">
        <div className="flex flex-row w-full bg-white gap-2">
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
                <DropdownMenuItem onClick={handleClearParcels}>
                  Limpiar Parcelas
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
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
                <DropdownMenuItem onClick={handleClearCollectionCenters}>
                  Limpiar Centro de Acopio
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
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
                <DropdownMenuItem onClick={clearCars}>
                  Limpiar Vehículos
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
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
                <DropdownMenuItem onClick={clearIncidents}>
                  Limpiar Incidentes
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
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
                <DropdownMenuItem onClick={clearRoutes}>
                  Limpiar Trazar Ruta
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Recolecciones</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Opciones de Recolecciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setRecollectionForm((prev) => !prev)}>
                  Agregar Recoleccion
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={loadRecollections}>
                  Cargar Recolecciones
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={clearRecollections}>
                  Limpiar Recolecciones
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <TabsTrigger value="tab1">Mapa interactivo</TabsTrigger>
        <TabsTrigger value="tab2">Tabla de datos</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="flex flex-col items-center justify-center">
        <div className="h-[calc(100vh-8rem)] w-full mt-4 z-0">
          <MapaInteractivo isMarking={isMarking} FormComponent={currentForm.current} />
        </div>
      </TabsContent>

      <TabsContent value="tab2">
        <Tabs defaultValue="typeA" className="w-full h-full">
          <TabsList>
            <TabsTrigger value="typeA">Parcelas</TabsTrigger>
            <TabsTrigger value="typeB">Centros de Acopio</TabsTrigger>
            <TabsTrigger value="typeC">Vehículos</TabsTrigger>
            <TabsTrigger value="typeD">Incidentes</TabsTrigger>
            <TabsTrigger value="typeE">Rutas</TabsTrigger>
            <TabsTrigger value="typeF">Recolecciones</TabsTrigger>
          </TabsList>
          <TabsContent value="typeA" className="h-full overflow-auto">
            <GenericTable
              data={parcels}
              columns={[
                { key: "id", label: "ID" },
                { key: "name", label: "Nombre" },
                { key: "lat", label: "Latitud" },
                { key: "lng", label: "Longitud" },
                { key: "amountKg", label: "Cantidad (kg)" },
                { key: "distanceKm", label: "Distancia (km)" },
                { key: "roadCondition", label: "Condición del camino" },
                { key: "windowStar", label: "Temporal de la cosecha" },
                { key: "windowEnd", label: "Fecha de finalización" },
              ]}
              actions={[
                { fn: handleDeleteParcel, label: "Delete" },
                { fn: console.log, label: "Edit", disabled: true },
              ]}
            />
          </TabsContent>
          <TabsContent value="typeB" className="h-full overflow-auto">
            <GenericTable
              data={collectionCenters}
              columns={[
                { key: "id", label: "ID" },
                { key: "name", label: "Nombre" },
                { key: "lat", label: "Latitud" },
                { key: "lng", label: "Longitud" },
              ]}
              actions={[
                { fn: handleDeleteRecollection, label: "Delete" },
                { fn: console.log, label: "Edit", disabled: true },
              ]}
            />
          </TabsContent>
          <TabsContent value="typeC" className="h-full overflow-auto">
            <GenericTable
              data={cars}
              columns={[
                { key: "id", label: "ID" },
                { key: "available", label: "Disponibilidad" },
                { key: "type", label: "Tipo" },
                { key: "capacity", label: "Capacidad" },
                { key: "volume", label: "Volumen" },
              ]}
              actions={[
                { fn: handleDeleteIncident, label: "Delete" },
                { fn: console.log, label: "Edit", disabled: true },
              ]}
            />
          </TabsContent>
          <TabsContent value="typeD" className="h-full overflow-auto">
            <GenericTable
              data={incidents}
              columns={[
                { key: "id", label: "ID" },
                { key: "parcelID", label: "ID de Parcela" },
                { key: "type", label: "Tipo" },
                { key: "description", label: "Descripcion" },
                { key: "impactKg", label: "Impacto (kg)" },
                { key: "data", label: "Fecha" },
                { key: "status", label: "Estado" },
                { key: "observations", label: "Observaciones" },
              ]}
              actions={[
                { fn: handleDeleteRoute, label: "Delete" },
                { fn: console.log, label: "Edit", disabled: true },
              ]}
            />
          </TabsContent>
          <TabsContent value="typeE" className="h-full overflow-auto">
            <GenericTable
              data={routes}
              columns={[
                { key: "id", label: "ID" },
                { key: "origenId", label: "Origen" },
                { key: "destinoId", label: "Destino" },
                { key: "points", label: "Puntos" },
                { key: "distanceKm", label: "Distancia (km)" },
                { key: "timeEstimated", label: "Tiempo estimado (min)" },
                { key: "cost", label: "Costo" },
              ]}
              actions={[
                { fn: handleDeleteCar, label: "Delete" },
                { fn: console.log, label: "Edit", disabled: true },
              ]}
            />
          </TabsContent>
          <TabsContent value="typeF" className="h-full overflow-auto">
            <GenericTable
              data={recollections}
              columns={[
                { key: "id", label: "ID" },
                { key: "parcelId", label: "ID de Parcela" },
                { key: "carId", label: "ID de Vehiculo" },
                { key: "collectionCenterId", label: "ID de Centro de Acopio" },
                { key: "date", label: "Fecha" },
                { key: "status", label: "Estado" },
              ]}
              actions={[
                { fn: handleDeleteCollectionCenter, label: "Delete" },
                { fn: console.log, label: "Edit", disabled: true },
              ]}
            />
          </TabsContent>
        </Tabs>
      </TabsContent>

      <CarForm isOpen={openCarForm} toggle={() => setCarForm((prev) => !prev)} />
      <IncidentForm isOpen={openIncidentForm} toggle={() => setIncidentForm((prev) => !prev)} />
      <TraceForm isOpen={openTraceForm} toggle={() => setTraceForm((prev) => !prev)} />
      <RecollectionForm
        isOpen={openRecollectionForm}
        toggle={() => setRecollectionForm((prev) => !prev)}
      />
    </Tabs>
  );
}
