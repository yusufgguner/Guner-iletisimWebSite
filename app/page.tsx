import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Clock, CreditCard, Globe, MapPin, MessageCircle,
  Phone, RefreshCw, ShieldCheck, Signal, Star, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/site/count-up";
import { Hero3D } from "@/components/site/hero-3d";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";
import { ServiceIcon } from "@/components/site/service-icon";
import {
  ADDRESS_1, ADDRESS_2, HOURS_SUN, HOURS_WEEK, MAPS_DIR, MAPS_EMBED,
  PHONE_DISPLAY, PHONE_TEL, PRODUCTS, SERVICES, wa,
} from "@/lib/site";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Güner İletişim Laptop Bilgisayar Cep Telefonu Teknik Servisi",
  telephone: "+905377881563",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cihangir, Ormanlı Cd. No:46",
    postalCode: "34310",
    addressLocality: "Avcılar",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  url: "https://guneriletisim.example",
  priceRange: "₺₺",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "18:00" },
  ],
};

const SIM_SERVICES = [
  { icon: Signal, title: "e-SIM Aktivasyonu", desc: "Uyumlu cihazlara hızlı ve sorunsuz e-SIM kurulumu yapıyoruz.", waText: "Merhaba, e-SIM aktivasyonu hakkında bilgi almak istiyorum." },
  { icon: CreditCard, title: "SIM Card", desc: "Tüm operatörlere uygun SIM kart temini ve hat işlemlerinde yardım.", waText: "Merhaba, SIM kart hakkında bilgi almak istiyorum." },
  { icon: Globe, title: "Tourist SIM Card & Pack", desc: "Türkiye'ye gelen misafirler için hazır turist SIM paketleri.", waText: "Merhaba, turist SIM paketi hakkında bilgi almak istiyorum." },
  { icon: ShieldCheck, title: "IMEI Kaydı", desc: "Yurt dışından gelen cihazlarınızın IMEI kayıt işlemlerini takip ediyoruz.", waText: "Merhaba, IMEI kaydı hakkında bilgi almak istiyorum." },
  { icon: RefreshCw, title: "Bilgi Aktarımı", desc: "Eski cihazınızdaki rehber, fotoğraf ve verileri yenisine güvenle taşıyoruz.", waText: "Merhaba, telefon bilgi aktarımı hakkında bilgi almak istiyorum." },
];

const REVIEWS = [
  { initials: "MK", name: "Mehmet K.", tag: "Ekran değişimi", text: "Ekranım bir saatte değişti, fiyat da gayet uygundu. Kesinlikle tavsiye ederim." },
  { initials: "AT", name: "Ayşe T.", tag: "Telefon takası", text: "Eski telefonumu takas edip cüzi bir fark ile sıfır telefona geçtim. Çok memnun kaldım." },
  { initials: "SY", name: "Serkan Y.", tag: "Pil değişimi", text: "Pil değişimi çok hızlı ve garantili yapıldı. İlginiz için teşekkürler." },
];

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* Hero */}
      <section className="border-b bg-muted">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-2 md:py-20">
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Avcılar · Cihangir</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Avcılar&apos;ın Telefon ve <span className="text-primary">Teknik Servis</span> Merkezi
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Ekran değişimi, pil, şarj portu, su hasarı onarımı; sıfır ve 2.el cihaz alım-satım, takas.
              Uygun fiyat, hızlı teslim, garantili işçilik.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-wa text-wa-foreground hover:bg-wa/90">
                <a href={wa("Merhaba, bilgi almak istiyorum.")} target="_blank" rel="noopener">
                  <MessageCircle data-slot="icon" /> WhatsApp&apos;tan Yaz
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href={PHONE_TEL}>
                  <Phone data-slot="icon" /> {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <MapPin className="size-4 text-primary" /> {ADDRESS_1} — Avcılar/İstanbul
            </p>
          </Reveal>
          <Hero3D />
        </div>
      </section>

      {/* Trust + stats */}
      <section className="border-b">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
          {[
            { n: 5000, label: "Başarılı Onarım" },
            { n: 10, label: "Yıllık Tecrübe" },
            { n: 1500, label: "Mutlu Müşteri" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="text-3xl font-extrabold text-primary"><CountUp to={s.n} /></p>
              <p className="text-sm font-semibold text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
          <Reveal delay={0.24} className="text-center">
            <p className="text-3xl font-extrabold">Aynı Gün</p>
            <p className="text-sm font-semibold text-muted-foreground">Teslimat</p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="Teknik Servis"
            title="Teknik Servis Hizmetlerimiz"
            sub="Telefon, tablet ve bilgisayarınızdaki her sorun için profesyonel çözüm."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 9).map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.07}>
                <Link href={`/teknik-servis/#${s.id}`} className="group block h-full">
                  <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                    <CardContent className="p-6">
                      <span className="mb-4 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                        <ServiceIcon name={s.icon} className="size-5" />
                      </span>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                        İncele <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Takas CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-foreground px-8 py-10 text-background sm:px-10">
              <div>
                <h2 className="text-2xl font-extrabold sm:text-3xl">Eskini Getir, Yenisini Götür!</h2>
                <p className="mt-2 max-w-xl text-background/70">
                  Eski telefonun ne durumda olursa olsun değerinde alalım, yenisine sayalım.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/takas/">
                  Takas Teklifi Al <ArrowRight data-slot="icon" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-y bg-muted py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="Vitrin"
            title="Öne Çıkan Cihazlar"
            sub="Özenle seçilmiş sıfır ve 2.el cihazlarda kaçırılmayacak fırsatlar."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/urunler/">
                Tüm Ürünleri Gör <ArrowRight data-slot="icon" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* SIM services */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="Ek Hizmetler"
            title="SIM ve Diğer Hizmetler"
            sub="Cihazınız dışında ihtiyaç duyduğunuz tüm hizmetler tek adreste."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SIM_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.07}>
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col items-start p-6">
                    <span className="mb-4 grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                      <s.icon className="size-5" />
                    </span>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mb-4 mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                    <Button asChild size="sm" variant="outline" className="mt-auto rounded-full">
                      <a href={wa(s.waText)} target="_blank" rel="noopener">
                        <MessageCircle data-slot="icon" /> WhatsApp&apos;tan Sor
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews + contact */}
      <section id="iletisim" className="border-t bg-muted py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="Referanslar"
            title="Müşterilerimiz Ne Diyor?"
            sub="Avcılar'da yıllardır müşterilerimizin güvenini kazanıyoruz."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.initials} delay={i * 0.08}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-3 flex gap-0.5 text-amber-500" aria-label="5 üzerinden 5 yıldız">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="size-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-sm text-foreground/80">&quot;{r.text}&quot;</blockquote>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
                        {r.initials}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.tag}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[2fr_3fr]">
            <Reveal>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-5 p-7">
                  {[
                    { icon: MapPin, title: "Adres", lines: [ADDRESS_1, ADDRESS_2] },
                    { icon: Phone, title: "Telefon", lines: [PHONE_DISPLAY] },
                    { icon: Clock, title: "Çalışma Saatleri", lines: [HOURS_WEEK, HOURS_SUN] },
                  ].map((c) => (
                    <div key={c.title} className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                        <c.icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold">{c.title}</p>
                        {c.lines.map((l) => (
                          <p key={l} className="text-sm text-muted-foreground">{l}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button asChild className="mt-auto rounded-full">
                    <a href={MAPS_DIR} target="_blank" rel="noopener">
                      <MapPin data-slot="icon" /> Yol Tarifi Al
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <iframe
                className="h-full min-h-[340px] w-full rounded-2xl border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={MAPS_EMBED}
                title="Güner İletişim konum"
              />
            </Reveal>
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
            <BadgeCheck className="size-4 text-emerald-600" /> Garantili Onarım
            <span className="mx-2 text-border">·</span>
            <Zap className="size-4 text-primary" /> Aynı Gün Teslim
            <span className="mx-2 text-border">·</span>
            <ShieldCheck className="size-4 text-emerald-600" /> Ücretsiz Arıza Tespiti
          </Reveal>
        </div>
      </section>
    </>
  );
}
