"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FiMenu,
  FiArrowRight,
  FiX,
  FiChevronDown,
  FiPieChart,
  FiStar,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useMotionValueEvent, AnimatePresence, useScroll, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { IoRocketOutline } from "react-icons/io5";
import Link from "next/link";
import { MdShowChart } from "react-icons/md";

const Example = () => {
  return <FlyoutNav />;
};

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250 ? true : false);
  });

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-white 
      transition-all duration-300 ease-out lg:px-12
      ${scrolled ? "bg-slate-950 py-3" : "bg-neutral-950/0 py-6 shadow-none"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <div className="hidden gap-6 lg:flex">
          <Links />
          <CTAs />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-1">
        <span className="text-2xl font-bold">Voyage</span>
        <IoRocketOutline className="text-2xl" />
      </div>
    </Link>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-6">
      {LINKS.map((l) => (
        <NavLink key={l.text} href={l.href} FlyoutContent={l.component}>
          {l.text}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <a href={href} className="relative">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAs = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black">
        <FaUserCircle />
        <span>Sign in</span>
      </button>
      <button className="rounded-lg border-2 border-indigo-300 bg-indigo-300 px-4 py-2 font-semibold text-black transition-colors hover:border-indigo-600 hover:bg-indigo-600 hover:text-white">
        Register
      </button>
    </div>
  );
};

const PricesContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 shadow-xl lg:h-72 lg:w-[600px] lg:shadow-none xl:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-slate-800 p-6 lg:col-span-4 cursor-pointer hover:bg-slate-900 transition duration-200 ease-in-out">
        <Link href="/prices">
          <div className="flex items-center gap-1 text-xs text-indigo-300 no-underline ">
            <div>
              <div className="flex gap-1">
                <h2 className="mb-2 text-xl font-semibold text-white">Prices</h2>
                <MdShowChart className=" text-2xl text-white" />
              </div>
              <p className="mb-6 max-w-xs text-sm text-neutral-400">
                The latest Cryptocurrency prices
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-3 bg-white p-6 lg:col-span-8">
        <a
          href="#"
          className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Bitcoin</h3>
          <p className="text-xs">Current price here</p>
        </a>
        <a
          href="#"
          className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Ethereum</h3>
          <p className="text-xs">Current price here</p>
        </a>
        <a
          href="#"
          className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">BNB</h3>
          <p className="text-xs">Current price here</p>
        </a>
        <a
          href="#"
          className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Solana</h3>
          <p className="text-xs">Current price here</p>
        </a>
      </div>
    </div>
  );
};

const PortfolioContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 shadow-xl lg:h-72 lg:w-[600px] lg:shadow-none xl:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-slate-800 p-6 lg:col-span-4 cursor-pointer hover:bg-slate-900 transition duration-200 ease-in-out">
        <Link href="/portfolio">
          <div className="flex items-center gap-1 text-xs text-indigo-300 no-underline ">
            <div>
              <div className="flex gap-1">
                <h2 className="mb-2 text-xl font-semibold text-white">Prices</h2>
                <FiPieChart className="text-2xl text-white" />
              </div>
              <p className="mb-6 max-w-xs text-sm text-neutral-400">
                The latest Cryptocurrency prices
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-3 bg-white p-6 lg:col-span-8">
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 1</h3>
          <p className="text-xs">Current price here</p>
        </div>
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 2</h3>
          <p className="text-xs">Current price here</p>
        </div>
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 3</h3>
          <p className="text-xs">Current price here</p>
        </div>
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 4</h3>
          <p className="text-xs">Current price here</p>
        </div>
      </div>
    </div>
  );
};

const WatchlistContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 shadow-xl lg:h-72 lg:w-[600px] lg:shadow-none xl:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-slate-800 p-6 lg:col-span-4 cursor-pointer hover:bg-slate-900 transition duration-200 ease-in-out">
        <Link href="/watchlist">
          <div className="flex items-center gap-1 text-xs text-indigo-300 no-underline ">
            <div>
              <div className="flex gap-1">
                <h2 className="mb-2 text-xl font-semibold text-white">Watchlist</h2>
                <FiStar className="text-2xl text-white" />
              </div>
              <p className="mb-6 max-w-xs text-sm text-neutral-400">
                The latest Cryptocurrency prices
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-3 bg-white p-6 lg:col-span-8">
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 1</h3>
          <p className="text-xs">Current price here</p>
        </div>
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 2</h3>
          <p className="text-xs">Current price here</p>
        </div>
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 3</h3>
          <p className="text-xs">Current price here</p>
        </div>
        <div className="rounded border-2 border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-100">
          <h3 className="mb-1 font-semibold">Coin 4</h3>
          <p className="text-xs">Current price here</p>
        </div>
      </div>
    </div>
  );
};

const MobileMenuLink = ({
  children,
  href,
  FoldContent,
  setMenuOpen,
}: {
  children: React.ReactNode;
  href: string;
  FoldContent?: React.ElementType;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-neutral-950">
      {FoldContent ? (
        <div
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
          onClick={() => setOpen((pv) => !pv)}
        >
          <a
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
            }}
            href={href}
          >
            {children}
          </a>
          <motion.div
            animate={{ rotate: open ? "180deg" : "0deg" }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <FiChevronDown />
          </motion.div>
        </div>
      ) : (
        <a
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
          }}
          href="#"
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
        >
          <span>{children}</span>
          <FiArrowRight />
        </a>
      )}
      {FoldContent && (
        <motion.div
          initial={false}
          animate={{
            height: open ? height : "0px",
            marginBottom: open ? "24px" : "0px",
            marginTop: open ? "12px" : "0px",
          }}
          className="overflow-hidden"
        >
          <div ref={ref}>
            <FoldContent />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl">
        <FiMenu />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-slate-950"
          >
            <div className="flex items-center justify-between p-6">
              <Logo />
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl" />
              </button>
            </div>
            <div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  href={l.href}
                  FoldContent={l.component}
                  setMenuOpen={setOpen}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>
            <div className="flex justify-end bg-slate-950 p-6">
              <CTAs />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Example;

const LINKS = [
  {
    text: "Prices",
    href: "/prices",
    component: PricesContent,
  },
  {
    text: "Portfolio",
    href: "/portfolio",
    component: PortfolioContent,
  },
  {
    text: "Watchlist",
    href: "/watchlist",
    component: WatchlistContent,
  },
];
