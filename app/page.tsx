import { Hero } from "./Hero";
import { StickyCards as Features } from "./Features";

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section>
        <Features />
      </section>
    </main>
  );
}
