//src/components/admin/ImageUploader.tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Loader2,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export interface UploadedImage {
  imageUrl: string;
  publicId: string;
}

interface PreviewImage {
  id: string;
  file: File;
  preview: string;
}

interface ImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxFiles?: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/avif": [".avif"],
  "image/gif": [".gif"],
};

export default function ImageUploader({
  value,
  onChange,
  maxFiles = 10,
}: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<
    PreviewImage[]
  >([]);

  const [uploading, setUploading] =
    useState(false);

  /**
   * Cleanup preview URLs
   */
  useEffect(() => {
    return () => {
      selectedFiles.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [selectedFiles]);

  /**
   * Validate files
   */
  const validateFiles = (
    files: File[]
  ): File[] => {
    const validFiles: File[] = [];

    for (const file of files) {
      if (
        !Object.keys(ACCEPTED_TYPES).includes(
          file.type
        )
      ) {
        toast.error(
          `${file.name} is not supported.`
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `${file.name} exceeds 10 MB.`
        );
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  /**
   * Drag & Drop
   */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles =
        validateFiles(acceptedFiles);

      if (
        selectedFiles.length +
          value.length +
          validFiles.length >
        maxFiles
      ) {
        toast.error(
          `Maximum ${maxFiles} images allowed.`
        );
        return;
      }

      const previews: PreviewImage[] =
        validFiles.map((file) => ({
          id:
  crypto.randomUUID?.() ??
  `${Date.now()}-${Math.random()}`,
          file,
          preview:
            URL.createObjectURL(file),
        }));

      setSelectedFiles((prev) => [
        ...prev,
        ...previews,
      ]);
    },
    [
      selectedFiles,
      value,
      maxFiles,
    ]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles,
    accept: ACCEPTED_TYPES,
  });

  /**
   * Remove Local Image
   */
  const removeSelectedFile = (
    id: string
  ) => {
    setSelectedFiles((prev) => {
      const image = prev.find(
        (item) => item.id === id
      );

      if (image) {
        URL.revokeObjectURL(
          image.preview
        );
      }

      return prev.filter(
        (item) => item.id !== id
      );
    });
  };

  /**
   * Remove Uploaded Image
   */
  const removeUploadedImage = (
    publicId: string
  ) => {
    onChange(
      value.filter(
        (image) =>
          image.publicId !== publicId
      )
    );

    toast.success(
      "Image removed."
    );
  };

    /**
   * Upload Images to Cloudinary
   */
  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      selectedFiles.forEach((image) => {
        formData.append("images", image.file);
      });

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Upload failed.");
        return;
      }

      const uploadedImages: UploadedImage[] = result;

      onChange([...value, ...uploadedImages]);

      selectedFiles.forEach((image) =>
        URL.revokeObjectURL(image.preview)
      );

      setSelectedFiles([]);

      toast.success(
        `${uploadedImages.length} image${
          uploadedImages.length > 1 ? "s" : ""
        } uploaded successfully.`
      );
    } catch (error) {
      console.error(error);

      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  /**
   * Total Images
   */
  const totalImages =
    value.length + selectedFiles.length;

  /**
   * Upload UI Starts Here
   */
  return (
    <div className="space-y-6">

      {/* Dropzone */}

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 transition-all duration-300 ${
          isDragActive
            ? "border-red-600 bg-red-50"
            : "border-gray-300 hover:border-red-500 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center text-center">

          <div className="mb-5 rounded-full bg-red-100 p-5">
            <Upload
              size={36}
              className="text-red-600"
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            {isDragActive
              ? "Drop Images Here"
              : "Drag & Drop Images"}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            or click to browse from your computer
          </p>

          <div className="mt-5 space-y-1 text-xs text-gray-400">
            <p>
              JPG • JPEG • PNG • WEBP • AVIF • GIF
            </p>

            <p>
              Maximum {maxFiles} Images
            </p>

            <p>
              Max File Size : 10 MB
            </p>
          </div>

          <div className="mt-5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
            {totalImages} / {maxFiles} Images Selected
          </div>
        </div>
      </div>

      {/* Upload Button */}

      {selectedFiles.length > 0 && (
        <div className="flex justify-end">

          <button
            type="button"
            onClick={uploadImages}
            disabled={uploading}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Images
              </>
            )}
          </button>

        </div>
      )}

            {/* Selected Images */}

      {selectedFiles.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <ImagePlus
              size={20}
              className="text-red-600"
            />

            <h3 className="text-lg font-semibold">
              Selected Images
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {selectedFiles.map((image) => (
              <div
                key={image.id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.preview}
                    alt={image.file.name}
                    fill
                    unoptimized
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeSelectedFile(image.id)
                    }
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 shadow transition group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="border-t p-3">
                  <p className="truncate text-xs font-medium text-gray-600">
                    {image.file.name}
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    {(image.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Images */}

      {value.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <ImagePlus
              size={20}
              className="text-green-600"
            />

            <h3 className="text-lg font-semibold">
              Uploaded Images
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {value.map((image) => (
              <div
                key={image.publicId}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt="Uploaded Image"
                    fill
                    unoptimized
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeUploadedImage(image.publicId)
                    }
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 shadow transition group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="border-t p-3">
                  <p className="truncate text-xs text-green-600 font-medium">
                    Uploaded Successfully
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}