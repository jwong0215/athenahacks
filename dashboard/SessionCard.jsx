// src/components/dashboard/SessionCard.jsx
import { useState } from "react";
import MatchPopup from "./MatchPopup";

export default function SessionCard({ session, onJoin }) {
  const [showMatch, setShowMatch] = useState(false);
  const spotsLeft = session.maxParticipants - session.participants;

  const handleJoinClick = () => {
    setShowMatch(true);
  };

  const handleConfirmJoin = () => {
    setShowMatch(false);
    // Pass the session to parent (Dashboard) to open Study Room
    if (onJoin) {
      onJoin(session);
    }
  };

  return (
    <>
      <div className="bg-white border border-stone-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-stone-900 leading-tight">{session.title}</h3>
            <p className="text-sm text-stone-500 mt-1">Hosted by {session.host}</p>
          </div>
          <div className={`text-xs font-medium px-3 py-1 rounded-full ${
            session.style === "focus" 
              ? "bg-amber-100 text-amber-700" 
              : "bg-emerald-100 text-emerald-700"
          }`}>
            {session.style.toUpperCase()}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-lg">
            {session.subject}
          </span>
          {session.tags.map(tag => (
            <span key={tag} className="inline-block bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-y-4 text-sm mb-6">
          <div>
            <span className="text-stone-400 block">University</span>
            <p className="font-medium text-stone-800">{session.university}</p>
          </div>
          <div>
            <span className="text-stone-400 block">Year</span>
            <p className="font-medium text-stone-800">{session.year}</p>
          </div>
          <div>
            <span className="text-stone-400 block">Goal</span>
            <p className="font-medium capitalize text-stone-800">{session.goal}</p>
          </div>
          <div>
            <span className="text-stone-400 block">Time</span>
            <p className="font-medium text-stone-800">{session.time}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <span className="text-emerald-600 font-semibold">{spotsLeft}</span>
            <span className="text-stone-400 text-sm"> spots left</span>
          </div>
          
          <button 
            onClick={handleJoinClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 text-sm font-semibold rounded-2xl transition active:scale-95"
          >
            Join Session
          </button>
        </div>
      </div>

      {/* Match Popup */}
      {showMatch && (
        <MatchPopup 
          session={session} 
          onClose={() => setShowMatch(false)}
          onConfirmJoin={handleConfirmJoin}
        />
      )}
    </>
  );
}