import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { JSX, SVGProps } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { IoRocketOutline } from "react-icons/io5";
import { MdShowChart } from "react-icons/md";
import { FiPieChart, FiStar, FiSettings } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { signIn, signOut } from "../auth";
import { Lock } from "lucide-react";
import getSession from "@/src/lib/getSession";

export default async function Nav() {
  const session = await getSession();
  const user = session?.user;

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
          {user && (
            <>
              <Link
                href={`/portfolio/`}
                className="flex items-center gap-2 transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                <FiPieChart className="h-5 w-5" />
                Portfolio
              </Link>
              <Link
                href={`/watchlist/`}
                className="flex items-center gap-2 transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                <FiStar className="h-5 w-5" />
                Watchlist
              </Link>
            </>
          )}
          {!user && (
            <div className="flex items-center gap-4">
              {SignInButton()}
              <Link href="/auth/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src={`${session.user!.image}`}
                    alt="@shadcn"
                    className="rounded-full hover:opacity-80 cursor-pointer"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem>
                    <Link href="/admin" className="flex">
                      <Lock className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ModeToggle />
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
              {!user && (
                <div>
                  {SignInButton()}
                  {SignOutButton()}
                </div>
              )}
              {user && (
                <div className="flex justify-between">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={`${user.image}`}
                        alt="@shadcn"
                        className="rounded-full hover:opacity-80 cursor-pointer"
                      />
                    </Avatar>
                    Profile
                  </Link>
                  <div className="flex flex-col gap-2">{SignOutButton()}</div>
                </div>
              )}
              <Link
                href="/prices"
                className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                <MdShowChart className="h-7 w-7" />
                Prices
              </Link>
              {user && (
                <>
                  <Link
                    href={`/portfolio/`}
                    className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                    prefetch={false}
                  >
                    <FiPieChart className="h-7 w-7" />
                    Portfolio
                  </Link>
                  <Link
                    href={`/watchlist/`}
                    className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                    prefetch={false}
                  >
                    <FiStar className="h-7 w-7" />
                    Watchlist
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                    >
                      <Lock className="h-7 w-7" />
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 text-md font-medium transition-colors hover:text-primary"
                  >
                    <FiSettings className="h-7 w-7" />
                    Settings
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

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button variant="outline">Sign In</Button>
    </form>
  );
}

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Logout</Button>
    </form>
  );
}
