import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Scale,
} from "lucide-react";
import { scrollToSection } from "../utils/scrollTo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001311] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.9fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <Scale size={21} strokeWidth={1.6} />
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-wide">
                  LAW FIRM
                </h2>

                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Advocates & Legal Consultants
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/55">
              Memberikan pendampingan dan solusi hukum yang profesional,
              strategis, dan berintegritas untuk membantu klien menghadapi
              berbagai kebutuhan hukum.
            </p>

            <button
              onClick={() => scrollToSection("contact")}
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-white hover:text-[#001311]"
            >
              Konsultasi Hukum
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Navigasi
            </p>

            <nav className="flex flex-col items-start gap-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                Beranda
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                Tentang Kami
              </button>

              <button
                onClick={() => scrollToSection("services")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                Layanan Hukum
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                Kontak
              </button>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Hubungi Kami
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-white/45"
                />

                <p className="text-sm leading-6 text-white/65">
                  Jl. Batam No. 123
                  <br />
                  Batam, Indonesia
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-white/45"
                />

                <p className="text-sm text-white/65">
                  +62 812 3456 7890
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-white/45"
                />

                <p className="text-sm text-white/65">
                  info@lawfirm.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} Law Firm. All rights reserved.
          </p>

          <div className="flex gap-5">
            <button className="transition hover:text-white/70">
              Privacy Policy
            </button>

            <button className="transition hover:text-white/70">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
