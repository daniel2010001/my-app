import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IncidentSchema, IncidentStatus, IncidentType } from "@/models";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function IncidentForm({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  const form = useForm<IncidentSchema>({
    resolver: zodResolver(IncidentSchema),
    defaultValues: {
      parcelId: 0,
      type: "BREACH",
      status: "PENDING",
      description: "",
      impactKg: 0,
      newCollectionDate: new Date(),
      observations: "",
    },
  });

  function onSubmit(values: IncidentSchema) {
    console.log(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir nuevo Incidente</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Ingresa los detalles de la nueva colección aquí. Haz clic en enviar cuando hayas
          terminado.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="parcelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID de Paquete</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Ingrese el ID del paquete afectado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-wrap justify-between items-center">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Tipo de Incidente
                    <FormDescription>Seleccione el tipo de incidente</FormDescription>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Seleccione el tipo de incidente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(IncidentType).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
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
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-wrap justify-between items-center">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Estado del Incidente
                    <FormDescription>Seleccione el estado actual del incidente</FormDescription>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Seleccione el estado del incidente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(IncidentStatus).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describa el incidente" />
                  </FormControl>
                  <FormDescription>
                    Proporcione una descripción detallada del incidente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="impactKg"
              render={({ field }) => (
                <FormItem className="flex flex-wrap justify-between items-center">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Impacto en Kg
                    <FormDescription>Ingrese el impacto en Kg (opcional)</FormDescription>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value ? Number(e.target.value) : undefined)
                      }
                      className="w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newCollectionDate"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between !mt-4">
                  <FormLabel className="h-full flex flex-col gap-2">
                    Nueva Fecha de Recolección
                    <FormDescription>
                      Seleccione la nueva fecha de recolección (opcional)
                    </FormDescription>
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
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Añada observaciones adicionales" />
                  </FormControl>
                  <FormDescription>Añada observaciones adicionales (opcional)</FormDescription>
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
