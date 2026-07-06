"use client";

import { Button } from "@/components/ui/button";

type QuantitySelectorProps = {
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export function QuantitySelector({
  max,
  value,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        type="button"
        onClick={() =>
          onChange(Math.max(1, value - 1))
        }
      >
        -
      </Button>

      <span className="w-10 text-center font-semibold">
        {value}
      </span>

      <Button
        variant="outline"
        type="button"
        onClick={() =>
          onChange(Math.min(max, value + 1))
        }
      >
        +
      </Button>
    </div>
  );
}