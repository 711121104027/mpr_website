// src/components/admin/SparePartForm.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, Loader2, Upload, Trash2, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import type { SparePartItem } from "./SparePartTable";

const sparePartSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Spare part name must be at least 2 characters.")
    .max(100, "Spare part name is too long."),
});

type SparePartFormData = z.infer<typeof sparePartSchema>;

interface SparePartFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  sparePart?: SparePartItem | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/avif": [".avif"],
  "image/gif": [".gif"],
};

export default function SparePartForm({
  open,
  onClose,
  onSuccess,
  sparePart,
}: SparePartFormProps) {
  const isEdit = !!sparePart;
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Store uploaded image info
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState<string | null>(null);

  // Local pending file
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SparePartFormData>({
    resolver: zodResolver(sparePartSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (sparePart) {
      reset({
        name: sparePart.name,
      });
      setImageUrl(sparePart.imageUrl);
      setPublicId(sparePart.publicId ?? null);
      setLocalPreview(null);
    } else {
      reset({
        name: "",
      });
      setImageUrl("");
      setPublicId(null);
      setLocalPreview(null);
    }
  }, [sparePart, reset, open]);

  // Handle direct image file selection and auto-upload
  const uploadFile = async (file: File) => {
    if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
      toast.error("Unsupported file format. Please upload JPG, PNG, WEBP, or AVIF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File exceeds 10 MB limit.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setLocalPreview(previewUrl);

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("images", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to upload image.");
        setLocalPreview(null);
        return;
      }

      const uploaded = result[0];
      setImageUrl(uploaded.imageUrl);
      setPublicId(uploaded.publicId);
      setLocalPreview(null);
      toast.success("Image uploaded successfully.");
    } catch {
      toast.error("Image upload failed.");
      setLocalPreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: ACCEPTED_TYPES,
  });

  const handleRemoveImage = () => {
    setImageUrl("");
    setPublicId(null);
    if (localPreview) {
      URL.revokeObjectURL(localPreview);
      setLocalPreview(null);
    }
  };

  async function onSubmit(data: SparePartFormData) {
    if (!imageUrl && !localPreview) {
      toast.error("Please upload an image for the spare part.");
      return;
    }

    if (uploadingImage) {
      toast.error("Please wait for image upload to complete.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: data.name,
        imageUrl,
        publicId,
      };

      const response = await fetch(
        isEdit
          ? `/api/admin/spare-parts/${sparePart?.id}`
          : "/api/admin/spare-parts",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Something went wrong.");
        return;
      }

      toast.success(
        isEdit
          ? "Spare part updated successfully."
          : "Spare part added successfully."
      );

      onSuccess();
      onClose();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const currentDisplayImage = localPreview || imageUrl;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "Edit Spare Part" : "Add Spare Part"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {isEdit
                ? "Update spare part name or image."
                : "Add a new chair spare part."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          {/* Spare Part Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Spare Part Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              placeholder="e.g. Hydraulic System / Pin Wheel"
              className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-red-600"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Spare Part Image <span className="text-red-500">*</span>
            </label>

            {currentDisplayImage ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-50 p-3">
                <Image
                  src={currentDisplayImage}
                  alt="Spare Part Preview"
                  fill
                  unoptimized
                  className="object-contain p-2"
                />

                {uploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-medium shadow">
                      <Loader2 className="animate-spin text-red-600" size={18} />
                      <span className="text-sm text-gray-800">Uploading...</span>
                    </div>
                  </div>
                )}

                {!uploadingImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    title="Change / Remove Image"
                    className="absolute right-3 top-3 rounded-xl bg-red-600 p-2.5 text-white shadow-md transition hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
                  isDragActive
                    ? "border-red-600 bg-red-50"
                    : "border-gray-300 hover:border-red-500 hover:bg-gray-50"
                }`}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center">
                  <div className="mb-3 rounded-full bg-red-50 p-3 text-red-600">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {isDragActive
                      ? "Drop the image here"
                      : "Click or drag image to upload"}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    JPG, PNG, WEBP, AVIF (Max 10 MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="flex min-w-[140px] items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Save Spare Part"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
