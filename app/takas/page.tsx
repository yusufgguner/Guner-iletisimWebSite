import type { Metadata } from "next";
import { Banknote, MapPin, MessageCircle, Scale, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";
import { TakasWizard } from "@/components/site/wizard";
import { MAPS_DIR, wa } from "@/lib/site";

export const metadata: Metadata = {
  title: "Telefon Takası | Eskiyi Getir Yeniyi Götür — Güner İletişim Avcılar",
  description:
    "Avcılar'da telefon takası: eski telefonunuzu değerinde sayalım, sıfır veya 2.el yenisiyle çıkın. Anında WhatsApp'tan teklif alın.",
};

const STEPS = [
  { title: "Cihazını Getir", desc: "Eski telefon, tablet veya laptopunu mağazamıza getir; kırık, arızalı fark etmez." },
  { title: "Anında Değerleme", desc: "Cihazın gözünün önünde test edilir, piyasa değerinde net teklif verilir." },
  { title: "Yenisiyle Çık", desc: "Beğendiğin sıfır veya 2.el cihazı seç, aradaki farkı öde, aynı gün kullanmaya başla." },
];

const PERKS = [
  { icon: Wrench, title: "Kırık / arızalı cihaz da kabul", desc: "Ekranı kırık, pili şişmiş ya da açılmayan cihazların bile değerini alırsın." },
  { icon: Scale, title: "Piyasa değerinde adil teklif", desc: "Güncel piyasa fiyatlarına göre şeffaf ve net bir değerleme yapılır." },
  { icon: Zap, title: "Anında işlem, beklemek yok", desc: "Değerleme ve teklif dakikalar içinde tamamlanır, aynı gün yenisine geçersin." },
  { icon: Banknote, title: "Fark ödemede pazarlık payı", desc: "Aradaki farkı konuşarak, ikimiz için de uygun bir noktada anlaşırız." },
];

export default function Takas() {
  return (
    <>
      <section className="border-b bg-muted py-14 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-4xl font-bold tracking-tight">Eskini getir, yenisini götür</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Eski cihazın değerinde sayılır, aradaki farkı ödersin. Bu kadar basit.
          </p>
          <Button asChild size="lg" className="mt-7 bg-wa text-wa-foreground hover:bg-wa/90">
            <a href={wa("Merhaba, telefon takası hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener">
              <MessageCircle data-slot="icon" /> WhatsApp&apos;tan Yaz
            </a>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="sr-only">Takas Nasıl Çalışır?</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <Card className="h-full text-center">
                  <CardContent className="p-7">
                    <span className="mx-auto mb-4 grid size-11 place-items-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground">
                      {i + 1}
                    </span>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted py-16">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead eyebrow="Avantajlar" title="Neden Güner İletişim'de Takas?" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.06}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <span className="mb-4 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <p.icon className="size-5" />
                    </span>
                    <h3 className="text-sm font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead eyebrow="Hızlı Teklif" title="Cihazın Ne Eder? Hemen Sor" />
          <TakasWizard />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-foreground px-8 py-10 text-background sm:px-10">
              <div>
                <h2 className="text-2xl font-extrabold sm:text-3xl">Yerinde görmek daha kolay.</h2>
                <p className="mt-2 text-background/70">Cihazını getir, 10 dakikada net teklifini al.</p>
              </div>
              <Button asChild size="lg">
                <a href={MAPS_DIR} target="_blank" rel="noopener">
                  <MapPin data-slot="icon" /> Yol Tarifi Al
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
