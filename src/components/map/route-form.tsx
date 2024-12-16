"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { RouteAdapter } from "@/adapters";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadAbortable } from "@/lib";
import {
  Cars,
  Detail,
  Details,
  Point,
  RouteFormData,
  routeSchema,
  Snapping,
  Snappings,
} from "@/models";
import { getRoute } from "@/services";
import { useMapStore } from "@/store";

import { ChevronDown, Loader2, Plus } from "lucide-react";

interface RouteFormProps {
  isOpen: boolean;
  toggle: () => void;
  points: Point[];
}

export function RouteForm({ isOpen, toggle, points }: RouteFormProps) {
  const [reset, setReset] = useState(true);
  const setRoutePoints = useMapStore((state) => state.setRoutePoints);

  const form = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      vehicle: "car",
      points: [],
      coordinates: [],
      point_hints: [],
      snap_preventions: [],
      details: [],
      optimize: false,
      instructions: false,
    },
  });
  // const {
  //   fields: pointFields,
  //   append: appendPoint,
  //   remove: removePoint,
  // } = useFieldArray({ control: form.control, name: "points" });

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

  async function onSubmit(data: RouteFormData) {
    const response = await loadAbortable(getRoute(data));
    if (!response || response instanceof Error) return;
    const routes = response.data.map(RouteAdapter.toRoute);
    setRoutePoints(routes.map(({ points }) => points));
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
    formPoints.push([point.lng, point.lat]);
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basic" className="space-y-2">
                <FormField
                  control={form.control}
                  name="vehicle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehículo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un vehículo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(Cars).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Combobox
                  options={points.map(({ id, name }) => ({ value: id, label: name }))}
                  value={
                    form.watch("points").length > 0
                      ? `${form.watch("points").length} seleccionados`
                      : ""
                  }
                  onChange={selectPoint}
                />

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="">Puntos</FormLabel>
                    <ButtonTitle
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => appendCoordinate([[0, 0]])}
                      className="hover:bg-green-300"
                      title="Agregar Coordenada (lat, lng)"
                    >
                      <Plus />
                    </ButtonTitle>
                  </div>
                  {coordinateFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2 mt-2 w-full">
                      <div className="flex flex-col">
                        <Input
                          {...form.register(`points.${index}.0` as const, { valueAsNumber: true })}
                          placeholder="Latitud"
                        />
                        <FormMessage>
                          {form.formState.errors.coordinates?.[index]?.[0]?.message}
                        </FormMessage>
                      </div>
                      <div className="flex flex-col">
                        <Input
                          {...form.register(`points.${index}.1` as const, { valueAsNumber: true })}
                          placeholder="Longitud"
                        />
                        <FormMessage>
                          {form.formState.errors.coordinates?.[index]?.[1]?.message}
                        </FormMessage>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCoordinate(index)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ))}
                  <FormMessage>{form.formState.errors.coordinates?.root?.message}</FormMessage>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Sugerencias de puntos</FormLabel>
                    <ButtonTitle
                      type="button"
                      variant="outline"
                      size="icon"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => appendHint([[""]] as any)}
                      className="hover:bg-green-300"
                      title="Agregar punto"
                    >
                      <Plus />
                    </ButtonTitle>
                  </div>
                  {hintFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2 mt-2">
                      <Input {...form.register(`point_hints.${index}`)} placeholder="Sugerencia" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeHint(index)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-2">
                <FormField
                  control={form.control}
                  name="snap_preventions"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Prevención de snapping</FormLabel>
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
                        <PopoverContent className="w-[200px] p-0" align="start">
                          <div className="p-4 space-y-2">
                            {Object.entries(Snappings).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2">
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
                    <FormItem className="flex flex-col">
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
                              <div key={key} className="flex items-center space-x-2">
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

                <FormField
                  control={form.control}
                  name="optimize"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Optimizar ruta</FormLabel>
                        <FormDescription>
                          Permite optimizar la ruta para un objetivo específico
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Incluir instrucciones</FormLabel>
                        <FormDescription>
                          Incluye instrucciones detalladas para la ruta
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <DialogFooter className="mt-2 flex !justify-between items-center ">
                {/* TODO: add checkbox by resetting form */}
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
