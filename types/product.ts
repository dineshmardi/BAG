export type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
  rating: number;
  reviews: number;
  createdAt?: string;
  updatedAt?: string;
};