import Address from "@/models/Address";

export async function getAddressesByUserId(
  userId: string
) {
  return Address.find({ userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });
}

export async function getAddressById(
  id: string
) {
  return Address.findById(id);
}

export async function createAddress(
  data: Record<string, unknown>
) {
  return Address.create(data);
}

export async function updateAddress(
  id: string,
  data: Record<string, unknown>
) {
  return Address.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
}

export async function deleteAddress(
  id: string
) {
  return Address.findByIdAndDelete(id);
}