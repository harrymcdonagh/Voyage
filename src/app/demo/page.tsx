import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo",
};

export default function DemoPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Demo Page</h1>
      <p>This page links to another route that will be compiled on demand.</p>
      {/* Prefetch the next route so compilation happens before click */}
      <Link href="/demo/another" className="text-blue-600 underline" prefetch>
        Go to another page
      </Link>
    </div>
  );
}
