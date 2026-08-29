import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK ve Gizlilik | Güner İletişim",
  description: "Güner İletişim KVKK aydınlatma metni ve gizlilik politikası.",
};

export default function Kvkk() {
  return (
    <section className="py-16">
      <div className="prose-sm mx-auto max-w-3xl px-5 text-muted-foreground [&_h1]:text-foreground [&_h2]:text-foreground">
        <h1 className="text-3xl font-bold tracking-tight">KVKK Aydınlatma Metni ve Gizlilik</h1>

        <h2 className="mt-8 text-lg font-bold">Veri Sorumlusu</h2>
        <p className="mt-2">
          Güner İletişim Laptop Bilgisayar Cep Telefonu Teknik Servisi (&quot;Güner İletişim&quot;),
          Cihangir, Ormanlı Cd. No:46, 34310 Avcılar/İstanbul adresinde faaliyet gösterir.
        </p>

        <h2 className="mt-6 text-lg font-bold">Hangi Veriler İşlenir?</h2>
        <p className="mt-2">
          Bu web sitesi üye kaydı almaz, çerezle kişisel veri toplamaz ve form verilerini
          sunucuda saklamaz. Sitedeki formlar yalnızca sizin onayınızla WhatsApp uygulaması
          üzerinden bize mesaj göndermenizi sağlar; yazdığınız bilgiler WhatsApp yazışması
          olarak tarafımıza ulaşır.
        </p>

        <h2 className="mt-6 text-lg font-bold">Servis İşlemlerinde Veriler</h2>
        <p className="mt-2">
          Teknik servise bırakılan cihazlardaki kişisel verilere işlem gereği dışında erişilmez,
          kopyalanmaz ve üçüncü kişilerle paylaşılmaz. Dilerseniz işlem öncesi yedekleme ve
          veri aktarımı hizmeti talep edebilirsiniz.
        </p>

        <h2 className="mt-6 text-lg font-bold">İletişim Verileri</h2>
        <p className="mt-2">
          Telefon veya WhatsApp üzerinden ilettiğiniz ad ve iletişim bilgileri yalnızca talebinizin
          karşılanması amacıyla kullanılır; pazarlama amaçlı paylaşılmaz.
        </p>

        <h2 className="mt-6 text-lg font-bold">Üçüncü Taraf Bağlantılar</h2>
        <p className="mt-2">
          Sitede Google Haritalar ve WhatsApp bağlantıları bulunur. Bu servisleri kullandığınızda
          ilgili sağlayıcıların kendi gizlilik politikaları geçerlidir.
        </p>

        <h2 className="mt-6 text-lg font-bold">Haklarınız</h2>
        <p className="mt-2">
          6698 sayılı KVKK kapsamındaki haklarınıza ilişkin taleplerinizi mağazamıza başvurarak
          veya 0537 788 15 63 numarasından bize ulaşarak iletebilirsiniz.
        </p>
      </div>
    </section>
  );
}
