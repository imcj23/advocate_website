import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
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
  X,
  Check,
} from "lucide-react";
import Law3 from "../../assets/law2.jpg";

const practiceData = [
  {
    icon: BriefcaseBusiness,
    title: "BISNIS & KORPORASI",
    desc: "Memberikan nasihat hukum terkait struktur perusahaan, tata kelola, kepatuhan, pemegang saham, usaha patungan, serta berbagai pengaturan korporasi lainnya.",

    services: [
      "Pendirian dan penataan struktur perusahaan",
      "Tata kelola perusahaan",
      "Perjanjian pemegang saham",
      "Usaha patungan dan kemitraan bisnis",
      "Restrukturisasi perusahaan",
      "Nasihat hukum korporasi",
      "Kepatuhan dan regulasi perusahaan",
      "Transaksi dan kegiatan usaha",
      "Perlindungan kepentingan pemegang saham",
      "Penilaian risiko hukum korporasi",
    ],

    approach:
      "Kami memahami bahwa kebutuhan hukum perusahaan harus selaras dengan tujuan bisnis. Pendekatan kami menggabungkan pemahaman terhadap aspek hukum, struktur bisnis, dan risiko yang mungkin timbul sehingga setiap keputusan korporasi dapat dilakukan secara terukur dan tepat.",

    issues: [
      "Pendirian dan perubahan struktur perusahaan",
      "Hubungan dan hak pemegang saham",
      "Tata kelola dan kepatuhan perusahaan",
      "Restrukturisasi dan perubahan kepemilikan",
      "Permasalahan dalam usaha patungan",
      "Transaksi dan keputusan korporasi",
      "Potensi konflik antar pemegang saham",
    ],
  },

  {
    icon: FileText,
    title: "KONTRAK & KOMERSIAL",
    desc: "Menyusun, meninjau, dan menegosiasikan berbagai perjanjian serta kontrak komersial yang disesuaikan dengan kepentingan dan tujuan klien.",

    services: [
      "Perjanjian komersial",
      "Penyusunan & peninjauan kontrak",
      "Negosiasi kontrak",
      "Transaksi bisnis",
      "Perjanjian kemitraan",
      "Perjanjian distribusi",
      "Perjanjian layanan",
      "Perjanjian pasokan & pengadaan",
      "Perjanjian kerahasiaan",
      "Penilaian risiko hukum",
      "Pencegahan sengketa kontrak",
    ],

    approach:
      "Kontrak yang disusun dengan baik lebih dari sekadar dokumen hukum. Kami memastikan bahwa setiap perjanjian bersifat jelas, dapat ditegakkan, dan selaras dengan tujuan komersial klien kami. Fokus kami adalah melindungi kepentingan Anda dan meminimalkan risiko dalam setiap transaksi.",

    issues: [
      "Penyusunan dan peninjauan kontrak komersial",
      "Negosiasi syarat dan ketentuan utama",
      "Templat kontrak dan standarisasi",
      "Pemberian nasihat mengenai hak dan kewajiban dalam kontrak",
      "Pengelolaan perubahan kontrak",
      "Penyelesaian sengketa kontrak",
      "Pengelolaan siklus hidup kontrak",
    ],
  },

  {
    icon: Scale,
    title: "PENYELESAIAN SENGKETA",
    desc: "Mewakili klien dalam proses litigasi, arbitrase, maupun penyelesaian sengketa alternatif dengan mengutamakan solusi yang efektif dan efisien.",

    services: [
      "Konsultasi dan analisis sengketa",
      "Strategi penyelesaian sengketa",
      "Litigasi perdata dan komersial",
      "Arbitrase",
      "Negosiasi penyelesaian sengketa",
      "Mediasi",
      "Penyusunan dokumen hukum",
      "Pendampingan proses persidangan",
      "Representasi kepentingan klien",
      "Pencegahan eskalasi sengketa",
    ],

    approach:
      "Kami memandang penyelesaian sengketa bukan semata-mata mengenai proses hukum, tetapi juga mengenai strategi untuk mencapai hasil yang paling tepat bagi klien. Setiap perkara dianalisis secara menyeluruh untuk menentukan pendekatan yang efektif, baik melalui negosiasi, mediasi, arbitrase, maupun litigasi.",

    issues: [
      "Sengketa kontrak dan transaksi bisnis",
      "Wanprestasi dan perbuatan melawan hukum",
      "Perselisihan antar pihak dalam hubungan bisnis",
      "Sengketa pembayaran dan kewajiban kontraktual",
      "Sengketa perusahaan dan pemegang saham",
      "Proses mediasi dan negosiasi",
      "Perkara litigasi dan arbitrase",
    ],
  },

  {
    icon: Users,
    title: "KETENAGAKERJAAN & HUBUNGAN INDUSTRIAL",
    desc: "Memberikan konsultasi hukum mengenai ketenagakerjaan, hubungan industrial, kebijakan perusahaan, serta penyelesaian perselisihan ketenagakerjaan.",

    services: [
      "Penyusunan perjanjian kerja",
      "Peraturan perusahaan",
      "Perjanjian kerja bersama",
      "Kebijakan ketenagakerjaan",
      "Hubungan industrial",
      "Pemutusan hubungan kerja",
      "Penyelesaian perselisihan tenaga kerja",
      "Konsultasi hak dan kewajiban pekerja",
      "Kepatuhan ketenagakerjaan",
      "Pendampingan perselisihan hubungan industrial",
    ],

    approach:
      "Kami membantu perusahaan membangun hubungan kerja yang tertib, jelas, dan sesuai dengan ketentuan hukum yang berlaku. Pendekatan kami berfokus pada pencegahan masalah melalui kebijakan dan dokumentasi yang tepat, sekaligus memberikan pendampingan ketika terjadi perselisihan.",

    issues: [
      "Penyusunan dan peninjauan perjanjian kerja",
      "Kebijakan dan peraturan perusahaan",
      "Pemutusan hubungan kerja",
      "Perselisihan hak dan kepentingan",
      "Perselisihan hubungan industrial",
      "Kepatuhan terhadap ketentuan ketenagakerjaan",
      "Negosiasi antara perusahaan dan pekerja",
    ],
  },

  {
    icon: ClipboardCheck,
    title: "PENDAPAT HUKUM & UJI TUNTAS",
    desc: "Menyusun pendapat hukum dan melakukan uji tuntas hukum sebagai dasar dalam transaksi, pengambilan keputusan, dan kebutuhan bisnis klien.",

    services: [
      "Penyusunan pendapat hukum",
      "Uji tuntas hukum perusahaan",
      "Uji tuntas transaksi",
      "Pemeriksaan dokumen hukum",
      "Identifikasi risiko hukum",
      "Analisis kepatuhan",
      "Analisis perjanjian",
      "Pemeriksaan status aset dan kepemilikan",
      "Analisis struktur perusahaan",
      "Rekomendasi mitigasi risiko",
    ],

    approach:
      "Kami memberikan analisis hukum yang terstruktur untuk membantu klien memahami posisi, risiko, dan konsekuensi hukum dari suatu keputusan atau transaksi. Setiap pemeriksaan dilakukan dengan memperhatikan dokumen, fakta, serta tujuan bisnis klien.",

    issues: [
      "Pemeriksaan dokumen dan legalitas perusahaan",
      "Identifikasi risiko sebelum transaksi",
      "Pemeriksaan perjanjian dan kewajiban hukum",
      "Analisis kepemilikan dan aset",
      "Kepatuhan terhadap regulasi",
      "Penyusunan pendapat hukum",
      "Rekomendasi mitigasi risiko hukum",
    ],
  },

  {
    icon: Building2,
    title: "MERGER & AKUISISI",
    desc: "Memberikan nasihat hukum terkait merger, akuisisi, divestasi, dan restrukturisasi perusahaan dengan fokus pada pengelolaan risiko dan perlindungan kepentingan klien.",

    services: [
      "Merger dan konsolidasi",
      "Akuisisi perusahaan",
      "Akuisisi saham",
      "Divestasi",
      "Restrukturisasi perusahaan",
      "Uji tuntas transaksi",
      "Penyusunan dokumen transaksi",
      "Negosiasi transaksi",
      "Analisis struktur transaksi",
      "Identifikasi dan mitigasi risiko hukum",
    ],

    approach:
      "Transaksi korporasi membutuhkan perencanaan hukum yang matang sejak tahap awal hingga penyelesaian transaksi. Kami mendampingi klien dalam setiap tahapan dengan memperhatikan struktur transaksi, kepatuhan, risiko hukum, serta kepentingan komersial yang ingin dicapai.",

    issues: [
      "Struktur merger dan akuisisi",
      "Akuisisi saham dan aset",
      "Divestasi perusahaan",
      "Uji tuntas sebelum transaksi",
      "Negosiasi syarat transaksi",
      "Penyusunan dokumen transaksi",
      "Risiko hukum dalam restrukturisasi perusahaan",
    ],
  },

  {
    icon: Landmark,
    title: "PERBANKAN & KEUANGAN",
    desc: "Memberikan layanan hukum terkait transaksi pembiayaan, perjanjian kredit, dokumen jaminan, serta kepatuhan terhadap ketentuan perbankan dan keuangan.",

    services: [
      "Perjanjian kredit dan pembiayaan",
      "Dokumen jaminan",
      "Transaksi pembiayaan",
      "Restrukturisasi pembiayaan",
      "Peninjauan dokumen keuangan",
      "Nasihat hukum perbankan",
      "Kepatuhan regulasi keuangan",
      "Transaksi pinjaman",
      "Penanganan risiko pembiayaan",
      "Penyelesaian permasalahan kredit",
    ],

    approach:
      "Kami memberikan pendampingan hukum dengan memperhatikan kompleksitas transaksi pembiayaan dan kebutuhan perlindungan bagi para pihak. Fokus kami adalah memastikan dokumentasi transaksi tersusun dengan baik, hak dan kewajiban para pihak jelas, serta risiko hukum dapat diidentifikasi sejak awal.",

    issues: [
      "Penyusunan dan peninjauan perjanjian kredit",
      "Dokumen dan pengikatan jaminan",
      "Restrukturisasi pembiayaan",
      "Permasalahan kewajiban pembayaran",
      "Risiko hukum dalam transaksi pembiayaan",
      "Kepatuhan terhadap regulasi perbankan",
      "Penyelesaian sengketa terkait kredit",
    ],
  },

  {
    icon: ShieldCheck,
    title: "REGULASI & KEPATUHAN",
    desc: "Membantu klien memahami dan memenuhi ketentuan peraturan perundang-undangan serta memastikan kegiatan usaha berjalan sesuai dengan regulasi yang berlaku.",

    services: [
      "Analisis regulasi",
      "Konsultasi kepatuhan hukum",
      "Pemetaan risiko regulasi",
      "Peninjauan kebijakan perusahaan",
      "Pemeriksaan kepatuhan",
      "Perizinan dan persyaratan hukum",
      "Penyusunan kebijakan internal",
      "Pemantauan perubahan regulasi",
      "Mitigasi risiko kepatuhan",
      "Pendampingan menghadapi isu regulasi",
    ],

    approach:
      "Kepatuhan hukum merupakan bagian penting dari keberlangsungan bisnis. Kami membantu klien memahami kewajiban hukum yang relevan dengan kegiatan usahanya dan menerjemahkannya menjadi langkah yang praktis untuk mengurangi risiko serta menjaga keberlangsungan operasional.",

    issues: [
      "Kepatuhan terhadap peraturan yang berlaku",
      "Perubahan dan perkembangan regulasi",
      "Kebijakan dan prosedur internal",
      "Perizinan kegiatan usaha",
      "Identifikasi risiko kepatuhan",
      "Pemeriksaan dan evaluasi kepatuhan",
      "Mitigasi risiko akibat pelanggaran regulasi",
    ],
  },
];

export default function Practice() {
  const [selectedPractice, setSelectedPractice] = useState(null);

  return (
    <>
      <Navbar />

      <main className="text-[#F3F8F1]">
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden bg-[#001311]">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[65%]">
            <img
              src={Law3}
              alt="Our Firm"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-r from-[#001311] via-[#001311]/70 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 md:py-24 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-4">
                <span className="text-xs font-semibold tracking-[0.25em] text-[#c9a96e]">
                  PRACTICE AREAS
                </span>

                <span className="h-px w-12 bg-[#c9a96e]" />
              </div>

              <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Saran Hukum Praktis
                <br />
                Fokus Kepada <span className="text-[#A27A44]">Hasil</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                Kantor Hukum ....... memberikan nasihat hukum yang strategis dan
                praktis dalam berbagai masalah bisnis, perusahaan, dan sengketa.
                Kami membantu klien menghadapi kompleksitas hukum dan mencapai
                hasil yang efektif.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== PRACTICE AREAS ==================== */}
        <section className="bg-[#f5f6f3] text-[#0b2f2a]">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-16">
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

            {/* Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {practiceData.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex min-h-71.25 flex-col border border-white/10 bg-[#001311] p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/50 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-[#c9a96e]/40 text-[#c9a96e] transition-all duration-300 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#0b2f2a]">
                        <Icon size={20} strokeWidth={1.4} />
                      </div>
                    </div>
                    <h3 className="mt-7 max-w-57.5 text-sm font-semibold leading-6 tracking-wider text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-white/70">
                      {item.desc}
                    </p>
                    <div className="mt-auto pt-6">
                      <button
                        type="button"
                        onClick={() => setSelectedPractice(item)}
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

        {/* modal  */}
        {selectedPractice && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#001311]/80 px-4 py-6 backdrop-blur-sm sm:px-6"
            onClick={() => setSelectedPractice(null)}
          >
            <div
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-[#F5F6F3] text-[#001311] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPractice(null)}
                className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center border border-[#001311]/10 bg-[#001311] text-white transition "
                aria-label="Tutup modal"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
              <div className="overflow-y-auto">
                <div className="border-b border-[#001311] px-6 pb-7 pt-8 sm:px-9 sm:pb-8 sm:pt-9">
                  <div className="flex items-start gap-5">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center border border-[#A27A44]/50 text-[#A27A44] sm:flex">
                      <selectedPractice.icon size={22} strokeWidth={1.4} />
                    </div>
                    <div className="pr-10">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A27A44]">
                        Layanan Hukum
                      </p>
                      <h2 className="mt-2 font-serif text-2xl font-medium leading-tight sm:text-3xl">
                        {selectedPractice.title}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-7 sm:px-9 sm:py-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#A27A44]" />

                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#001311]">
                      Yang Kami Lakukan
                    </h3>
                  </div>
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {selectedPractice.services.map((service, index) => (
                      <div
                        key={`${selectedPractice.title}-service-${index}`}
                        className="flex items-start gap-3 border-b border-[#001311]/8 pb-3"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#A27A44]/40 text-[#A27A44]">
                          <Check size={11} strokeWidth={1.8} />
                        </span>

                        <span className="text-xs leading-5 text-[#59635f]">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#001311] px-6 py-8 text-white sm:px-9">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#C9A96E]" />

                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
                      Pendekatan Kami
                    </h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-white/70">
                    {selectedPractice.approach}
                  </p>
                </div>
                <div className="px-6 py-7 sm:px-9 sm:py-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#A27A44]" />

                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#001311]">
                      Masalah Umum yang Kami Tangani
                    </h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedPractice.issues.map((issue, index) => (
                      <div
                        key={`${selectedPractice.title}-issue-${index}`}
                        className="flex items-start gap-3 text-xs leading-5 text-[#59635f]"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#A27A44]" />

                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-[#001311]/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#001311]/40">
                    Konsultasi Hukum Profesional
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedPractice(null)}
                    className="group flex items-center justify-center gap-2 bg-[#001311] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#A27A44]"
                  >
                    Tutup
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
