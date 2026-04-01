// StudyTechniquesSelector.jsx
import { useState, useEffect } from "react";

const TECHNIQUES = {
  "Pomodoro Technique": "Study for 25 minutes, then take a short 5-minute break to stay focused.",
  "Active Recall": "Test yourself by trying to remember information instead of just rereading it.",
  "Spaced Repetition": "Review material over time at increasing intervals to improve memory.",
  "Feynman Technique": "Explain a concept in simple terms to make sure you truly understand it.",
  "Blurting Method": "Write down everything you remember about a topic without looking at notes, then check what you missed.",
};

const TECHNIQUE_LIST = Object.keys(TECHNIQUES);

export default function StudyTechniquesSelector({ techniques = [], onChange }) {
  const [selected, setSelected] = useState(techniques);

  useEffect(() => {
    setSelected(techniques);
  }, [techniques]);

  const toggleTechnique = (tech) => {
    let newSelected;
    if (selected.includes(tech)) {
      newSelected = selected.filter((t) => t !== tech);
    } else {
      if (selected.length >= 5) return;
      newSelected = [...selected, tech];
    }
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-stone-500">
          Study Techniques <span className="font-normal">(max 5)</span>
        </label>
        <span className="text-xs text-stone-400">
          {selected.length}/5 selected
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {TECHNIQUE_LIST.map((tech) => {
          const isSelected = selected.includes(tech);
          return (
            <button
              key={tech}
              type="button"
              onClick={() => toggleTechnique(tech)}
              disabled={!isSelected && selected.length >= 5}
              className={`text-left p-4 rounded-2xl border transition-all ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white border-stone-200 hover:border-indigo-300 hover:text-indigo-700"
              } ${!isSelected && selected.length >= 5 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="font-semibold text-sm mb-1">{tech}</div>
              <div className="text-xs text-stone-500 line-clamp-2">
                {TECHNIQUES[tech]}
              </div>
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="pt-2">
          <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            ✓ Selected: {selected.join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
