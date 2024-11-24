export default function HtmxPage() {
  return (
    <main className="flex flex-col justify-center gap-8">
      <span id="content">Blog Content</span>
      <div>
        <button
          className="flex h-4 w-28 flex-col justify-center bg-slate-200 p-10 text-black"
          hx-get="/api/posts/post-content"
          hx-trigger="click"
          hx-target="#content"
          hx-swap="innerHTML"
        >
          Click Me
        </button>
      </div>
    </main>
  );
}
