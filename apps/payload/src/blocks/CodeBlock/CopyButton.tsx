"use client";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [text, setText] = useState("Copy");

  function updateCopyStatus() {
    if (text === "Copy") {
      setText(() => "Copied!");
      setTimeout(() => {
        setText(() => "Copy");
      }, 1000);
    }
  }

  return (
    <div className="flex justify-end align-middle">
      <button
        className="flex gap-1"
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          updateCopyStatus();
        }}
      />
      <p>{text}</p>

      <div className="w-6 h-6 dark:invert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      </div>
    </div>
  );
}
