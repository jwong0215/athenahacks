// src/components/dashboard/MatchPopup.jsx
import { useState } from "react";

export default function MatchPopup({ session, onClose }) {
  const [isJoining, setIsJoining] = useState(false);

  const handleConfirmJoin = () => {
    setIsJoining(true);
    
    // Simulate joining
    setTimeout(() => {
      alert(`🎉 Successfully joined "${session.title}"!\n\nYou can now chat with the host and other members.`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-6 text-white">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-5xl">
              🎉
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Perfect Match Found!</h2>
          <p className="text-center text-indigo-100 mt-1">You're a great fit with this session</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-stone-500">You matched with</p>
            <p className="text-3xl font-semibold text-stone-900 mt-1">{session.host}</p>
            <p className="text-stone-600 mt-1">
              {session.year} • {session.university}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">They like to study using</p>
              <div className="flex flex-wrap gap-2">
                {session.studyTechniques.map((tech, i) => (
                  <span 
                    key={i}
                    className="bg-amber-50 text-amber-700 text-sm px-4 py-1.5 rounded-2xl font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Session Details</p>
              <div className="bg-stone-50 rounded-2xl p-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Style</span>
                  <span className="font-medium capitalize">{session.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Goal</span>
                  <span className="font-medium capitalize">{session.goal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Time</span>
                  <span className="font-medium">{session.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-stone-100 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 text-stone-600 font-semibold bg-stone-100 hover:bg-stone-200 rounded-2xl transition"
          >
            Maybe Later
          </button>
          <button
            onClick={handleConfirmJoin}
            disabled={isJoining}
            className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
          >
            {isJoining ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Joining...
              </>
            ) : (
              "Join This Session"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
