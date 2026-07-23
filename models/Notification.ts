import {
  Schema,
  model,
  models,
} from "mongoose";

const NotificationSchema =
  new Schema(
    {
      type: {
        type: String,
        enum: [
          "NEW_ORDER",
          "LOW_STOCK",
          "NEW_MESSAGE",
        ],
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        default: null,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const Notification =
  models.Notification ||
  model(
    "Notification",
    NotificationSchema
  );

export default Notification;