import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container px-96 py-20">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <button>
        <Link href="/">Go home</Link>
      </button>
    </div>
  );
}
