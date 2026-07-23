"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  ShoppingBag,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";

type Notification = {
  _id: string;
  type: string;
  title: string;
  message: string;
  orderId: string | null;
  isRead: boolean;
  createdAt: string;
};

export function AdminNotificationBell() {
  const router = useRouter();

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [isOpen, setIsOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  async function fetchNotifications() {
    try {
      const response = await fetch(
        "/api/admin/notifications",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return;
      }

      const data =
        await response.json();

      setNotifications(
        data.notifications ?? []
      );

      setUnreadCount(
        data.unreadCount ?? 0
      );
    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error
      );
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Check for new orders every 15 seconds
    const interval =
      setInterval(
        fetchNotifications,
        15000
      );

    return () =>
      clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function handleNotificationClick(
    notification: Notification
  ) {
    try {
      if (!notification.isRead) {
        await fetch(
          `/api/admin/notifications/${notification._id}`,
          {
            method: "PATCH",
          }
        );

        setNotifications(
          (current) =>
            current.map(
              (item) =>
                item._id ===
                notification._id
                  ? {
                      ...item,
                      isRead: true,
                    }
                  : item
            )
        );

        setUnreadCount(
          (count) =>
            Math.max(
              count - 1,
              0
            )
        );
      }

      setIsOpen(false);

      if (
        notification.orderId
      ) {
        router.push(
          `/admin/orders/${notification.orderId}`
        );
      }
    } catch (error) {
      console.error(
        "Failed to open notification:",
        error
      );
    }
  }

  function formatTime(
    date: string
  ) {
    const created =
      new Date(date);

    const now =
      new Date();

    const difference =
      now.getTime() -
      created.getTime();

    const minutes =
      Math.floor(
        difference / 60000
      );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours =
      Math.floor(
        minutes / 60
      );

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days =
      Math.floor(
        hours / 24
      );

    return `${days}d ago`;
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Bell Button */}
      <button
        type="button"
        onClick={() =>
          setIsOpen(
            (current) =>
              !current
          )
        }
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-[380px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h3 className="font-bold text-gray-900">
                Notifications
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${
                      unreadCount === 1
                        ? ""
                        : "s"
                    }`
                  : "You're all caught up"}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setIsOpen(false)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length ===
            0 ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>

                <p className="mt-4 font-semibold text-gray-900">
                  No notifications
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  New order alerts will
                  appear here.
                </p>
              </div>
            ) : (
              notifications.map(
                (notification) => (
                  <button
                    key={
                      notification._id
                    }
                    type="button"
                    onClick={() =>
                      handleNotificationClick(
                        notification
                      )
                    }
                    className={`flex w-full gap-4 border-b border-gray-100 px-5 py-4 text-left transition-colors hover:bg-gray-50 ${
                      !notification.isRead
                        ? "bg-[#fdfaf4]"
                        : "bg-white"
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f5ee] text-[#a98235]">
                      <ShoppingBag className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-gray-900">
                          {
                            notification.title
                          }
                        </p>

                        {!notification.isRead && (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#b99756]" />
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-5 text-gray-600">
                        {
                          notification.message
                        }
                      </p>

                      <p className="mt-2 text-xs font-medium text-gray-400">
                        {formatTime(
                          notification.createdAt
                        )}
                      </p>
                    </div>
                  </button>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}