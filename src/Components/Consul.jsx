import {
  MessageSquareText,
  Search,
  Scale,
  Handshake,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquareText,
    title: "Konsultasi",
    description:
      "Sampaikan permasalahan hukum dan kebutuhan Anda kepada tim kami.",
  },
  {
    icon: Search,
    title: "Analisis",
    description:
      "Kami mempelajari permasalahan dan kondisi hukum secara menyeluruh.",
  },
  {
    icon: Scale,
    title: "Strategi",
    description:
      "Kami menyusun langkah dan strategi hukum yang sesuai dengan kebutuhan.",
  },
  {
    icon: Handshake,
    title: "Pendampingan",
    description:
      "Kami memberikan pendampingan hukum secara profesional hingga proses selesai.",
  },
];

export default function ConsultationProcess() {
  return (
    <section id="process" className="scroll-mt-16 px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 max-w-full">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#001311]" />
            <span className="text-xl font-bold uppercase tracking-[0.2em] text-[#001311]">
              Proses Konsultasi
            </span>
            <span className="h-px w-9 bg-[#001311]" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-[#001311] md:text-4xl">
            Pendampingan hukum
            <span className="block text-[#A27A44]">
              dimulai dari langkah yang tepat.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#001311]">
            Kami memahami setiap permasalahan secara menyeluruh untuk memberikan
            pendampingan hukum yang terarah dan profesional.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-6.25 hidden h-px bg-[#30433f] lg:block" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="group relative">
                  <div className="relative z-10 mb-7 flex items-center justify-between lg:block">
                    <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full border border-[#52645f] bg-[#001311] text-[#dce4e1] transition-all duration-300">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                  </div>
                  <div className="lg:pr-6">
                    <h3 className="text-lg font-semibold text-[#001311]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#001311]">
                      {step.description}
                    </p>
                    
                  </div>{step.number !== "04" && (
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="absolute right-2 top-4 hidden text-[#001311] lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
