import { useEffect, useState } from "react";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Customers", href: "#customers" },
  { label: "Activity", href: "#activity" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.05, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#dashboard"
          onClick={closeMenu}
          aria-label="ClientPulse home"
          className="group flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-white/20 text-xs transition group-hover:border-white/60">
            C
          </span>

          <span>CLIENTPULSE</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link, index) => {
            const sectionId = link.href.slice(1);
            const isActive = active === sectionId;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-[0.16em] transition ${
                  isActive
                    ? "text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <span
                  className={`mr-2 ${
                    isActive ? "text-neutral-400" : "text-neutral-700"
                  }`}
                >
                  0{index + 1}
                </span>

                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[10px] uppercase tracking-[0.16em] text-neutral-600 sm:block">
            MVP / 2026
          </span>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/15 md:hidden"
          >
            <span
              className={`h-px w-4 bg-white transition ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-px w-4 bg-white transition ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`border-t border-white/10 bg-[#050505]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-[30rem] opacity-100"
            : "pointer-events-none max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-6">
          {links.map((link, index) => {
            const sectionId = link.href.slice(1);
            const isActive = active === sectionId;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-sm uppercase tracking-[0.16em] transition ${
                  isActive
                    ? "text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <span>
                  <span className="mr-3 text-neutral-700">
                    0{index + 1}
                  </span>

                  {link.label}
                </span>

                <span className="text-neutral-700">↗</span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Navbar;