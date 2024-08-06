"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { JSX, SVGProps } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { IoRocketOutline } from "react-icons/io5";
import { MdShowChart } from "react-icons/md";
import { FiPieChart, FiStar } from "react-icons/fi";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function Nav() {
  const { status, data: session } = useSession();

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
          {status === "authenticated" && (
            <>
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
            </>
          )}

          {status === "loading" && <div>Loading...</div>}
          {status === "unauthenticated" && (
            <div className="flex items-center gap-4">
              <Link href="/api/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Button>Register</Button>
              <ModeToggle />
            </div>
          )}
          {status === "authenticated" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`${session.user!.image}`}
                    alt="@shadcn"
                    className="rounded-full hover:opacity-80 cursor-pointer"
                  />
                  <AvatarFallback className="rounded-full bg-primary flex items-center justify-center">
                    {session.user!.name![0]}
                  </AvatarFallback>
                  <span className="sr-only">Toggle user menu</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
                <IoRocketOutline className="h-7 w-7" />
                <span className="text-xl font-semibold">Voyage</span>
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
              {status === "unauthenticated" && (
                <div>
                  <Link href="/api/auth/signin" className="flex flex-col mb-2">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/api/auth/signin" className="flex flex-col">
                    <Button>Register</Button>
                  </Link>
                </div>
              )}
              {status === "authenticated" && (
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={`${session.user!.image}`}
                      alt="@shadcn"
                      className="rounded-full hover:opacity-80 cursor-pointer"
                    />
                    <AvatarFallback className="rounded-full bg-primary flex items-center justify-center">
                      {session.user!.name![0]}
                    </AvatarFallback>
                  </Avatar>
                  Profile
                </Link>
              )}
              <Link
                href="/prices"
                className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                <MdShowChart className="h-7 w-7" />
                Prices
              </Link>
              {status === "authenticated" && (
                <>
                  <Link
                    href="/portfolio"
                    className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                    prefetch={false}
                  >
                    <FiPieChart className="h-7 w-7" />
                    Portfolio
                  </Link>
                  <Link
                    href="/watchlist"
                    className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                    prefetch={false}
                  >
                    <FiStar className="h-7 w-7" />
                    Watchlist
                  </Link>
                  <Link href="/api/auth/signout" className="flex flex-col gap-2">
                    <Button>Logout</Button>
                  </Link>
                </>
              )}
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
