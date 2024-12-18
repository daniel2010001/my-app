"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ModalItem } from "./modal-item";

export type TabData = {
  title: string;
  items: { id: string; title: string; description: string }[];
  selectedFn: (id: string) => void;
};
export function ModalTab({ tabData }: { tabData: TabData[] }) {
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});

  const handleItemSelect = (tabIndex: number, itemId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [tabIndex]: itemId,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir Modal</Button>
      </DialogTrigger>
      <DialogContent className="!w-full">
        <DialogHeader>
          <DialogTitle>Modal con Pestañas</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {tabData.map((tab, index) => (
              <TabsTrigger key={index} value={index.toString()}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabData.map((tab, tabIndex) => (
            <TabsContent key={tabIndex} value={tabIndex.toString()}>
              <div className="space-y-4">
                {tab.items.map((item) => (
                  <ModalItem
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    isSelected={selectedItems[tabIndex] === item.id}
                    onSelect={() => handleItemSelect(tabIndex, item.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
