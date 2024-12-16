"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cars, Detail, Details, RouteFormData, routeSchema, Snapping, Snappings } from "@/models";
import { ButtonTitle } from "@/components/ui/button-title";

import { ChevronDown, MapPin } from "lucide-react";

export function RouteForm() {
  const form = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      vehicle: "car",
      points: [
        [0, 0],
        [0, 0],
      ],
      point_hints: [],
      snap_preventions: [],
      details: [],
      optimize: false,
      instructions: false,
    },
  });

  const {
    fields: pointFields,
    append: appendPoint,
    remove: removePoint,
  } = useFieldArray({
    control: form.control,
    name: "points",
  });

  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
  } = useFieldArray({
    control: form.control,
    name: "point_hints" as "points",
  });

  function onSubmit(data: RouteFormData) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonTitle variant="default" size={"icon"} title="Generar ruta">
          <MapPin />
        </ButtonTitle>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <div>
              <FormLabel>Puntos</FormLabel>
              {pointFields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2 mt-2">
                  <Input
                    {...form.register(`points.${index}.0` as const, { valueAsNumber: true })}
                    placeholder="Latitud"
                  />
                  <Input
                    {...form.register(`points.${index}.1` as const, { valueAsNumber: true })}
                    placeholder="Longitud"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePoint(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendPoint([0, 0])}
                className="mt-2"
              >
                Agregar locaci&oacute;n
              </Button>
            </div>

            <div>
              <FormLabel>Sugerencias de puntos</FormLabel>
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendHint([0, 0])}
                className="mt-2"
              >
                Agregar sugerencia
              </Button>
            </div>

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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Incluir instrucciones</FormLabel>
                    <FormDescription>Incluye instrucciones detalladas para la ruta</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
