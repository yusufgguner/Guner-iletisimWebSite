"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_TEL } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/teknik-servis/", label: "Teknik Servis" },
  { href: "/takas/", label: "Takas" },
  { href: "/urunler/", label: "Ürünler" },
  { href: "/#iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex flex-col gap-1" aria-label="Güner İletişim ana sayfa">
          <Image src="/logo-dark.png" alt="Güner" width={101} height={45} priority className="h-7 w-auto" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary leading-none">
            Telefon &amp; Aksesuarları · Avcılar
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                pathname === l.href.replace("/#iletisim", "/") && l.href !== "/#iletisim" && "text-primary"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-3 rounded-full">
            <a href={PHONE_TEL}>
              <Phone data-slot="icon" /> Hemen Ara
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
          <Button asChild className="mt-2 w-full rounded-full">
            <a href={PHONE_TEL}>
              <Phone data-slot="icon" /> Hemen Ara
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
