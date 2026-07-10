import type { ProductFormValues } from "@/lib/validations/product";
import Product from "@/models/Product";

export async function getProducts(
  {
    search = "",
    category = "",
    sort = "newest",
  }: {
    search?: string;
    category?: string;
    sort?: string;
  } = {}
) {
  const filter: any = {};

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (
    category &&
    category !== "All"
  ) {
    filter.category = category;
  }

  let sortOption: Record<string, 1 | -1>;

  switch (sort) {
    case "price-asc":
      sortOption = {
        price: 1,
      };
      break;

    case "price-desc":
      sortOption = {
        price: -1,
      };
      break;

    case "rating":
      sortOption = {
        rating: -1,
      };
      break;

    default:
      sortOption = {
        createdAt: -1,
      };
  }

  const products =
    await Product.find(filter)
      .sort(sortOption)
      .lean();

  return products.map(
    (product) => ({
      ...product,
      _id: product._id.toString(),
    })
  );
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

export async function deleteProduct(
  id: string
) {
  return Product.findById(id);
}

export async function getProductById(
  id: string
) {
  const product =
    await Product.findById(id).lean();

  if (!product) {
    return null;
  }

  return {
    ...product,
    _id: product._id.toString(),
  };
}