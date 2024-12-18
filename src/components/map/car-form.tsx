import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CarsAdapter } from "@/adapters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadAbortable } from "@/lib";
import { CarsAvailable, CarSchema, CarsType } from "@/models";
import { createCar } from "@/services";

export function CarForm({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  const form = useForm<CarSchema>({
    resolver: zodResolver(CarSchema),
    defaultValues: { type: "car", capacity: 0, volume: 0, available: "AVAILABLE" },
  });

  async function onSubmit(values: CarSchema) {
    const response = await loadAbortable(createCar(CarsAdapter.toRequest(values)));
    if (!response || response instanceof Error)
      return toast.error("Error al guardar centro de acopio");
    toast.success("Centro de acopio guardado correctamente");
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Añadir nuevo Vehículo</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Ingresa los detalles de la nueva vehículo aquí. Haz clic en enviar cuando hayas
            terminado.
          </DialogDescription>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Vehículo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo de vehículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(CarsType).map(([key, value]) => (
                        <SelectItem key={`car-${key}`} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Seleccione el tipo de vehículo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Ingrese la capacidad del vehículo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volumen</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Ingrese el volumen del vehículo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilidad</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la disponibilidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(CarsAvailable).map(([key, value]) => (
                        <SelectItem key={`vehicle-${key}`} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Seleccione la disponibilidad del vehículo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
