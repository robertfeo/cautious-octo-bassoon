import Link from "next/link";

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/htmx">HTMX + Payload Content</Link>
        </div>
      </main>
    </div>
  );
}
