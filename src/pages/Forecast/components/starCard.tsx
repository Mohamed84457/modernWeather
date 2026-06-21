interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/70 p-4 backdrop-blur-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{title}</p>
        {icon && <div className="text-sky-500">{icon}</div>}
      </div>

      <p className="mt-2 text-xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}