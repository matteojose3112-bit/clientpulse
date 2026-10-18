import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, select, input, [role='button'], [data-magnetic]";

function MouseEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: -100, y: -100 });
  const ringPosition = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let frame = 0;
    let mouseActivated = false;
    const originalTranslate = new WeakMap<HTMLElement, string>();

    const resetMagneticElements = () => {
      document.querySelectorAll<HTMLElement>(INTERACTIVE).forEach((element) => {
        element.style.translate = originalTranslate.get(element) || "";
        element.classList.remove("pulse-magnetic-active");
      });
    };

    const activate = () => {
      if (mouseActivated) return;
      mouseActivated = true;
      document.body.classList.add("pulse-custom-cursor-enabled");
    };

    const move = (event: PointerEvent) => {
      // Leave touch and pen input alone so the effect never interferes with scrolling.
      if (event.pointerType !== "mouse") return;

      activate();
      position.current = { x: event.clientX, y: event.clientY };

      document.querySelectorAll<HTMLElement>(INTERACTIVE).forEach((element) => {
        if (!originalTranslate.has(element)) {
          originalTranslate.set(element, element.style.translate);
        }

        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const range = Math.max(rect.width, rect.height) * 1.1;
        const distance = Math.hypot(dx, dy);

        if (distance < range) {
          const strength = 0.12 * (1 - distance / range);
          element.style.translate = `${dx * strength}px ${dy * strength}px`;
          element.classList.add("pulse-magnetic-active");
        } else if (element.classList.contains("pulse-magnetic-active")) {
          element.style.translate = originalTranslate.get(element) || "";
          element.classList.remove("pulse-magnetic-active");
        }
      });
    };

    const render = () => {
      dot.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      ringPosition.current.x += (position.current.x - ringPosition.current.x) * 0.14;
      ringPosition.current.y += (position.current.y - ringPosition.current.y) * 0.14;
      ring.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.target instanceof Element && event.target.closest(INTERACTIVE)) {
        ring.classList.add("is-hovering");
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(INTERACTIVE)) {
        ring.classList.remove("is-hovering");
      }
    };

    const onPointerLeave = () => {
      resetMagneticElements();
      ring.classList.remove("is-hovering");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.body.classList.remove("pulse-custom-cursor-enabled");
      resetMagneticElements();
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
