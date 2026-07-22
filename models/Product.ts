import mongoose, {
  Schema,
  Document,
  models,
  model,
} from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    salePrice: {
      type: Number,
      min: 0,
      default: null,
    },

    onSale: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  models.Product ||
  model<IProduct>(
    "Product",
    ProductSchema
  );

export default Product;