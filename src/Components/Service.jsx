import {
  Scale,
  Gavel,
  Building2,
  BriefcaseBusiness,
  Users,
  MessageSquareText,
} from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "Hukum Perdata",
    description: "Pendampingan berbagai permasalahan hukum perdata.",
  },
  {
    icon: Gavel,
    title: "Hukum Pidana",
    description: "Pendampingan dan pembelaan dalam perkara pidana.",
  },
  {
    icon: Building2,
    title: "Bisnis & Perusahaan",
    description: "Solusi hukum untuk kebutuhan bisnis dan perusahaan.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Sengketa & Litigasi",
    description: "Penanganan sengketa melalui litigasi dan non-litigasi.",
  },
  {
    icon: Users,
    title: "Ketenagakerjaan",
    description: "Pendampingan terkait hubungan dan perselisihan kerja.",
  },
  {
    icon: MessageSquareText,
    title: "Konsultasi Hukum",
    description: "Konsultasi untuk menentukan langkah hukum yang tepat.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 bg-[#f5f5f2] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#0b2f2a]" />
              <span className="text-xl font-bold uppercase tracking-[0.2em] text-[#0b2f2a]">
                Layanan Kami
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Kami hadir memberikan solusi hukum yang profesional, strategis dan
              terpercaya.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group flex flex-col items-center justify-center gap-4 rounded-sm border border-[#d9dedb] bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#0b2f2a] hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#edf1ef] text-[#0b2f2a] transition-colors duration-300 group-hover:bg-[#0b2f2a] group-hover:text-white">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-[#10201d]">
                    {service.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
