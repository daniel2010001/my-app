"use client";

import { toast } from "sonner";

import { RouteForm } from "@/components/map/route-form";
import { ButtonTitle } from "@/components/ui/button-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { loadAbortable } from "@/lib";
import { removeAllPoints, removePoint } from "@/services";
import { useMapStore } from "@/store";

import { Download, Plus, Trash2, X } from "lucide-react";

interface ControlPanelProps {
  isMarking: boolean;
  toggleMarking: () => void;
}

export function ControlPanel({ isMarking, toggleMarking }: ControlPanelProps) {
  const { points, clearPoints, deletePoint } = useMapStore();

  const handleDownload = () => {
    const json = JSON.stringify(points, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = async () => {
    if (!window.confirm("¿Estás seguro de que quieres borrar todos los puntos?")) return;
    const response = await loadAbortable(removeAllPoints());
    if (!response || response instanceof Error) return toast.error("Error al borrar puntos");
    clearPoints();
    toast.success("Se borraron todos los puntos");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este punto?")) return;
    const response = await loadAbortable(removePoint(id));
    if (!response || response instanceof Error) return toast.error("Error al borrar puntos");
    deletePoint(id);
    toast.success("Se borraron todos los puntos");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-row gap-2">
        <ButtonTitle
          onClick={toggleMarking}
          variant={isMarking ? "destructive" : "default"}
          size={"icon"}
          title={isMarking ? "Desactivar Marcador" : "Activar Marcador"}
        >
          {isMarking ? <X /> : <Plus />}
        </ButtonTitle>
        <ButtonTitle
          onClick={handleClear}
          variant="destructive"
          size={"icon"}
          title="Borrar todos los puntos"
        >
          <Trash2 />
        </ButtonTitle>
        <ButtonTitle
          onClick={handleDownload}
          variant="default"
          size={"icon"}
          title="Descargar datos"
        >
          <Download />
        </ButtonTitle>
        <RouteForm />
      </div>
      <ScrollArea className="h-[300px] mt-4">
        <h3 className="font-bold mb-2">Puntos Marcados:</h3>
        {points.length === 0 ? (
          <p className="text-gray-500 italic">No hay puntos marcados aún.</p>
        ) : (
          <ul>
            {points.map((point, index) => (
              <li key={`${index}-${point.name}`} className="mb-2 p-2 bg-gray-100 rounded">
                <div className="flex flex-row gap-2 justify-between">
                  <div className="flex flex-col">
                    <span>{point.name || "Sin nombre"}</span>
                    <small>
                      Lat: {point.lat.toFixed(6)}, Lng: {point.lng.toFixed(6)}
                    </small>
                  </div>
                  <ButtonTitle
                    onClick={() => handleDelete(point.id)}
                    variant="destructive"
                    size={"icon"}
                    title="Borrar punto"
                  >
                    <Trash2 />
                  </ButtonTitle>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
}
