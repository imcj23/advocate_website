import {
  Scale,
  Gavel,
  Building2,
  BriefcaseBusiness,
  FileSearch,
  Landmark,
} from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "Business & Corporate",
    description: "Legal solutions for business and corporate needs.",
  },
  {
    icon: Gavel,
    title: "Contract & Commercial",
    description:
      "Assistance in drafting, negotiating and resolving contract disputes.",
  },
  {
    icon: Building2,
    title: "Dispute Resolution",
    description:
      "Handling of disputes through litigation and non-litigation channels.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Employment & Industrial Relations",
    description: "Assistance regarding work relations and disputes.",
  },
  {
    icon: FileSearch,
    title: "Legal Opinion & Due Diligence",
    description:
      "Legal consultation and review to support business decision making.",
  },
  {
    icon: Landmark,
    title: "Banking & Finance",
    description: "Legal assistance in banking and financing transactions.",
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
                Our Service
              </span>
            </div>
            <p className="text-sm text-gray-500">
              We are here to provide professional, strategic and trusted legal
              solutions.
            </p>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group flex flex-col items-center justify-start gap-4 rounded-sm border-2 border-[#c9a96e] bg-white p-5 text-center transition-all duration-300 "
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#c9a96e]/50 bg-[#f5efe0] text-[#0b2f2a] transition-all duration-300 ">
                    <Icon size={21} strokeWidth={1.7} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[#0b2f2a]">
                      {service.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#0b2f2a]/60">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <a
              href="/practice"
              className="inline-flex items-center text-medium font-bold text-[#001311] hover:text-[#A27A44]"
            >
              Read More →
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
