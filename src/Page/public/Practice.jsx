import { useEffect, useState } from "react";
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

/* =========================================================
   ICON MAPPING
   Nama icon berasal dari database.
========================================================= */

const iconMap = {
  BriefcaseBusiness,
  FileText,
  Scale,
  Users,
  ClipboardCheck,
  Building2,
  Landmark,
  ShieldCheck,
};

/* =========================================================
   HELPER
   Memastikan data JSON dari backend menjadi array.
========================================================= */

const parseJsonArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }

      return [];
    } catch (error) {
      console.error("Gagal parsing JSON:", error);
      return [];
    }
  }

  return [];
};

/* =========================================================
   COMPONENT
========================================================= */

export default function Practice() {
  const [practiceData, setPracticeData] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("http://localhost:3500/practice");
        if (!response.ok) {
          throw new Error(`Gagal mengambil data practice (${response.status})`);
        }

        const result = await response.json();
        console.log("Response Practice:", result);
        const practices = Array.isArray(result.data) ? result.data : [];

        /* =================================================
           UBAH STRUKTUR BACKEND
           menjadi struktur yang digunakan frontend
        ================================================= */

        const formattedPractices = practices.map((item) => {
          const Icon = iconMap[item.icon] || BriefcaseBusiness;
          return {
            id: item.id,
            icon: Icon,
            title: item.nama || "Practice Area",
            desc: item.deskripsi || "",

            services: parseJsonArray(item.yang_kami_lakukan),

            approach: Array.isArray(item.pendekatan_kami)
              ? item.pendekatan_kami.join(" ")
              : item.pendekatan_kami || "",

            issues: parseJsonArray(item.masalah_umum),
          };
        });

        setPracticeData(formattedPractices);
      } catch (error) {
        console.error("Error mengambil data practice:", error);

        setError("Data practice tidak dapat dimuat. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchPractices();
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="bg-[#f5f6f3] text-[#0b2f2a]">
          <section className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-[#A27A44]/20 border-t-[#A27A44]" />

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#59635f]">
                Loading Practice Areas
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <>
        <Navbar />

        <main className="bg-[#f5f6f3] text-[#0b2f2a]">
          <section className="flex min-h-[60vh] items-center justify-center px-6">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-[#A27A44]/40 text-[#A27A44]">
                <Scale size={22} strokeWidth={1.4} />
              </div>

              <h2 className="font-serif text-2xl">Data Could Not Be Loaded</h2>

              <p className="mt-3 text-sm leading-6 text-[#59635f]">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 bg-[#001311] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#A27A44]"
              >
                Try Again
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="text-[#F3F8F1]">
        {/* ==================================================
            HERO
        ================================================== */}

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
                <span className="h-px w-12 bg-[#A27A44]" />
                <span className="text-xs font-semibold tracking-[0.25em] text-[#F3F8F1]">
                  PRACTICE AREAS
                </span>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Practical Legal Advice
                <br />
                Focus on <span className="text-[#A27A44]">Results</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                DSP Law Firm provides strategic and practical legal advice on a
                wide range of business, corporate, and dispute-related matters.
                We assist clients in navigating legal complexities and achieving
                effective outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            PRACTICE AREAS
        ================================================== */}
        <section className="bg-[#f5f6f3] text-[#0b2f2a]">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-16">
            <div className="mb-10 flex flex-col items-center text-center">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#A27A44]" />
                <h2 className="text-xl font-bold uppercase tracking-[0.25em] text-[#001311]">
                  Practice Area
                </h2>
                <span className="h-px w-9 bg-[#A27A44]" />
              </div>
            </div>

            {practiceData.length === 0 ? (
              <div className="border border-[#001311]/10 bg-white px-6 py-12 text-center">
                <p className="text-sm text-[#59635f]">
                  Belum ada data practice yang tersedia.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {practiceData.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="flex h-full flex-col items-start rounded-2xl border border-[#c9a96e] bg-white px-6 py-10 text-left"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a96e]/40 text-[#9b7b42]">
                        <Icon size={24} strokeWidth={1.4} />
                      </div>

                      <h3 className="mt-6 text-lg font-semibold text-[#0b2f2a]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#59635f]">
                        {item.desc}
                      </p>

                      <button
                        type="button"
                        onClick={() => setSelectedPractice(item)}
                        className="mt-auto flex items-center gap-2 border-b border-[#c9a96e]/50 pt-6 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b7b42]"
                      >
                        Detail
                        <ArrowUpRight size={14} strokeWidth={1.4} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            MODAL
        ================================================== */}

        {selectedPractice && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#001311]/80 px-4 py-6 backdrop-blur-sm sm:px-6"
            onClick={() => setSelectedPractice(null)}
          >
            <div
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-[#F5F6F3] text-[#001311] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE */}

              <button
                type="button"
                onClick={() => setSelectedPractice(null)}
                className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center border border-[#001311]/10 bg-[#001311] text-white transition hover:bg-[#A27A44]"
                aria-label="Tutup modal"
              >
                <X size={17} strokeWidth={1.5} />
              </button>

              <div className="overflow-y-auto">
                {/* ============================================
                    MODAL HEADER
                ============================================ */}

                <div className="border-b border-[#001311] px-6 pb-7 pt-8 sm:px-9 sm:pb-8 sm:pt-9">
                  <div className="flex items-start gap-5">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center border border-[#A27A44]/50 text-[#A27A44] sm:flex">
                      {(() => {
                        const Icon = selectedPractice.icon;

                        return <Icon size={22} strokeWidth={1.4} />;
                      })()}
                    </div>

                    <div className="pr-10">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A27A44]">
                        Legal Service
                      </p>

                      <h2 className="mt-2 font-serif text-2xl font-medium leading-tight sm:text-3xl">
                        {selectedPractice.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* ============================================
                    YANG KAMI LAKUKAN
                ============================================ */}

                <div className="px-6 py-7 sm:px-9 sm:py-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#A27A44]" />

                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#001311]">
                      What we do
                    </h3>
                  </div>

                  {selectedPractice.services.length > 0 ? (
                    <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {selectedPractice.services.map((service, index) => (
                        <div
                          key={`${selectedPractice.id}-service-${index}`}
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
                  ) : (
                    <p className="text-xs text-[#59635f]">
                      No service information is available yet.
                    </p>
                  )}
                </div>

                {/* ============================================
                    PENDEKATAN KAMI
                ============================================ */}

                <div className="bg-[#001311] px-6 py-8 text-white sm:px-9">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#C9A96E]" />

                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
                      Our Approach
                    </h3>
                  </div>

                  <p className="max-w-2xl text-sm leading-7 text-white/70">
                    {selectedPractice.approach ||
                      "Information regarding the approach is not yet available."}
                  </p>
                </div>

                {/* ============================================
                    MASALAH UMUM
                ============================================ */}

                <div className="px-6 py-7 sm:px-9 sm:py-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#A27A44]" />

                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#001311]">
                      Common Issues We Address
                    </h3>
                  </div>

                  {selectedPractice.issues.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedPractice.issues.map((issue, index) => (
                        <div
                          key={`${selectedPractice.id}-issue-${index}`}
                          className="flex items-start gap-3 text-xs leading-5 text-[#59635f]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#A27A44]" />

                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#59635f]">
                      There is no information regarding common issues yet.
                    </p>
                  )}
                </div>

                {/* ============================================
                    FOOTER MODAL
                ============================================ */}

                <div className="flex flex-col gap-4 border-t border-[#001311]/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#001311]/40">
                    Professional Legal Consultation
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedPractice(null)}
                    className="group flex items-center justify-center gap-2 bg-[#001311] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#A27A44]"
                  >
                    Close
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
