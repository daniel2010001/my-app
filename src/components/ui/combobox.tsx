"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";

type ComboboxOption = { value: string; label: string };
interface ComboboxDemoProps {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  emptyText?: string;
  children?: React.ReactNode;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  emptyText = "No hay opciones disponibles",
  children,
}: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-[240px] relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {options.find((framework) => framework.value === value)?.label ?? placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput placeholder="Buscar opción..." className="h-9" />
            <CommandList>
              {children && (
                <div className="flex flex-col p-2 pb-0">
                  {children}
                  <Separator className="my-1" />
                </div>
              )}
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((framework) => (
                  <CommandItem
                    key={`combobox-${framework.value}-${framework.label}`}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
