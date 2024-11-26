"use client";
import { useEffect } from "react";

export default function HtmxPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.htmx) {
      window.htmx.process(document.body);
    }
  }, []);

  console.log("HTMX PAGE");

  return (
    <main
      hx-get="/api/posts/post-content"
      hx-trigger="load"
      hx-target="#content"
      hx-swap="innerHTML"
      className="flex flex-col justify-center items-center gap-8 mx-96 text-justify"
    >
      <span id="content"></span>
    </main>
  );
}
