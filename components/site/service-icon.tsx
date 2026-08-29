import {
  ArrowLeftRight, Battery, Code2, Droplet, Power, Search, ShieldCheck,
  Smartphone, Tablet, Volume2, Zap, type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  battery: Battery,
  zap: Zap,
  volume: Volume2,
  power: Power,
  droplet: Droplet,
  code: Code2,
  tablet: Tablet,
  search: Search,
  shield: ShieldCheck,
  transfer: ArrowLeftRight,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? Smartphone;
  return <Icon className={className} />;
}
