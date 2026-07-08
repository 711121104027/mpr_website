//src/components/ui/Select.tsx

"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({
  label,
  placeholder = "Select",
  options,
  value,
  onChange,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    function handleEscape(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, []);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  function handleKeyDown(
    e: KeyboardEvent<HTMLButtonElement>
  ) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className}`}
    >
      {label && (
        <label className="mb-2 block text-[13px] font-medium text-[#4B4B4B]">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`flex h-12 w-full items-center justify-between rounded-lg border bg-white px-4 text-left transition-all duration-200
        ${
          isOpen
            ? "border-[#D41111]"
            : "border-[#D8D8D8] hover:border-[#B5B5B5]"
        }`}
      >
        <span
          className={`truncate text-[14px]
          ${
            selectedOption
              ? "text-[#222222]"
              : "text-[#9B9B9B]"
          }`}
        >
          {selectedOption
            ? selectedOption.label
            : placeholder}
        </span>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <ChevronDown
            size={18}
            className="text-[#888888]"
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.18,
            }}
            className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-lg"
          >
                      {options.map((option) => {
              const isSelected = value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-[14px] transition-colors duration-200 ${
                    isSelected
                      ? "bg-[#F8F8F8] font-medium text-[#D41111]"
                      : "text-[#333333] hover:bg-[#F7F7F7]"
                  }`}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="text-[#D41111]"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}