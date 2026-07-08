import Order from "@/models/Order";

export async function createOrder(
  data: Record<string, unknown>
) {
  return Order.create(data);
}

export async function getOrdersByUserId(
  userId: string
) {
  return Order.find({ userId }).sort({
    createdAt: -1,
  });
}

export async function getOrderById(
  id: string
) {
  return Order.findById(id);
}

export async function updateOrder(
  id: string,
  data: Record<string, unknown>
) {
  return Order.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
}

export async function deleteOrder(
  id: string
) {
  return Order.findByIdAndDelete(id);
}

export async function getAllOrders() {
  return Order.find()
    .populate("userId", "name email")
    .sort({
      createdAt: -1,
    });
}

export async function updateOrderStatus(
  id: string,
  orderStatus: string
) {
  return Order.findByIdAndUpdate(
    id,
    {
      orderStatus,
    },
    {
      new: true,
    }
  );
}