// src/components/dashboard/SessionSearch.jsx
import { useState } from "react";
import TagsInput from "../profile/TagsInput";   // ← Corrected import path

const SESSION_STYLES = ["help", "focus"];
const STUDY_GOALS = ["homework", "general", "exam prep"];

export default function SessionSearch({ onFilterChange, currentFilters }) {
  const [searchText, setSearchText] = useState(currentFilters.searchText || "");
  const [selectedTags, setSelectedTags] = useState(currentFilters.selectedTags || []);
  const [style, setStyle] = useState(currentFilters.style || "");
  const [goal, setGoal] = useState(currentFilters.goal || "");

  const handleApplyFilters = () => {
    onFilterChange({
      searchText: searchText.trim(),
      selectedTags,
      style,
      goal,
    });
  };

  const handleClearAll = () => {
    const cleared = {
      searchText: "",
      selectedTags: [],
      style: "",
      goal: "",
    };
    setSearchText("");
    setSelectedTags([]);
    setStyle("");
    setGoal("");
    onFilterChange(cleared);
  };

  return (
    <div className="bg-white rounded-3xl shadow border border-stone-100 p-8">
      <div className="space-y-8">
        {/* Search Bar */}
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-2">SEARCH</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
            placeholder="Search by title, host, or university..."
            className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:outline-none focus:border-indigo-400 text-base placeholder:text-stone-400"
          />
        </div>

        {/* Tags / Subjects */}
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-3">SUBJECTS & TAGS</label>
          <TagsInput 
            tags={selectedTags} 
            onChange={setSelectedTags} 
          />
        </div>

        {/* Style & Goal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-2">SESSION STYLE</label>
            <div className="flex gap-2 flex-wrap">
              {SESSION_STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(style === s ? "" : s)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all capitalize ${
                    style === s 
                      ? "bg-indigo-600 text-white shadow-sm" 
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-2">STUDY GOAL</label>
            <div className="flex gap-2 flex-wrap">
              {STUDY_GOALS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(goal === g ? "" : g)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all capitalize ${
                    goal === g 
                      ? "bg-indigo-600 text-white shadow-sm" 
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleApplyFilters}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition active:scale-[0.985]"
          >
            Find Matching Sessions
          </button>
          
          <button
            onClick={handleClearAll}
            className="px-8 text-stone-500 hover:text-red-600 font-medium transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}