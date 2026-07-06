import type { ProductFormValues } from "@/lib/validations/product";
import Product from "@/models/Product";

export async function getProducts() {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .lean();

  return products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));
}

export async function createProduct(
  data: ProductFormValues
) {
  return Product.create({
    title: data.title,
    description: data.description,
    price: data.price,
    category: data.category,
    images: [data.image],
    stock: data.stock,
    featured: false,
    rating: 5,
    reviews: 0,
  });
}

export async function updateProduct(
  id: string,
  data: ProductFormValues
) {
  return Product.findByIdAndUpdate(
    id,
    {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      images: [data.image],
      stock: data.stock,
    },
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function deleteProduct(id: string) {
  return Product.findByIdAndDelete(id);
}

export async function getProductById(
  id: string
) {
  const product = await Product.findById(id).lean();

  if (!product) {
    return null;
  }

  return {
    ...product,
    _id: product._id.toString(),
  };
}