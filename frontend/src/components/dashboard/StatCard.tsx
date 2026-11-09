import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBackground,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-secondary">{title}</p>

        <div className={`rounded-lg p-2 ${iconBackground}`}>
          <Icon size={20} className={iconColor} />
        </div>
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">
        {value}
      </p>
    </div>
  );
}
