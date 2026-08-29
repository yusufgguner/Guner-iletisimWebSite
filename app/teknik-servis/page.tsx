import type { Metadata } from "next";
import { Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";
import { ServiceIcon } from "@/components/site/service-icon";
import { ArizaWizard } from "@/components/site/wizard";
import { SERVICES, wa } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teknik Servis | Avcılar Ekran Değişimi, Pil, Şarj Portu Tamiri — Güner İletişim",
  description:
    "Avcılar'da telefon ve tablet tamiri: ekran değişimi, pil değişimi, şarj portu, su hasarı, yazılım. Ücretsiz arıza tespiti. 0537 788 15 63",
};

export default function TeknikServis() {
  return (
    <>
      <section className="border-b bg-muted py-14 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-4xl font-bold tracking-tight">Teknik Servis</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Önce bakalım, sonra konuşalım. Tespit ücretsiz, fiyat net, işçilik garantili.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 0.03, 0.2)}>
              <Card id={s.id} className="transition-colors hover:border-primary/40">
                <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{s.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="size-3.5" /> Süre: {s.time}
                    </p>
                    <Button asChild size="sm" className="mt-4 bg-wa text-wa-foreground hover:bg-wa/90">
                      <a href={wa(s.waText)} target="_blank" rel="noopener">
                        <MessageCircle data-slot="icon" /> Fiyat Sor
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="Hızlı Teklif"
            title="Fiyat Teklifi Al"
            sub="Cihazını ve sorununu seç, WhatsApp'tan anında fiyat iste."
          />
          <ArizaWizard />
        </div>
      </section>
    </>
  );
}
