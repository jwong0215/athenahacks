const LEVEL_COLORS = {
  "Primary School": "bg-sky-50 text-sky-700 border-sky-100",
  "Middle School":  "bg-violet-50 text-violet-700 border-violet-100",
  "High School":    "bg-amber-50 text-amber-700 border-amber-100",
  "University":     "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Postgrad":       "bg-rose-50 text-rose-700 border-rose-100",
};

export default function ProfileCard({ profile, onEdit }) {
  const { name, university, educationLevel, year, major } = profile;
  const levelStyle = LEVEL_COLORS[educationLevel] || "bg-stone-100 text-stone-500 border-stone-200";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6">
      <div className="flex items-start justify-between gap-4">
        {/* Avatar + Identity */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-xl font-bold tracking-tight">{initials}</span>
          </div>

          {/* Name & details */}
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-tight">{name}</h1>
            <p className="text-sm text-stone-500 font-medium">{university}</p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              {educationLevel && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${levelStyle}`}>
                  {educationLevel}
                </span>
              )}
              {year && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-stone-50 text-stone-600 border-stone-200">
                  {year}
                </span>
              )}
              {major && <><span className="text-stone-300">·</span><span className="text-xs text-stone-500 font-medium">{major}</span></>}
            </div>
          </div>
        </div>

        {/* Edit button */}
        <button
          onClick={onEdit}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
          </svg>
          Edit
        </button>
      </div>
    </div>
  );
}
