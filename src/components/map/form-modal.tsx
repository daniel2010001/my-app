import { FC, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMapEvents } from "react-leaflet";

interface FormModalProps {
  lat: number;
  lng: number;
}
export type FormModal = FC<FormModalProps>;
export interface FormModalContentProps {
  isMarking: boolean;
  FormComponent: FormModal;
}
export const FormModalContent: FC<FormModalContentProps> = ({ isMarking, FormComponent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      if (isMarking) {
        setClickedPosition([e.latlng.lat, e.latlng.lng]);
        setIsModalOpen(true);
      }
    },
  });

  function onClose() {
    setIsModalOpen(false);
    setClickedPosition(null);
  }
  return clickedPosition && clickedPosition[0] && clickedPosition[1] ? (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <FormComponent lat={clickedPosition[0]} lng={clickedPosition[1]} />
      </DialogContent>
    </Dialog>
  ) : null;
};
