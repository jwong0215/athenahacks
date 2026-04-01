// StudyTechniquesDisplay.jsx
import { useState } from "react";

const TECHNIQUES = {
  "Pomodoro Technique": "Study for 25 minutes, then take a short 5-minute break to stay focused.",
  "Active Recall": "Test yourself by trying to remember information instead of just rereading it.",
  "Spaced Repetition": "Review material over time at increasing intervals to improve memory.",
  "Feynman Technique": "Explain a concept in simple terms to make sure you truly understand it.",
  "Blurting Method": "Write down everything you remember about a topic without looking at notes, then check what you missed.",
};

export default function StudyTechniquesDisplay({ techniques = [] }) {
  const [expanded, setExpanded] = useState(null);

  if (!techniques || techniques.length === 0) {
    return <p className="text-sm text-stone-300 italic">No study techniques added yet.</p>;
  }

  return (
    <div className="space-y-3">
      {techniques.map((tech) => {
        const isExpanded = expanded === tech;
        const description = TECHNIQUES[tech];

        return (
          <div
            key={tech}
            className="border border-stone-200 rounded-2xl overflow-hidden bg-white"
          >
            <button
              type="button"
              onClick={() => setExpanded(isExpanded ? null : tech)}
              className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-stone-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-indigo-600 text-xl">📌</span>
                <span className="font-semibold text-stone-800 text-[15px]">
                  {tech}
                </span>
              </div>
              <span
                className={`text-2xl text-stone-400 group-hover:text-stone-500 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>

            {isExpanded && description && (
              <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-stone-600 border-t border-stone-100">
                {description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}