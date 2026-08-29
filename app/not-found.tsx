import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid min-h-[55vh] place-items-center py-20 text-center">
      <div className="px-5">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-3 text-2xl font-bold">Aradığınız sayfa bulunamadı</h1>
        <p className="mt-2 text-muted-foreground">
          Sayfa taşınmış ya da hiç var olmamış olabilir.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Ana sayfaya dön</Link>
        </Button>
      </div>
    </section>
  );
}
