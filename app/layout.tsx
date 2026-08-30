import type { Metadata } from "next";
import { Nunito_Sans, Rubik } from "next/font/google";
import { MessageCircle } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { wa } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700", "800"],
  variable: "--font-rubik",
});

const nunito = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Güner İletişim | Avcılar Telefon Tamiri, Teknik Servis ve 2.El Cihaz",
  description:
    "Avcılar'da telefon tamiri, ekran değişimi, pil değişimi, 0 ve 2.el telefon alım satım, takas. Güner İletişim: Cihangir Ormanlı Cd. No:46. Hemen arayın: 0537 788 15 63",
  openGraph: {
    title: "Güner İletişim | Avcılar Telefon ve Teknik Servis Merkezi",
    description: "Ekran, pil, şarj portu onarımı; 0 ve 2.el cihaz; takas. Aynı gün teslim.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${rubik.variable} ${nunito.variable} font-sans`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'console.log("%c\\u26A0 DUR!","color:#ea580c;font-size:28px;font-weight:bold");' +
              'console.log("%cBu sitenin t\\u00FCm haklar\\u0131 LineraSoft\\u0027a aittir, izinsiz kopyalanamaz.","font-size:14px;font-weight:bold");' +
              'console.log("%chttps://linerasoft.com/tr","font-size:12px");',
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <a
          href={wa()}
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp ile yazın"
          className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-wa text-wa-foreground shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle className="size-7" />
        </a>
      </body>
    </html>
  );
}
