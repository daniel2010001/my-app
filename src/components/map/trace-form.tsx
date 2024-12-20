"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { TraceAdapter } from "@/adapters";
import { Button } from "@/components/ui/button";
import { ButtonTitle } from "@/components/ui/button-title";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadAbortable } from "@/lib";
import {
  CarsType,
  Detail,
  Details,
  Snapping,
  Snappings,
  TraceFormData,
  TraceSchema,
} from "@/models";
import { traceRoute } from "@/services";
import { useCollectionCenterStore, useMapStore, useParcelStore } from "@/store";

import { ChevronDown, Loader2, Plus, Trash2 } from "lucide-react";

interface RouteFormProps {
  isOpen: boolean;
  toggle: () => void;
}

export function TraceForm({ isOpen, toggle }: RouteFormProps) {
  const [reset, setReset] = useState(true);
  const { points, addLine, setBounds } = useMapStore();
  const { parcels } = useParcelStore();
  const { collectionCenters } = useCollectionCenterStore();

  const form = useForm<TraceFormData>({
    resolver: zodResolver(TraceSchema),
    defaultValues: {
      vehicle: "truck",
      points: [],
      coordinates: [],
      point_hints: [],
      snap_preventions: [],
      details: [],
    },
  });
  const { fields: pointsFields, remove: removePoint } = useFieldArray({
    control: form.control,
    name: "points" as "coordinates",
  });

  const {
    fields: coordinateFields,
    append: appendCoordinate,
    remove: removeCoordinate,
  } = useFieldArray({ control: form.control, name: "coordinates" });

  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
  } = useFieldArray({ control: form.control, name: "point_hints" as "coordinates" });

  async function onSubmit(data: TraceFormData) {
    const response = await loadAbortable(traceRoute(TraceAdapter.toRequest(data, points)));
    if (!response || response instanceof Error) return;
    const traces = response.data.map(TraceAdapter.toTrace);
    const idLine = Date.now().toString();
    addLine(traces.map(({ points }, index) => ({ points, id: idLine + index })));
    const bbox: [number, number, number, number] = traces
      .map(({ bbox }) => bbox)
      .reduce(
        (acc, curr) => {
          return [
            Math.min(acc[0], curr[0]),
            Math.min(acc[1], curr[1]),
            Math.max(acc[2], curr[2]),
            Math.max(acc[3], curr[3]),
          ];
        },
        [Infinity, Infinity, -Infinity, -Infinity]
      );
    setBounds(bbox);
    if (reset) form.reset();
    toggle();
  }

  function onReset() {
    toggle();
    if (reset) form.reset();
  }

  function selectPoint(id: string) {
    const point = points.find((point) => point.id === id);
    if (!point) return;
    const formPoints = form.watch("points");
    formPoints.push(id);
    console.log(formPoints);
    form.setValue("points", formPoints);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onReset}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="basic" className="w-full">
          <DialogHeader>
            <DialogTitle className="text-center">Formulario de rutas</DialogTitle>
            <DialogDescription>
              Crear rutas para el mapa seleccionado el origen y destino
            </DialogDescription>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="advanced">Avanzado</TabsTrigger>
            </TabsList>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="min-h-64 flex flex-col"
            >
              <TabsContent value="basic" className="space-y-2 flex-grow">
                <FormField
                  control={form.control}
                  name="vehicle"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <FormLabel>Vehículo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Selecciona un vehículo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CarsType).map(([value, label]) => (
                            <SelectItem key={`car-${value}`} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Puntos</FormLabel>
                    <Combobox
                      options={[
                        ...collectionCenters
                          .filter(({ id }) => !form.watch("points").includes(id))
                          .map(({ id, name }) => ({ value: id, label: name })),
                        ...parcels
                          .filter(({ id }) => !form.watch("points").includes(id))
                          .map(({ id, name }) => ({ value: id, label: name })),
                      ]}
                      value={""}
                      onChange={selectPoint}
                      placeholder={
                        form.watch("points").length + form.watch("coordinates").length > 0
                          ? "Añadir otro punto"
                          : "Selecciona un punto"
                      }
                    >
                      <ButtonTitle
                        type="button"
                        variant="outline"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onClick={() => appendCoordinate([[undefined, undefined]] as any)}
                        title="Agregar Coordenada (lat, lng)"
                      >
                        <Plus />
                        Agregar Coordenadas
                      </ButtonTitle>
                    </Combobox>
                  </div>
                  {pointsFields.map((_, index) => {
                    const point = points.find(
                      (parcel) => parcel.id === form.watch("points")[index]
                    );
                    if (point)
                      return (
                        <div key={`point-${index}-${point.name}`} className="flex flex-row gap-2">
                          <div className="w-full border border-border px-2 flex items-center justify-between rounded">
                            <span className="text-md">{point.name || "Sin nombre"}</span>
                            <small className="text-muted-foreground">
                              Lat: {point.lat.toFixed(6)}, Lng: {point.lng.toFixed(6)}
                            </small>
                          </div>
                          <ButtonTitle
                            type="button"
                            onClick={() => removePoint(index)}
                            variant="outline"
                            size={"icon"}
                            title="Borrar punto"
                          >
                            <Trash2 />
                          </ButtonTitle>
                        </div>
                      );
                    return null;
                  })}
                  {coordinateFields.map((field, index) => (
                    <div
                      key={`coordinate-${index}-${field.id}`}
                      className="flex space-x-2 mt-2 w-full"
                    >
                      <div className="flex flex-col">
                        <Input
                          {...form.register(`coordinates.${index}.0` as const, {
                            valueAsNumber: true,
                          })}
                          placeholder="Latitud"
                        />
                        <FormMessage>
                          {form.formState.errors.coordinates?.[index]?.[0]?.message}
                        </FormMessage>
                      </div>
                      <div className="flex flex-col">
                        <Input
                          {...form.register(`coordinates.${index}.1` as const, {
                            valueAsNumber: true,
                          })}
                          placeholder="Longitud"
                        />
                        <FormMessage>
                          {form.formState.errors.coordinates?.[index]?.[1]?.message}
                        </FormMessage>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeCoordinate(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                  <FormMessage>{form.formState.errors.points?.message}</FormMessage>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-2 flex-grow">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel className="h-full flex flex-col gap-2">
                      Sugerencias de ruta
                      <FormDescription>
                        Agregar sugerencias de ruta para el punto seleccionado.
                      </FormDescription>
                    </FormLabel>
                    <ButtonTitle
                      type="button"
                      variant="outline"
                      size="icon"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => appendHint([""] as any)}
                      title="Agregar sugerencia"
                    >
                      <Plus />
                    </ButtonTitle>
                  </div>
                  {hintFields.map((field, index) => (
                    <div key={`${field.id}-hint`} className="flex items-center space-x-2 mt-2">
                      <Input {...form.register(`point_hints.${index}`)} placeholder="Sugerencia" />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeHint(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                  <FormMessage />
                </div>

                <FormField
                  control={form.control}
                  name="snap_preventions"
                  render={({ field }) => (
                    <FormItem className="flex flex-wrap items-center justify-between">
                      <FormLabel>Prevención de snapping</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-[200px] justify-between !m-0">
                              {field.value.length > 0
                                ? `${field.value.length} seleccionados`
                                : "Seleccionar"}
                              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" align="start">
                          <div className="p-4 space-y-2">
                            {Object.entries(Snappings).map(([key, value]) => (
                              <div key={`snapping-${key}`} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`snap-${key}`}
                                  checked={field.value.includes(key as Snapping)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...field.value, key]
                                      : field.value.filter((item) => item !== key);
                                    field.onChange(updatedValue);
                                  }}
                                />
                                <label
                                  htmlFor={`snap-${key}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {value}
                                </label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Selecciona las áreas que deseas evitar en la ruta.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem className="flex flex-wrap items-center justify-between">
                      <FormLabel>Detalles</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-[200px] justify-between">
                              {field.value.length > 0
                                ? `${field.value.length} seleccionados`
                                : "Seleccionar"}
                              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[200px] p-0 max-h-[150px] overflow-auto"
                          align="start"
                        >
                          <div className="p-4 space-y-2">
                            {Object.entries(Details).map(([key, value]) => (
                              <div key={`detail-${key}`} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`detail-${key}`}
                                  checked={field.value.includes(key as Detail)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...field.value, key]
                                      : field.value.filter((item) => item !== key);
                                    field.onChange(updatedValue);
                                  }}
                                />
                                <label
                                  htmlFor={`detail-${key}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {value}
                                </label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Selecciona los detalles que deseas incluir en la ruta.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <DialogFooter className="mt-2 flex !justify-between items-center ">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={reset} onCheckedChange={() => setReset((prev) => !prev)} />
                  <Label>Reiniciar al generar</Label>
                </div>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    "Generar ruta"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
