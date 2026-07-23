import {
    Banknote,
    FolderTree,
    IndianRupee,
    MessageSquare,
    Package,
    ShoppingBag,
} from "lucide-react";

import {
    AnalyticsChart,
} from "@/components/admin/dashboard/analytics-chart";

import {
    LowStockAlerts,
} from "@/components/admin/dashboard/low-stock-alerts";
import {
    RecentOrders,
} from "@/components/admin/dashboard/recent-orders";

import { connectDB } from "@/lib/mongodb";

import {
    getAdminDashboardStats,
    getRecentOrders,
    getLowStockProducts,
} from "@/lib/services/admin-dashboard.service";

import {
    StatCard,
} from "@/components/admin/dashboard/stat-card";

export default async function AdminDashboardPage() {
    await connectDB();

    const [
        stats,
        recentOrders,
        lowStockProducts,
    ] = await Promise.all([
        getAdminDashboardStats(),
        getRecentOrders(8),
        getLowStockProducts(5, 8),
    ]);

    return (
        <div className="w-full">
            {/* =========================
          PAGE HEADER
      ========================== */}

            <div className="mb-8">
                <p className="text-sm font-semibold tracking-[0.16em] text-[#a98235]">
                    OVERVIEW
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">
                    Admin Dashboard
                </h1>

                <p className="mt-3 text-base text-gray-500">
                    Monitor your store performance,
                    orders, inventory and customer
                    activity.
                </p>
            </div>

            {/* =========================
          KPI GRID
      ========================== */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {/* Products */}

                <StatCard
                    title="Total Products"
                    value={
                        stats.totalProducts
                    }
                    icon={
                        <Package className="h-6 w-6" />
                    }
                    description={`${stats.activeProducts} active · ${stats.outOfStockProducts} out of stock`}
                />

                {/* Orders */}

                <StatCard
                    title="Total Orders"
                    value={
                        stats.totalOrders
                    }
                    trend={
                        stats.orderGrowth
                    }
                    icon={
                        <ShoppingBag className="h-6 w-6" />
                    }
                    description={`${stats.currentMonthOrders} orders this month`}
                />

                {/* Messages */}

                <StatCard
                    title="New Messages"
                    value={
                        stats.newMessages
                    }
                    alert={
                        stats.newMessages > 0
                    }
                    icon={
                        <MessageSquare className="h-6 w-6" />
                    }
                    description="Unread customer messages"
                />

                {/* Categories */}

                <StatCard
                    title="Categories"
                    value={
                        stats.totalCategories
                    }
                    icon={
                        <FolderTree className="h-6 w-6" />
                    }
                    description="Active product categories"
                />

                {/* Online Revenue */}

                <StatCard
                    title="Online Revenue"
                    value={
                        stats.onlineRevenue
                    }
                    prefix="₹"
                    trend={
                        stats.onlineRevenueGrowth
                    }
                    icon={
                        <IndianRupee className="h-6 w-6" />
                    }
                    description={`₹${stats.currentMonthOnlineRevenue.toLocaleString(
                        "en-IN"
                    )} this month`}
                />

                {/* COD Revenue */}

                <StatCard
                    title="COD Revenue"
                    value={
                        stats.codRevenue
                    }
                    prefix="₹"
                    trend={
                        stats.codRevenueGrowth
                    }
                    icon={
                        <Banknote className="h-6 w-6" />
                    }
                    description={`₹${stats.currentMonthCodRevenue.toLocaleString(
                        "en-IN"
                    )} this month`}
                />
            </div>

            {/* =========================
    DASHBOARD DATA SECTION
========================== */}

            <div className="mt-8 space-y-6">

                {/* Analytics - Full Width */}
                <div className="min-w-0 w-full">
                    <AnalyticsChart />
                </div>

                {/* Orders + Inventory Row */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

                    {/* Recent Orders */}
                    <div className="min-w-0 xl:col-span-8">
                        <RecentOrders
                            orders={recentOrders}
                        />
                    </div>

                    {/* Inventory Alerts */}
                    <div className="min-w-0 xl:col-span-4">
                        <LowStockAlerts
                            products={lowStockProducts}
                            threshold={5}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}