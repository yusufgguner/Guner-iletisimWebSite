# Güner İletişim v3 — Next.js Açık Tema Yeniden Tasarım (Spec)

**Tarih:** 2026-08-29 · **Durum:** Onaylandı

## Amaç
Mevcut statik HTML site Next.js'e taşınır; "AI yapılmış" hissi veren neon/koyu tasarım yerine açık zeminli, sade, premium bir tasarım gelir. shadcn/ui + Framer Motion + three.js kullanılır. İçerik, SEO ve WhatsApp akışları birebir korunur.

## Stack
- Next.js (App Router), `output: 'export'` → statik çıktı (`out/`), her hostingde çalışır
- Tailwind CSS, shadcn/ui (Button, Card, Badge, Input, Select)
- Framer Motion (scroll fade-up, stagger, sayaç), `prefers-reduced-motion` desteği
- three.js + @react-three/fiber + @react-three/drei (hero 3D telefon; geometriden, dış model yok; mobilde/reduced-motion'da statik fallback)
- Veritabanı/panel YOK; formlar `https://wa.me/905377881563?text=...` üretir

## Görsel Dil (açık premium minimal)
- Zemin: `#FFFFFF`, bölüm ritmi `#FAFAF9`; metin `#1C1917`; muted `#78716C`; çizgi `#E7E5E4`
- Tek vurgu: `#EA580C` (buton/vurgu; gradyan-neon yok); WhatsApp yeşili `#25D366` sadece WA butonlarında
- Tipografi: başlık ve gövde temiz sans (Rubik başlık + Nunito Sans gövde korunur)
- Logo: krem orijinalden Pillow ile koyu (#1C1917) versiyon üretilir → header/footer bu versiyonu kullanır
- Kayan marquee kaldırılır; yerine sade tek satır güven şeridi (statik, ikonlu)
- İkonlar: lucide-react (SVG, emoji yok)

## Sayfalar (içerik v2'den birebir)
- `/` : header, hero (three.js 3D telefon + başlık + WA/tel CTA), güven şeridi, istatistikler (count-up), 9 hizmet kartı (→ /teknik-servis#anchor), takas CTA bandı (sade, tek renk yüzey), öne çıkan 6 ürün, SIM hizmetleri (5 kart), yorumlar (3) + iletişim kartı + Google Maps iframe, footer
- `/teknik-servis` : 11 hizmet satırı (id'ler: ekran pil sarj ses guc su yazilim tablet tarama imei aktarim) + arıza sihirbazı (cihaz/marka/arıza → wa.me)
- `/takas` : 3 adım + 4 avantaj + teklif sihirbazı (marka/model/durum → wa.me) + yol tarifi CTA
- `/urunler` : filtre (Tümü/Sıfır/2.El/Aksesuar), 8 cihaz + 4 aksesuar kartı, fiyat notu, mağaza daveti bandı (aksesuar verbatim metni korunur)

## Ürün Görselleri
- Gerçek cihaz/aksesuar fotoğrafları `public/products/` altına indirilir (öncelik: Wikimedia Commons / özgür lisans; script `scripts/fetch-images.mjs` veya elle). Kart görseli beyaz/açık zemin üzerinde, `object-contain`.
- Her cihaz görselinin köşesinde "Örnektir" rozeti.
- Görsel bulunamayan ürün: sade çizgi ikonlu yer tutucu.
- Lisans/atıf notları `public/products/CREDITS.md` dosyasına yazılır.

## Footer Hak Metni (zorunlu)
- `© 2026 Güner İletişim` satırı + `Bu site ve tüm hakları ` [`LineraSoft`](https://linerasoft.com/tr) `'a aittir.` (link: https://linerasoft.com/tr, target=_blank rel=noopener)

## SEO
- Sayfa başına `metadata` (title/description v2 metinleri), OG etiketleri
- `/` sayfasına LocalBusiness JSON-LD (adres, telefon, saatler — v2'deki blok)
- Semantik HTML, tek h1/sayfa, alt metinler, `tel:` + `wa.me` linkleri

## Sabitler
- Telefon: 0537 788 15 63 / wa.me/905377881563 / tel:+905377881563
- Adres: Cihangir, Ormanlı Cd. No:46, 34310 Avcılar/İstanbul
- Saatler: Pzt–Cmt 09:00–20:00, Pazar 10:00–18:00

## Kapsam Dışı
Ödeme, sepet, üyelik, CMS, çoklu dil, blog. Koyu tema YOK (yalnız açık).

## Yerleşim / Depo
- Next.js projesi depo kökünde kurulur; eski statik dosyalar (index.html vb.) silinir (git geçmişinde durur). `assets/src/logo.png` korunur.
- Doğrulama: `npm run build` (statik export hatasız), tarayıcıda 375/768/1280 kontrol, konsol temiz, tüm wa.me/tel linkleri doğru.
