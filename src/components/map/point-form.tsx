"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PointFormModalProps {
  lat: number;
  lng: number;
  onSubmit: (data: unknown) => Promise<void>;
}

export function PointFormModal({ lat, lng, onSubmit }: PointFormModalProps) {
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

  // const handleSubmit = async (data: PointFormSchema) => {
  //   const response = await loadAbortable(createPoint(PointsAdapter.toPointRequest(data)));
  //   if (!response || response instanceof Error) return toast.error("Error al guardar punto");

  //   toast.success("Punto guardado correctamente");
  // };

  return (
    <Form {...form}>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        {PointFormLayout.map(({ name, label, disabled }) => (
          <FormField
            key={name}
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
          <Button type="submit">Guardar punto</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
