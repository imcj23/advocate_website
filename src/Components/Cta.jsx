import { ArrowUpRight, Scale } from "lucide-react";
import { Link } from "react-router";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative mx-3 mb-5 overflow-hidden rounded-sm bg-[#001311] px-5 py-12 text-white md:mx-5 md:px-8 lg:mx-6 lg:px-12 lg:py-14"
    >
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#A27A44]/20" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#A27A44]/10" />

      <div className="relative mx-auto max-w-7xl">
        {/* Top Label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-[#A27A44]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
            Legal Consultation
          </span>

          <span className="h-px w-8 bg-[#A27A44]" />
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          {/* Left */}
          <div>
            <h2 className="max-w-4xl font-serif text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
              When legal issues arise
              <span className="block text-[#C9A96E]">need certainty.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55 md:text-[15px]">
              Every legal issue requires a proper understanding and a focused
              strategy. Consult with us about your legal needs to determine the
              right course of action.
            </p>
          </div>

          {/* Right */}
          <div className="lg:flex lg:justify-end">
            <Link
              to="/contact"
              className="group inline-flex w-full items-center justify-between gap-5 border border-[#C9A96E]/60 bg-[#A27A44] px-5 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-[#C9A96E] hover:bg-[#C9A96E] lg:w-auto lg:min-w-57.5"
            >
              <span>Consult Now</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001311] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-white/10" />

        {/* Bottom Information */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border border-[#A27A44]/40">
              <Scale size={16} strokeWidth={1.4} className="text-[#C9A96E]" />
            </div>

            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
              Profesional · Terpercaya · Berintegritas
            </span>
          </div>

          <p className="text-[11px] text-white/35">
            A strategic and solution-oriented legal approach.
          </p>
        </div>
      </div>
    </section>
  );
}
