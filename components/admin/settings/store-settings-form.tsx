"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

import {
  AlertTriangle,
  CheckCircle2,
  Construction,
  Save,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

const schema = z.object({
  storeName:
    z.string().min(2),

  currency:
    z.string().min(1),

  shippingCharge:
    z.coerce.number().min(0),

  freeShippingAbove:
    z.coerce.number().min(0),

  codEnabled:
    z.boolean(),

  codMaximumAmount:
    z.coerce.number().min(0),

  razorpayEnabled:
    z.boolean(),

  taxPercentage:
    z.coerce.number().min(0),

  // Maintenance
  maintenanceMode:
    z.boolean(),

  maintenanceTitle:
    z.string().min(2),

  maintenanceMessage:
    z.string().min(2),
});

type FormValues =
  z.output<typeof schema>;

type Props = {
  settings:
    FormValues;
};

export function StoreSettingsForm({
  settings,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,

    formState: {
      isSubmitting,
    },
  } = useForm<
    z.input<typeof schema>,
    any,
    z.output<typeof schema>
  >({
    resolver:
      zodResolver(schema),

    defaultValues: {
      ...settings,

      maintenanceMode:
        settings.maintenanceMode ??
        false,

      maintenanceTitle:
        settings.maintenanceTitle ??
        "We'll Be Back Soon",

      maintenanceMessage:
        settings.maintenanceMessage ??
        "We're currently making improvements to Luxe Bags. Please check back shortly.",
    },
  });

  const maintenanceMode =
    watch(
      "maintenanceMode"
    );

  async function onSubmit(
    data: FormValues
  ) {
    try {
      await axios.put(
        "/api/store-settings",
        data
      );

      toast.success(
        maintenanceMode
          ? "Settings saved. Maintenance mode is enabled."
          : "Store settings updated successfully."
      );
    } catch (error) {
      console.error(
        error
      );

      toast.error(
        "Failed to update settings."
      );
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit(
          onSubmit
        )
      }
      className="space-y-8"
    >
      {/* =========================
          MAINTENANCE MODE
      ========================= */}

      <section
        className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 ${
          maintenanceMode
            ? "border-amber-300 bg-amber-50"
            : "border-green-200 bg-white"
        }`}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                maintenanceMode
                  ? "bg-amber-100 text-amber-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {maintenanceMode ? (
                <Construction className="h-6 w-6" />
              ) : (
                <CheckCircle2 className="h-6 w-6" />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-950">
                Maintenance Mode
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
                Control whether
                customers can access
                the Luxe Bags
                storefront.
              </p>
            </div>
          </div>

          {/* Toggle */}
          <label className="flex cursor-pointer items-center gap-3">
            <span
              className={`text-sm font-semibold ${
                maintenanceMode
                  ? "text-amber-700"
                  : "text-green-700"
              }`}
            >
              {maintenanceMode
                ? "Maintenance ON"
                : "Store Online"}
            </span>

            <div className="relative">
              <input
                type="checkbox"
                {...register(
                  "maintenanceMode"
                )}
                className="peer sr-only"
              />

              <div className="h-7 w-12 rounded-full bg-gray-300 transition-colors peer-checked:bg-amber-500" />

              <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>

        {/* Maintenance warning */}
        {maintenanceMode && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-white p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <p className="text-sm leading-6 text-amber-800">
              Maintenance mode
              is enabled. After
              saving these settings,
              customers will see the
              maintenance page instead
              of the storefront. Your
              admin dashboard will
              remain accessible.
            </p>
          </div>
        )}

        {/* Maintenance Content */}
        <div className="mt-6 grid gap-6">
          <div>
            <Label htmlFor="maintenanceTitle">
              Maintenance Page
              Title
            </Label>

            <Input
              id="maintenanceTitle"
              className="mt-2"
              {...register(
                "maintenanceTitle"
              )}
            />
          </div>

          <div>
            <Label htmlFor="maintenanceMessage">
              Maintenance Message
            </Label>

            <textarea
              id="maintenanceMessage"
              rows={4}
              {...register(
                "maintenanceMessage"
              )}
              className="mt-2 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>
      </section>

      {/* =========================
          GENERAL SETTINGS
      ========================= */}

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-950">
          General Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure your store,
          shipping and tax
          preferences.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <Label>
              Store Name
            </Label>

            <Input
              className="mt-2"
              {...register(
                "storeName"
              )}
            />
          </div>

          <div>
            <Label>
              Currency
            </Label>

            <Input
              className="mt-2"
              {...register(
                "currency"
              )}
            />
          </div>

          <div>
            <Label>
              Shipping Charge
            </Label>

            <Input
              type="number"
              className="mt-2"
              {...register(
                "shippingCharge"
              )}
            />
          </div>

          <div>
            <Label>
              Free Shipping Above
            </Label>

            <Input
              type="number"
              className="mt-2"
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
              className="mt-2"
              {...register(
                "taxPercentage"
              )}
            />
          </div>

          <div>
            <Label>
              Maximum COD Amount
            </Label>

            <Input
              type="number"
              className="mt-2"
              {...register(
                "codMaximumAmount"
              )}
            />
          </div>
        </div>
      </section>

      {/* =========================
          PAYMENT METHODS
      ========================= */}

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-950">
          Payment Methods
        </h2>

        <div className="mt-6 space-y-4">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50">
            <input
              type="checkbox"
              {...register(
                "codEnabled"
              )}
              className="h-4 w-4"
            />

            <span className="font-medium text-gray-900">
              Enable Cash on
              Delivery
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50">
            <input
              type="checkbox"
              {...register(
                "razorpayEnabled"
              )}
              className="h-4 w-4"
            />

            <span className="font-medium text-gray-900">
              Enable Razorpay
            </span>
          </label>
        </div>
      </section>

      {/* Save */}
      <div className="flex w-full justify-end">
        <Button
          type="submit"
          disabled={
            isSubmitting
          }
          className="min-w-[180px]"
        >
          <Save className="mr-2 h-4 w-4" />

          {isSubmitting
            ? "Saving..."
            : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}