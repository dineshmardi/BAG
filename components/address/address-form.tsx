"use client";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Address } from "@/types/address";

import {
    addressSchema,
    AddressFormValues,
} from "@/lib/validations/address";

type AddressFormProps = {
    address: Address | null;
    onCancel: () => void;
};

export function AddressForm({
    address,
    onCancel,
}: AddressFormProps) {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),

        defaultValues: {
            fullName: address?.fullName ?? "",
            phone: address?.phone ?? "",
            addressLine1: address?.addressLine1 ?? "",
            addressLine2: address?.addressLine2 ?? "",
            landmark: address?.landmark ?? "",
            city: address?.city ?? "",
            state: address?.state ?? "",
            postalCode: address?.postalCode ?? "",
            country: address?.country ?? "India",
            isDefault: address?.isDefault ?? false,
        },
    });


    useEffect(() => {
        reset({
            fullName: address?.fullName ?? "",
            phone: address?.phone ?? "",
            addressLine1: address?.addressLine1 ?? "",
            addressLine2: address?.addressLine2 ?? "",
            landmark: address?.landmark ?? "",
            city: address?.city ?? "",
            state: address?.state ?? "",
            postalCode: address?.postalCode ?? "",
            country: address?.country ?? "India",
            isDefault: address?.isDefault ?? false,
        });
    }, [address, reset]);

    async function onSubmit(
        data: AddressFormValues
    ) {
        try {
            if (address) {
                await axios.put(
                    `/api/addresses/${address._id}`,
                    data
                );

                toast.success("Address updated successfully.");
            } else {
                await axios.post(
                    "/api/addresses",
                    data
                );

                toast.success("Address added successfully.");
            }

            router.refresh();
            onCancel();
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Full Name
                </label>

                <input
                    {...register("fullName")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="John Doe"
                />

                {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.fullName.message}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Phone Number
                </label>

                <input
                    {...register("phone")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="9876543210"
                />

                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                    </p>
                )}
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Address Line 1
                </label>

                <input
                    {...register("addressLine1")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="House No, Street, Area"
                />

                {errors.addressLine1 && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.addressLine1.message}
                    </p>
                )}
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Address Line 2
                </label>

                <input
                    {...register("addressLine2")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Apartment, Floor (Optional)"
                />
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Landmark
                </label>

                <input
                    {...register("landmark")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Near..."
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        City
                    </label>

                    <input
                        {...register("city")}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                    {errors.city && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.city.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        State
                    </label>

                    <input
                        {...register("state")}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                    {errors.state && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.state.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        PIN Code
                    </label>

                    <input
                        {...register("postalCode")}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                    {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.postalCode.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Country
                    </label>

                    <input
                        {...register("country")}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    {...register("isDefault")}
                />

                <label>
                    Set as Default Address
                </label>
            </div>

            <button
                type="submit"
                className="rounded-lg bg-black px-5 py-2 text-white"
            >
                {isSubmitting
                    ? "Saving..."
                    : address
                        ? "Update Address"
                        : "Save Address"}
            </button>
        </form>
    );
}