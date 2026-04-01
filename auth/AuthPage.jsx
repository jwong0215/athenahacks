// components/auth/AuthPage.jsx
import { useState } from "react";

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    const { username, password, confirmPassword } = formData;

    if (username.length < 4 || username.length > 20) {
      setError("Username must be between 4 and 20 characters");
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores (_)");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      const userData = {
        username: formData.username,
        isLoggedIn: true,
      };

      localStorage.setItem("studySyncUser", JSON.stringify(userData));
      onLoginSuccess(formData.username);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-3xl font-bold">SS</span>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-stone-900">StudySync</h1>
          <p className="text-stone-500 mt-1">Study together. Achieve more.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100">
          <button
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              isLogin ? "text-indigo-600 border-b-2 border-indigo-600" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              !isLogin ? "text-indigo-600 border-b-2 border-indigo-600" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5">USERNAME</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. AlexRivera99"
              maxLength={20}
              className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              required
            />
            <p className="text-[10px] text-stone-400 mt-1">4–20 characters (letters, numbers, _ only)</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              required
            />
            <p className="text-[10px] text-stone-400 mt-1">Minimum 6 characters</p>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5">CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3.5 rounded-2xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isLogin ? "Logging in..." : "Creating account..."}
              </>
            ) : (
              isLogin ? "Log In" : "Create Account"
            )}
          </button>
        </form>

        <div className="px-8 pb-8 text-center text-xs text-stone-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-indigo-600 hover:underline font-medium"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
