import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { JSX, SVGProps } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { IoRocketOutline } from "react-icons/io5";
import { MdShowChart } from "react-icons/md";
import { FiPieChart, FiStar } from "react-icons/fi";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <IoRocketOutline className="h-6 w-6" />
          <span className="text-lg font-semibold">Voyage</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/prices"
            className="flex items-center gap-2 transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            <MdShowChart className="h-5 w-5" />
            Prices
          </Link>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            <FiPieChart className="h-5 w-5" />
            Portfolio
          </Link>
          <Link
            href="/watchlist"
            className="flex items-center gap-2 transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            <FiStar className="h-5 w-5" />
            Watchlist
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline">Sign In</Button>
            <Button>Register</Button>
            <ModeToggle />
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <IoRocketOutline className="h-6 w-6" />
                <span className="text-lg font-semibold">Voyage</span>
              </Link>
              <div className="flex gap-1">
                <ModeToggle />
                <SheetClose asChild>
                  <Button variant="outline" size="icon">
                    <XIcon className="h-6 w-6" />
                    <span className="sr-only">Close navigation menu</span>
                  </Button>
                </SheetClose>
              </div>
            </div>
            <nav className="grid gap-4 px-4 py-6">
              <Link
                href="/prices"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                <MdShowChart className="h-5 w-5" />
                Prices
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                <FiPieChart className="h-5 w-5" />
                Portfolio
              </Link>
              <Link
                href="/watchlist"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                <FiStar className="h-5 w-5" />
                Watchlist
              </Link>
              <div className="flex flex-col gap-2">
                <Button variant="outline">Sign In</Button>
                <Button>Register</Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
