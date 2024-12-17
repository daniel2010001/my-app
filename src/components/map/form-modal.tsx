import { FC } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FormModalProps {
  lat: number;
  lng: number;
}
export type FormModal = FC<FormModalProps>;

interface FormModalContentProps {
  open: boolean;
  onOpenChange: () => void;
  FormComponent: FormModal;
}
export const FormModalContent: FC<FormModalContentProps & FormModalProps> = ({
  open,
  onOpenChange,
  FormComponent,
  lat,
  lng,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <FormComponent lat={lat} lng={lng} />
      </DialogContent>
    </Dialog>
  );
};
