# Güner İletişim Web Sitesi — Tasarım Dokümanı

**Tarih:** 2026-08-28
**Durum:** Onaylandı (kullanıcı ile brainstorming sonucu)

## 1. Amaç

Avcılar/İstanbul'daki **Güner İletişim** (laptop, bilgisayar, cep telefonu teknik servisi ve 0/2.el cihaz alım-satımı) için satış odaklı, tanıtım + müşteri kazanım sitesi.

- **İşletme:** Güner İletişim Laptop Bilgisayar Cep Telefonu Teknik Servisi
- **Adres:** Cihangir, Ormanlı Cd. No:46, 34310 Avcılar/İstanbul
- **Telefon:** 0537 788 15 63 (WhatsApp aynı numara)

## 2. Ticari Model ve Kısıtlar

- **Vitrin + WhatsApp/Telefon modeli.** Online ödeme, sepet, kargo YOK.
- **Veritabanı YOK, yönetim paneli YOK, sunucu tarafı YOK.** Tamamen statik site.
- Tüm formlar `https://wa.me/905377881563?text=<hazır mesaj>` linki üretir; veri hiçbir yerde saklanmaz.
- Ürün/fiyat değişikliği koddan (statik içerikten) yapılır.
- Dil: Türkçe (tek dil).

## 3. Teknoloji

- Saf **HTML + CSS + vanilla JavaScript**. Framework yok, build aracı yok.
- Ortak stiller tek `assets/css/style.css` dosyasında; ortak JS `assets/js/main.js`.
- Her hostingde çalışır (Vercel/Netlify ücretsiz veya klasik Türk hosting).
- Görseller: SVG ikon seti + CSS/SVG cihaz mockupları. Gerçek dükkan/ürün fotoğrafları sonradan `assets/img/` altına eklenerek değiştirilebilir.

## 4. Sayfa Yapısı

```
index.html            Ana sayfa (vitrin + satış merkezi)
teknik-servis.html    Onarım hizmetleri + arıza talep sihirbazı
takas.html            Eskiyi Getir Yeniyi Götür + teklif formu
urunler.html          0/2.el cihaz + aksesuar vitrini
assets/css/style.css
assets/js/main.js
assets/img/           (yer tutucu + sonradan gerçek fotoğraflar)
```

### 4.1 Ana Sayfa (index.html) — bölüm sırası

1. **Üst bar:** logo/isim, menü (Teknik Servis, Takas, Ürünler, İletişim), sabit "Hemen Ara" butonu.
2. **Hero:** "Avcılar'ın Telefon ve Teknik Servis Merkezi" başlığı, kayan kampanya bandı, iki dev CTA: *WhatsApp'tan Yaz* + *Hemen Ara*.
3. **Güven rozetleri:** Aynı Gün Teslim · Garantili Onarım · Yerinde Fiyat · 5000+ Onarım (sayaç animasyonu).
4. **Hizmet kartları:** Ekran onarımı/değişimi, pil değişimi, şarj portu, mikrofon/hoparlör, güç düğmesi, su hasarı, yazılım sorunları, tablet onarımı, arıza tarama — ikonlu kartlar, tıklayınca teknik-servis.html ilgili bölüme.
5. **Takas CTA bandı:** "Eskini Getir, Yenisini Götür" — parlak, dikkat çekici, takas.html'e yönlendirir.
6. **2.el/0 vitrin:** Öne çıkan 6–8 cihaz kartı (görsel, fiyat, durum rozeti: "Sıfır" / "2.El Temiz"), "Tümünü Gör" → urunler.html.
7. **SIM ve diğer hizmetler:** e-SIM, SIM Card, Tourist SIM Card/Pack, IMEI kaydı, bilgi aktarımı — kart dizisi.
8. **Google yorumları + harita:** Yorum vitrini, gömülü Google Maps, "Yol Tarifi Al" butonu.
9. **Footer:** Adres, telefon, çalışma saatleri (yer tutucu), hızlı linkler, WhatsApp butonu.
10. **Sabit köşe butonu:** Her sayfada sağ altta yüzen WhatsApp butonu.

### 4.2 Teknik Servis Sayfası

- Her onarım türü için kart/bölüm: kısa açıklama + tahmini süre + "Fiyat Sor" butonu.
- Kapsanan hizmetler: ekran onarımı/değişimi, pil değişimi, şarj portu tamiri, mikrofon/hoparlör tamiri, güç düğmesi onarımı, su kaynaklı hasar tamiri, yazılım sorunları, tablet onarımı, telefon arıza tarama, IMEI kaydı, bilgi aktarımı.
- **Arıza talep sihirbazı** (sayfa altında): cihaz türü → marka → arıza türü seçimi → JS hazır WhatsApp mesajı üretir, örn. "Merhaba, iPhone 13 ekran değişimi için fiyat almak istiyorum."

### 4.3 Takas Sayfası

- 3 adımlı görsel anlatım: **Getir → Değerle → Yenisiyle Çık**.
- **Teklif formu:** marka/model/durum (Az kullanılmış / Normal / Ekran kırık vb.) seçimi → WhatsApp'a hazır teklif mesajı.
- Takasın avantajlarını anlatan satış metni.

### 4.4 Ürünler Sayfası

- Statik ürün kartları; JS ile istemci tarafı filtre butonları: **Sıfır / 2.El / Aksesuar**.
- Cihaz kartı: görsel, ad, fiyat, durum rozeti, "WhatsApp'tan Sor" butonu (ürün adı hazır mesaja gömülü).
- **Aksesuar bölümü:** kırılmaz cam, telefon kılıfı, şarj aleti/kablo vb. — fiyat listelenmez veya "mağazada" ibaresi; kartlarda net mesaj: **"Kırılmaz cam ve kılıf çeşitlerimizi şubemizi ziyaret ederek inceleyebilir ve satın alabilirsiniz."** CTA: "Yol Tarifi Al" + "WhatsApp'tan Stok Sor".
- Ürün listesi örnek verilerle başlar; gerçek liste geldiğinde koddan güncellenir.

## 5. Görsel Dil — Enerjik Satış Odaklı

- **Palet:** Turuncu-kırmızı vurgu (#FF5722 civarı) + koyu lacivert zemin (#101828 civarı) kontrastı; açık bölümlerle ritim.
- Bold, büyük başlıklar; kampanya rozetleri ve bantlar.
- Hafif animasyonlar: kart hover'da yükselme, sayaç animasyonu, kayan kampanya bandı.
- Mobil öncelikli responsive tasarım (müşteri kitlesi ağırlıkla telefondan girer).

## 6. SEO ve Yerel Arama

- Her sayfaya özgün `<title>` + meta description; hedef kelimeler: "Avcılar telefon tamiri", "Avcılar ekran değişimi", "Avcılar 2.el iPhone", "Avcılar telefon takası" vb.
- `LocalBusiness` JSON-LD schema: ad, adres, telefon, koordinat, çalışma saatleri.
- `tel:` ve `wa.me` linkleri; Open Graph etiketleri.
- Semantik HTML (header/nav/main/section/footer), alt metinli görseller.

## 7. Hata Durumları / Kenar Durumlar

- JS kapalıysa: formlar yerine düz "WhatsApp'tan yazın: 0537 788 15 63" fallback linki görünür.
- Harita embed'i yüklenmezse adres metni ve Google Maps linki her zaman durur.

## 8. Test / Doğrulama

- Tüm `wa.me` linklerinin doğru numara ve doğru URL-encode edilmiş mesaj üretmesi elle doğrulanır.
- Mobil (375px), tablet (768px), masaüstü görünümleri tarayıcıda kontrol edilir.
- Lighthouse ile temel SEO/performans kontrolü.

## 9. Kapsam Dışı (bilinçli olarak YOK)

- Online ödeme, sepet, üyelik, yönetim paneli, veritabanı, çoklu dil, blog.

## 10. Açık Kalemler (yer tutucu ile başlanacak)

- Gerçek ürün listesi ve fiyatlar
- Çalışma saatleri
- Gerçek dükkan/ürün fotoğrafları
- Varsa Instagram/sosyal medya hesapları
