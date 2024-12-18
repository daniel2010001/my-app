"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ParcelsAdapter } from "@/adapters";
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
import { Corns, ParcelSchema, RoadConditions } from "@/models";
import { FormModal } from "./form-modal";
import { createParcel } from "@/services";

export const ParcelForm: FormModal = ({ lat, lng }) => {
  const form = useForm<ParcelSchema>({
    resolver: zodResolver(ParcelSchema),
    defaultValues: { name: "", amountKg: 0, distanceKm: 0, lat: lat ?? 0, lng: lng ?? 0 },
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
    const response = await loadAbortable(createParcel(ParcelsAdapter.toParcelRequest(data)));
    if (!response || response instanceof Error) return toast.error("Error al guardar parcela");
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
          name="distanceKm"
          render={({ field }) => (
            <FormItem className="flex flex-wrap justify-between items-center">
              <FormLabel>Distancia (km)</FormLabel>
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
          name="roadCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condición del camino</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la condición del camino" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RoadConditions.map((condition) => (
                    <SelectItem key={`car-condition-${condition}`} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
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
