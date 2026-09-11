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
    title: "BISNIS & KORPORASI",
    desc: "Memberikan nasihat hukum terkait struktur perusahaan, tata kelola, kepatuhan, pemegang saham, usaha patungan, serta berbagai pengaturan korporasi lainnya.",
  },
  {
    icon: FileText,
    title: "KONTRAK & KOMERSIAL",
    desc: "Menyusun, meninjau, dan menegosiasikan berbagai perjanjian serta kontrak komersial yang disesuaikan dengan kepentingan dan tujuan klien.",
  },
  {
    icon: Scale,
    title: "PENYELESAIAN SENGKETA",
    desc: "Mewakili klien dalam proses litigasi, arbitrase, maupun penyelesaian sengketa alternatif dengan mengutamakan solusi yang efektif dan efisien.",
  },
  {
    icon: Users,
    title: "KETENAGAKERJAAN & HUBUNGAN INDUSTRIAL",
    desc: "Memberikan konsultasi hukum mengenai ketenagakerjaan, hubungan industrial, kebijakan perusahaan, serta penyelesaian perselisihan ketenagakerjaan.",
  },
  {
    icon: ClipboardCheck,
    title: "PENDAPAT HUKUM & UJI TUNTAS",
    desc: "Menyusun pendapat hukum dan melakukan uji tuntas hukum sebagai dasar dalam transaksi, pengambilan keputusan, dan kebutuhan bisnis klien.",
  },
  {
    icon: Building2,
    title: "MERGER & AKUISISI",
    desc: "Memberikan nasihat hukum terkait merger, akuisisi, divestasi, dan restrukturisasi perusahaan dengan fokus pada pengelolaan risiko dan perlindungan kepentingan klien.",
  },
  {
    icon: Landmark,
    title: "PERBANKAN & KEUANGAN",
    desc: "Memberikan layanan hukum terkait transaksi pembiayaan, perjanjian kredit, dokumen jaminan, serta kepatuhan terhadap ketentuan perbankan dan keuangan.",
  },
  {
    icon: ShieldCheck,
    title: "REGULASI & KEPATUHAN",
    desc: "Membantu klien memahami dan memenuhi ketentuan peraturan perundang-undangan serta memastikan kegiatan usaha berjalan sesuai dengan regulasi yang berlaku.",
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
                    className="group flex min-h-71.25 flex-col border border-white/10 bg-[#001311] p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/50 hover:shadow-xl"
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-[#c9a96e]/40 text-[#c9a96e] transition-all duration-300 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#0b2f2a]">
                        <Icon size={20} strokeWidth={1.4} />
                      </div>
                    </div>
                    <h3 className="mt-7 max-w-57.5 text-sm font-semibold leading-6 tracking-wider text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-white">
                      {item.desc}
                    </p>
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
