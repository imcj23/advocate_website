import { useNavigate } from "react-router";
import { ArrowUpRight, Mail, MapPin, Phone, Scale } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

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
              Providing professional, strategic, and integrity-based legal
              assistance and solutions to help clients face various legal needs.
            </p>

            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex mt-2 items-center gap-2 rounded-md bg-[#A27A44] px-5 py-3 text-sm font-semibold text-white transition duration-300 "
            >
              Legal Consultation
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Navigation
            </p>

            <nav className="flex flex-col items-start gap-3">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                Home Page
              </button>

              <button
                onClick={() => navigate("/about")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                About Us
              </button>

              <button
                onClick={() => navigate("/practice")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                Service
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="text-sm text-white/65 transition hover:text-white"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Contact Us
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-white/45"
                />

                <p className="text-sm leading-6 text-white/65">
                  Batam business center adhya building tower 3rd floor Jl.
                  Jendral Sudirman, Bukit indah sukajadi, Kota Batam 2962
                </p>
              </div>
              <div className="flex gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-white/45"
                />

                <p className="text-sm leading-6 text-white/65">
                  Jakarta Jl.Letjen TB Simatupang Kav.20 Gedung ratu prabu 1
                  lt.1, cilandak, jakarta selatan 12560
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-white/45"
                />

                <p className="text-sm text-white/65">+62 81391578817</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-white/45"
                />

                <p className="text-sm text-white/65">info@lawfirm.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Law Firm. All rights reserved.</p>

          {/* <div className="flex gap-5">
            <button className="transition hover:text-white/70">
              Privacy Policy
            </button>

            <button className="transition hover:text-white/70">
              Terms of Service
            </button>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
