"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const final = to.toLocaleString("tr-TR") + suffix;

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = Math.floor(v).toLocaleString("tr-TR") + (v >= to ? suffix : "");
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix]);

  return <span ref={ref}>{final}</span>;
}
