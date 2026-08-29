"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Clock, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_TEL, wa } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/teknik-servis/", label: "Teknik Servis" },
  { href: "/takas/", label: "Takas" },
  { href: "/urunler/", label: "Ürünler" },
  { href: "/#sss", label: "S.S.S." },
  { href: "/#iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Üst bilgi çubuğu */}
      <div className="bg-stone-900 text-stone-300">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-5 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> Pzt–Cmt 09.00–20.00 · Paz 10.00–18.00
            </span>
            <span className="hidden items-center gap-1.5 md:flex">
              <MapPin className="size-3.5" /> Cihangir, Ormanlı Cd. No:46, Avcılar
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={wa()} target="_blank" rel="noopener" className="hidden items-center gap-1.5 hover:text-white sm:flex">
              <MessageCircle className="size-3.5" /> WhatsApp
            </a>
            <a href={PHONE_TEL} className="flex items-center gap-1.5 font-semibold text-white hover:text-stone-200">
              <Phone className="size-3.5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Ana bar */}
      <div className="border-b bg-white shadow-[0_1px_3px_rgba(28,25,23,0.05)]">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5">
          <Link href="/" aria-label="Güner İletişim ana sayfa">
            <Image src="/logo-dark.png" alt="Güner İletişim" width={129} height={58} priority className="h-9 w-auto sm:h-10" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground",
                  pathname === l.href && l.href.startsWith("/") && !l.href.includes("#") &&
                    "text-foreground underline decoration-primary decoration-2 underline-offset-8"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-1">
              <a href={wa("Merhaba, bilgi almak istiyorum.")} target="_blank" rel="noopener">
                <MessageCircle data-slot="icon" /> Hızlı Teklif
              </a>
            </Button>
          </nav>

          <button
            className="grid size-11 place-items-center rounded-lg border md:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t bg-white px-5 pb-5 pt-2 md:hidden">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-semibold text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full">
              <a href={PHONE_TEL}>
                <Phone data-slot="icon" /> {PHONE_DISPLAY}
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
