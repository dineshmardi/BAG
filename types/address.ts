export type Address = {
  _id: string;
  userId: string;

  fullName: string;
  phone: string;

  addressLine1: string;
  addressLine2: string;

  landmark: string;

  city: string;
  state: string;

  postalCode: string;
  country: string;

  isDefault: boolean;

  createdAt?: string;
  updatedAt?: string;
};