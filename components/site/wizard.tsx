"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PHONE_DISPLAY, wa } from "@/lib/site";

export function ArizaWizard() {
  return (
    <Wizard
      buttonLabel="WhatsApp'tan Fiyat İste"
      fields={[
        { kind: "select", id: "cihaz", label: "Cihaz Türü", options: ["Telefon", "Tablet", "Laptop", "Bilgisayar"] },
        { kind: "text", id: "marka", label: "Marka / Model", placeholder: "Örn: iPhone 13, Samsung S23" },
        {
          kind: "select", id: "ariza", label: "Arıza Türü",
          options: [
            "Ekran değişimi", "Pil değişimi", "Şarj portu", "Mikrofon / hoparlör", "Güç düğmesi",
            "Su hasarı", "Yazılım sorunu", "Bilgi aktarımı", "Diğer / bilmiyorum",
          ],
        },
      ]}
      buildMessage={(v) => {
        const marka = (v.marka ?? "").trim() || "belirtilmedi";
        return `Merhaba, ${v.cihaz} (${marka}) için ${v.ariza} konusunda fiyat almak istiyorum.`;
      }}
    />
  );
}

export function TakasWizard() {
  return (
    <Wizard
      buttonLabel="Takas Teklifi İste"
      fields={[
        { kind: "select", id: "marka", label: "Marka", options: ["Apple / iPhone", "Samsung", "Xiaomi", "Huawei", "Oppo", "Realme", "Diğer"] },
        { kind: "text", id: "model", label: "Model", placeholder: "Örn: iPhone 12 Pro 128 GB" },
        { kind: "select", id: "durum", label: "Cihaz Durumu", options: ["Az kullanılmış, sorunsuz", "Normal kullanım izleri var", "Ekranı kırık / çatlak", "Arızalı / açılmıyor"] },
      ]}
      buildMessage={(v) => {
        const model = (v.model ?? "").trim() || "belirtilmedi";
        return `Merhaba, takas yapmak istiyorum. Cihazım: ${v.marka} ${model}, durumu: ${v.durum}. Teklifinizi alabilir miyim?`;
      }}
    />
  );
}

export type WizardField =
  | { kind: "select"; id: string; label: string; options: string[] }
  | { kind: "text"; id: string; label: string; placeholder: string };

export function Wizard({
  fields,
  buttonLabel,
  buildMessage,
}: {
  fields: WizardField[];
  buttonLabel: string;
  buildMessage: (values: Record<string, string>) => string;
}) {
  const defaults: Record<string, string> = {};
  for (const f of fields) if (f.kind === "select") defaults[f.id] = f.options[0];
  const [values, setValues] = useState<Record<string, string>>(defaults);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    window.open(wa(buildMessage(values)), "_blank", "noopener");
  }

  return (
    <Card className="mx-auto w-full max-w-xl shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={submit} className="space-y-5">
          {fields.map((f) =>
            f.kind === "select" ? (
              <div key={f.id} className="space-y-2">
                <label className="text-sm font-bold" htmlFor={f.id}>{f.label}</label>
                <Select
                  value={values[f.id]}
                  onValueChange={(v) => setValues((s) => ({ ...s, [f.id]: v }))}
                >
                  <SelectTrigger id={f.id} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options.map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div key={f.id} className="space-y-2">
                <label className="text-sm font-bold" htmlFor={f.id}>{f.label}</label>
                <Input
                  id={f.id}
                  placeholder={f.placeholder}
                  value={values[f.id] ?? ""}
                  onChange={(e) => setValues((s) => ({ ...s, [f.id]: e.target.value }))}
                />
              </div>
            )
          )}
          <Button type="submit" className="w-full rounded-full bg-wa text-wa-foreground hover:bg-wa/90">
            <MessageCircle data-slot="icon" /> {buttonLabel}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Form çalışmazsa:{" "}
            <a className="font-bold text-foreground hover:text-primary" href={wa()} target="_blank" rel="noopener">
              WhatsApp&apos;tan yazın: {PHONE_DISPLAY}
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
