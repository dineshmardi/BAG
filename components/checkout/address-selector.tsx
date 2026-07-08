"use client";

import type { Address } from "@/types/address";

import { useCheckoutStore } from "@/stores/checkout-store";

type AddressSelectorProps = {
  addresses: Address[];
};

export function AddressSelector({
  addresses,
}: AddressSelectorProps) {
  const {
    selectedAddressId,
    setSelectedAddress,
  } = useCheckoutStore();

  if (addresses.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">
          Delivery Address
        </h2>

        <p className="text-muted-foreground">
          No saved addresses found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Delivery Address
      </h2>

      <div className="space-y-4">
        {addresses.map((address) => (
          <label
            key={address._id}
            className={`block cursor-pointer rounded-xl border p-4 transition ${
              selectedAddressId ===
              address._id
                ? "border-black bg-gray-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="address"
              checked={
                selectedAddressId ===
                address._id
              }
              onChange={() =>
                setSelectedAddress(
                  address._id
                )
              }
              className="mb-3"
            />

            <h3 className="font-semibold">
              {address.fullName}
            </h3>

            <p>{address.addressLine1}</p>

            {address.addressLine2 && (
              <p>{address.addressLine2}</p>
            )}

            <p>
              {address.city},{" "}
              {address.state}
            </p>

            <p>{address.postalCode}</p>

            <p className="mt-2">
              📞 {address.phone}
            </p>

            {address.isDefault && (
              <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Default
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}