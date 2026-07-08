"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  storeName: z.string().min(2),

  currency: z.string().min(1),

  shippingCharge: z.coerce.number().min(0),

  freeShippingAbove: z.coerce.number().min(0),

  codEnabled: z.boolean(),

  codMaximumAmount: z.coerce.number().min(0),

  razorpayEnabled: z.boolean(),

  taxPercentage: z.coerce.number().min(0),
});

type FormValues = z.output<typeof schema>;

type Props = {
  settings: FormValues;
};

export function StoreSettingsForm({
  settings,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
    },
  } = useForm<
    z.input<typeof schema>,
    any,
    z.output<typeof schema>
  >({
    resolver: zodResolver(schema),

    defaultValues: settings,
  });

  async function onSubmit(
    data: z.output<typeof schema>
  ) {
    console.log("Submitting...", data);
    try {
      await axios.put(
        "/api/store-settings",
        data
      );

      toast.success(
        "Settings updated successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update settings."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <Label>Store Name</Label>

        <Input
          {...register("storeName")}
        />
      </div>

      <div>
        <Label>Currency</Label>

        <Input
          {...register("currency")}
        />
      </div>

      <div>
        <Label>Shipping Charge</Label>

        <Input
          type="number"
          {...register("shippingCharge")}
        />
      </div>

      <div>
        <Label>
          Free Shipping Above
        </Label>

        <Input
          type="number"
          {...register(
            "freeShippingAbove"
          )}
        />
      </div>

      <div>
        <Label>
          Tax Percentage
        </Label>

        <Input
          type="number"
          {...register("taxPercentage")}
        />
      </div>

      <div>
        <Label>
          Maximum COD Amount
        </Label>

        <Input
          type="number"
          {...register(
            "codMaximumAmount"
          )}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("codEnabled")}
        />

        <Label>
          Enable Cash on Delivery
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register(
            "razorpayEnabled"
          )}
        />

        <Label>
          Enable Razorpay
        </Label>
      </div>

      <Button
      type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Saving..."
          : "Save Settings"}
      </Button>
    </form>
  );
}