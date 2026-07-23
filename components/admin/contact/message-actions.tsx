"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

type MessageActionsProps = {
  messageId: string;
  status: "NEW" | "READ";
};

export function MessageActions({
  messageId,
  status,
}: MessageActionsProps) {
  const router = useRouter();

  const [isUpdating, setIsUpdating] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  async function handleMarkAsRead() {
    try {
      setIsUpdating(true);

      const response = await fetch(
        `/api/contact/${messageId}`,
        {
          method: "PATCH",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update message."
        );
      }

      toast.success(
        "Message marked as read."
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update message."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this message?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      const response = await fetch(
        `/api/contact/${messageId}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete message."
        );
      }

      toast.success(
        "Message deleted successfully."
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete message."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-5">
      {status === "NEW" && (
        <button
          type="button"
          onClick={handleMarkAsRead}
          disabled={
            isUpdating ||
            isDeleting
          }
          className="inline-flex min-h-11 min-w-[160px] items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold leading-none text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="h-4 w-4 shrink-0" />

          <span>
            {isUpdating
              ? "Updating..."
              : "Mark as Read"}
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={handleDelete}
        disabled={
          isDeleting ||
          isUpdating
        }
        className="inline-flex min-h-11 min-w-[130px] items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-6 py-3 text-sm font-semibold leading-none text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4 shrink-0" />

        <span>
          {isDeleting
            ? "Deleting..."
            : "Delete"}
        </span>
      </button>
    </div>
  );
}