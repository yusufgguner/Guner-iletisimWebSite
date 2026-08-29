"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DeviceArt } from "@/components/site/device-art";

const Hero3DCanvas = dynamic(() => import("./hero-3d-canvas"), { ssr: false });

/** three.js hero visual; falls back to a static illustration on reduced motion. */
export function Hero3D() {
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setReady(true);
  }, []);

  if (!ready) return <div className="h-[380px] md:h-[460px]" aria-hidden="true" />;
  if (reduce) {
    return (
      <div className="grid h-[380px] place-items-center md:h-[460px]" aria-hidden="true">
        <DeviceArt kind="phone-notch" tone="#3f4c63" id="hero-static" />
      </div>
    );
  }
  return (
    <div className="h-[380px] md:h-[460px]" aria-hidden="true">
      <Hero3DCanvas />
    </div>
  );
}
