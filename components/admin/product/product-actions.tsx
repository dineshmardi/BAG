"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProductActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function ProductActions({
  onEdit,
  onDelete,
}: ProductActionsProps) {
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        variant="destructive"
        size="icon"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}