"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import type { Address } from "@/types/address";

import { SectionHeader } from "@/components/shared/section-header";
import { PageCard } from "@/components/shared/page-card";

import { AddressForm } from "./address-form";
import { AddressList } from "./address-list";

type AddressDashboardProps = {
    addresses: Address[];
};

export function AddressDashboard({
    addresses,
}: AddressDashboardProps) {
    const [selectedAddress, setSelectedAddress] =
        useState<Address | null>(null);
    const router = useRouter();

    async function handleDelete(address: Address) {
        try {
            await axios.delete(
                `/api/addresses/${address._id}`
            );

            toast.success(
                "Address deleted successfully."
            );

            router.refresh();

            if (
                selectedAddress?._id === address._id
            ) {
                setSelectedAddress(null);
            }
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to delete address."
            );
        }
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <SectionHeader
                title="My Addresses"
                subtitle="Manage your saved delivery addresses."
            />

            <div className="grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <PageCard
                        title={
                            selectedAddress
                                ? "Edit Address"
                                : "Add Address"
                        }
                    >
                        <AddressForm
                            address={selectedAddress}
                            onCancel={() =>
                                setSelectedAddress(null)
                            }
                        />
                    </PageCard>
                </div>

                <div className="lg:col-span-3">
                    <PageCard title="Saved Addresses">
                        <AddressList
                            addresses={addresses}
                            onEdit={setSelectedAddress}
                            onDelete={handleDelete}
                        />
                    </PageCard>
                </div>
            </div>
        </main>
    );
}