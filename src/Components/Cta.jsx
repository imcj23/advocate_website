import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F5F8F6] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-[#001311]" />
              <span className="text-xl font-bold uppercase tracking-[0.2em] text-[#001311]">
                Konsultasi Hukum
              </span>
              <span className="h-px w-9 bg-[#001311]" />
            </div>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#001311] md:text-5xl">
              Memiliki permasalahan
              <span className="block text-[#A27A44]">
                hukum yang perlu ditangani?
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#001311] md:text-base">
              Jangan menghadapi persoalan hukum sendirian. Konsultasikan
              kebutuhan hukum Anda bersama tim kami untuk mendapatkan langkah
              yang tepat dan terarah.
            </p>
          </div>

          {/* Button */}
          <div className="shrink-0">
            <button className="group flex items-center gap-4 rounded-sm bg-[#001311] px-6 py-4 text-sm font-semibold text-[#F3F8F1] transition-all duration-300">
              Konsultasi Sekarang
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001311] text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={17} strokeWidth={1.8} />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-14 flex flex-col gap-3 border-t border-[#30433f] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs uppercase tracking-[0.15em] text-[#001311]">
            Profesional · Terpercaya · Berintegritas
          </span>

          <span className="text-xs text-[#687b75]">
            Konsultasi hukum secara profesional
          </span>
        </div>
      </div>
    </section>
  );
}
