"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({
  value,
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    file: File
  ) {
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      onChange(data.imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      {value && (
        <div className="relative h-52 overflow-hidden rounded-lg border">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="400px"
          />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleUpload(file);
          }
        }}
      />

      <Button
        type="button"
        variant="outline"
        disabled={uploading}
        onClick={() =>
          inputRef.current?.click()
        }
      >
        <Upload className="mr-2 h-4 w-4" />

        {uploading
          ? "Uploading..."
          : value
            ? "Replace Image"
            : "Upload Image"}
      </Button>
    </div>
  );
}