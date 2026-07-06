import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(2),

  phone: z.string().min(10),

  addressLine1: z.string().min(5),

  addressLine2: z.string().optional(),

  landmark: z.string().optional(),

  city: z.string().min(2),

  state: z.string().min(2),

  postalCode: z.string().min(6),

  country: z.string(),

  isDefault: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;