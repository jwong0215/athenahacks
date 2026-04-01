// EditProfileModal.jsx
import { useState, useEffect } from "react";
import SchoolSearch from "./SchoolSearch";
import StudyTechniquesSelector from "./StudyTechniquesSelector";

const EDUCATION_LEVELS = {
  "Primary School": ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"],
  "Middle School":  ["Grade 7","Grade 8","Grade 9"],
  "High School":    ["Grade 10","Grade 11","Grade 12"],
  "University":     ["Year 1","Year 2","Year 3","Year 4"],
  "Postgrad":       ["Masters Year 1","Masters Year 2","PhD Year 1","PhD Year 2","PhD Year 3","PhD Year 4","PhD Year 5"],
};

const NAME_REGEX = /^[a-zA-Z0-9]*$/;

export default function EditProfileModal({ profile, onSave, onClose, saving }) {
  const [form, setForm] = useState({
    ...profile,
    studyTechniques: profile.studyTechniques || [],
  });
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function setVisibility(field, value) {
    setForm((prev) => ({ ...prev, visibility: { ...prev.visibility, [field]: value } }));
  }

  function handleNameChange(e) {
    const val = e.target.value;
    if (!NAME_REGEX.test(val)) {
      setNameError("Letters and digits only — no spaces or symbols.");
      return;
    }
    if (val.length > 20) {
      setNameError("Max 20 characters.");
      return;
    }
    setNameError("");
    set("name", val);
  }

  function handleSchoolSelect({ name, level }) {
    set("university", name);
    set("educationLevel", level);
    set("year", "");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (nameError || !form.name) return;
    onSave(form);
  }

  const yearOptions = form.educationLevel ? EDUCATION_LEVELS[form.educationLevel] : [];

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-base font-bold text-stone-900 tracking-tight">Edit Profile</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors text-lg"
          >×</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-6">

          {/* ── Identity ── */}
          <fieldset>
            <legend className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Identity</legend>
            <div className="flex flex-col gap-4">

              {/* Username */}
              <Field label={<>Username <span className="text-stone-300 font-normal normal-case tracking-normal">(letters &amp; digits only, max 20)</span></>}>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleNameChange}
                  className={`${inputClass} ${nameError ? "border-red-300 focus:ring-red-200 focus:border-red-400" : ""}`}
                  placeholder="e.g. AlexRivera99"
                  required
                />
                {nameError && <p className="text-xs text-red-500 mt-0.5">{nameError}</p>}
                <p className="text-xs text-stone-300">{form.name.length}/20 characters</p>
              </Field>

              {/* School */}
              <Field label="School / University">
                <SchoolSearch value={form.university} onSelect={handleSchoolSelect} />
                <p className="text-xs text-stone-300 mt-0.5">Start typing — your school will appear. Education level is set automatically.</p>
              </Field>

              {/* Education Level */}
              <Field label="Education Level">
                <div className="flex flex-wrap gap-2">
                  {Object.keys(EDUCATION_LEVELS).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => { set("educationLevel", level); set("year", ""); }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        form.educationLevel === level
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-white text-stone-600 border-stone-200 hover:border-indigo-300 hover:text-indigo-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                {form.educationLevel && (
                  <p className="text-xs text-emerald-600 mt-1">✓ Set to <strong>{form.educationLevel}</strong></p>
                )}
              </Field>

              {/* Year */}
              {yearOptions.length > 0 && (
                <Field label="Year / Grade">
                  <div className="flex flex-wrap gap-2">
                    {yearOptions.map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => set("year", yr)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                          form.year === yr
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-700"
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              {/* Major */}
              <Field label="Major / Subject">
                <input
                  type="text"
                  value={form.major}
                  onChange={(e) => set("major", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Computer Science, Biology"
                />
              </Field>

              {/* Study Techniques - NEW */}
              <Field label="Study Techniques">
                <StudyTechniquesSelector
                  techniques={form.studyTechniques || []}
                  onChange={(newTechniques) => set("studyTechniques", newTechniques)}
                />
              </Field>

              {/* About Me */}
              <Field label="About Me">
                <textarea
                  value={form.aboutMe}
                  onChange={(e) => set("aboutMe", e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell study partners a bit about yourself…"
                />
              </Field>

            </div>
          </fieldset>

          <hr className="border-stone-100" />

          {/* ── Privacy ── */}
          <fieldset>
            <legend className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Privacy</legend>
            <div className="flex flex-col gap-3">
              <ToggleRow label="Profile Visibility" value={form.visibility.profile} onChange={(v) => setVisibility("profile", v)} />
              <ToggleRow label="Study History"      value={form.visibility.history} onChange={(v) => setVisibility("history", v)} />
            </div>
          </fieldset>

          {/* ── Actions ── */}
          <div className="flex gap-3 pb-1">
            <button type="button" onClick={onClose}
              className="flex-1 text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 px-4 py-2.5 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving || !!nameError}
              className="flex-1 text-sm font-semibold text-white bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              {saving
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
                : "Save Changes"
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const inputClass = "w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition bg-white";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-stone-500">{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-stone-700">{label}</span>
      <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-0.5">
        {["public", "private"].map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all capitalize ${
              value === opt
                ? opt === "public"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "bg-white text-stone-700 shadow-sm"
                : "text-stone-400 hover:text-stone-600"
            }`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}