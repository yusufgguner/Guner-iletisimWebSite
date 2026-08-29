export const PHONE_DISPLAY = "0537 788 15 63";
export const PHONE_TEL = "tel:+905377881563";
export const WA_BASE = "https://wa.me/905377881563";
export const ADDRESS_1 = "Cihangir, Ormanlı Cd. No:46";
export const ADDRESS_2 = "34310 Avcılar/İstanbul";
export const HOURS_WEEK = "Pazartesi – Cumartesi: 09.00 – 20.00";
export const HOURS_SUN = "Pazar: 10.00 – 18.00";
export const MAPS_DIR =
  "https://www.google.com/maps/dir/?api=1&destination=G%C3%BCner+%C4%B0leti%C5%9Fim+Ormanl%C4%B1+Cd.+No:46+Avc%C4%B1lar+%C4%B0stanbul";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=Ormanl%C4%B1%20Cd.%20No:46%20Avc%C4%B1lar%20%C4%B0stanbul&output=embed";

export function wa(message?: string) {
  return message ? `${WA_BASE}?text=${encodeURIComponent(message)}` : WA_BASE;
}

export type Product = {
  slug: string;
  name: string;
  price?: string;
  cat: "sifir" | "ikinciel" | "aksesuar";
  badge: string;
  /** public path when a real photo exists; otherwise DeviceArt renders an illustration */
  image?: string;
  art?: "phone-notch" | "phone-punch" | "laptop" | "glass" | "case" | "cable" | "earbuds";
  artTone?: string; // muted screen tone for illustrations
  waText: string;
  featured?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "iphone-13", name: "iPhone 13 128 GB", price: "28.500 ₺", cat: "ikinciel", badge: "2.El Temiz",
    art: "phone-notch", artTone: "#3f4c63",
    waText: "Merhaba, iPhone 13 128 GB hakkında bilgi almak istiyorum.", featured: true,
  },
  {
    slug: "galaxy-s23", name: "Samsung Galaxy S23", price: "34.900 ₺", cat: "sifir", badge: "Sıfır",
    image: "/products/galaxy-s23.png",
    waText: "Merhaba, Samsung Galaxy S23 hakkında bilgi almak istiyorum.", featured: true,
  },
  {
    slug: "iphone-12", name: "iPhone 12 64 GB", price: "21.000 ₺", cat: "ikinciel", badge: "2.El Temiz",
    image: "/products/iphone-12.png",
    waText: "Merhaba, iPhone 12 64 GB hakkında bilgi almak istiyorum.", featured: true,
  },
  {
    slug: "galaxy-a54", name: "Samsung Galaxy A54", price: "16.900 ₺", cat: "sifir", badge: "Sıfır",
    art: "phone-punch", artTone: "#44584f",
    waText: "Merhaba, Samsung Galaxy A54 hakkında bilgi almak istiyorum.", featured: true,
  },
  {
    slug: "redmi-note-13", name: "Xiaomi Redmi Note 13", price: "11.900 ₺", cat: "sifir", badge: "Sıfır",
    art: "phone-punch", artTone: "#5a4a42",
    waText: "Merhaba, Xiaomi Redmi Note 13 hakkında bilgi almak istiyorum.", featured: true,
  },
  {
    slug: "iphone-11", name: "iPhone 11 128 GB", price: "17.500 ₺", cat: "ikinciel", badge: "2.El Temiz",
    art: "phone-notch", artTone: "#4c3f56",
    waText: "Merhaba, iPhone 11 128 GB hakkında bilgi almak istiyorum.", featured: true,
  },
  {
    slug: "ideapad", name: "Lenovo IdeaPad 15", price: "14.900 ₺", cat: "ikinciel", badge: "2.El Temiz",
    art: "laptop", artTone: "#3f4c63",
    waText: "Merhaba, Lenovo IdeaPad 15 hakkında bilgi almak istiyorum.",
  },
  {
    slug: "oppo-a78", name: "Oppo A78", price: "9.900 ₺", cat: "sifir", badge: "Sıfır",
    art: "phone-punch", artTone: "#3d5a5e",
    waText: "Merhaba, Oppo A78 hakkında bilgi almak istiyorum.",
  },
  {
    slug: "kirilmaz-cam", name: "Kırılmaz Cam", cat: "aksesuar", badge: "Mağazada",
    art: "glass",
    waText: "Merhaba, kırılmaz cam çeşitleriniz hakkında bilgi almak istiyorum.",
  },
  {
    slug: "kilif", name: "Telefon Kılıfı", cat: "aksesuar", badge: "Mağazada",
    image: "/products/kilif.jpg",
    waText: "Merhaba, telefon kılıfı çeşitleriniz hakkında bilgi almak istiyorum.",
  },
  {
    slug: "sarj", name: "Şarj Aleti & Kablo", cat: "aksesuar", badge: "Mağazada",
    image: "/products/sarj.jpg",
    waText: "Merhaba, şarj aleti ve kablo çeşitleriniz hakkında bilgi almak istiyorum.",
  },
  {
    slug: "kulaklik", name: "Kulaklık", cat: "aksesuar", badge: "Mağazada",
    art: "earbuds",
    waText: "Merhaba, kulaklık çeşitleriniz hakkında bilgi almak istiyorum.",
  },
];

export type Service = {
  id: string;
  title: string;
  desc: string;
  time: string;
  waText: string;
  icon: string; // lucide icon key resolved in components
};

export const SERVICES: Service[] = [
  { id: "ekran", title: "Ekran Onarımı / Değişimi", desc: "Kırık, çatlak veya görüntü vermeyen ekranlar kaliteli panellerle değiştirilir.", time: "1-2 saat", icon: "smartphone", waText: "Merhaba, ekran değişimi için fiyat almak istiyorum." },
  { id: "pil", title: "Pil Değişimi", desc: "Şarjı hızlı biten, şişen piller orijinal kalite pillerle yenilenir.", time: "30-60 dk", icon: "battery", waText: "Merhaba, pil değişimi için fiyat almak istiyorum." },
  { id: "sarj", title: "Şarj Portu Tamiri", desc: "Şarj almayan veya temassızlık yapan soketler onarılır ya da değiştirilir.", time: "1 saat", icon: "zap", waText: "Merhaba, şarj portu tamiri için fiyat almak istiyorum." },
  { id: "ses", title: "Mikrofon / Hoparlör Tamiri", desc: "Karşı taraf sizi duymuyorsa veya ses gelmiyorsa çözüm bizde.", time: "1 saat", icon: "volume", waText: "Merhaba, mikrofon/hoparlör tamiri için fiyat almak istiyorum." },
  { id: "guc", title: "Güç Düğmesi Onarımı", desc: "Basmayan, sıkışan güç ve ses tuşları onarılır.", time: "1 saat", icon: "power", waText: "Merhaba, güç düğmesi onarımı için fiyat almak istiyorum." },
  { id: "su", title: "Su Hasarı Tamiri", desc: "Suya düşen cihazlar özel işlemlerle kurtarılır; ne kadar erken gelirse şans o kadar yüksek.", time: "aynı gün", icon: "droplet", waText: "Merhaba, su hasarı tamiri için bilgi almak istiyorum." },
  { id: "yazilim", title: "Yazılım Sorunları", desc: "Açılmayan, donan, yavaşlayan cihazlara format, güncelleme ve yazılım onarımı.", time: "1-3 saat", icon: "code", waText: "Merhaba, yazılım sorunu için bilgi almak istiyorum." },
  { id: "tablet", title: "Tablet Onarımı", desc: "Tablet ekran, pil, şarj soketi ve yazılım işlemleri.", time: "aynı gün", icon: "tablet", waText: "Merhaba, tablet onarımı için bilgi almak istiyorum." },
  { id: "tarama", title: "Ücretsiz Arıza Tarama", desc: "Cihazınız elden geçirilir, sorun ve net fiyat size bildirilir. Tespit ücretsizdir.", time: "15 dk", icon: "search", waText: "Merhaba, ücretsiz arıza taraması için randevu almak istiyorum." },
  { id: "imei", title: "IMEI Kaydı", desc: "Yurt dışından gelen cihazların IMEI kayıt işlemlerinde danışmanlık.", time: "başvuruya göre", icon: "shield", waText: "Merhaba, IMEI kaydı hakkında bilgi almak istiyorum." },
  { id: "aktarim", title: "Bilgi Aktarımı", desc: "Eski telefondan yenisine rehber, fotoğraf ve tüm verilerin güvenli aktarımı.", time: "30-60 dk", icon: "transfer", waText: "Merhaba, bilgi aktarımı hizmeti hakkında bilgi almak istiyorum." },
];
