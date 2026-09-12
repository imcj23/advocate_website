import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, ArrowRight } from "lucide-react";
// import Logo from "../assets/logo (1).png";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Login gagal.");
      }

      localStorage.setItem("token", result.token);

      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001311] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-25 w-50 items-center justify-center border border-[#A27A44] bg-[#001311]">
            <img
              src={Logo}
              alt="Logo"
              className="h-full w-full object-contain p-2"
            />
          </div>

          <h1 className="font-serif text-3xl font-medium text-[#A27A44]">
            Law Firm
          </h1>

          <p className="mt-2 text-sm tracking-wide text-white">
            Content Management System
          </p>
        </div> */}

        {/* Login Card */}
        <div className="border border-[#D9DEDB] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#A27A44]">
              Administrator
            </p>

            <h2 className="font-serif text-2xl text-[#001311]">Selamat Datang</h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to manage your law firm website.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#001311]"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  strokeWidth={1.5}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@lawfirm.com"
                  autoComplete="email"
                  className="w-full border border-[#D9DEDB] bg-[#FAFBFA] py-3.5 pl-11 pr-4 text-sm text-[#001311] outline-none transition focus:border-[#A27A44] focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#001311]"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  strokeWidth={1.5}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full border border-[#D9DEDB] bg-[#FAFBFA] py-3.5 pl-11 pr-4 text-sm text-[#001311] outline-none transition focus:border-[#A27A44] focus:bg-white"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 bg-[#001311] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#0B2F2A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Law Firm. All rights reserved.
        </p>
      </div>
    </div>
  );
}
