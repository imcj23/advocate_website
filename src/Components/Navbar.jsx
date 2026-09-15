import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import Logo from "../assets/logo.png";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/practice", label: "Practice Area" },
  { path: "/insight", label: "Insight" },
  { path: "/contact", label: "Contact" },
];

export default function FranchiseNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const go = (path) => {
    setIsOpen(false);
    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappNumber = "6288268853638";
  const message = "Haloo, saya ingin berdiskusi";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
      /\D/g,
      "",
    )}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-[#001311] backdrop-blur-xl"
          : "border-transparent bg-[#001311] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-18">
          {/* LOGO + BRAND */}
          <button
            onClick={() => go("/")}
            className="flex items-center gap-3"
            aria-label="Advocate & Legal Consultants"
          >
            <img
              src={Logo}
              alt="Advocate & Legal Consultants"
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />

            <span className="flex flex-col text-left leading-none">
              <span className="text-[15px] font-semibold uppercase tracking-tight text-stone-50 sm:text-base">
                Law Office
              </span>

              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-50">
                Business · Corporate · Dispute
              </span>
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#A27A44]"
                      : "text-stone-50 hover:text-[#A27A44]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="hidden items-center gap-2 rounded-xs border border-[#A27A44] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#F3F8F1] transition-all duration-300 hover:bg-[#A27A44] hover:text-[#001311] sm:inline-flex"
            >
              Discuss Now
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/5 hover:text-stone-50 lg:hidden"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 top-16 z-40 transition-all duration-300 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#001311]/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute inset-x-0 top-0 origin-top border-b border-white/10 bg-[#001311] px-6 pb-6 pt-2 shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  className={`border-b border-white/5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                    isActive
                      ? "text-[#A27A44]"
                      : "text-white hover:text-[#A27A44]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            onClick={handleWhatsAppClick}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xs border border-[#A27A44] bg-transparent py-3.5 text-sm font-semibold text-[#F3F8F1] transition-colors hover:bg-[#A27A44] hover:text-[#001311]"
          >
            Discuss Now
          </button>
        </div>
      </div>
    </header>
  );
}
