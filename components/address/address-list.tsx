"use client";

import type { Address } from "@/types/address";

type AddressListProps = {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
};

export function AddressList({
  addresses,
  onEdit,
  onDelete,
}: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <p className="text-muted-foreground">
        No addresses found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address._id}
          className="rounded-xl border p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {address.fullName}
            </h3>

            {address.isDefault && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Default
              </span>
            )}
          </div>

          <p className="mt-2">
            {address.addressLine1}
          </p>

          {address.addressLine2 && (
            <p>{address.addressLine2}</p>
          )}

          {address.landmark && (
            <p>{address.landmark}</p>
          )}

          <p>
            {address.city}, {address.state}
          </p>

          <p>{address.postalCode}</p>

          <p className="mt-2">
            📞 {address.phone}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() =>
                onEdit(address)
              }
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(address)
              }
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}