import { requireAdmin } from "@/lib/auth-admin";
import { connectDB } from "@/lib/mongodb";
import { getAllOrders } from "@/lib/services/order.service";

import { AdminOrdersPage } from "@/components/admin/orders/admin-orders-page";

export default async function AdminOrders() {
    await connectDB();

    await requireAdmin();

    // We'll replace this with proper admin-role checking later.
    // For now, any logged-in user can access the page during development.

    const orders = await getAllOrders();

    return (
        <AdminOrdersPage
            orders={JSON.parse(JSON.stringify(orders))}
        />
    );
}