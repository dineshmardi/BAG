"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  prefix?: string;
  description?: string;
  trend?: number;
  alert?: boolean;
};

export function StatCard({
  title,
  value,
  icon,
  prefix = "",
  description,
  trend,
  alert = false,
}: StatCardProps) {
  const [displayValue, setDisplayValue] =
    useState(0);

  useEffect(() => {
    const duration = 700;
    const startTime =
      performance.now();

    let animationFrame: number;

    function animate(
      currentTime: number
    ) {
      const progress = Math.min(
        (currentTime - startTime) /
          duration,
        1
      );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      setDisplayValue(
        Math.floor(
          value * eased
        )
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(
            animate
          );
      }
    }

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () =>
      cancelAnimationFrame(
        animationFrame
      );
  }, [value]);

  const hasTrend =
    trend !== undefined;

  const positive =
    (trend ?? 0) >= 0;

  return (
    <div className="group relative flex min-h-[210px] h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f8f5ee] text-[#a98235] transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>

      {/* Badge / Trend */}
      <div className="mt-4 flex min-h-8 items-center justify-center">
        {alert ? (
          <span className="inline-flex min-w-[68px] items-center justify-center rounded-full bg-red-50 px-5 py-2 text-xs font-semibold leading-none tracking-[0.06em] text-red-600">
            NEW
          </span>
        ) : hasTrend ? (
          <span
            className={`inline-flex min-w-[86px] items-center justify-center gap-1 rounded-full px-4 py-2 text-xs font-semibold leading-none ${
              positive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 shrink-0" />
            )}

            <span>
              {positive ? "+" : ""}
              {trend?.toFixed(1)}%
            </span>
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="mt-3 flex w-full flex-col items-center text-center">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <p className="mt-2 text-center text-3xl font-bold tracking-tight">
          {prefix}
          {displayValue.toLocaleString(
            "en-IN"
          )}
        </p>

        {description && (
          <p className="mx-auto mt-2 max-w-[240px] text-center text-sm leading-6 text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}