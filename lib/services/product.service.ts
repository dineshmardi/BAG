import Product from "@/models/Product";

export async function getProducts() {
  return await Product.find().sort({
    createdAt: -1,
  });
}

export async function createProduct(data: {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
}) {
  return await Product.create(data);
}