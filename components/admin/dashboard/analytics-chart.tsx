"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    BarChart3,
} from "lucide-react";

type Range =
    | "7d"
    | "30d"
    | "year";

type AnalyticsData = {
    date?: string;
    month?: string;
    onlineRevenue: number;
    codRevenue: number;
    orders: number;
};

const ranges: {
    label: string;
    value: Range;
}[] = [
        {
            label: "7 Days",
            value: "7d",
        },
        {
            label: "30 Days",
            value: "30d",
        },
        {
            label: "Year",
            value: "year",
        },
    ];

export function AnalyticsChart() {
    const [
        range,
        setRange,
    ] =
        useState<Range>("7d");

    const [
        data,
        setData,
    ] =
        useState<
            AnalyticsData[]
        >([]);

    const [
        loading,
        setLoading,
    ] =
        useState(true);

    useEffect(() => {
        let cancelled =
            false;

        async function loadAnalytics() {
            setLoading(true);

            try {
                const response =
                    await fetch(
                        `/api/admin/analytics?range=${range}`,
                        {
                            cache:
                                "no-store",
                        }
                    );

                if (
                    !response.ok
                ) {
                    throw new Error(
                        "Failed to fetch analytics"
                    );
                }

                const result =
                    await response.json();

                if (!cancelled) {
                    setData(
                        result.data ??
                        []
                    );
                }
            } catch (
            error
            ) {
                console.error(
                    error
                );

                if (!cancelled) {
                    setData([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(
                        false
                    );
                }
            }
        }

        loadAnalytics();

        return () => {
            cancelled =
                true;
        };
    }, [range]);

    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}

            <div className="flex flex-col gap-5 border-b border-gray-100 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8f5ee] text-[#a98235]">
                        <BarChart3 className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">
                            Analytics Overview
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Revenue and order
                            performance over
                            time.
                        </p>
                    </div>
                </div>

                {/* Range */}

                <div className="flex items-center rounded-xl bg-gray-100 p-1">
                    {ranges.map(
                        (item) => (
                            <button
                                key={
                                    item.value
                                }
                                type="button"
                                onClick={() =>
                                    setRange(
                                        item.value
                                    )
                                }
                                className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${range ===
                                        item.value
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {
                                    item.label
                                }
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Chart */}

            <div className="p-6">
                {loading ? (
                    <div className="flex h-[360px] items-center justify-center">
                        <div className="text-sm font-medium text-gray-500">
                            Loading
                            analytics...
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Legend */}

                        <div className="mb-6 flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-[#a98235]" />

                                <span className="font-medium text-gray-600">
                                    Online
                                    Revenue
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-[#111827]" />

                                <span className="font-medium text-gray-600">
                                    COD Revenue
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-[#9ca3af]" />

                                <span className="font-medium text-gray-600">
                                    Orders
                                </span>
                            </div>
                        </div>

                        <div className="h-[360px] w-full">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <AreaChart
                                    data={
                                        data
                                    }
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 5,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={
                                            false
                                        }
                                        stroke="#e5e7eb"
                                    />

                                    <XAxis
                                        dataKey={
                                            range ===
                                                "year"
                                                ? "month"
                                                : "date"
                                        }
                                        tickLine={
                                            false
                                        }
                                        axisLine={
                                            false
                                        }
                                        tick={{
                                            fontSize: 12,
                                            fill: "#6b7280",
                                        }}
                                    />

                                    <YAxis
                                        tickLine={
                                            false
                                        }
                                        axisLine={
                                            false
                                        }
                                        tick={{
                                            fontSize: 12,
                                            fill: "#6b7280",
                                        }}
                                    />

                                    <Tooltip
                                        formatter={(
                                            value,
                                            name
                                        ) => {
                                            if (
                                                name ===
                                                "orders"
                                            ) {
                                                return [
                                                    value,
                                                    "Orders",
                                                ];
                                            }

                                            return [
                                                `₹${Number(
                                                    value
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}`,
                                                name ===
                                                    "onlineRevenue"
                                                    ? "Online Revenue"
                                                    : "COD Revenue",
                                            ];
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="onlineRevenue"
                                        stroke="#a98235"
                                        fill="#a98235"
                                        fillOpacity={
                                            0.12
                                        }
                                        strokeWidth={
                                            2
                                        }
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="codRevenue"
                                        stroke="#111827"
                                        fill="#111827"
                                        fillOpacity={
                                            0.06
                                        }
                                        strokeWidth={
                                            2
                                        }
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#9ca3af"
                                        fill="#9ca3af"
                                        fillOpacity={
                                            0.04
                                        }
                                        strokeWidth={
                                            2
                                        }
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}