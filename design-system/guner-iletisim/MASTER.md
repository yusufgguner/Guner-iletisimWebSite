# Design System MASTER — Güner İletişim

> Kaynak: ui-ux-pro-max araştırması + proje kararları (2026-08-29). Sayfa bazlı override: `pages/<sayfa>.md` (yoksa bu dosya geçerli).

## Pattern & Style
- **Pattern:** Hero-Centric + Conversion-Optimized landing (tek birincil CTA: WhatsApp)
- **Style:** Dark Tech / enerjik satış odaklı; güven sinyalleri (garanti, süre, yorumlar) belirgin
- **Sosyal kanıt:** yıldızlı yorum kartları, sayaç istatistikleri (count-up)

## Renkler (CSS tokens — assets/css/style.css `:root`)
| Rol | Hex | Değişken |
|---|---|---|
| Background | `#0B1220` | `--bg` |
| Background 2 | `#0F172A` | `--bg-2` |
| Card | `#141E33` | `--card` |
| Card 2 | `#1A2540` | `--card-2` |
| Primary | `#F97316` | `--primary` |
| Primary Deep | `#EA580C` | `--primary-deep` |
| Accent | `#10B981` | `--accent` |
| WhatsApp | `#25D366` | `--wa` |
| Text | `#F1F5F9` | `--text` |
| Muted | `#94A3B8` | `--muted` |
| Border | `rgba(148,163,184,.14)` | `--border` |

Gradyanlar: `--grad-primary` (turuncu 135°), `--grad-text` (turuncu→yeşil başlık vurgusu).

## Tipografi
- **Başlık:** Rubik (500/700/800)
- **Gövde:** Nunito Sans (400/600/700/800)
- Google Fonts: `family=Rubik:wght@500;700;800&family=Nunito+Sans:wght@400;600;700;800`

## İkonlar
- Emoji YASAK. Lucide-stili inline SVG sprite (`<symbol id="i-*">` her sayfanın body başında), kullanım: `<svg class="ico"><use href="#i-x"/></svg>`
- `.ico` stroke tabanlı (2px, round); `.ico-fill` yıldız gibi dolgular için.

## Efektler
- Kart hover: -6px lift + turuncu border glow; buton hover: -2px + glow shadow
- Hero: radial glow (turuncu + yeşil) + nokta grid mask; CSS telefon mockup + yüzen chipler
- Kayan kampanya bandı (marquee), sayaç animasyonu (IntersectionObserver)
- `prefers-reduced-motion` desteklenir

## Kaçınılacaklar
- Emoji ikon, açık gri-üstü-gri düşük kontrast, ham hex komponent içinde (token kullan), yatay taşma, gizli iletişim bilgisi

## Kontrol listesi
- [x] SVG ikonlar (emoji yok)
- [x] cursor-pointer tıklanabilirlerde
- [x] Hover 150-300ms geçiş
- [x] Kontrast ≥ 4.5:1 (koyu zemin üzerinde #F1F5F9 / #94A3B8)
- [x] :focus-visible halkası
- [x] prefers-reduced-motion
- [x] Responsive: 375 / 768 / 1024 / 1440
