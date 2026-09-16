import { useEffect, useState } from "react";
import {
  ArrowRight,
  Scale,
  // Target,
  ShieldCheck,
  UserGroup,
  Handshake,
  MessagesSquare,
  Crosshair,
  ChessKnight,
} from "lucide-react";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Law3 from "../../assets/law3.jpg";
import Logo from "../../assets/logo.png";

const API_URL = "http://localhost:3500";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
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
  const philosophyItems = [
    {
      title: "Understand",
      icon: Scale,
      description:
        "We start with understanding. Every fact, interest, risk, and context of the case are thoroughly studied before determining legal action.",
    },
    {
      title: "Strategy",
      icon: ChessKnight,
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
              <span className="h-px w-10 bg-[#A27A44]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F3F8F1]">
                About DSP
              </span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#F3F8F1] sm:text-5xl lg:text-7xl">
              A Boutique Legal Practice
              <br />
              <span className="text-[#A27A44]"> Built Around Solutions.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#F3F8F1] lg:text-lg">
              DSP Law Office is a boutique legal practice providing strategic and practical legal counsel across business, corporate and dispute matters in Indonesia.
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
            About DSP
          </p>

          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-[#B8925A]" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#968873]" />
            <div className="h-px w-16 bg-[#B8925A]/50" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-10">
          <div className="flex flex-col justify-between items-center">
            <img src={Logo} alt="" />

            <div className="mt-10 hidden lg:block">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#344642]">
                Integrity · Strategy · Resolution
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-[#344642]">
              DSP Law Office is a boutique legal practice built around a simple
              principle: legal advice should create clarity and direction, not
              merely identify risks. <br />
              <br /> We advise businesses, entrepreneurs, executives and private
              clients on complex legal matters across business, corporate and
              dispute-related matters. <br />
              <br /> Our work combines legal expertise with a practical
              understanding of our clients' commercial objectives, allowing us
              to develop solutions that are legally sound, commercially aware
              and focused on achieving meaningful outcomes.
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
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-15 bg-[#c5ad76]" />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#001311]">
                What Makes Us Different
              </p>

              <span className="h-px w-15 bg-[#c5ad76]" />
            </div>

            <div className="mt-12 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {differentItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center rounded-2xl border border-[#45615c]/30 px-6 py-8"
                  >
                    <Icon
                      size={34}
                      strokeWidth={1.5}
                      className="text-[#c5ad76]"
                    />

                    <h3 className="mt-5 text-xl font-semibold text-[#001311]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-center text-sm leading-7 text-[#001311]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0b2f2a]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative aspect-4/5 overflow-hidden bg-[#0c0c0c] lg:aspect-auto">
            {loadingProfile ? (
              <div className="flex h-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#8a7548] border-t-transparent" />
              </div>
            ) : profile?.foto ? (
              <img
                src={getImageUrl(profile.foto)}
                alt={profile.nama || "Founder"}
                className="h-full w-full object-cover "
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#F3F8F1]">
                Foto belum tersedia
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center px-8 py-16 sm:px-14 lg:px-16 lg:py-0">
            <p className="text-medium font-bold uppercase tracking-[0.2em] text-[#A27A44]">
              {loadingProfile
                ? "Loading..."
                : profile?.posisi || "Founder & Managing Partner"}
            </p>

            <div className="mt-4 h-px w-10 bg-[#A27A44]" />

            <h2 className="mt-5 font-serif text-3xl leading-tight text-[#F3F8F1] sm:text-4xl">
              {loadingProfile
                ? "Loading..."
                : profile?.nama || "Nama belum tersedia"}
            </h2>

            {loadingProfile ? (
              <div className="mt-8 h-32 animate-pulse rounded bg-black/5" />
            ) : (
              <div className="mt-7 space-y-5 text-[15px] leading-7 text-[#F3F8F1]">
                {profile?.tagline && (
                  <p className="font-semibold text-[#F3F8F1]">
                    {profile.tagline}
                  </p>
                )}
                {profile?.bio
                  ? profile.bio
                      .split("\n")
                      .filter(Boolean)
                      .map((para, i) => <p key={i}>{para}</p>)
                  : !profile?.tagline && (
                      <p className="text-[#001311]/50">
                        The advocate's profile does not yet have a description.
                      </p>
                    )}
              </div>
            )}

            <button
              onClick={() => (window.location.href = "/profile")}
              className="group mt-9 flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#A27A44] mb-5"
            >
              View Profile
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>

      {/* office */}
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
                  href="https://maps.app.goo.gl/Y5UZzxhX6oRaWB3X8?g_st=iw"
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
                  href="https://maps.app.goo.gl/674cj2jmF6x79q8c8?g_st=iw"
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
