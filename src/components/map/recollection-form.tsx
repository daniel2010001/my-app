"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RecollectionsAdapter } from "@/adapters";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadAbortable } from "@/lib";
import { cn } from "@/lib/utils";
import { CarsAvailable, RecollectionSchema, RecollectionStatus } from "@/models";
import { createRecollection } from "@/services";
import {
  useCarStore,
  useCollectionCenterStore,
  useParcelStore,
  useRecollectionStore,
} from "@/store";

import { CalendarIcon, Loader2 } from "lucide-react";

export function RecollectionForm({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  const { parcels } = useParcelStore();
  const { collectionCenters } = useCollectionCenterStore();
  const { cars } = useCarStore();
  const { addRecollection } = useRecollectionStore();
  const [reset, setReset] = useState(true);
  const form = useForm<RecollectionSchema>({
    resolver: zodResolver(RecollectionSchema),
    defaultValues: { parcelId: "", carId: "", centerId: "" },
  });

  async function onSubmit(values: RecollectionSchema) {
    const response = await loadAbortable(
      createRecollection(RecollectionsAdapter.toRequest(values))
    );
    if (!response || response instanceof Error) return toast.error("Error al guardar incidente");
    addRecollection(RecollectionsAdapter.toRecollection(response.data));
    toast.success("Incidente guardado correctamente");
  }
  function onReset() {
    toggle();
    if (reset) form.reset();
  }
  return (
    <Dialog open={isOpen} onOpenChange={onReset}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir nuevo Recolección</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Ingresa los detalles de la nueva recolección aquí. Haz clic en enviar cuando hayas
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="parcelId"
              render={({ field }) => (
                <FormItem className="flex flex-wrap justify-between items-center">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Parcela
                    <FormDescription>Selecciona la parcela para la recolección</FormDescription>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Selecciona una parcela" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {parcels.map((parcel) => (
                        <SelectItem key={`parcel-recollection-${parcel.id}`} value={parcel.id}>
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

            <FormField
              control={form.control}
              name="carId"
              render={({ field }) => (
                <FormItem className="flex flex-wrap justify-between items-center">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Vehículo
                    <FormDescription>Selecciona el vehículo para la recolección</FormDescription>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Selecciona una vehículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cars.map((car) => (
                        <SelectItem
                          key={`car-recollection-${car.id}`}
                          value={car.id}
                          disabled={car.available !== CarsAvailable.AVAILABLE}
                        >
                          {car.capacity} - {car.volume} cilindros
                        </SelectItem>
                      )) || (
                        <SelectItem value="0" disabled>
                          No hay vehiculos disponibles
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="centerId"
              render={({ field }) => (
                <FormItem className="flex flex-wrap justify-between items-center">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Centro de Acopio
                    <FormDescription>Selecciona el almacén para la recolección</FormDescription>
                  </FormLabel>
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

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-wrap justify-between items-center">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Estado de la Recolección
                    <FormDescription>Seleccione el estado de la recolección</FormDescription>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Seleccione el estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(RecollectionStatus).map(([key, value]) => (
                        <SelectItem key={`incident-status-${key}`} value={key}>
                          {value}
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
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between !mt-4">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Fecha de Recolección
                    <FormDescription>Seleccione la fecha de recolección</FormDescription>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-left font-normal !mt-0",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  "Registrar incidente"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
