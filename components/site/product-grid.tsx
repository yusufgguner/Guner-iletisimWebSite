"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/product-card";
import { PRODUCTS, type Product } from "@/lib/site";
import { cn } from "@/lib/utils";

const FILTERS: { key: "all" | Product["cat"]; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "sifir", label: "Sıfır" },
  { key: "ikinciel", label: "2.El" },
  { key: "aksesuar", label: "Aksesuar" },
];

export function ProductGrid() {
  const [filter, setFilter] = useState<"all" | Product["cat"]>("all");
  const visible = PRODUCTS.filter((p) => filter === "all" || p.cat === filter);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "outline"}
            size="sm"
            className={cn("rounded-full px-5")}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Fiyatlar güncel stok durumuna göre değişebilir. Kesin fiyat için WhatsApp&apos;tan yazın.
      </p>
    </>
  );
}
