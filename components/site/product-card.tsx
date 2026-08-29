import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeviceArt } from "@/components/site/device-art";
import { wa, type Product } from "@/lib/site";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<Product["cat"], string> = {
  sifir: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ikinciel: "bg-sky-50 text-sky-700 border-sky-200",
  aksesuar: "bg-amber-50 text-amber-700 border-amber-200",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group gap-0 overflow-hidden border-border py-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative grid h-52 place-items-center border-b bg-muted p-6">
        {product.image ? (
          <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-[1.04]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="transition-transform duration-300 group-hover:scale-[1.04]">
            <DeviceArt kind={product.art ?? "phone-punch"} tone={product.artTone} id={product.slug} />
          </div>
        )}
        {product.cat !== "aksesuar" && (
          <span className="absolute bottom-2.5 right-2.5 rounded-full border bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Örnektir
          </span>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col items-start gap-2 p-5">
        <Badge variant="outline" className={cn("font-bold uppercase tracking-wide", BADGE_STYLES[product.cat])}>
          {product.badge}
        </Badge>
        <h3 className="font-bold">{product.name}</h3>
        {product.price ? (
          <p className="text-xl font-extrabold tracking-tight">{product.price}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Tüm modellere uygun çeşitler mağazamızda.</p>
        )}
        <Button
          asChild
          size="sm"
          className="mt-auto rounded-full bg-wa text-wa-foreground hover:bg-wa/90"
        >
          <a href={wa(product.waText)} target="_blank" rel="noopener">
            <MessageCircle data-slot="icon" /> {product.cat === "aksesuar" ? "Stok Sor" : "WhatsApp'tan Sor"}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
