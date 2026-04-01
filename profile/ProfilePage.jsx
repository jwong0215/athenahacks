// ProfilePage.jsx
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";
import EditProfileModal from "./EditProfileModal";
import StudyTechniquesDisplay from "./StudyTechniquesDisplay";

const DEFAULT_PROFILE = {
  name: "AlexRivera",
  university: "UC Berkeley",
  educationLevel: "University",
  year: "Year 3",
  major: "Computer Science",
  aboutMe: "I love building things and studying with others.",
  studyTechniques: [
    "Pomodoro Technique",
    "Active Recall",
    "Feynman Technique"
  ],
  visibility: { profile: "public", history: "private" },
  stats: { totalStudyTime: 142, sessionsJoined: 38, longestStreak: 14 },
};

export default function ProfilePage({ username, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile(); // your mock API
        setProfile(data);
      } catch {
        setProfile(DEFAULT_PROFILE);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleSave(updatedData) {
    setSaving(true);
    try {
      const saved = await updateMockProfile(updatedData);
      setProfile(saved);
    } catch {
      setProfile(updatedData);
    } finally {
      setSaving(false);
      setIsEditOpen(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-400 text-sm font-medium tracking-wide">Loading your profile…</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-900 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">SS</span>
          </div>
          <span className="font-semibold text-stone-800 text-sm tracking-tight">StudySync</span>
        </div>

        <nav className="flex items-center gap-6">
          <a href="#" className="text-stone-400 text-sm hover:text-stone-700 transition-colors">Discover</a>
          <a href="#" className="text-stone-400 text-sm hover:text-stone-700 transition-colors">Sessions</a>
          
          <button
            onClick={onLogout}
            className="text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            Logout
          </button>

          <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white text-xs font-bold">
            {username?.charAt(0).toUpperCase() || "?"}
          </div>
        </nav>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">
        <ProfileCard profile={profile} onEdit={() => setIsEditOpen(true)} />

        {/* About Me */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">About Me</h2>
          <p className="text-stone-700 text-sm leading-relaxed">
            {profile.aboutMe || <span className="text-stone-300 italic">No bio yet.</span>}
          </p>
        </section>

        {/* Study Techniques */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Study Techniques</h2>
          <StudyTechniquesDisplay techniques={profile.studyTechniques || []} />
        </section>

        {/* Privacy */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Privacy</h2>
          <div className="flex flex-col gap-3">
            <PrivacyRow label="Profile Visibility" value={profile.visibility.profile} />
            <PrivacyRow label="Study History"      value={profile.visibility.history} />
          </div>
        </section>

        <StatsCard stats={profile.stats} />
      </main>

      {isEditOpen && (
        <EditProfileModal
          profile={profile}
          onSave={handleSave}
          onClose={() => setIsEditOpen(false)}
          saving={saving}
        />
      )}
    </div>
  );
}

function PrivacyRow({ label, value }) {
  const isPublic = value === "public";
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-stone-600">{label}</span>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
        isPublic
          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
          : "bg-stone-100 text-stone-500 border-stone-200"
      }`}>
        {isPublic ? "🌐 Public" : "🔒 Private"}
      </span>
    </div>
  );
}