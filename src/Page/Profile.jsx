import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Scale,
  Languages,
  SquareText,
  Gavel,
  UserGroup,
  Users,
} from "lucide-react";

import User from "../assets/user.jpeg";

export default function Profile() {
  const practiceFocus = [
    {
      icon: BriefcaseBusiness,
      title: "Bisnis & Korporate",
      description:
        "Pendampingan hukum perusahaan, tata kelola, transaksi bisnis, dan pengambilan keputusan strategis.",
    },
    {
      icon: SquareText,
      title: "Kontrak & Komersial",
      description:
        "Penyusunan, peninjauan, dan negosiasi kontrak untuk memberikan kepastian serta perlindungan hukum.",
    },
    {
      icon: Scale,
      title: "Sengketa",
      description:
        "Strategi penyelesaian sengketa melalui pendekatan litigasi maupun non-litigasi yang terukur.",
    },
    {
      icon: UserGroup,
      title: "Hubungan Kerja & Industri",
      description:
        "Pendampingan hukum terkait hubungan kerja, ketenagakerjaan, dan perselisihan hubungan industrial.",
    },
    {
      icon: Gavel,
      title: "Pendapat Hukum & Uji Tuntas",
      description:
        "Legal opinion dan due diligence untuk mengidentifikasi risiko hukum sebelum keputusan bisnis diambil.",
    },
  ];

  const credentials = [
    {
      icon: GraduationCap,
      title: "Edukasi",
      value: "Sarjana Hukum",
      detail: "Universitas Atma Jaya Yogyakarta",
    },
    {
      icon: BriefcaseBusiness,
      title: "Pengalaman Profesional",
      value: "Perusahaan & Sengketa",
      detail: "Praktik hukum profesional",
    },
    {
      icon: Scale,
      title: "Admission",
      value: "Advokat Indonesia",
      detail: "Perhimpunan Advokat Indonesia",
    },
    {
      icon: Users,
      title: "Keanggotaan",
      value: "Organisasi Profesi",
      detail: "Aktif dalam profesi hukum",
    },
    {
      icon: Languages,
      title: "Bahasa",
      value: "Indonesia & English",
      detail: "Professional communication",
    },
  ];

  const experiences = [
    {
      title: "Corporate Structuring and Commercial Transactions",
      category: "Corporate & Commercial",
      description:
        "Pendampingan klien dalam penataan struktur perusahaan dan berbagai transaksi komersial.",
    },
    {
      title: "Shareholders’ Agreements and Joint Ventures",
      category: "Corporate & Commercial",
      description:
        "Penyusunan dan pendampingan hukum terkait perjanjian pemegang saham serta kerja sama joint venture.",
    },
    {
      title: "Contract Drafting, Review and Negotiation",
      category: "Contract & Commercial",
      description:
        "Penyusunan, peninjauan, dan negosiasi berbagai perjanjian untuk melindungi kepentingan klien.",
    },
    {
      title: "Business Disputes and Commercial Litigation",
      category: "Dispute Resolution",
      description:
        "Pendampingan dan representasi hukum dalam sengketa bisnis serta proses litigasi komersial.",
    },
    {
      title: "Employment and Industrial Relations Matters",
      category: "Employment",
      description:
        "Pendampingan hukum dalam permasalahan ketenagakerjaan dan hubungan industrial.",
    },
    {
      title: "Legal Due Diligence and Legal Opinion",
      category: "Legal Advisory",
      description:
        "Pemeriksaan aspek hukum dan penyusunan pendapat hukum untuk mengidentifikasi risiko serta memberikan rekomendasi strategis.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#f5f6f3] text-[#0b2f2a]">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="bg-[#001311] text-[#f5f6f3]">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[250px_1fr] lg:items-center">
              {/* PROFILE IMAGE */}
              <div className="relative w-full max-w-62.5">
                <div className="absolute -bottom-2 -left-2 h-full w-full border border-[#c9a96e]/50" />

                <div className="relative aspect-4/4.5 overflow-hidden bg-[#dfe3df]">
                  <img
                    src={User}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* PROFILE CONTENT */}
              <div className="lg:pl-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#c9a96e]" />

                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e]">
                    Attorney Profile
                  </span>
                </div>

                <p className="mb-1 text-sm uppercase tracking-[0.18em] text-white/50">
                  [Role]
                </p>

                <h1 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                  Nama{" "}
                  <span className="font-light text-[#c9a96e]">Lengkap</span>
                </h1>

                <div className="my-5 h-px bg-white/15" />

                <p className="max-w-3xl text-base leading-7 text-white/65 sm:text-lg">
                  Advokat yang berfokus pada hukum bisnis, korporasi, kontrak
                  komersial, dan penyelesaian sengketa dengan pendekatan
                  strategis, teliti, serta berorientasi pada kepentingan jangka
                  panjang klien.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-xs uppercase tracking-widest text-white/45">
                  <span>Corporate Law</span>
                  <span>Commercial</span>
                  <span>Dispute</span>
                  <span>Legal Advisory</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ================= PRACTICE FOCUS ================= */}
        <section className="bg-[#f5f6f3]">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              {/* LEFT */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#9b7b42]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b7b42]">
                    Areas of Practice
                  </span>
                </div>

                <h2 className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-tight text-[#0b2f2a] md:text-5xl">
                  Practice
                  <br />
                  Focus
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#59635f]">
                  Fokus praktik hukum yang mencerminkan pengalaman, ketelitian,
                  dan pendekatan strategis dalam memberikan solusi bagi setiap
                  kebutuhan hukum klien.
                </p>
              </div>

              {/* RIGHT */}
              <div className="border-t border-[#cfd6d2]">
                {practiceFocus.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group grid gap-4 border-b border-[#cfd6d2] py-5 transition-all duration-300 lg:grid-cols-[45px_0.9fr_1.2fr] lg:items-center"
                    >
                      {/* ICON */}
                      <div className="flex h-10 w-10 items-center justify-center border border-[#cfd6d2] bg-white text-[#0b2f2a] transition-all duration-300 group-hover:border-[#9b7b42] group-hover:bg-[#0b2f2a] group-hover:text-white">
                        <Icon size={19} strokeWidth={1.5} />
                      </div>

                      {/* TITLE */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#0b2f2a] transition-colors duration-300 group-hover:text-[#9b7b42]">
                          {item.title}
                        </h3>
                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-sm leading-6 text-[#68716d]">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* credential */}
        <section className="bg-[#0b2f2a] text-white">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="mb-8 text-center">
              <div className="mb-3 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#c9a96e]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a96e]">
                  Background
                </span>

                <span className="h-px w-8 bg-[#c9a96e]" />
              </div>

              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                Experience{" "}
                <span className="font-light text-white/60">& Credentials</span>
              </h2>
            </div>

            {/* CREDENTIALS */}
            <div className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">
              {credentials.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center justify-center border-b border-r border-white/10 p-5 text-center transition-colors duration-300 hover:bg-white/3"
                  >
                    {/* ICON */}
                    <div className="mb-5 flex h-10 w-10 items-center justify-center">
                      <Icon
                        size={30}
                        strokeWidth={1.4}
                        className="text-[#c9a96e]"
                      />
                    </div>

                    {/* TITLE */}
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                      {item.title}
                    </p>

                    {/* VALUE */}
                    <h3 className="mt-2 text-sm font-medium">{item.value}</h3>

                    {/* DETAIL */}
                    <p className="mt-1 max-w-45 text-xs leading-5 text-white/45">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* experience */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#9b7b42]" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9b7b42]">
                    Track Record
                  </span>
                </div>

                <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                  Selected <span className="font-light">Experience</span>
                </h2>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {experiences.map((item, index) => (
                <div
                  key={item.number}
                  className={`group border border-[#d9dedb] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0b2f2a] hover:shadow-md ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs text-[#9b7b42]">
                      {item.number}
                    </span>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.4}
                      className="text-[#9b7b42] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>

                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#9b7b42]">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-medium text-[#0b2f2a]">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#66736f]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
       

        {/* <section className="bg-[#e7ebe7]">
          <div className="mx-auto max-w-7xl px-6 py-9 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9b7b42]">
                  Professional Commitment
                </p>

                <h2 className="mt-2 text-2xl font-medium text-[#0b2f2a] sm:text-3xl">
                  Strategic legal advice.{" "}
                  <span className="font-light">Clear direction.</span>
                </h2>
              </div>

              <button
                type="button"
                className="group flex w-fit shrink-0 items-center gap-3 border border-[#0b2f2a] px-5 py-3 text-xs font-medium uppercase tracking-widest text-[#0b2f2a] transition-all duration-300 hover:bg-[#0b2f2a] hover:text-white"
              >
                Contact Attorney
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </>
  );
}
