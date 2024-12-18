import { Check } from "lucide-react";

interface ListItemProps {
  title: string;
  description: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ModalItem({ title, description, isSelected = false, onSelect }: ListItemProps) {
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
      onClick={onSelect}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      {isSelected && <Check className="h-5 w-5" />}
    </div>
  );
}
