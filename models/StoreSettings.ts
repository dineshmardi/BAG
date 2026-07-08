import { Schema, model, models } from "mongoose";

const StoreSettingsSchema = new Schema(
  {
    storeName: {
      type: String,
      default: "Luxe Bags",
    },

    currency: {
      type: String,
      default: "INR",
    },

    shippingCharge: {
      type: Number,
      default: 99,
    },

    freeShippingAbove: {
      type: Number,
      default: 999,
    },

    codEnabled: {
      type: Boolean,
      default: true,
    },

    codMaximumAmount: {
      type: Number,
      default: 10000,
    },

    razorpayEnabled: {
      type: Boolean,
      default: false,
    },

    taxPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const StoreSettings =
  models.StoreSettings ||
  model("StoreSettings", StoreSettingsSchema);

export default StoreSettings;