function formatStudyTime(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

const STATS_CONFIG = [
  {
    key: "totalStudyTime",
    label: "Study Time",
    icon: "⏱",
    format: (v) => formatStudyTime(v),
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    key: "sessionsJoined",
    label: "Sessions",
    icon: "🤝",
    format: (v) => v.toString(),
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

export default function StatsCard({ stats }) {
  return (
    <section className="bg-white rounded-2xl border border-stone-200 p-6">
      <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Stats</h2>
      <div className="grid grid-cols-2 gap-3">
        {STATS_CONFIG.map(({ key, label, icon, format, color, bg, border }) => (
          <div
            key={key}
            className={`${bg} ${border} border rounded-xl p-4 flex flex-col gap-1.5 items-center text-center`}
          >
            <span className="text-xl">{icon}</span>
            <span className={`text-2xl font-bold tracking-tight ${color}`}>
              {format(stats[key] ?? 0)}
            </span>
            <span className="text-xs text-stone-400 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
