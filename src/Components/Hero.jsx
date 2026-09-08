import { ArrowRight, Scale, ShieldCheck } from "lucide-react";
import Lawpict from "../assets/law2.jpg";
import { scrollToSection } from "../utils/scrollTo";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#071512] text-[#F4F1E8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#A27A44]/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#A27A44]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[70px_70px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-[#B8925A] pl-4">
              <Scale className="h-5 w-5 text-[#B8925A]" />
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#CBB994]">
                Legal Protection & Justice
              </span>
            </div>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.08] tracking-tight text-[#F4F1E8] sm:text-6xl lg:text-7xl">
              The Justice and
              <span className="block text-[#B8925A]">
                Legal Protection
              </span>
              You Deserve.
            </h1>

            {/* Gold divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-16 bg-[#B8925A]" />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#B8925A]" />
              <div className="h-px w-8 bg-[#B8925A]/50" />
            </div>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-8 text-[#B8C0BB] sm:text-lg">
              Pendampingan hukum yang profesional, terpercaya, dan berorientasi
              pada kepentingan Anda. Kami hadir untuk memberikan perlindungan
              hukum serta solusi yang tepat dalam menghadapi setiap persoalan.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollToSection("daftar")}
                className="group inline-flex items-center justify-center gap-3 rounded-sm bg-[#A27A44] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#B8925A] hover:shadow-[0_10px_30px_rgba(162,122,68,0.25)]"
              >
                Discuss Your Case

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => scrollToSection("paket")}
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-[#B8925A]/40 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[#D6C8A9] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A]/10"
              >
                Our Services
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#B8925A]" />
                <span className="text-sm text-[#AEB8B2]">
                  Professional Counsel
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Scale className="h-5 w-5 text-[#B8925A]" />
                <span className="text-sm text-[#AEB8B2]">
                  Justice Focused
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative order-1 flex justify-center lg:order-2">

            {/* Decorative frame */}
            {/* <div className="absolute -right-3 -top-3 h-full w-full max-w-xl border border-[#B8925A]/30 sm:-right-5 sm:-top-5" /> */}

            <div className="relative w-full max-w-xl overflow-hidden">

              {/* Image */}
              <img
                src={Lawpict}
                alt="Legal consultation"
                className="h-120 w-full object-cover object-center grayscale-15 transition duration-700 hover:scale-[1.02] sm:h-140"
                loading="eager"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#071512]/70 via-transparent to-[#071512]/10" />

              {/* Gold accent */}
              <div className="absolute bottom-0 left-0 h-1 w-32 bg-[#B8925A]" />

              {/* Quote card */}
              <div className="absolute bottom-7 left-7 right-7 border border-white/10 bg-[#071512]/85 p-5 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm">
                <div className="mb-3 flex items-center gap-3">
                  <Scale className="h-5 w-5 text-[#B8925A]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CBB994]">
                    Our Principle
                  </span>
                </div>

                <p className="font-serif text-lg italic leading-relaxed text-[#F4F1E8]">
                  "Justice is not merely a right, but a responsibility we
                  protect together."
                </p>
              </div>
            </div>

            {/* Decorative vertical line ????*/}
            <div className="absolute -bottom-10 right-0 hidden h-28 w-px bg-[#B8925A]/50 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
