"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ParcelsAdapter, TraceAdapter } from "@/adapters";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-ranger-picker";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadAbortable } from "@/lib";
import { Corns, ParcelSchema, RoadCondition } from "@/models";
import { createParcel, traceRoute } from "@/services";
import { useCollectionCenterStore, useMapStore } from "@/store";
import { FormModal } from "./form-modal";

export const ParcelForm: FormModal = ({ lat, lng }) => {
  const { collectionCenters } = useCollectionCenterStore();
  const { points, addPoint, setBounds } = useMapStore();
  const form = useForm<ParcelSchema>({
    resolver: zodResolver(ParcelSchema),
    defaultValues: { name: "", amountKg: 0, lat: lat ?? 0, lng: lng ?? 0 },
  });
  const { windowEnd, windowStart } = form.formState.errors;

  function handleDateChange(date: DateRange | undefined) {
    if (!date) return;
    if (date.from) form.setValue("windowStart", date.from);
    else form.setValue("windowStart", undefined as unknown as Date);
    if (date.to) form.setValue("windowEnd", date.to);
    else form.setValue("windowEnd", undefined as unknown as Date);
    if (windowEnd) form.clearErrors("windowEnd");
    if (windowStart) form.clearErrors("windowStart");
  }

  async function onSubmit(data: ParcelSchema) {
    const center = collectionCenters.find((center) => center.id === data.centerId);
    if (!center) return toast.error("Error al guardar parcela");
    const payload = TraceAdapter.toRequest(
      {
        vehicle: "truck",
        points: [],
        coordinates: [
          [data.lat, data.lng],
          [center.lat, center.lng],
        ],
        point_hints: [],
        snap_preventions: [],
        details: [],
      },
      points
    );
    console.log(payload);
    const request = await loadAbortable(traceRoute(payload));
    if (!request || request instanceof Error) return toast.error("Error al guardar parcela");
    const values = Object.values(RoadCondition);
    const randomIndex = Math.floor(Math.random() * values.length); // Seleccionar el valor aleatorio const randomValue = values[randomIndex];
    const response = await loadAbortable(
      createParcel(
        ParcelsAdapter.toRequest({
          ...data,
          distanceKm:
            request.data.map((trace) => trace.distance).reduce((acc, curr) => acc + curr) / 1000,
          roadCondition: values[randomIndex],
        })
      )
    );
    if (!response || response instanceof Error) return toast.error("Error al guardar parcela");
    addPoint(ParcelsAdapter.toPoint(response.data));
    const bbox: [number, number, number, number] = request.data
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
    toast.success("Parcela guardada correctamente");
  }

  return (
    <Form {...form}>
      <DialogHeader>
        <DialogTitle>Añadir nueva parcela</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Ingresa los detalles de la nueva parcela aquí. Haz clic en enviar cuando hayas terminado.
      </DialogDescription>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" autoComplete="off">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-wrap justify-between items-center">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} className="w-56" placeholder="Nombre de la parcela" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="corn"
          render={({ field }) => (
            <FormItem className="flex flex-wrap justify-between items-center">
              <FormLabel>Tipo de maíz</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Selecciona un tipo de maíz" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Corns.map((corn) => (
                    <SelectItem key={`corn-${corn}`} value={corn}>
                      {corn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amountKg"
          render={({ field }) => (
            <FormItem className="flex flex-wrap justify-between items-center">
              <FormLabel>Cantidad (kg)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-56"
                  onChange={(e) => field.onChange(parseFloat(e.target.value || "0"))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="centerId"
          render={({ field }) => (
            <FormItem className="flex flex-wrap justify-between items-center">
              <FormLabel className="h-full flex flex-col gap-2">Centro de Acopio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecciona una almacén" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collectionCenters.map((parcel) => (
                    <SelectItem key={`collection-center-${parcel.id}`} value={parcel.id}>
                      {parcel.name}
                    </SelectItem>
                  )) || (
                    <SelectItem value="0" disabled>
                      No hay parcelas
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col space-y-2">
          <FormLabel className={windowEnd || windowStart ? "text-destructive" : undefined}>
            Temporal de la cosecha
          </FormLabel>
          <DatePickerWithRange onChange={handleDateChange} />
          {(windowStart &&
            ((windowEnd && (
              <FormMessage>Selecciona la fecha de inicio y fin de la cosecha</FormMessage>
            )) || <FormMessage>{windowStart.message}</FormMessage>)) ||
            (windowEnd && <FormMessage>{windowEnd.message}</FormMessage>)}
        </FormItem>

        <DialogFooter>
          <Button type="submit">Guardar parcela</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
