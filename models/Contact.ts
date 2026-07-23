import mongoose, {
  Schema,
  Document,
  models,
  model,
} from "mongoose";

export interface IContact
  extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW" | "READ";
}

const ContactSchema =
  new Schema<IContact>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      subject: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: ["NEW", "READ"],
        default: "NEW",
      },
    },
    {
      timestamps: true,
    }
  );

const Contact =
  models.Contact ||
  model<IContact>(
    "Contact",
    ContactSchema
  );

export default Contact;