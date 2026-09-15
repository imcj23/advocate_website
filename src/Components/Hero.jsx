import { useNavigate } from "react-router";
import { ArrowRight, Scale, ShieldCheck } from "lucide-react";
import Lawpict from "../assets/law2.jpg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#001311]">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[65%]">
        <img
          src={Lawpict}
          alt="Our Firm"
          className="h-full w-full object-cover"
          // loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#001311] via-[#001311]/25 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-30">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#8a7548]" />
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-[#8a7548]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F3F8F1]">
                Legal Protection & Justice
              </span>
            </div>
          </div>
          <h1 className="font-lora text-4xl font-semibold leading-[1.05] tracking-tight text-[#F3F8F1] sm:text-5xl lg:text-[4.5rem]">
            Committed to <span className="text-[#8a7548]">Solve.</span>
            <br />
            Dedicated to <span className="text-[#8a7548]">Result.</span>
            <br />
            Trusted by <span className="text-[#8a7548]">Clients.</span>
          </h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-12 bg-[#8a7548]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#8a7548]" />
            <span className="h-px w-7 bg-[#8a7548]/50" />
          </div>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#F3F8F1]/70 sm:text-base">
            Strategic legal counsel for businesses, entrepreneurs, and
            individuals navigating complex legal matters in Indonesia.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center justify-center gap-3 rounded-sm bg-[#8a7548] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#A27A44] hover:shadow-[0_10px_30px_rgba(138,117,72,0.25)]"
            >
              Discuss Your Case
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => navigate("/practice")}
              className="inline-flex items-center justify-center gap-3 rounded-sm border border-[#F3F8F1]/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F3F8F1] transition-all duration-300 hover:border-[#8a7548] hover:bg-[#8a7548]/10"
            >
              Our Services
            </button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#F3F8F1]/10 pt-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#8a7548]" />
              <span className="text-xs text-[#F3F8F1]/60">
                Professional Counsel
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-[#8a7548]" />
              <span className="text-xs text-[#F3F8F1]/60">Justice Focused</span>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#8a7548]" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#F3F8F1]/40">
              Integrity · Strategy · Resolution
            </span>
          </div>
        </div>
      </div>

      {/* <div className="relative block h-56 lg:hidden">
        <img
          src={Lawpict}
          alt="Our Firm"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#001311] via-[#001311]/20 to-transparent" />
      </div> */}
    </section>
  );
}
