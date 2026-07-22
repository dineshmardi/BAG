import Product from "@/models/Product";

import { getStoreSettings } from "@/lib/services/store-settings.service";

type OrderItemInput = {
  productId: string;
  quantity: number;
};

export async function calculateOrder(
  items: OrderItemInput[]
) {
  const settings =
    await getStoreSettings();

  let subtotal = 0;

  const orderItems = [];

  for (const item of items) {
    const product =
      await Product.findById(
        item.productId
      );

    if (!product) {
      throw new Error(
        "Product not found."
      );
    }

    if (
      product.stock <
      item.quantity
    ) {
      throw new Error(
        `${product.title} has only ${product.stock} item(s) left in stock.`
      );
    }

    // Use sale price only when the sale is valid
    const effectivePrice =
      product.onSale &&
      product.salePrice != null &&
      product.salePrice > 0 &&
      product.salePrice <
        product.price
        ? product.salePrice
        : product.price;

    subtotal +=
      effectivePrice *
      item.quantity;

    // Store the actual price paid
    // in the order
    orderItems.push({
      productId:
        product._id,

      title:
        product.title,

      image:
        product.images[0],

      price:
        effectivePrice,

      quantity:
        item.quantity,
    });
  }

  const shipping =
    subtotal >=
    settings.freeShippingAbove
      ? 0
      : settings.shippingCharge;

  const tax =
    (subtotal *
      settings.taxPercentage) /
    100;

  const total =
    subtotal +
    shipping +
    tax;

  return {
    orderItems,
    subtotal,
    shipping,
    tax,
    total,
    settings,
  };
}