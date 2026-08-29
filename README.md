# Güner İletişim — Web Sitesi

Avcılar/İstanbul'daki **Güner İletişim** (telefon & bilgisayar teknik servisi, sıfır ve 2.el cihaz alım-satım, takas) için hazırlanmış tanıtım ve müşteri kazanım sitesi.

Site tamamen statiktir: veritabanı, üyelik ve ödeme yoktur. Tüm formlar ve butonlar müşteriyi hazır mesajla **WhatsApp'a (0537 788 15 63)** yönlendirir.

## Teknolojiler

- [Next.js](https://nextjs.org) (App Router, statik export) + TypeScript
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com) bileşenleri
- Framer Motion (kaydırma animasyonları, sayaçlar)
- three.js / react-three-fiber (ana sayfadaki 3D telefon)
- lucide-react ikonları

## Sayfalar

| Yol | İçerik |
|---|---|
| `/` | Ana sayfa: hero, istatistikler, hizmetler, takas çağrısı, öne çıkan ürünler, SIM hizmetleri, 2.el test süreci, hakkımızda, SSS, yorumlar + harita |
| `/teknik-servis` | 11 onarım hizmeti + WhatsApp fiyat sihirbazı |
| `/takas` | Eskiyi getir yenisini götür: 3 adım, avantajlar, teklif sihirbazı |
| `/urunler` | Filtreli vitrin (Sıfır / 2.El / Aksesuar) + mağaza daveti |
| `/kvkk` | KVKK aydınlatma metni ve gizlilik |

Ayrıca: özel 404 sayfası, `sitemap.xml`, `robots.txt`, LocalBusiness + FAQ JSON-LD şemaları.

## Geliştirme

```bash
npm install
npm run dev
```

Site http://localhost:3000 adresinde açılır.

## Yayına Alma

```bash
npm run build
```

Çıktı `out/` klasörüne yazılır. Bu klasörü herhangi bir statik hostinge (Vercel, Netlify, cPanel vb.) yüklemek yeterlidir.

Alan adı alındığında güncellenmesi gerekenler:

- `app/sitemap.ts` ve `app/robots.ts` içindeki `guneriletisim.example` adresi
- `app/page.tsx` içindeki JSON-LD `url` alanı

## İçerik Güncelleme

- **Ürünler ve fiyatlar:** `lib/site.ts` → `PRODUCTS` dizisi. Gerçek ürün fotoğrafı eklemek için görseli `public/products/` içine koyup ilgili ürünün `image` alanına yolunu yazın; fotoğrafı olmayan ürünler otomatik illüstrasyonla gösterilir.
- **Hizmetler:** `lib/site.ts` → `SERVICES` dizisi.
- **Telefon, adres, çalışma saatleri:** `lib/site.ts` üst kısmındaki sabitler.
- **Ürün görselleri lisansları:** `public/products/CREDITS.md`.

## Dosya Yapısı

```
app/               Sayfalar (App Router)
components/site/   Siteye özel bileşenler (header, footer, kartlar, sihirbazlar, 3D hero)
components/ui/     shadcn/ui bileşenleri
lib/site.ts        Tüm içerik ve iletişim sabitleri
public/            Logo, ürün görselleri
assets/src/        Orijinal logo kaynağı
```

---

Bu site ve tüm hakları [LineraSoft](https://linerasoft.com/tr)'a aittir.
