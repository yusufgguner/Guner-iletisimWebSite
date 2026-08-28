# Güner İletişim Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully static, sales-focused Turkish website for Güner İletişim (phone repair + 0/2.el device sales shop in Avcılar, İstanbul) where every form/CTA produces a pre-filled WhatsApp message.

**Architecture:** 4 static HTML pages sharing one CSS file and one JS file. No backend, no database, no build tools. Forms are client-side wizards that generate `https://wa.me/905377881563?text=...` links. Header/footer markup is duplicated across pages (no templating).

**Tech Stack:** Plain HTML5 + CSS3 + vanilla JavaScript. Google Maps iframe embed. JSON-LD `LocalBusiness` schema.

## Global Constraints

- Phone/WhatsApp number everywhere: `0537 788 15 63`, wa.me form: `https://wa.me/905377881563`
- Address verbatim: `Cihangir, Ormanlı Cd. No:46, 34310 Avcılar/İstanbul`
- Business name: `Güner İletişim` (full: `Güner İletişim Laptop Bilgisayar Cep Telefonu Teknik Servisi`)
- All user-facing copy in Turkish. `<html lang="tr">`, `<meta charset="UTF-8">` on every page.
- Color tokens: accent `#FF5722`, accent-dark `#E64A19`, navy `#101828`, navy-2 `#1B2A4A`, light bg `#F7F8FA`.
- NO: payment, cart, login, database, server code, external JS frameworks/CDNs (Google Maps iframe is the only external embed; Google Fonts allowed).
- Accessories are NOT sold online — copy must say visit the store: "şubemizi ziyaret ederek inceleyebilir ve satın alabilirsiniz".
- Every page: unique `<title>` + meta description with local SEO keywords (Avcılar + service), floating WhatsApp button, `tel:+905377881563` links.
- No JS fallback: every wizard section contains a visible plain link "WhatsApp'tan yazın: 0537 788 15 63" (`<a href="https://wa.me/905377881563">`), which works without JS.
- Verification is manual browser checking (no test framework for a static site): serve with `npx serve .` or open files directly; check layout at 375px, 768px, 1280px.

## File Structure

```
index.html            Home: hero, badges, service cards, takas CTA, product showcase, SIM services, reviews+map, footer
teknik-servis.html    Repair services detail + arıza talep wizard
takas.html            Trade-in: 3-step visual + teklif wizard
urunler.html          Products (Sıfır/2.El filter) + accessories (visit-store)
assets/css/style.css  All styling (tokens, components, sections, responsive)
assets/js/main.js     WhatsApp link builder, mobile nav, counters, wizards, product filter
assets/img/           SVG icons/placeholders (inline SVG preferred; folder for future real photos)
docs/                 (existing spec/plan)
```

---

### Task 1: Design system — `assets/css/style.css` + `assets/js/main.js` + shared page shell

**Files:**
- Create: `assets/css/style.css`
- Create: `assets/js/main.js`
- Create: `assets/img/.gitkeep`

**Interfaces:**
- Produces (CSS classes used by all pages): `.site-header`, `.nav`, `.nav-toggle`, `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-whatsapp`, `.btn-call`, `.badge`, `.card`, `.card-grid`, `.section`, `.section-title`, `.hero`, `.marquee`, `.trust-bar`, `.stat`, `.cta-band`, `.product-card`, `.price`, `.tag-sifir`, `.tag-ikinciel`, `.tag-aksesuar`, `.wizard`, `.field`, `.site-footer`, `.float-wa`, `.map-embed`, `.review-card`
- Produces (JS API on `window.GI`): `GI.wa(message)` → returns wa.me URL string; `GI.bindWizard(formId, buttonId, buildMessageFn)`; auto-behaviors on DOMContentLoaded: mobile nav toggle (`.nav-toggle`), counter animation (`[data-count]`), product filter (`[data-filter]` buttons + `[data-cat]` cards)

- [ ] **Step 1: Write `assets/css/style.css`**

Full base (extend section-specific styles in later tasks using these tokens — later tasks append to this file):

```css
/* ===== Tokens ===== */
:root {
  --accent: #FF5722;
  --accent-dark: #E64A19;
  --navy: #101828;
  --navy-2: #1B2A4A;
  --light: #F7F8FA;
  --text: #1F2937;
  --muted: #6B7280;
  --white: #FFFFFF;
  --green: #25D366; /* WhatsApp */
  --radius: 14px;
  --shadow: 0 8px 24px rgba(16, 24, 40, .12);
  --font: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); color: var(--text); background: var(--light); line-height: 1.6; }
img, svg { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
.container { max-width: 1160px; margin: 0 auto; padding: 0 20px; }

/* ===== Header ===== */
.site-header { position: sticky; top: 0; z-index: 50; background: var(--navy); color: var(--white); box-shadow: var(--shadow); }
.site-header .container { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; }
.logo { font-weight: 800; font-size: 1.25rem; }
.logo span { color: var(--accent); }
.nav { display: flex; gap: 22px; align-items: center; }
.nav a { font-weight: 600; opacity: .9; }
.nav a:hover { color: var(--accent); opacity: 1; }
.nav-toggle { display: none; background: none; border: 0; color: var(--white); font-size: 1.6rem; cursor: pointer; }

/* ===== Buttons & badges ===== */
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; border-radius: 999px; font-weight: 700; border: 0; cursor: pointer; font-size: 1rem; transition: transform .15s, box-shadow .15s; }
.btn:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.btn-primary { background: var(--accent); color: var(--white); }
.btn-primary:hover { background: var(--accent-dark); }
.btn-ghost { background: transparent; color: var(--white); border: 2px solid rgba(255,255,255,.5); }
.btn-whatsapp { background: var(--green); color: var(--white); }
.btn-call { background: var(--white); color: var(--navy); }
.badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: .78rem; font-weight: 700; }
.tag-sifir { background: #DCFCE7; color: #15803D; }
.tag-ikinciel { background: #DBEAFE; color: #1D4ED8; }
.tag-aksesuar { background: #FEF3C7; color: #B45309; }

/* ===== Sections & cards ===== */
.section { padding: 64px 0; }
.section-alt { background: var(--white); }
.section-dark { background: var(--navy-2); color: var(--white); }
.section-title { font-size: clamp(1.6rem, 3.5vw, 2.3rem); font-weight: 800; text-align: center; margin-bottom: 12px; }
.section-sub { text-align: center; color: var(--muted); max-width: 640px; margin: 0 auto 40px; }
.section-dark .section-sub { color: rgba(255,255,255,.75); }
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.card { background: var(--white); border-radius: var(--radius); padding: 26px 22px; box-shadow: 0 2px 10px rgba(16,24,40,.06); transition: transform .2s, box-shadow .2s; }
.card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.card h3 { margin: 12px 0 6px; font-size: 1.05rem; }
.card p { color: var(--muted); font-size: .92rem; }
.card .icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 12px; background: rgba(255,87,34,.12); color: var(--accent); font-size: 1.4rem; }

/* ===== Hero ===== */
.hero { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 60%, #26355c 100%); color: var(--white); padding: 72px 0 84px; text-align: center; }
.hero h1 { font-size: clamp(1.9rem, 5vw, 3.2rem); font-weight: 900; line-height: 1.2; }
.hero h1 span { color: var(--accent); }
.hero p { margin: 18px auto 30px; max-width: 620px; color: rgba(255,255,255,.8); font-size: 1.1rem; }
.hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ===== Marquee (kampanya bandı) ===== */
.marquee { background: var(--accent); color: var(--white); overflow: hidden; white-space: nowrap; padding: 9px 0; font-weight: 700; }
.marquee-inner { display: inline-block; animation: slide 22s linear infinite; }
.marquee-inner span { margin: 0 28px; }
@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ===== Trust bar / stats ===== */
.trust-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 18px; text-align: center; }
.stat b { display: block; font-size: 1.8rem; color: var(--accent); font-weight: 900; }
.stat span { color: var(--muted); font-weight: 600; font-size: .9rem; }

/* ===== CTA band ===== */
.cta-band { background: linear-gradient(120deg, var(--accent), var(--accent-dark)); color: var(--white); border-radius: var(--radius); padding: 44px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.cta-band h2 { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 900; }

/* ===== Products ===== */
.product-card { text-align: left; }
.product-card .thumb { height: 150px; border-radius: 10px; background: var(--light); display: grid; place-items: center; font-size: 3rem; margin-bottom: 14px; }
.price { font-size: 1.25rem; font-weight: 900; color: var(--navy); margin: 8px 0; }
.filters { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 34px; }
.filters .btn { padding: 9px 20px; background: var(--white); color: var(--text); border: 2px solid #E5E7EB; }
.filters .btn.active { background: var(--accent); color: var(--white); border-color: var(--accent); }

/* ===== Wizard / forms ===== */
.wizard { background: var(--white); border-radius: var(--radius); padding: 30px; box-shadow: var(--shadow); max-width: 560px; margin: 0 auto; }
.field { margin-bottom: 18px; }
.field label { display: block; font-weight: 700; margin-bottom: 6px; font-size: .92rem; }
.field select, .field input { width: 100%; padding: 12px 14px; border: 2px solid #E5E7EB; border-radius: 10px; font-size: 1rem; font-family: inherit; background: var(--white); }
.field select:focus, .field input:focus { outline: none; border-color: var(--accent); }
.wizard .fallback { margin-top: 14px; text-align: center; font-size: .9rem; color: var(--muted); }

/* ===== Steps (takas) ===== */
.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; counter-reset: step; }
.step-card { position: relative; padding-top: 54px; text-align: center; }
.step-card::before { counter-increment: step; content: counter(step); position: absolute; top: 16px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; border-radius: 50%; background: var(--accent); color: var(--white); font-weight: 900; display: grid; place-items: center; }

/* ===== Map & reviews ===== */
.map-embed { width: 100%; height: 380px; border: 0; border-radius: var(--radius); }
.review-card blockquote { font-style: italic; color: var(--text); }
.review-card .stars { color: #F59E0B; letter-spacing: 2px; }
.review-card footer { margin-top: 10px; font-weight: 700; font-size: .88rem; color: var(--muted); }

/* ===== Footer ===== */
.site-footer { background: var(--navy); color: rgba(255,255,255,.8); padding: 54px 0 24px; }
.site-footer .cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; margin-bottom: 34px; }
.site-footer h4 { color: var(--white); margin-bottom: 12px; }
.site-footer a:hover { color: var(--accent); }
.site-footer .copy { border-top: 1px solid rgba(255,255,255,.15); padding-top: 18px; text-align: center; font-size: .85rem; }

/* ===== Floating WhatsApp ===== */
.float-wa { position: fixed; right: 18px; bottom: 18px; z-index: 60; width: 58px; height: 58px; border-radius: 50%; background: var(--green); color: var(--white); display: grid; place-items: center; font-size: 1.7rem; box-shadow: var(--shadow); }
.float-wa:hover { transform: scale(1.08); }

/* ===== Responsive ===== */
@media (max-width: 820px) {
  .nav { position: absolute; top: 64px; left: 0; right: 0; background: var(--navy); flex-direction: column; padding: 18px 20px 24px; display: none; }
  .nav.open { display: flex; }
  .nav-toggle { display: block; }
  .section { padding: 46px 0; }
}
```

- [ ] **Step 2: Write `assets/js/main.js`**

```js
window.GI = (function () {
  var PHONE = "905377881563";

  function wa(message) {
    return "https://wa.me/" + PHONE + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  // Wizard: on button click, read fields via buildMessageFn and open WhatsApp
  function bindWizard(formId, buttonId, buildMessageFn) {
    var form = document.getElementById(formId);
    var btn = document.getElementById(buttonId);
    if (!form || !btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var msg = buildMessageFn(form);
      if (!msg) return;
      window.open(wa(msg), "_blank");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Mobile nav
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
    }

    // Animated counters: <b data-count="5000">0</b>
    var counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          io.unobserve(el);
          var target = parseInt(el.getAttribute("data-count"), 10);
          var start = null;
          function tick(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 1200, 1);
            el.textContent = Math.floor(p * target).toLocaleString("tr-TR") + (p === 1 ? "+" : "");
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(function (c) {
        c.textContent = parseInt(c.getAttribute("data-count"), 10).toLocaleString("tr-TR") + "+";
      });
    }

    // Product filter: buttons [data-filter="all|sifir|ikinciel|aksesuar"], cards [data-cat]
    var filterBtns = document.querySelectorAll("[data-filter]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        document.querySelectorAll("[data-cat]").forEach(function (card) {
          card.style.display = (f === "all" || card.getAttribute("data-cat") === f) ? "" : "none";
        });
      });
    });
  });

  return { wa: wa, bindWizard: bindWizard };
})();
```

- [ ] **Step 3: Verify JS syntax**

Run: `node --check assets/js/main.js`
Expected: no output (exit 0)

- [ ] **Step 4: Commit**

```bash
git add assets
git commit -m "feat: add design system CSS and shared JS (wa links, nav, counters, filter, wizard binder)"
```

---

### Task 2: Home page — `index.html`

**Files:**
- Create: `index.html`
- Modify: `assets/css/style.css` (append only if a section needs a style not in Task 1)

**Interfaces:**
- Consumes: all Task 1 CSS classes; `assets/js/main.js` auto-behaviors (nav toggle, counters)
- Produces: canonical header/footer markup that Tasks 3–5 copy verbatim (only changing the `<title>`, meta description, and active nav state)

- [ ] **Step 1: Write `index.html`**

Structure (all copy final Turkish, no lorem ipsum). Head block — reuse on every page with page-specific title/description:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Güner İletişim | Avcılar Telefon Tamiri, Teknik Servis ve 2.El Cihaz</title>
  <meta name="description" content="Avcılar'da telefon tamiri, ekran değişimi, pil değişimi, 0 ve 2.el telefon alım satım, takas. Güner İletişim: Cihangir Ormanlı Cd. No:46. Hemen arayın: 0537 788 15 63">
  <meta property="og:title" content="Güner İletişim | Avcılar Telefon ve Teknik Servis Merkezi">
  <meta property="og:description" content="Ekran, pil, şarj portu onarımı; 0 ve 2.el cihaz; takas. Aynı gün teslim.">
  <meta property="og:type" content="business.business">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
  <script defer src="assets/js/main.js"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Güner İletişim Laptop Bilgisayar Cep Telefonu Teknik Servisi",
    "telephone": "+905377881563",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cihangir, Ormanlı Cd. No:46",
      "postalCode": "34310",
      "addressLocality": "Avcılar",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "url": "https://guneriletisim.example",
    "priceRange": "₺₺"
  }
  </script>
</head>
```

Body sections in order:

1. **Header** (canonical — copied by all pages):
```html
<header class="site-header">
  <div class="container">
    <a class="logo" href="index.html">Güner <span>İletişim</span></a>
    <button class="nav-toggle" aria-label="Menüyü aç">☰</button>
    <nav class="nav">
      <a href="teknik-servis.html">Teknik Servis</a>
      <a href="takas.html">Takas</a>
      <a href="urunler.html">Ürünler</a>
      <a href="index.html#iletisim">İletişim</a>
      <a class="btn btn-primary" href="tel:+905377881563">📞 Hemen Ara</a>
    </nav>
  </div>
</header>
```
2. **Marquee**: `.marquee > .marquee-inner` with content duplicated twice for the loop; items: `🔥 Eskini Getir Yenisini Götür` · `⚡ Aynı Gün Ekran Değişimi` · `✅ Garantili Onarım` · `📱 2.El Cihazlarda Fırsat Fiyatlar` · `💳 Yerinde Ücretsiz Arıza Tespiti`
3. **Hero**: h1 `Avcılar'ın <span>Telefon ve Teknik Servis</span> Merkezi`; sub paragraph: `Ekran değişimi, pil, şarj portu, su hasarı onarımı; sıfır ve 2.el cihaz alım-satım, takas. Uygun fiyat, hızlı teslim, garantili işçilik.`; actions: `.btn-whatsapp` → `https://wa.me/905377881563?text=Merhaba, bilgi almak istiyorum.` (💬 WhatsApp'tan Yaz) + `.btn-call` → `tel:+905377881563` (📞 0537 788 15 63)
4. **Trust bar** (`.section` + `.trust-bar`, 4 `.stat`): `<b data-count="5000">0</b><span>Başarılı Onarım</span>`, `data-count="10"` → `Yıllık Tecrübe`, `data-count="1500"` → `Mutlu Müşteri`, static stat `b: Aynı Gün` / `span: Teslimat`
5. **Service cards** (`.section-alt`): title `Teknik Servis Hizmetlerimiz`; sub `Telefon, tablet ve bilgisayarınızdaki her sorun için profesyonel çözüm.`; `.card-grid` of 9 cards each linking to `teknik-servis.html#<anchor>`: ekran (📱, `#ekran`), pil (🔋, `#pil`), şarj portu (🔌, `#sarj`), mikrofon/hoparlör (🔊, `#ses`), güç düğmesi (⏻ use ⚡, `#guc`), su hasarı (💧, `#su`), yazılım (🛠️, `#yazilim`), tablet onarımı (📲, `#tablet`), ücretsiz arıza tarama (🔍, `#tarama`). Card copy: one short sentence each, e.g. ekran: `Kırık, çatlak ekranlar orijinal kalitede parçalarla aynı gün değişir.`
6. **Takas CTA band** (`.section` wrapping `.cta-band`): h2 `Eskini Getir, Yenisini Götür!`; p `Eski telefonun ne durumda olursa olsun değerinde alalım, yenisine sayalım.`; button `.btn-call` → `takas.html` label `Takas Teklifi Al →`
7. **Product showcase** (`.section`): title `Öne Çıkan Cihazlar`; 6 sample `.card.product-card`s (emoji thumbs 📱💻) with `.badge.tag-sifir`/`.tag-ikinciel`, name, `.price` (e.g. `iPhone 13 128 GB` / `2.El Temiz` / `28.500 ₺`), each with `.btn-whatsapp` small button `WhatsApp'tan Sor` linking `GI`-style static href: `https://wa.me/905377881563?text=Merhaba, iPhone 13 128 GB hakkında bilgi almak istiyorum.` (hand-encode each: spaces `%20` not required if using the raw text — browsers encode automatically, but write pre-encoded URLs to be safe). Bottom center: `.btn-primary` → `urunler.html` `Tüm Ürünleri Gör`
8. **SIM & other services** (`.section-dark`): title `SIM ve Diğer Hizmetler`; cards: e-SIM Aktivasyonu (📶), SIM Card (💳), Tourist SIM Card & Pack (🌍, copy in Turkish: `Türkiye'ye gelen misafirler için hazır turist SIM paketleri.`), IMEI Kaydı (🛡️), Bilgi Aktarımı (🔄). Each card `.btn-whatsapp` link with matching pre-filled message.
9. **Reviews + map** (`.section-alt`, `id="iletisim"`): title `Müşterilerimiz Ne Diyor?`; 3 `.card.review-card`s with `.stars` (★★★★★), short Turkish quotes (e.g. `Ekranım bir saatte değişti, fiyat da gayet uygundu. Kesinlikle tavsiye ederim.` — Mehmet K.). Below: address block + `.btn-primary` `Yol Tarifi Al` → `https://www.google.com/maps/dir/?api=1&destination=G%C3%BCner+%C4%B0leti%C5%9Fim+Ormanl%C4%B1+Cd.+No:46+Avc%C4%B1lar+%C4%B0stanbul` + iframe:
```html
<iframe class="map-embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps?q=Ormanl%C4%B1%20Cd.%20No:46%20Avc%C4%B1lar%20%C4%B0stanbul&output=embed"
  title="Güner İletişim konum"></iframe>
```
10. **Footer** (canonical — copied by all pages):
```html
<footer class="site-footer">
  <div class="container">
    <div class="cols">
      <div>
        <h4>Güner İletişim</h4>
        <p>Laptop, bilgisayar ve cep telefonu teknik servisi. Sıfır ve 2.el cihaz alım-satım, takas.</p>
      </div>
      <div>
        <h4>Hızlı Erişim</h4>
        <p><a href="teknik-servis.html">Teknik Servis</a></p>
        <p><a href="takas.html">Telefon Takası</a></p>
        <p><a href="urunler.html">Ürünler</a></p>
      </div>
      <div>
        <h4>İletişim</h4>
        <p>Cihangir, Ormanlı Cd. No:46<br>34310 Avcılar/İstanbul</p>
        <p><a href="tel:+905377881563">📞 0537 788 15 63</a></p>
        <p><a href="https://wa.me/905377881563">💬 WhatsApp</a></p>
      </div>
      <div>
        <h4>Çalışma Saatleri</h4>
        <p>Pazartesi – Cumartesi: 09.00 – 20.00<br>Pazar: 10.00 – 18.00</p>
      </div>
    </div>
    <p class="copy">© 2026 Güner İletişim. Tüm hakları saklıdır.</p>
  </div>
</footer>
<a class="float-wa" href="https://wa.me/905377881563" aria-label="WhatsApp ile yazın">💬</a>
```

- [ ] **Step 2: Verify in browser**

Run: `npx serve . -l 8090` (background) then open `http://localhost:8090`.
Check: no console errors; counters animate; mobile nav toggles at 375px; marquee scrolls; all 3 nav links + service card links point at correct files/anchors; map iframe renders; WhatsApp links open wa.me with readable Turkish text.

- [ ] **Step 3: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "feat: add home page with hero, services, showcase, reviews and map"
```

---

### Task 3: Technical service page — `teknik-servis.html`

**Files:**
- Create: `teknik-servis.html`
- Modify: `assets/css/style.css` (append `.service-row` styles below)

**Interfaces:**
- Consumes: Task 1 classes + `GI.bindWizard(formId, buttonId, fn)`; Task 2 canonical header/footer (copy verbatim, change title/description)
- Produces: anchors `#ekran #pil #sarj #ses #guc #su #yazilim #tablet #tarama #imei #aktarim` (linked from index service cards) and wizard ids `arizaForm`/`arizaBtn`

- [ ] **Step 1: Append to `assets/css/style.css`**

```css
/* ===== Service detail rows ===== */
.service-row { display: flex; gap: 18px; align-items: flex-start; background: var(--white); border-radius: var(--radius); padding: 24px; box-shadow: 0 2px 10px rgba(16,24,40,.06); }
.service-row .icon { flex: 0 0 48px; }
.service-row .meta { font-size: .85rem; color: var(--accent); font-weight: 700; }
.service-list { display: grid; gap: 16px; max-width: 820px; margin: 0 auto; }
```

- [ ] **Step 2: Write `teknik-servis.html`**

Head: title `Teknik Servis | Avcılar Ekran Değişimi, Pil, Şarj Portu Tamiri — Güner İletişim`, description `Avcılar'da telefon ve tablet tamiri: ekran değişimi, pil değişimi, şarj portu, su hasarı, yazılım. Ücretsiz arıza tespiti. 0537 788 15 63`. Same fonts/CSS/JS/schema-free head otherwise. Copy Task 2 header/footer verbatim.

Sections:
1. Small hero (`.hero` reduced padding via inline section, h1 `Teknik Servis`; p `Ücretsiz arıza tespiti — önce bakalım, sonra konuşalım.`)
2. `.section` with `.service-list` of 11 `.service-row`s, each `id` from the anchor list. Content table (icon / id / title / copy / süre):
   - 📱 `ekran` Ekran Onarımı / Değişimi — `Kırık, çatlak veya görüntü vermeyen ekranlar kaliteli panellerle değiştirilir.` — `Süre: 1-2 saat`
   - 🔋 `pil` Pil Değişimi — `Şarjı hızlı biten, şişen piller orijinal kalite pillerle yenilenir.` — `Süre: 30-60 dk`
   - 🔌 `sarj` Şarj Portu Tamiri — `Şarj almayan veya temassızlık yapan soketler onarılır ya da değiştirilir.` — `Süre: 1 saat`
   - 🔊 `ses` Mikrofon / Hoparlör Tamiri — `Karşı taraf sizi duymuyorsa veya ses gelmiyorsa çözüm bizde.` — `Süre: 1 saat`
   - ⚡ `guc` Güç Düğmesi Onarımı — `Basmayan, sıkışan güç ve ses tuşları onarılır.` — `Süre: 1 saat`
   - 💧 `su` Su Hasarı Tamiri — `Suya düşen cihazlar özel işlemlerle kurtarılır; ne kadar erken gelirse şans o kadar yüksek.` — `Süre: aynı gün`
   - 🛠️ `yazilim` Yazılım Sorunları — `Açılmayan, donan, yavaşlayan cihazlara format, güncelleme ve yazılım onarımı.` — `Süre: 1-3 saat`
   - 📲 `tablet` Tablet Onarımı — `Tablet ekran, pil, şarj soketi ve yazılım işlemleri.` — `Süre: aynı gün`
   - 🔍 `tarama` Ücretsiz Arıza Tarama — `Cihazınız elden geçirilir, sorun ve net fiyat size bildirilir. Tespit ücretsizdir.` — `Süre: 15 dk`
   - 🛡️ `imei` IMEI Kaydı — `Yurt dışından gelen cihazların IMEI kayıt işlemlerinde danışmanlık.` — `Süre: başvuruya göre`
   - 🔄 `aktarim` Bilgi Aktarımı — `Eski telefondan yenisine rehber, fotoğraf ve tüm verilerin güvenli aktarımı.` — `Süre: 30-60 dk`
   Each row ends with `.btn-whatsapp` small link, pre-filled per service, e.g. `https://wa.me/905377881563?text=Merhaba, ekran değişimi için fiyat almak istiyorum.`
3. **Arıza talep sihirbazı** (`.section-dark`), title `Fiyat Teklifi Al`; sub `Cihazını ve sorununu seç, WhatsApp'tan anında fiyat iste.`:
```html
<form class="wizard" id="arizaForm">
  <div class="field">
    <label for="cihaz">Cihaz Türü</label>
    <select id="cihaz">
      <option>Telefon</option><option>Tablet</option><option>Laptop</option><option>Bilgisayar</option>
    </select>
  </div>
  <div class="field">
    <label for="marka">Marka / Model</label>
    <input id="marka" type="text" placeholder="Örn: iPhone 13, Samsung S23">
  </div>
  <div class="field">
    <label for="ariza">Arıza Türü</label>
    <select id="ariza">
      <option>Ekran değişimi</option><option>Pil değişimi</option><option>Şarj portu</option>
      <option>Mikrofon / hoparlör</option><option>Güç düğmesi</option><option>Su hasarı</option>
      <option>Yazılım sorunu</option><option>Bilgi aktarımı</option><option>Diğer / bilmiyorum</option>
    </select>
  </div>
  <button class="btn btn-whatsapp" id="arizaBtn" type="submit">💬 WhatsApp'tan Fiyat İste</button>
  <p class="fallback">Form çalışmazsa: <a href="https://wa.me/905377881563"><b>WhatsApp'tan yazın: 0537 788 15 63</b></a></p>
</form>
<script>
  GI.bindWizard("arizaForm", "arizaBtn", function (f) {
    var marka = f.querySelector("#marka").value.trim() || "belirtilmedi";
    return "Merhaba, " + f.querySelector("#cihaz").value + " (" + marka + ") için " +
           f.querySelector("#ariza").value + " konusunda fiyat almak istiyorum.";
  });
</script>
```
(Note: this inline script must appear AFTER the form and relies on `main.js` being loaded with `defer` — `GI` is defined at parse time because main.js's IIFE runs before deferred inline? NO: inline scripts run before deferred scripts. Therefore load `main.js` WITHOUT `defer` on this page, or wrap the inline call in `document.addEventListener("DOMContentLoaded", ...)`. Use the DOMContentLoaded wrapper — keep `defer` consistent everywhere; `bindWizard` only binds listeners so timing is safe: wrap inline block as
`document.addEventListener("DOMContentLoaded", function(){ GI.bindWizard(...); });` — still fails because `GI` itself is undefined until deferred script runs, and DOMContentLoaded fires after deferred scripts execute, so the wrapper IS sufficient. Use the wrapper.)

- [ ] **Step 3: Verify in browser**

Open `http://localhost:8090/teknik-servis.html`.
Check: anchors from index cards land on correct rows; wizard selections produce correct Turkish WhatsApp message (test: Telefon + "iPhone 13" + Ekran değişimi → message contains all three); empty marka gives "belirtilmedi"; fallback link visible.

- [ ] **Step 4: Commit**

```bash
git add teknik-servis.html assets/css/style.css
git commit -m "feat: add technical service page with service details and WhatsApp quote wizard"
```

---

### Task 4: Trade-in page — `takas.html`

**Files:**
- Create: `takas.html`

**Interfaces:**
- Consumes: Task 1 classes (`.steps`, `.step-card`, `.wizard`), `GI.bindWizard`; Task 2 canonical header/footer
- Produces: wizard ids `takasForm`/`takasBtn`

- [ ] **Step 1: Write `takas.html`**

Head: title `Telefon Takası | Eskiyi Getir Yeniyi Götür — Güner İletişim Avcılar`, description `Avcılar'da telefon takası: eski telefonunuzu değerinde sayalım, sıfır veya 2.el yenisiyle çıkın. Anında WhatsApp'tan teklif alın.`

Sections:
1. Hero: h1 `Eskini Getir, <span>Yenisini Götür</span>`; p `Eski cihazın değerinde sayılır, aradaki farkı ödersin. Bu kadar basit.`; CTA `.btn-whatsapp` pre-filled `Merhaba, telefon takası hakkında bilgi almak istiyorum.`
2. `.section` `.steps` — 3 `.step-card`s (numbered by CSS counter):
   - `Cihazını Getir` — `Eski telefon, tablet veya laptopunu mağazamıza getir; kırık, arızalı fark etmez.`
   - `Anında Değerleme` — `Cihazın gözünün önünde test edilir, piyasa değerinde net teklif verilir.`
   - `Yenisiyle Çık` — `Beğendiğin sıfır veya 2.el cihazı seç, aradaki farkı öde, aynı gün kullanmaya başla.`
3. Advantages band (`.section-alt`, `.card-grid` 4 cards): `Kırık / arızalı cihaz da kabul` (🔧), `Piyasa değerinde adil teklif` (⚖️), `Anında işlem, beklemek yok` (⚡), `Fark ödemede pazarlık payı` (🤝) — each one short supporting sentence.
4. **Teklif sihirbazı** (`.section-dark`), title `Cihazın Ne Eder? Hemen Sor`:
```html
<form class="wizard" id="takasForm">
  <div class="field">
    <label for="tmarka">Marka</label>
    <select id="tmarka">
      <option>Apple / iPhone</option><option>Samsung</option><option>Xiaomi</option>
      <option>Huawei</option><option>Oppo</option><option>Realme</option><option>Diğer</option>
    </select>
  </div>
  <div class="field">
    <label for="tmodel">Model</label>
    <input id="tmodel" type="text" placeholder="Örn: iPhone 12 Pro 128 GB">
  </div>
  <div class="field">
    <label for="tdurum">Cihaz Durumu</label>
    <select id="tdurum">
      <option>Az kullanılmış, sorunsuz</option><option>Normal kullanım izleri var</option>
      <option>Ekranı kırık / çatlak</option><option>Arızalı / açılmıyor</option>
    </select>
  </div>
  <button class="btn btn-whatsapp" id="takasBtn" type="submit">💬 Takas Teklifi İste</button>
  <p class="fallback">Form çalışmazsa: <a href="https://wa.me/905377881563"><b>WhatsApp'tan yazın: 0537 788 15 63</b></a></p>
</form>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    GI.bindWizard("takasForm", "takasBtn", function (f) {
      var model = f.querySelector("#tmodel").value.trim() || "belirtilmedi";
      return "Merhaba, takas yapmak istiyorum. Cihazım: " + f.querySelector("#tmarka").value +
             " " + model + ", durumu: " + f.querySelector("#tdurum").value + ". Teklifinizi alabilir miyim?";
    });
  });
</script>
```
5. Closing CTA band (`.cta-band`): h2 `Yerinde görmek daha kolay.` p `Cihazını getir, 10 dakikada net teklifini al.` + `Yol Tarifi Al` button (same maps dir URL as index).

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8090/takas.html`. Check: step numbers 1-2-3 render via CSS counters; wizard message contains marka + model + durum; fallback link works.

- [ ] **Step 3: Commit**

```bash
git add takas.html
git commit -m "feat: add trade-in page with 3-step flow and WhatsApp offer wizard"
```

---

### Task 5: Products page — `urunler.html`

**Files:**
- Create: `urunler.html`

**Interfaces:**
- Consumes: Task 1 classes (`.filters`, `.product-card`, tags) + main.js auto filter behavior (`[data-filter]` buttons, `[data-cat]` cards); Task 2 canonical header/footer
- Produces: nothing consumed later

- [ ] **Step 1: Write `urunler.html`**

Head: title `Ürünler | Sıfır ve 2.El Telefon, Aksesuar — Güner İletişim Avcılar`, description `Avcılar'da sıfır ve 2.el iPhone, Samsung, Xiaomi telefonlar; kırılmaz cam, kılıf ve aksesuarlar. Uygun fiyat, garantili cihazlar.`

Sections:
1. Hero: h1 `Sıfır ve 2.El <span>Cihazlar</span>`; p `Tüm cihazlar test edilmiş ve garantilidir. Fiyat sormak için WhatsApp yeterli.`
2. `.section` with `.filters`:
```html
<div class="filters">
  <button class="btn active" data-filter="all">Tümü</button>
  <button class="btn" data-filter="sifir">Sıfır</button>
  <button class="btn" data-filter="ikinciel">2.El</button>
  <button class="btn" data-filter="aksesuar">Aksesuar</button>
</div>
```
3. `.card-grid` with 12 sample product cards. Device card pattern (8 devices — mix of sıfır/2.el, phones + 1 laptop):
```html
<div class="card product-card" data-cat="ikinciel">
  <div class="thumb">📱</div>
  <span class="badge tag-ikinciel">2.El Temiz</span>
  <h3>iPhone 13 128 GB</h3>
  <p class="price">28.500 ₺</p>
  <a class="btn btn-whatsapp" href="https://wa.me/905377881563?text=Merhaba%2C%20iPhone%2013%20128%20GB%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.">💬 WhatsApp'tan Sor</a>
</div>
```
Sample devices: iPhone 13 128 GB (2.el, 28.500 ₺), iPhone 12 64 GB (2.el, 21.000 ₺), Samsung Galaxy S23 (sıfır, 34.900 ₺), Samsung Galaxy A54 (sıfır, 16.900 ₺), Xiaomi Redmi Note 13 (sıfır, 11.900 ₺), iPhone 11 128 GB (2.el, 17.500 ₺), Lenovo IdeaPad 15 (2.el, 14.900 ₺ — thumb 💻), Oppo A78 (sıfır, 9.900 ₺). Each with its own pre-encoded wa.me text containing the product name.
4. Accessory cards (4, `data-cat="aksesuar"`, `tag-aksesuar` badge `Mağazada`): Kırılmaz Cam (🛡️), Telefon Kılıfı (📱), Şarj Aleti & Kablo (🔌), Kulaklık (🎧). NO price element. Card copy: `Tüm modellere uygun çeşitler mağazamızda.` Buttons per card: `.btn-whatsapp` `Stok Sor` (pre-filled e.g. `Merhaba, kırılmaz cam çeşitleriniz hakkında bilgi almak istiyorum.`).
5. **Visit-store notice** (`.section-alt`, centered `.cta-band` variant): h2 `Kırılmaz Cam ve Kılıflar Mağazamızda!`; p exact copy: `Kırılmaz cam ve kılıf çeşitlerimizi şubemizi ziyaret ederek inceleyebilir ve satın alabilirsiniz. Takılması bizden, hediye.`; buttons: `Yol Tarifi Al` (maps dir URL) + `WhatsApp'tan Stok Sor`.
6. Note under grid (small muted text): `Fiyatlar güncel stok durumuna göre değişebilir. Kesin fiyat için WhatsApp'tan yazın.`

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8090/urunler.html`. Check: filter buttons show/hide correct cards (Sıfır → only sifir; Aksesuar → only 4 accessory cards); accessory cards show no price; visit-store copy present verbatim; each device WhatsApp link contains that device's name decoded.

- [ ] **Step 3: Commit**

```bash
git add urunler.html
git commit -m "feat: add products page with filterable devices and visit-store accessories"
```

---

### Task 6: Cross-page QA + final polish

**Files:**
- Modify: any of the 4 HTML pages / `style.css` (fixes only)

**Interfaces:**
- Consumes: everything above

- [ ] **Step 1: Link & consistency sweep**

For each page verify: header/footer identical (except title/meta); every internal link resolves (`index.html`, `teknik-servis.html#...` anchors exist, `takas.html`, `urunler.html`, `index.html#iletisim`); every `tel:` is `tel:+905377881563`; every wa.me link uses `905377881563`; floating `.float-wa` present on all 4 pages.

Run helper check:
```bash
grep -rn "wa.me" *.html | grep -v "905377881563" ; grep -rn "tel:" *.html | grep -v "+905377881563"
```
Expected: no output from either grep.

- [ ] **Step 2: Responsive pass**

At 375px, 768px, 1280px on all 4 pages: no horizontal scroll, nav toggle works, hero buttons wrap, card grids reflow, wizard usable on mobile. Fix any overflow in `style.css`.

- [ ] **Step 3: Console + Lighthouse sanity**

No console errors on any page. Run Lighthouse (or basic check): images/iframes have `title`/`alt`/`aria-label`, headings hierarchical (one `h1` per page), meta description present.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: cross-page QA fixes and responsive polish"
```
