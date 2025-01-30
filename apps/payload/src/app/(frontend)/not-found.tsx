import Link from "next/link";

/* The `export default function NotFound()` is a React functional component that represents the page for a 404 error (page not found). 
Inside the component, it returns JSX elements that make up the content of the 404 page. */
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
