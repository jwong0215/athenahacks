const FACULTY_TAGS = {
  "Faculty of Arts": [
    "#english-literature", "#translation", "#linguistics", "#history",
    "#philosophy", "#religious-studies", "#cultural-studies",
    "#fine-arts", "#music", "#dance",
  ],
  "Business Administration": [
    "#business", "#finance", "#accounting", "#economics", "#marketing",
    "#management", "#global-business", "#insurance", "#quantitative-finance",
  ],
  "Education": [
    "#education", "#early-childhood", "#physical-education",
    "#language-education", "#mathematics-education",
  ],
  "Engineering": [
    "#engineering", "#computer-science", "#information-engineering",
    "#electronic-engineering", "#mechanical-engineering",
    "#systems-engineering", "#biomedical-engineering", "#data-science",
  ],
  "Law": [
    "#law", "#criminal-law", "#corporate-law", "#international-law",
    "#constitutional-law", "#legal-studies",
  ],
  "Medicine": [
    "#medicine", "#nursing", "#pharmacy", "#chinese-medicine",
    "#biomedical-science", "#public-health",
  ],
  "Science": [
    "#math", "#physics", "#chemistry", "#biology", "#statistics",
    "#environmental-science", "#food-nutrition",
  ],
  "Social Science": [
    "#psychology", "#political-science", "#international-relations",
    "#sociology", "#geography", "#journalism", "#communication",
    "#global-studies", "#urban-studies",
  ],
};

export default function TagsInput({ tags, onChange }) {
  const faculties = Object.keys(FACULTY_TAGS);

  function toggleTag(tag) {
    if (tags.includes(tag)) {
      onChange(tags.filter((t) => t !== tag));
    } else {
      onChange([...tags, tag]);
    }
  }

  function removeTag(tag) {
    onChange(tags.filter((t) => t !== tag));
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Selected tag chips */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-indigo-400 hover:text-indigo-700 transition-colors leading-none ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Faculty accordion */}
      <div className="flex flex-col gap-2">
        {faculties.map((faculty) => (
          <FacultyGroup
            key={faculty}
            faculty={faculty}
            availableTags={FACULTY_TAGS[faculty]}
            selectedTags={tags}
            onToggle={toggleTag}
          />
        ))}
      </div>

    </div>
  );
}

function FacultyGroup({ faculty, availableTags, selectedTags, onToggle }) {
  const selectedCount = availableTags.filter((t) => selectedTags.includes(t)).length;

  return (
    <details className="group border border-stone-200 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between px-4 py-2.5 cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors list-none">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-stone-700">{faculty}</span>
          {selectedCount > 0 && (
            <span className="text-xs font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <svg
          className="w-4 h-4 text-stone-400 group-open:rotate-180 transition-transform"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div className="px-4 py-3 flex flex-wrap gap-2 bg-white">
        {availableTags.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggle(tag)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                selected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-stone-600 border-stone-200 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {selected ? "✓ " : ""}{tag}
            </button>
          );
        })}
      </div>
    </details>
  );
}
