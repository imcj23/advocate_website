import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  Settings,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import Logo from "../../assets/logo (1).png";
export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [nama, setNama] = useState(user?.nama || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Practice", path: "/admin/practice", icon: BriefcaseBusiness },
    { name: "Article", path: "/admin/article", icon: FileText },
    { name: "Advocate", path: "/admin/profile", icon: Users },
  ];
  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login", { replace: true });
  };
  const isActive = (path) => {
    return location.pathname === path;
  };
  const openSettings = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setNama(storedUser?.nama || user?.nama || "");
    setEmail(storedUser?.email || user?.email || "");
    setPassword("");
    setConfirmPassword("");
    setMessage("");
    setError("");
    setSettingsOpen(true);
  };
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!nama.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }
    if (!email.trim()) {
      setError("Email tidak boleh kosong.");
      return;
    }
    if (password && password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }
    try {
      setSaving(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!storedUser?.id) {
        setError("Data administrator tidak ditemukan.");
        return;
      }
      const response = await fetch(
        `http://localhost:3500/${storedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nama: nama.trim(),
            email: email.trim(),
            ...(password ? { password } : {}),
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui akun.");
      }
      const updatedUser = {
        ...storedUser,
        nama: nama.trim(),
        email: email.trim(),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Akun berhasil diperbarui.");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setSettingsOpen(false);
        setMessage("");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      {" "}
      <nav className="sticky top-0 z-50 border-b border-[#1D302D] bg-[#001311]">
        {" "}
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-10">
          {" "}
          <button
            onClick={() => handleNavigation("/admin/dashboard")}
            className="flex items-center gap-4"
          >
            {" "}
            <div className="flex h-10 w-10 items-center justify-center">
              {" "}
              <img
                src={Logo}
                alt="Law Firm"
                className="h-full w-full object-contain"
              />{" "}
            </div>{" "}
            <div className="text-left">
              {" "}
              <h1 className="text-lg font-bold text-[#A27A44]">
                {" "}
                Law Firm{" "}
              </h1>{" "}
              <p className="text-[9px] uppercase tracking-[0.18em] text-white">
                {" "}
                Content Management System{" "}
              </p>{" "}
            </div>{" "}
          </button>{" "}
          <nav className="hidden items-center gap-1 lg:flex">
            {" "}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`group flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition ${active ? "bg-[#A27A44] text-white" : "text-gray-300 hover:bg-[#102522] hover:text-[#C9A96E]"}`}
                >
                  {" "}
                  <Icon size={15} strokeWidth={1.5} /> {item.name}{" "}
                </button>
              );
            })}{" "}
          </nav>{" "}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={openSettings}
              className="flex items-center gap-2 border border-[#1D302D] px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:border-[#A27A44] hover:text-[#C9A96E]"
            >
              {" "}
              <Settings size={15} strokeWidth={1.5} /> Account{" "}
            </button>{" "}
            <button
              onClick={() => setLogoutOpen(true)}
              className="flex items-center gap-2 border border-[#A27A44] px-4 py-2.5 text-xs font-medium text-[#C9A96E] transition hover:bg-[#A27A44] hover:text-white"
            >
              {" "}
              <LogOut size={15} strokeWidth={1.5} /> Logout{" "}
            </button>{" "}
          </div>{" "}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          >
            {" "}
            {mobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}{" "}
          </button>{" "}
        </div>{" "}
        {mobileOpen && (
          <div className="border-t border-[#1D302D] bg-[#001311] lg:hidden">
            {" "}
            <div className="px-6 py-5">
              {" "}
              <nav className="space-y-1">
                {" "}
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${active ? "bg-[#A27A44] text-white" : "text-gray-300 hover:bg-[#102522] hover:text-[#C9A96E]"}`}
                    >
                      {" "}
                      <Icon size={17} strokeWidth={1.5} /> {item.name}{" "}
                    </button>
                  );
                })}{" "}
              </nav>{" "}
              <button
                onClick={openSettings}
                className="mt-5 flex w-full items-center justify-center gap-2 border border-[#1D302D] px-4 py-3 text-sm text-gray-300 transition hover:border-[#A27A44] hover:text-[#C9A96E]"
              >
                {" "}
                <Settings size={17} strokeWidth={1.5} /> Account Settings{" "}
              </button>{" "}
              <button
                onClick={() => {
                  setLogoutOpen(true);
                  setMobileOpen(false);
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 border border-[#A27A44] px-4 py-3 text-sm text-[#C9A96E] transition hover:bg-[#A27A44] hover:text-white"
              >
                {" "}
                <LogOut size={17} strokeWidth={1.5} /> Logout{" "}
              </button>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </nav>{" "}
      {settingsOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4">
          {" "}
          <div className="w-full max-w-md bg-white shadow-2xl">
            {" "}
            <div className="flex items-center justify-between border-b border-[#D9DEDB] px-6 py-5">
              {" "}
              <div>
                {" "}
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#71827B]">
                  {" "}
                  Administrator{" "}
                </p>{" "}
                <h2 className="mt-1 text-xl font-medium text-[#0B2F2A]">
                  {" "}
                  Account Settings{" "}
                </h2>{" "}
              </div>{" "}
              <button
                onClick={() => setSettingsOpen(false)}
                className="text-gray-400 transition hover:text-[#0B2F2A]"
              >
                {" "}
                <X size={20} />{" "}
              </button>{" "}
            </div>{" "}
            <form
              onSubmit={handleUpdateAccount}
              className="space-y-5 px-6 py-6"
            >
              {" "}
              <div>
                {" "}
                <label className="mb-2 block text-xs font-medium text-[#0B2F2A]">
                  {" "}
                  Name{" "}
                </label>{" "}
                <div className="flex items-center border border-[#D9DEDB] px-3">
                  {" "}
                  <User size={16} className="mr-2 text-[#71827B]" />{" "}
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full bg-transparent py-3 text-sm outline-none"
                    placeholder="Administrator name"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="mb-2 block text-xs font-medium text-[#0B2F2A]">
                  {" "}
                  Email{" "}
                </label>{" "}
                <div className="flex items-center border border-[#D9DEDB] px-3">
                  {" "}
                  <Mail size={16} className="mr-2 text-[#71827B]" />{" "}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-3 text-sm outline-none"
                    placeholder="admin@email.com"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="mb-2 block text-xs font-medium text-[#0B2F2A]">
                  {" "}
                  New Password{" "}
                </label>{" "}
                <div className="flex items-center border border-[#D9DEDB] px-3">
                  {" "}
                  <Lock size={16} className="mr-2 text-[#71827B]" />{" "}
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent py-3 text-sm outline-none"
                    placeholder="Leave blank if unchanged"
                  />{" "}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    {" "}
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="mb-2 block text-xs font-medium text-[#0B2F2A]">
                  {" "}
                  Confirm New Password{" "}
                </label>{" "}
                <div className="flex items-center border border-[#D9DEDB] px-3">
                  {" "}
                  <Lock size={16} className="mr-2 text-[#71827B]" />{" "}
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent py-3 text-sm outline-none"
                    placeholder="Confirm new password"
                  />{" "}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400"
                  >
                    {" "}
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                  {" "}
                  {error}{" "}
                </div>
              )}{" "}
              {message && (
                <div className="border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-700">
                  {" "}
                  {message}{" "}
                </div>
              )}{" "}
              <div className="flex justify-end gap-3 pt-2">
                {" "}
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="border border-[#D9DEDB] px-5 py-2.5 text-xs font-medium text-gray-500 transition hover:border-[#A27A44]"
                >
                  {" "}
                  Cancel{" "}
                </button>{" "}
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0B2F2A] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#001311] disabled:opacity-50"
                >
                  {" "}
                  {saving ? "Saving..." : "Save Changes"}{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {logoutOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 px-4">
          {" "}
          <div className="w-full max-w-sm bg-white shadow-2xl">
            {" "}
            <div className="px-6 py-6">
              {" "}
              <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#F3F8F1]">
                {" "}
                <LogOut size={20} className="text-[#A27A44]" />{" "}
              </div>{" "}
              <h2 className="text-xl font-medium text-[#0B2F2A]">
                {" "}
                Confirm Logout{" "}
              </h2>{" "}
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {" "}
                Are you sure you want to logout from the administrator
                panel?{" "}
              </p>{" "}
              <div className="mt-6 flex justify-end gap-3">
                {" "}
                <button
                  onClick={() => setLogoutOpen(false)}
                  className="border border-[#D9DEDB] px-5 py-2.5 text-xs font-medium text-gray-500 transition hover:border-[#A27A44]"
                >
                  {" "}
                  Cancel{" "}
                </button>{" "}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-5 py-2.5 text-xs font-medium text-white transition   "
                >
                  {" "}
                  Logout{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
}
