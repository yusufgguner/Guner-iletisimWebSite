import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import {
  ADDRESS_1, ADDRESS_2, HOURS_SUN, HOURS_WEEK, PHONE_DISPLAY, PHONE_TEL, wa,
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <Image src="/logo-dark.png" alt="Güner" width={112} height={50} className="h-8 w-auto self-center" />
            <span className="font-heading text-[23px] font-bold leading-none tracking-tight text-foreground">
              iletişim
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Laptop, bilgisayar ve cep telefonu teknik servisi. Sıfır ve 2.el cihaz alım-satım, takas.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold">Hızlı Erişim</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-primary" href="/teknik-servis/">Teknik Servis</Link></li>
            <li><Link className="hover:text-primary" href="/takas/">Telefon Takası</Link></li>
            <li><Link className="hover:text-primary" href="/urunler/">Ürünler</Link></li>
            <li><Link className="hover:text-primary" href="/#sss">Sık Sorulan Sorular</Link></li>
            <li><Link className="hover:text-primary" href="/kvkk/">KVKK &amp; Gizlilik</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold">İletişim</h3>
          <p className="text-sm text-muted-foreground">{ADDRESS_1}<br />{ADDRESS_2}</p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Phone className="size-4 text-primary" />
            <a className="hover:text-primary" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <MessageCircle className="size-4 text-primary" />
            <a className="hover:text-primary" href={wa()} target="_blank" rel="noopener">WhatsApp</a>
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold">Çalışma Saatleri</h3>
          <p className="text-sm text-muted-foreground">{HOURS_WEEK}<br />{HOURS_SUN}</p>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-5 py-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Güner İletişim. Tüm hakları saklıdır.</p>
          <p>
            Bu site ve tüm hakları{" "}
            <a
              href="https://linerasoft.com/tr"
              target="_blank"
              rel="noopener"
              className="font-semibold text-foreground underline-offset-2 hover:text-primary hover:underline"
            >
              LineraSoft
            </a>
            &apos;a aittir.
          </p>
        </div>
      </div>
    </footer>
  );
}
