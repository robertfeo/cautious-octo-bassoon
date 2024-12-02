"use client";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [text, setText] = useState("Copy");

  function updateCopyStatus() {
    if (text === "Copy") {
      setText("Copied!");
      setTimeout(() => {
        setText("Copy");
      }, 1000);
    }
  }

  return (
    <button
      className="flex items-center gap-2 px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          updateCopyStatus();
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
      }}
      aria-label="Copy code to clipboard"
    >
      <span>{text}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
