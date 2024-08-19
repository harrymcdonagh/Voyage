import React from "react";
import Link from "next/link";

interface CoinLinksProps {
  metadata: any; // You might want to define a more specific type here
}

const CoinLinks: React.FC<CoinLinksProps> = ({ metadata }) => (
  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
    {metadata.urls.website[0] && (
      <Link
        href={metadata.urls.website[0]}
        className="inline-flex h-12 items-center justify-center rounded-md bg-muted px-4 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        prefetch={false}
      >
        Website
      </Link>
    )}
    {metadata.urls.technical_doc[0] && (
      <Link
        href={metadata.urls.technical_doc[0]}
        className="inline-flex h-12 items-center justify-center rounded-md bg-muted px-4 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        prefetch={false}
      >
        Whitepaper
      </Link>
    )}
    {metadata.urls.source_code[0] && (
      <Link
        href={metadata.urls.source_code[0]}
        className="inline-flex h-12 items-center justify-center rounded-md bg-muted px-4 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        prefetch={false}
      >
        Source Code
      </Link>
    )}
  </div>
);

export default CoinLinks;
