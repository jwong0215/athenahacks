// src/components/dashboard/Dashboard.jsx
import { useState, useMemo } from "react";
import SessionSearch from "./SessionSearch";
import SessionCard from "./SessionCard";

const MOCK_SESSIONS = [
  {
    id: 1,
    title: "CS Algorithm Study Session",
    host: "AlexRivera",
    university: "UC Berkeley",
    educationLevel: "University",
    year: "Year 3",
    subject: "#computer-science",
    tags: ["#data-science", "#leetcode"],
    style: "focus",
    goal: "exam prep",
    time: "Today 7:00 PM",
    participants: 3,
    maxParticipants: 5,
    studyTechniques: ["Active Recall", "Pomodoro Technique"]
  },
  {
    id: 2,
    title: "English Literature Discussion",
    host: "SarahChen",
    university: "University of Hong Kong",
    educationLevel: "University",
    year: "Year 2",
    subject: "#english-literature",
    tags: ["#philosophy", "#cultural-studies"],
    style: "help",
    goal: "homework",
    time: "Tomorrow 3:00 PM",
    participants: 2,
    maxParticipants: 6,
    studyTechniques: ["Feynman Technique"]
  },
  {
    id: 3,
    title: "Calculus Exam Preparation",
    host: "MikeChen",
    university: "UC Berkeley",
    educationLevel: "University",
    year: "Year 3",
    subject: "#math",
    tags: ["#statistics"],
    style: "focus",
    goal: "exam prep",
    time: "Today 8:30 PM",
    participants: 4,
    maxParticipants: 5,
    studyTechniques: ["Spaced Repetition"]
  },
];

export default function Dashboard({ onJoinSession }) {
  const [sessions] = useState(MOCK_SESSIONS);
  const [filters, setFilters] = useState({
    searchText: "",
    selectedTags: [],
    style: "",
    goal: "",
  });

  // Smart Matching with Priority
  const filteredAndSortedSessions = useMemo(() => {
    let result = [...sessions];

    // Text Search
    if (filters.searchText.trim()) {
      const q = filters.searchText.toLowerCase().trim();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.host.toLowerCase().includes(q) ||
        s.subject.toLowerCase().includes(q) ||
        s.university.toLowerCase().includes(q)
      );
    }

    // Tag Filter
    if (filters.selectedTags.length > 0) {
      result = result.filter(s => {
        return filters.selectedTags.some(tag =>
          s.subject === tag || s.tags.some(t => t === tag)
        );
      });
    }

    // Style Filter
    if (filters.style) {
      result = result.filter(s => s.style === filters.style);
    }

    // Goal Filter
    if (filters.goal) {
      result = result.filter(s => s.goal === filters.goal);
    }

    // Smart Sorting
    result.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (filters.selectedTags.includes(a.subject)) scoreA += 100;
      if (filters.selectedTags.includes(b.subject)) scoreB += 100;

      if (a.year === "Year 3") scoreA += 40;
      if (b.year === "Year 3") scoreB += 40;

      if (a.style === filters.style && filters.style) scoreA += 25;
      if (b.style === filters.style && filters.style) scoreB += 25;

      if (a.goal === filters.goal && filters.goal) scoreA += 15;
      if (b.goal === filters.goal && filters.goal) scoreB += 15;

      return scoreB - scoreA;
    });

    return result;
  }, [sessions, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-12">
      <header className="bg-white border-b border-stone-200 px-6 py-5 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">SS</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">StudySync</h1>
          </div>
          <p className="text-stone-500">Find your perfect study partner</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-stone-900 mb-3">Discover Study Sessions</h2>
          <p className="text-lg text-stone-600">Smart matching based on subject, year, style & goals</p>
        </div>

        <SessionSearch 
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-stone-800">
              Recommended Sessions ({filteredAndSortedSessions.length})
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
              Sorted by best match
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAndSortedSessions.map(session => (
              <SessionCard 
                key={session.id} 
                session={session} 
                onJoin={onJoinSession}     // ← Important: passes session to App
              />
            ))}
          </div>

          {filteredAndSortedSessions.length === 0 && (
            <div className="text-center py-20 text-stone-400">
              No sessions match your current filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}