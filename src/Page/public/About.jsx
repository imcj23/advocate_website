import { useEffect, useState } from "react";
import {
  ArrowRight,
  Scale,
  Target,
  ShieldCheck,
  UserGroup,
  Handshake,
  MessagesSquare,
  Crosshair,
} from "lucide-react";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Law3 from "../../assets/law3.jpg";

const API_URL = "http://localhost:3500";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // =====================================================
  // FETCH DATA ADVOCATE DARI BACKEND
  // =====================================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);

        const response = await fetch(`${API_URL}/advocate`);
        const result = await response.json();

        console.log("PUBLIC ADVOCATE STATUS:", response.status);
        console.log("PUBLIC ADVOCATE RESPONSE:", result);

        if (!response.ok) {
          throw new Error(result?.message || "Gagal mengambil data advocate");
        }

        setProfile(result?.data || null);
      } catch (error) {
        console.error("FETCH PUBLIC ADVOCATE ERROR:", error);
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // =====================================================
  // URL FOTO DARI BACKEND
  // =====================================================
  const getImageUrl = (foto) => {
    if (!foto) return "";

    if (
      foto.startsWith("http://") ||
      foto.startsWith("https://") ||
      foto.startsWith("data:")
    ) {
      return foto;
    }

    return `${API_URL}${foto}`;
  };

  // =====================================================
  // PHILOSOPHY
  // =====================================================
  const philosophyItems = [
    {
      title: "Understand",
      icon: Scale,
      description:
        "We start with understanding. Every fact, interest, risk, and context of the case are thoroughly studied before determining legal action.",
    },
    {
      title: "Strategy",
      icon: Target,
      description:
        "We develop strategies based on legal analysis and client objectives. Every action is considered objectively, measurably, and results-oriented.",
    },
    {
      title: "Resolve",
      icon: ShieldCheck,
      description:
        "The ultimate goal is resolution. We are committed to providing support until the most appropriate legal solution is reached for our clients.",
    },
  ];

  // =====================================================
  // WHAT MAKES US DIFFERENT
  // =====================================================
  const differentItems = [
    {
      title: "Led By Partners",
      icon: UserGroup,
      description:
        "Clients work directly with the parties responsible for each strategy and legal step taken.",
    },
    {
      title: "Commercial Awareness",
      icon: Handshake,
      description:
        "We consider the business implications behind every legal issue.",
    },
    {
      title: "Responsive",
      icon: MessagesSquare,
      description:
        "Direct communication and full attention during the assignment period.",
    },
    {
      title: "Solution-Oriented",
      icon: Crosshair,
      description:
        "Our role is not just to identify problems, but to help clients move forward.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-16">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <div className="relative overflow-hidden bg-[#001311]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[65%]">
          <img
            src={Law3}
            alt="Our Firm"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#001311] via-[#001311]/25 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#F3F8F1]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F3F8F1]">
                About Our Firm
              </span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#F3F8F1] sm:text-5xl lg:text-7xl">
              Clear Counsel.
              <br />
              <span className="text-[#8a7548]">Strong Resolution.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#F3F8F1] lg:text-lg">
              We are a law firm that prioritizes analytical acumen, measurable
              legal strategies, and client-oriented solutions.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-[#8a7548]" />

              <span className="text-xs uppercase tracking-[0.2em] text-[#F3F8F1]/70">
                Integrity · Strategy · Resolution
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          WHO WE ARE
      ====================================================== */}
      <div className="border-y border-[#dedfd9] bg-[#F3F8F1]">
        <div className="mx-auto mt-5 max-w-4xl items-center text-center">
          <p className="text-2xl font-bold uppercase tracking-[0.25em] text-[#001311]">
            Who We Are
          </p>

          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-[#B8925A]" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#968873]" />
            <div className="h-px w-16 bg-[#B8925A]/50" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-10">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[#001311] sm:text-4xl lg:text-5xl">
                Law is not just about rules.
              </h2>

              <div className="mt-8 h-px w-16 bg-[#A27A44]" />

              <p className="mt-6 max-w-sm text-base leading-7 text-[#687470]">
                Law is about understanding the issues, seeing the risks, and
                determining the right steps to protect each client's interests.
              </p>
            </div>

            <div className="mt-10 hidden lg:block">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#344642]">
                Profesional · Terpercaya · Berintegritas
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-[#344642]">
              In every legal matter, there are interests, risks, and future
              prospects that must be considered holistically. Therefore, we view
              the work of an advocate as more than just providing a legal
              opinion, but also as a deep understanding of the issue and
              developing the appropriate steps to achieve it.
            </p>

            <p className="mt-6 leading-8 text-[#687470]">
              We provide legal assistance with a professional, objective, and
              strategic approach. Each case is handled based on careful
              analysis, transparent communication, and a strategy tailored to
              each client's individual needs and goals.
            </p>
          </div>
        </div>

        {/* =====================================================
            OUR PHILOSOPHY
        ====================================================== */}
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:px-8 lg:pt-6 lg:pb-20">
          <div className="mb-8 text-center">
            <p className="text-xl font-bold uppercase tracking-[0.25em] text-[#001311]">
              Our Philosophy
            </p>

            <div className="mx-auto mt-4 h-px w-12 bg-[#8a7548]" />
          </div>

          <div className="grid md:grid-cols-3">
            {philosophyItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex flex-col items-center px-8 py-6 text-center lg:px-12 lg:py-8 ${
                    index !== 0 ? "border-l border-[#d9dedb]" : ""
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center">
                    <Icon
                      size={36}
                      strokeWidth={1.5}
                      className="text-[#8a7548]"
                    />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#001311]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-[#687470] lg:text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          WHAT MAKES US DIFFERENT
      ====================================================== */}
      <div className="text-[#001311]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:pr-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-15 bg-[#c5ad76]" />

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#001311]">
                  What Makes Us Different
                </p>

                <span className="h-px w-15 bg-[#c5ad76]" />
              </div>

              <h2 className="mt-6 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                A sharper approach.
                <br />
                <span className="text-[#A27A44]">More personal support.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#001311] lg:text-base">
                Every legal issue requires a different approach. We combine
                precision, strategy, and an understanding of our clients' needs
                in every step of our support.
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              {differentItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`flex flex-col items-center py-8 ${
                      index === 0 ? "border-t border-[#45615c]" : ""
                    } ${
                      index === 1
                        ? "border-t border-[#45615c] sm:border-l sm:pl-10"
                        : ""
                    } ${index === 2 ? "border-t border-[#45615c]" : ""} ${
                      index === 3
                        ? "border-t border-[#45615c] sm:border-l sm:pl-10"
                        : ""
                    }`}
                  >
                    <Icon
                      size={34}
                      strokeWidth={1.5}
                      className="text-[#c5ad76]"
                    />

                    <h3 className="mt-5 text-xl font-semibold text-[#001311]">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-center text-sm leading-7 text-[#001311]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#001311]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
          {/* FOTO */}
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-[#b59b62]" />

            <div className="relative aspect-4/5 overflow-hidden bg-[#e9ebe7]">
              {loadingProfile ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#8a7548] border-t-transparent" />
                </div>
              ) : profile?.foto ? (
                <img
                  src={getImageUrl(profile.foto)}
                  alt={profile.nama || "Founder"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#687470]">
                  Foto belum tersedia
                </div>
              )}
            </div>
          </div>

          {/* PROFILE */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a7548]">
              {loadingProfile
                ? "Loading..."
                : profile?.posisi || "Founder & Managing Partner"}
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-[#F3F8F1] sm:text-4xl lg:text-5xl">
              {loadingProfile
                ? "Loading..."
                : profile?.nama || "Nama belum tersedia"}
            </h2>

            <div className="my-8 h-px w-16 bg-[#b59b62]" />

            {/* TAGLINE / KUTIPAN */}
            {loadingProfile ? (
              <div className="h-20 animate-pulse rounded bg-white/5" />
            ) : (
              <>
                {profile?.tagline && (
                  <p className="text-lg leading-8 text-[#F3F8F1]">
                    “{profile.tagline}”
                  </p>
                )}

                {/* BIO / DESKRIPSI */}
                {profile?.bio && (
                  <p
                    className={`leading-8 text-[#F3F8F1] ${
                      profile?.tagline ? "mt-5" : "text-lg"
                    }`}
                  >
                    {profile.bio}
                  </p>
                )}

                {!profile?.tagline && !profile?.bio && (
                  <p className="leading-8 text-[#F3F8F1]/70">
                    The advocate's profile does not yet have a description.
                  </p>
                )}
              </>
            )}

            {/* BUTTON */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => (window.location.href = "/profile")}
                className="flex items-center gap-3 border px-4 py-2 text-sm font-bold text-[#F3F8F1] transition-colors hover:border-transparent hover:bg-[#A27A44] hover:text-[#F3F8F1]"
              >
                Profile
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          OUR OFFICES
      ====================================================== */}
      <section className="border-y border-[#dedfd9] bg-[#f7f7f4]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[#001311] sm:text-3xl">
              Our Offices
            </h2>

            <span className="h-px w-12 bg-[#b8925a]" />
          </div>

          <div className="grid lg:grid-cols-3">
            {/* JAKARTA OFFICE */}
            <div className="flex items-center justify-center border-b border-[#d9dedb] px-6 py-8 text-center lg:border-b-0 lg:border-r lg:px-10 lg:py-6">
              <div className="max-w-sm">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="h-px w-7 bg-[#c9a96e]" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a7548]">
                    Jakarta Office
                  </p>
                  <span className="h-px w-7 bg-[#c9a96e]" />
                </div>

                <h3 className="font-serif text-xl font-semibold tracking-tight text-[#001311]">
                  Gedung Ratu Prabu 1
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#344642]">
                  Jl. Letjen TB Simatupang Kav. 20
                  <br />
                  Lantai 1, Cilandak
                  <br />
                  Jakarta Selatan 12560
                  <br />
                  Indonesia
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gedung+Ratu+Prabu+1+Jl+Letjen+TB+Simatupang+Kav+20+Cilandak+Jakarta+Selatan+12560"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mx-auto mt-5 flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7548] transition-colors duration-300 hover:text-[#001311]"
                >
                  View on Map
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>

            {/* BATAM OFFICE */}
            <div className="flex items-center justify-center border-b border-[#d9dedb] px-6 py-8 text-center lg:border-b-0 lg:border-r lg:px-10 lg:py-6">
              <div className="max-w-sm">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="h-px w-7 bg-[#c9a96e]" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a7548]">
                    Batam Office
                  </p>
                  <span className="h-px w-7 bg-[#c9a96e]" />
                </div>

                <h3 className="font-serif text-xl font-semibold tracking-tight text-[#001311]">
                  Business Center Adhya Building
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#344642]">
                  Tower 3rd Floor
                  <br />
                  Jl. Jendral Sudirman, Bukit Indah Sukajadi
                  <br />
                  Kota Batam 29462
                  <br />
                  Indonesia
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Business+Center+Adhya+Building+Jl+Jendral+Sudirman+Bukit+Indah+Sukajadi+Batam+29462"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mx-auto mt-5 flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7548] transition-colors duration-300 hover:text-[#001311]"
                >
                  View on Map
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>

            {/* CONTACT */}
            <div className="flex items-center justify-center px-6 py-8 text-center lg:px-10 lg:py-6">
              <div className="w-full max-w-sm">
                <div className="mb-5 flex items-center justify-center gap-3">
                  <span className="h-px w-7 bg-[#c9a96e]" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a7548]">
                    Contact
                  </p>
                  <span className="h-px w-7 bg-[#c9a96e]" />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8a8f8c]">
                      Phone
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#263a36]">
                      +62 81391578817
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8a8f8c]">
                      Email
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#263a36]">
                       info@dsplawyer.com
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8a8f8c]">
                      Website
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#263a36]">
                      www.dsplawyer.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <Footer />
    </section>
  );
}
