import type { Metadata } from "next";
import { MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/site/product-grid";
import { Reveal } from "@/components/site/reveal";
import { MAPS_DIR, wa } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ürünler | Sıfır ve 2.El Telefon, Aksesuar — Güner İletişim Avcılar",
  description:
    "Avcılar'da sıfır ve 2.el iPhone, Samsung, Xiaomi telefonlar; kırılmaz cam, kılıf ve aksesuarlar. Uygun fiyat, garantili cihazlar.",
};

export default function Urunler() {
  return (
    <>
      <section className="border-b bg-muted py-14 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-4xl font-bold tracking-tight">Sıfır ve 2.el cihazlar</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tüm cihazlar test edilmiş ve garantilidir. Fiyat sormak için WhatsApp yeterli.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="sr-only">Ürün Listesi</h2>
          <ProductGrid />
        </div>
      </section>

      <section className="border-t bg-muted py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="rounded-2xl bg-foreground px-8 py-12 text-center text-background sm:px-10">
              <h2 className="text-2xl font-extrabold sm:text-3xl">Kırılmaz Cam ve Kılıflar Mağazamızda!</h2>
              <p className="mx-auto mt-3 max-w-2xl text-background/70">
                Kırılmaz cam ve kılıf çeşitlerimizi şubemizi ziyaret ederek inceleyebilir ve satın
                alabilirsiniz. Takılması bizden, hediye.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <a href={MAPS_DIR} target="_blank" rel="noopener">
                    <MapPin data-slot="icon" /> Yol Tarifi Al
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-wa text-wa-foreground hover:bg-wa/90">
                  <a href={wa("Merhaba, aksesuar stok durumu hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener">
                    <MessageCircle data-slot="icon" /> WhatsApp&apos;tan Stok Sor
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
