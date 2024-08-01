"use client";
import { MotionValue, useScroll, motion, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { IconType } from "react-icons";
import {
  FiArrowDown,
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCopy,
  FiDatabase,
  FiLayers,
  FiPieChart,
  FiStar,
} from "react-icons/fi";
import Link from "next/link";
import { MdShowChart } from "react-icons/md";

export const StickyCards = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <>
      <div ref={ref} className="relative">
        {CARDS.map((c, idx) => (
          <Card
            key={c.id}
            card={c}
            scrollYProgress={scrollYProgress}
            position={idx + 1}
          />
        ))}
      </div>
    </>
  );
};

interface CardProps {
  position: number;
  card: CardType;
  scrollYProgress: MotionValue;
}

const Card = ({ position, card, scrollYProgress }: CardProps) => {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -CARD_HEIGHT]);

  const isOddCard = position % 2;

  return (
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
      }}
      className={`sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4 ${
        isOddCard ? "bg-slate-900 text-white " : "bg-white text-slate-900"
      }`}
    >
      <card.Icon className="mb-4 text-5xl sm:text-4xl" />
      <h3 className="mb-6 text-center text-4xl font-semibold md:text-6xl">
        {card.title}
      </h3>
      <p className="mb-8 max-w-lg text-center text-sm md:text-base">{card.description}</p>
      {card.id === 1 ? (
        <FiArrowDown className="text-7xl" />
      ) : (
        <a
          href={card.routeTo}
          className={`flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg ${
            card.ctaClasses
          } ${
            isOddCard
              ? "shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]"
              : "shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
          }`}
        >
          <span>Learn more</span>
          <FiArrowRight />
        </a>
      )}
    </motion.div>
  );
};

const CARD_HEIGHT = 500;

type CardType = {
  id: number;
  Icon: IconType;
  title: string;
  description: string;
  ctaClasses?: string;
  routeTo?: string;
};

const CARDS: CardType[] = [
  {
    id: 1,
    Icon: FiLayers,
    title: "Features",
    description:
      "Find out what makes Voyage the best platform for managing your investments.",
  },
  {
    id: 2,
    Icon: MdShowChart,
    title: "Real-time prices",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!",
    ctaClasses: "bg-green-300",
    routeTo: "#",
  },
  {
    id: 3,
    Icon: FiPieChart,
    title: "Visualise your portfolio",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!",
    ctaClasses: "bg-violet-400",
    routeTo: "#",
  },
  {
    id: 4,
    Icon: FiStar,
    title: "Watchlist",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!",
    ctaClasses: "bg-amber-300",
    routeTo: "#",
  },
];
