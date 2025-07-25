import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Another Page",
};

export default function AnotherPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Another Page</h1>
      <p>This page was compiled on demand. Click below to go back.</p>
      <Link href="/demo" className="text-blue-600 underline" prefetch>
        Back to demo
      </Link>
    </div>
  );
}
