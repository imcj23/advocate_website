import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/law.png";
import { scrollToSection } from "../utils/scrollTo";

const navItems = [
    { id: "Home", label: "Home" },
    { id: "About", label: "About" },
    { id: "Insight", label: "Insight" },
    { id: "Contact", label: "Contact" },
    { id: "Article", label: "Article" },
];

export default function FranchiseNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const go = (id) => {
        setIsOpen(false);
        setTimeout(() => scrollToSection(id), 60);
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${scrolled
                ? "border-white/10 bg-[#001311] backdrop-blur-xl"
                : "border-transparent bg-[#001311] backdrop-blur-md"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                <div className="flex h-16 sm:h-18 items-center justify-between">
                    {/* Brand */}
                    <button
                        onClick={() => go("hero")}
                        className="flex items-center gap-2.5"
                        aria-label="Sore Coffee Kemitraan"
                    >
                        <img
                            src={Logo}
                            alt="Sore Coffee"
                            className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                        />
                        <span className="flex flex-col text-left leading-none">
                            <span className="text-[15px] sm:text-base font-semibold tracking-tight text-stone-50">
                                Advocate & Legal
                            </span>
                            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-50">
                                Consultants
                            </span>
                        </span>
                    </button>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => go(item.id)}
                                className="rounded-lg px-3.5 py-2 text-sm font-medium text-stone-50 transition-colors hover:text-stone-50"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => go("daftar")}
                            className="hidden items-center gap-2 border rounded-xs border-[#A27A44] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#F3F8F1] transition-all duration-300  sm:inline-flex"
                        >
                            Discuss Now
                            {/* <ArrowRight className="text-base" /> */}
                        </button>

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

            {/* ========== Mobile menu =========*/}
            <div
                className={`lg:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
            >
                <div
                    className="absolute inset-0 bg-[#001311]/70 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
                <div
                    className={`absolute inset-x-0 top-0 origin-top border-b border-white/10 bg-[#001311] px-6 pb-6 pt-2 shadow-2xl transition-transform duration-300 ${isOpen ? "translate-y-0" : "-translate-y-4"
                        }`}
                >
                    <nav className="flex flex-col">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => go(item.id)}
                                className="border-b border-white/5 py-3.5 text-left text-[15px] font-medium text-white transition-colors hover:text-stone-50"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <button
                        onClick={() => go("daftar")}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xs border border-[#A27A44] bg-transparent py-3.5 text-sm font-semibold text-[#F3F8F1] transition-colors"
                    >
                        Discuss Now
                    </button>
                </div>
            </div>
        </header>
    );
}
