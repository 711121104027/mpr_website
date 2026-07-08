//src/components/admin/FeatureInput.tsx

"use client";

import { Plus, Trash2 } from "lucide-react";

interface FeatureInputProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export default function FeatureInput({
  features,
  onChange,
}: FeatureInputProps) {
  const addFeature = () => {
    onChange([...features, ""]);
  };

  const updateFeature = (
    index: number,
    value: string
  ) => {
    const updated = [...features];
    updated[index] = value;
    onChange(updated);
  };

  const removeFeature = (index: number) => {
    const updated = features.filter(
      (_, i) => i !== index
    );

    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Product Features
          </h3>

          <p className="text-sm text-gray-500">
            Add important features of the product.
          </p>
        </div>

        <button
          type="button"
          onClick={addFeature}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          <Plus size={18} />
          Add Feature
        </button>
      </div>

      {/* Feature List */}

      {features.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
          No features added yet.
        </div>
      ) : (
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  updateFeature(
                    index,
                    e.target.value
                  )
                }
                placeholder={`Feature ${index + 1}`}
                className="h-11 flex-1 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-red-600"
              />

              <button
                type="button"
                onClick={() =>
                  removeFeature(index)
                }
                className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}