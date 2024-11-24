"use client";
import { useEffect } from "react";

export default function HtmxPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.htmx) {
      window.htmx.process(document.body);
    }
  }, []);

  return (
    <main className="flex flex-col justify-center gap-8">
      <span
        hx-get="/api/posts/post-content"
        hx-trigger="load"
        hx-target="#content"
        hx-swap="innerHTML"
        id="content"
      ></span>
    </main>
  );
}
