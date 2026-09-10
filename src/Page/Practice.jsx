import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  BriefcaseBusiness,
  FileText,
  Scale,
  Users,
  ClipboardCheck,
  Building2,
  Landmark,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Law3 from "../assets/law2.jpg";

const practiceData = [
  {
    icon: BriefcaseBusiness,
    title: "BUSINESS & CORPORATE",
    desc: "Advising on corporate structure, governance, compliance, shareholder matters, joint ventures and other corporate arrangements.",
  },
  {
    icon: FileText,
    title: "CONTRACTS & COMMERCIAL",
    desc: "Drafting, reviewing and negotiating a wide range of commercial contracts and agreements tailored to clients' objectives.",
  },
  {
    icon: Scale,
    title: "DISPUTE RESOLUTION",
    desc: "Representing clients in litigation, arbitration and alternative dispute resolution with a focus on effective and efficient solutions.",
  },
  {
    icon: Users,
    title: "EMPLOYMENT & INDUSTRIAL RELATIONS",
    desc: "Providing advice on employment matters, industrial relations, workplace policies and dispute resolution.",
  },
  {
    icon: ClipboardCheck,
    title: "LEGAL OPINION & DUE DILIGENCE",
    desc: "Delivering legal opinions and conducting legal due diligence for transactions and business decisions.",
  },
  {
    icon: Building2,
    title: "MERGERS & ACQUISITIONS",
    desc: "Advising on mergers, acquisitions, divestments and corporate restructurings with a focus on risk management and value protection.",
  },
  {
    icon: Landmark,
    title: "BANKING & FINANCE",
    desc: "Providing legal counsel on financing transactions, loan agreements, security documents and regulatory compliance.",
  },
  {
    icon: ShieldCheck,
    title: "REGULATORY & COMPLIANCE",
    desc: "Assisting clients in navigating regulatory requirements and ensuring compliance with applicable laws and regulations.",
  },
];

export default function Practice() {
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar />

      <main className="text-[#F3F8F1]">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#001311]">
          {/* IMAGE */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[65%]">
            <img
              src={Law3}
              alt="Our Firm"
              className="h-full w-full object-cover"
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-r from-[#001311] via-[#001311]/70 to-transparent" />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* HERO CONTENT */}
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 md:py-24 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              {/* LABEL */}
              <div className="mb-5 flex items-center gap-4">
                <span className="text-xs font-semibold tracking-[0.25em] text-[#c9a96e]">
                  PRACTICE AREAS
                </span>

                <span className="h-px w-12 bg-[#c9a96e]" />
              </div>

              {/* TITLE */}
              <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Saran Hukum Praktis
                <br />
                Fokus Kepada <span className="text-[#A27A44]">Hasil</span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                Kantor Hukum ....... memberikan nasihat hukum yang strategis dan
                praktis dalam berbagai masalah bisnis, perusahaan, dan sengketa.
                Kami membantu klien menghadapi kompleksitas hukum dan mencapai
                hasil yang efektif.
              </p>
            </div>
          </div>
        </section>

        {/* ================= PRACTICE AREAS ================= */}
        <section className="bg-[#f5f6f3] text-[#0b2f2a]">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-16">
            {/* SECTION HEADER */}
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-9 bg-[#9b7b42]" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9b7b42]">
                    Our Expertise
                  </span>
                </div>

                <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Practice
                  <br />
                  Areas
                </h2>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-[#59635f] lg:pb-1">
                Kami menyediakan layanan hukum yang komprehensif dengan
                pendekatan yang strategis, praktis, dan berorientasi pada
                kepentingan serta tujuan bisnis klien.
              </p>
            </div>

            {/* PRACTICE GRID */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {practiceData.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex min-h-[285px] flex-col border border-white/10 bg-[#0b2f2a] p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/50 hover:shadow-xl"
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-[#c9a96e]/40 text-[#c9a96e] transition-all duration-300 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#0b2f2a]">
                        <Icon size={20} strokeWidth={1.4} />
                      </div>

                      <span className="text-[10px] tracking-[0.2em] text-white/20">
                        LEGAL
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3 className="mt-7 max-w-[230px] text-sm font-semibold leading-6 tracking-[0.05em] text-white">
                      {item.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-3 text-xs leading-6 text-white/50">
                      {item.desc}
                    </p>

                    {/* BUTTON */}
                    <div className="mt-auto pt-6">
                      <button
                        type="button"
                        className="group/button flex items-center gap-2 border-b border-[#c9a96e]/50 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c9a96e] transition-all duration-300 hover:border-[#c9a96e] hover:text-white"
                      >
                        Detail
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.4}
                          className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
