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
} from "lucide-react";

import Logo from "../../assets/logo (1).png";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Practice",
      path: "/admin/practice",
      icon: BriefcaseBusiness,
    },
    {
      name: "Advocate",
      path: "/admin/advocate",
      icon: Users,
    },
    {
      name: "Article",
      path: "/admin/article",
      icon: FileText,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#1D302D] bg-[#001311]">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-10">
          <button
            onClick={() => handleNavigation("/admin/dashboard")}
            className="flex items-center gap-4"
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <img
                src={Logo}
                alt="Law Firm"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold text-[#A27A44]">
                Law Firm
              </h1>

              <p className="text-[9px] uppercase tracking-[0.18em] text-white">
                Content Management System
              </p>
            </div>
          </button>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`group flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition ${
                    active
                      ? "bg-[#A27A44] text-white"
                      : "text-gray-300 hover:bg-[#102522] hover:text-[#C9A96E]"
                  }`}
                >
                  <Icon
                    size={15}
                    strokeWidth={1.5}
                  />

                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* ================= USER ================= */}
          <div className="hidden items-center gap-5 lg:flex">

            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {user?.nama || "Administrator"}
              </p>

              <p className="text-[11px] text-gray-400">
                {user?.email || "Administrator"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-[#A27A44] px-4 py-2.5 text-xs font-medium text-[#C9A96E] transition hover:bg-[#A27A44] hover:text-white"
            >
              <LogOut
                size={15}
                strokeWidth={1.5}
              />

              Logout
            </button>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        {mobileOpen && (
          <div className="border-t border-[#1D302D] bg-[#001311] lg:hidden">

            <div className="px-6 py-5">

              {/* USER INFO */}
              <div className="mb-5 border-b border-[#1D302D] pb-5">
                <p className="text-sm font-medium text-white">
                  {user?.nama || "Administrator"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {user?.email || "Administrator"}
                </p>
              </div>

              {/* MENU */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${
                        active
                          ? "bg-[#A27A44] text-white"
                          : "text-gray-300 hover:bg-[#102522] hover:text-[#C9A96E]"
                      }`}
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.5}
                      />

                      {item.name}
                    </button>
                  );
                })}
              </nav>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-2 border border-[#A27A44] px-4 py-3 text-sm text-[#C9A96E] transition hover:bg-[#A27A44] hover:text-white"
              >
                <LogOut
                  size={17}
                  strokeWidth={1.5}
                />

                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}