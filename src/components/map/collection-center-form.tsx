"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { CollectionCentersAdapter } from "@/adapters";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadAbortable } from "@/lib";
import { createCollectionCenter } from "@/services";
import { FormModal } from "./form-modal";

export const CollectionCenterForm: FormModal = ({ lat, lng }) => {
  const PointFormSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }).default(""),
    lat: z.number({ required_error: "La latitud es obligatoria" }).min(-90).max(90).default(lat),
    lng: z.number({ required_error: "La longitud es obligatoria" }).min(-180).max(180).default(lng),
  });
  type PointFormSchema = z.infer<typeof PointFormSchema>;
  const PointFormLayout: Array<{ name: keyof PointFormSchema; label: string; disabled?: boolean }> =
    [
      { name: "name", label: "Nombre" },
      { name: "lat", label: "Latitud", disabled: true },
      { name: "lng", label: "Longitud", disabled: true },
    ];

  const form = useForm<PointFormSchema>({
    resolver: zodResolver(PointFormSchema),
    defaultValues: { name: "", lat, lng },
  });

  async function onSubmit(data: PointFormSchema) {
    const response = await loadAbortable(
      createCollectionCenter(CollectionCentersAdapter.toCollectionCentersRequest(data))
    );
    if (!response || response instanceof Error) return toast.error("Error al guardar punto");
    toast.success("Punto guardado correctamente");
  }

  return (
    <Form {...form}>
      <DialogHeader>
        <DialogTitle>Añadir nuevo Centro de Acopio</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Ingresa los detalles de la nueva colección aquí. Haz clic en enviar cuando hayas terminado.
      </DialogDescription>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        {PointFormLayout.map(({ name, label, disabled }) => (
          <FormField
            key={`collection-center-${name}`}
            name={name}
            disabled={disabled}
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <Label className="text-right">{label}:</Label>
                <FormControl>
                  <Input {...field} className="col-span-3" />
                </FormControl>
                <FormMessage className="col-start-2 col-span-3" />
              </FormItem>
            )}
          />
        ))}
        <DialogFooter>
          <Button type="submit">Guardar centro de acopio</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
