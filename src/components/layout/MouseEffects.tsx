import { useEffect, useRef } from "react";

function MouseEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: -100, y: -100 });
  const ringPosition = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let frame = 0;
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      position.current = { x: event.clientX, y: event.clientY };
      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distanceX = event.clientX - (rect.left + rect.width / 2);
        const distanceY = event.clientY - (rect.top + rect.height / 2);
        const range = Math.max(rect.width, rect.height) * 0.9;
        const distance = Math.hypot(distanceX, distanceY);
        if (distance < range) {
          const strength = 0.12 * (1 - distance / range);
          element.style.transform = `translate3d(${distanceX * strength}px, ${distanceY * strength}px, 0)`;
        } else {
          element.style.transform = "translate3d(0, 0, 0)";
        }
      });
    };

    const render = () => {
      ringPosition.current.x += (position.current.x - ringPosition.current.x) * 0.14;
      ringPosition.current.y += (position.current.y - ringPosition.current.y) * 0.14;
      dot.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    const enter = () => ring.classList.add("is-hovering");
    const leave = (event: Event) => {
      ring.classList.remove("is-hovering");
      const target = event.currentTarget as HTMLElement;
      if (target?.hasAttribute("data-magnetic")) target.style.transform = "translate3d(0, 0, 0)";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.querySelectorAll("a, button, [data-magnetic]").forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      document.querySelectorAll("a, button, [data-magnetic]").forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
      magneticElements.forEach((element) => { element.style.transform = ""; });
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pulse-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="pulse-cursor-dot" aria-hidden="true" />
    </>
  );
}

export default MouseEffects;
