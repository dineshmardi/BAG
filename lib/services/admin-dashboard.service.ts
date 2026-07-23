import Product from "@/models/Product";
import Order from "@/models/Order";
import Contact from "@/models/Contact";
import Category from "@/models/Category";

export async function getAdminDashboardStats() {
    const now = new Date();

    // Current month start
    const currentMonthStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    // Previous month start
    const previousMonthStart = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
    );

    const [
        totalProducts,
        outOfStockProducts,
        totalOrders,
        currentMonthOrders,
        previousMonthOrders,
        newMessages,
        totalCategories,

        // Online revenue
        onlineRevenueResult,
        currentMonthOnlineRevenueResult,
        previousMonthOnlineRevenueResult,

        // COD revenue
        codRevenueResult,
        currentMonthCodRevenueResult,
        previousMonthCodRevenueResult,
    ] = await Promise.all([
        // =========================
        // PRODUCTS
        // =========================

        Product.countDocuments(),

        Product.countDocuments({
            stock: {
                $lte: 0,
            },
        }),

        // =========================
        // ORDERS
        // =========================

        Order.countDocuments(),

        Order.countDocuments({
            createdAt: {
                $gte: currentMonthStart,
            },
        }),

        Order.countDocuments({
            createdAt: {
                $gte: previousMonthStart,
                $lt: currentMonthStart,
            },
        }),

        // =========================
        // MESSAGES
        // =========================

        Contact.countDocuments({
            status: "NEW",
        }),

        // =========================
        // CATEGORIES
        // =========================

        Category.countDocuments(),

        // =========================
        // TOTAL ONLINE REVENUE
        // Only successful Razorpay payments
        // =========================

        Order.aggregate([
            {
                $match: {
                    paymentMethod: "RAZORPAY",
                    paymentStatus: "PAID",
                    orderStatus: {
                        $ne: "CANCELLED",
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total",
                    },
                },
            },
        ]),

        // =========================
        // CURRENT MONTH
        // ONLINE REVENUE
        // =========================

        Order.aggregate([
            {
                $match: {
                    paymentMethod: "RAZORPAY",
                    paymentStatus: "PAID",
                    orderStatus: {
                        $ne: "CANCELLED",
                    },
                    createdAt: {
                        $gte: currentMonthStart,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total",
                    },
                },
            },
        ]),

        // =========================
        // PREVIOUS MONTH
        // ONLINE REVENUE
        // =========================

        Order.aggregate([
            {
                $match: {
                    paymentMethod: "RAZORPAY",
                    paymentStatus: "PAID",
                    orderStatus: {
                        $ne: "CANCELLED",
                    },
                    createdAt: {
                        $gte: previousMonthStart,
                        $lt: currentMonthStart,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total",
                    },
                },
            },
        ]),

        // =========================
        // TOTAL COD REVENUE
        // Count only delivered COD orders
        // =========================

        Order.aggregate([
            {
                $match: {
                    paymentMethod: "COD",
                    orderStatus: "DELIVERED",
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total",
                    },
                },
            },
        ]),

        // =========================
        // CURRENT MONTH
        // COD REVENUE
        // =========================

        Order.aggregate([
            {
                $match: {
                    paymentMethod: "COD",
                    orderStatus: "DELIVERED",
                    createdAt: {
                        $gte: currentMonthStart,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total",
                    },
                },
            },
        ]),

        // =========================
        // PREVIOUS MONTH
        // COD REVENUE
        // =========================

        Order.aggregate([
            {
                $match: {
                    paymentMethod: "COD",
                    orderStatus: "DELIVERED",
                    createdAt: {
                        $gte: previousMonthStart,
                        $lt: currentMonthStart,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total",
                    },
                },
            },
        ]),
    ]);

    // =========================
    // PRODUCT CALCULATIONS
    // =========================

    const activeProducts =
        totalProducts - outOfStockProducts;

    // =========================
    // ORDER GROWTH
    // =========================

    const orderGrowth =
        previousMonthOrders === 0
            ? currentMonthOrders > 0
                ? 100
                : 0
            : ((currentMonthOrders -
                previousMonthOrders) /
                previousMonthOrders) *
            100;

    // =========================
    // ONLINE REVENUE VALUES
    // =========================

    const onlineRevenue =
        onlineRevenueResult[0]?.total ?? 0;

    const currentMonthOnlineRevenue =
        currentMonthOnlineRevenueResult[0]
            ?.total ?? 0;

    const previousMonthOnlineRevenue =
        previousMonthOnlineRevenueResult[0]
            ?.total ?? 0;

    // Online revenue growth
    const onlineRevenueGrowth =
        previousMonthOnlineRevenue === 0
            ? currentMonthOnlineRevenue > 0
                ? 100
                : 0
            : ((currentMonthOnlineRevenue -
                previousMonthOnlineRevenue) /
                previousMonthOnlineRevenue) *
            100;

    // =========================
    // COD REVENUE VALUES
    // =========================

    const codRevenue =
        codRevenueResult[0]?.total ?? 0;

    const currentMonthCodRevenue =
        currentMonthCodRevenueResult[0]
            ?.total ?? 0;

    const previousMonthCodRevenue =
        previousMonthCodRevenueResult[0]
            ?.total ?? 0;

    // COD revenue growth
    const codRevenueGrowth =
        previousMonthCodRevenue === 0
            ? currentMonthCodRevenue > 0
                ? 100
                : 0
            : ((currentMonthCodRevenue -
                previousMonthCodRevenue) /
                previousMonthCodRevenue) *
            100;

    // =========================
    // RETURN DASHBOARD DATA
    // =========================

    return {
        // Products
        totalProducts,
        activeProducts,
        outOfStockProducts,

        // Orders
        totalOrders,
        currentMonthOrders,
        previousMonthOrders,
        orderGrowth,

        // Messages
        newMessages,

        // Categories
        totalCategories,

        // Online Revenue
        onlineRevenue,
        currentMonthOnlineRevenue,
        previousMonthOnlineRevenue,
        onlineRevenueGrowth,

        // COD Revenue
        codRevenue,
        currentMonthCodRevenue,
        previousMonthCodRevenue,
        codRevenueGrowth,
    };
}

export async function getRecentOrders(
    limit = 8
) {
    const orders = await Order.find({})
        .populate({
            path: "userId",
            select: "name email",
        })
        .sort({
            createdAt: -1,
        })
        .limit(limit)
        .lean();

    return orders.map(
        (order: any) => ({
            _id: order._id.toString(),

            customer: {
                name:
                    order.userId?.name ??
                    "Unknown Customer",

                email:
                    order.userId?.email ??
                    "",
            },

            items: order.items.map(
                (item: any) => ({
                    productId:
                        item.productId.toString(),

                    title:
                        item.title,

                    quantity:
                        item.quantity,

                    price:
                        item.price,
                })
            ),

            total:
                order.total,

            paymentMethod:
                order.paymentMethod,

            paymentStatus:
                order.paymentStatus,

            orderStatus:
                order.orderStatus,

            createdAt:
                order.createdAt.toISOString(),
        })
    );
}

export async function getLowStockProducts(
    threshold = 5,
    limit = 8
) {
    const products = await Product.find({
        stock: {
            $lt: threshold,
        },
    })
        .sort({
            stock: 1,
        })
        .limit(limit)
        .lean();

    return products.map(
        (product: any) => ({
            _id: product._id.toString(),

            title: product.title,

            images:
                product.images ?? [],

            stock:
                product.stock ?? 0,

            price:
                product.price ?? 0,

            onSale:
                product.onSale ?? false,

            salePrice:
                product.salePrice ?? null,
        })
    );
}

export type AnalyticsRange =
    | "7d"
    | "30d"
    | "year";

export async function getDashboardAnalytics(
    range: AnalyticsRange = "7d"
) {
    // =========================
    // TIMEZONE CONFIGURATION
    // =========================

    const TIME_ZONE =
        "Asia/Kolkata";

    const now =
        new Date();

    // =========================
    // HELPER:
    // GET YYYY-MM-DD IN IST
    // =========================

    function getISTDateKey(
        date: Date
    ) {
        const parts =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone:
                        TIME_ZONE,

                    year:
                        "numeric",

                    month:
                        "2-digit",

                    day:
                        "2-digit",
                }
            ).formatToParts(
                date
            );

        const year =
            parts.find(
                (part) =>
                    part.type ===
                    "year"
            )?.value;

        const month =
            parts.find(
                (part) =>
                    part.type ===
                    "month"
            )?.value;

        const day =
            parts.find(
                (part) =>
                    part.type ===
                    "day"
            )?.value;

        return `${year}-${month}-${day}`;
    }

    // =========================
    // HELPER:
    // DISPLAY DATE IN IST
    // =========================

    function getISTDisplayDate(
        date: Date
    ) {
        return new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone:
                    TIME_ZONE,

                day:
                    "2-digit",

                month:
                    "short",
            }
        ).format(date);
    }

    // =========================
    // GET TODAY IN IST
    // =========================

    const todayKey =
        getISTDateKey(now);

    const [
        currentYear,
        currentMonth,
        currentDay,
    ] =
        todayKey
            .split("-")
            .map(Number);

    // =========================
    // BUILD START DATE
    //
    // We create UTC dates that
    // represent IST calendar days.
    // IST = UTC + 5:30
    // =========================

    let numberOfDays =
        range === "7d"
            ? 7
            : 30;

    let startDate: Date;

    if (
        range === "year"
    ) {
        // Jan 1, 00:00 IST
        // = Dec 31, 18:30 UTC

        startDate =
            new Date(
                Date.UTC(
                    currentYear,
                    0,
                    1,
                    -5,
                    -30
                )
            );
    } else {
        // Today's midnight IST
        const todayStartIST =
            new Date(
                Date.UTC(
                    currentYear,
                    currentMonth -
                    1,
                    currentDay,
                    -5,
                    -30
                )
            );

        startDate =
            new Date(
                todayStartIST
            );

        startDate.setUTCDate(
            startDate.getUTCDate() -
            (numberOfDays -
                1)
        );
    }

    // =========================
    // FETCH ORDERS
    // =========================

    const orders =
        await Order.find({
            createdAt: {
                $gte:
                    startDate,
            },

            orderStatus: {
                $nin: [
                    "CANCELLED",
                    "RETURNED",
                ],
            },
        })
            .select(
                "total paymentMethod paymentStatus orderStatus createdAt"
            )
            .sort({
                createdAt: 1,
            })
            .lean();

    // =========================
    // YEAR VIEW
    // =========================

    if (
        range === "year"
    ) {
        const months =
            Array.from(
                {
                    length: 12,
                },
                (
                    _,
                    index
                ) => ({
                    month:
                        new Intl.DateTimeFormat(
                            "en-US",
                            {
                                month:
                                    "short",

                                timeZone:
                                    TIME_ZONE,
                            }
                        ).format(
                            new Date(
                                Date.UTC(
                                    currentYear,
                                    index,
                                    15
                                )
                            )
                        ),

                    onlineRevenue:
                        0,

                    codRevenue:
                        0,

                    orders:
                        0,
                })
            );

        for (
            const order of
            orders
        ) {
            // Convert order date
            // to IST month

            const monthString =
                new Intl.DateTimeFormat(
                    "en-US",
                    {
                        timeZone:
                            TIME_ZONE,

                        month:
                            "numeric",
                    }
                ).format(
                    new Date(
                        order.createdAt
                    )
                );

            const monthIndex =
                Number(
                    monthString
                ) - 1;

            if (
                monthIndex <
                0 ||
                monthIndex >
                11
            ) {
                continue;
            }

            // Count every valid order
            months[
                monthIndex
            ].orders += 1;

            // =========================
            // ONLINE REVENUE
            //
            // Only successful
            // Razorpay payments
            // =========================

            if (
                order.paymentMethod ===
                "RAZORPAY" &&
                order.paymentStatus ===
                "PAID"
            ) {
                months[
                    monthIndex
                ].onlineRevenue +=
                    order.total;
            }

            // =========================
            // COD REVENUE
            //
            // Only delivered COD
            // orders count as revenue
            // =========================

            if (
                order.paymentMethod ===
                "COD" &&
                order.orderStatus ===
                "DELIVERED"
            ) {
                months[
                    monthIndex
                ].codRevenue +=
                    order.total;
            }
        }

        return months;
    }

    // =========================
    // 7 DAY / 30 DAY VIEW
    // =========================

    const days =
        Array.from(
            {
                length:
                    numberOfDays,
            },
            (_, index) => {
                const date =
                    new Date(
                        startDate
                    );

                date.setUTCDate(
                    date.getUTCDate() +
                    index
                );

                return {
                    key:
                        getISTDateKey(
                            date
                        ),

                    date:
                        getISTDisplayDate(
                            date
                        ),

                    onlineRevenue:
                        0,

                    codRevenue:
                        0,

                    orders:
                        0,
                };
            }
        );

    // =========================
    // CREATE FAST DATE LOOKUP
    // =========================

    const dayMap =
        new Map(
            days.map(
                (day) => [
                    day.key,
                    day,
                ]
            )
        );

    // =========================
    // PROCESS ORDERS
    // =========================

    for (
        const order of
        orders
    ) {
        // IMPORTANT:
        // Convert order.createdAt
        // to IST before generating
        // the date key.

        const key =
            getISTDateKey(
                new Date(
                    order.createdAt
                )
            );

        const day =
            dayMap.get(
                key
            );

        if (!day) {
            continue;
        }

        // =========================
        // ORDER COUNT
        // =========================

        day.orders += 1;

        // =========================
        // ONLINE REVENUE
        // =========================

        if (
            order.paymentMethod ===
            "RAZORPAY" &&
            order.paymentStatus ===
            "PAID"
        ) {
            day.onlineRevenue +=
                order.total;
        }

        // =========================
        // COD REVENUE
        // =========================

        if (
            order.paymentMethod ===
            "COD" &&
            order.orderStatus ===
            "DELIVERED"
        ) {
            day.codRevenue +=
                order.total;
        }
    }

    // =========================
    // REMOVE INTERNAL KEY
    // =========================

    return days.map(
        ({
            key,
            ...day
        }) => day
    );
}