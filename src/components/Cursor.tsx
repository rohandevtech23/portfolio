import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use gsap.quickTo for high-performance, lag-free cursor tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const hoverElements = document.querySelectorAll("[data-cursor]");
    const handleMouseOver = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (el.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };
    const handleMouseOut = () => {
      cursor.classList.remove("cursor-disable");
    };

    hoverElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
