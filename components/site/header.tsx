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
        <Link href="/" className="flex items-baseline gap-2.5" aria-label="Güner İletişim ana sayfa">
          <Image src="/logo-dark.png" alt="Güner" width={112} height={50} priority className="h-8 w-auto" />
          <span className="hidden text-sm text-muted-foreground sm:inline">Avcılar</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground",
                pathname === l.href.replace("/#iletisim", "/") && l.href !== "/#iletisim" &&
                  "text-foreground underline decoration-primary decoration-2 underline-offset-8"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="outline" className="ml-2">
            <a href={PHONE_TEL}>
              <Phone data-slot="icon" /> 0537 788 15 63
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
              <Phone data-slot="icon" /> 0537 788 15 63
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
