import {
  ArrowRight,
  //   ArrowUpRight,
  Scale,
  Target,
  //   Lightbulb,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  UserGroup,
  Handshake,
  MessagesSquare,
  Crosshair,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Law3 from "../assets/law3.jpg";
import Footer from "../Components/Footer";
import User from "../assets/user.jpeg";

export default function About() {
  const philosophyItems = [
    {
      title: "Understand",
      icon: Scale,
      description:
        "Kami memulai dengan memahami. Setiap fakta, kepentingan, risiko, dan konteks perkara dipelajari secara menyeluruh sebelum menentukan langkah hukum.",
      dark: true,
    },
    {
      title: "Strategy",
      icon: Target,
      description:
        "Kami menyusun strategi berdasarkan analisis hukum dan tujuan klien. Setiap tindakan dipertimbangkan secara objektif, terukur, dan berorientasi pada hasil.",
      dark: false,
    },
    {
      title: "Resolve",
      icon: ShieldCheck,
      description:
        "Tujuan akhirnya adalah penyelesaian. Kami berkomitmen untuk memberikan pendampingan hingga tercapainya solusi hukum yang paling tepat bagi klien.",
      dark: false,
    },
  ];

  const differentItems = [
    {
      title: "Dipimpin Oleh Mitra",
      icon: UserGroup,
      description:
        "Klien bekerja secara langsung dengan pihak yang bertanggung jawab atas... di balik setiap...",
    },
    {
      title: "Kesadaran Komersial",
      icon: Handshake,
      description:
        "Kami mempertimbangkan implikasi bisnis di balik setiap masalah hukum",
    },
    {
      title: "Responsif",
      icon: MessagesSquare,
      description:
        "Komunikasi langsung dan perhatian penuh selama masa penugasan",
    },
    {
      title: "Berorientasi pada Solusi",
      icon: Crosshair,
      description:
        "Peran kami bukan sekadar mengidentifikasi masalah, melainkan membantu klien untuk melangkah maju",
    },
  ];

  return (
    <section id="about" className="scroll-mt-16  ">
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
              Kami adalah kantor advokat yang mengutamakan ketajaman analisis,
              strategi hukum yang terukur, dan penyelesaian yang berorientasi
              pada kepentingan klien.
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

      <div className="border-y border-[#dedfd9] bg-[#F3F8F1]">
        <div className="max-w-4xl mx-auto items-center text-center mt-5">
          <p className="text-2xl font-bold uppercase tracking-[0.25em] text-[#001311]">
            Who We Are
          </p>
          <div className=" flex justify-center items-center">
            <div className="h-px w-16 bg-[#B8925A]" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#968873]" />
            <div className="h-px w-16 bg-[#B8925A]/50" />
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-10">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[#001311] sm:text-4xl lg:text-5xl">
                Hukum bukan hanya tentang aturan.
              </h2>
              <div className="mt-8 h-px w-16 bg-[#A27A44]" />
              <p className="mt-6 max-w-sm text-base leading-7 text-[#687470]">
                Hukum adalah tentang memahami persoalan, melihat risiko, dan
                menentukan langkah yang tepat untuk melindungi kepentingan
                setiap klien.
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
              Dalam setiap persoalan hukum, terdapat kepentingan, risiko, dan
              masa depan yang harus dipertimbangkan secara menyeluruh. Karena
              itu, kami memandang pekerjaan advokat bukan sekadar memberikan
              pendapat hukum, tetapi memahami persoalan secara mendalam dan
              membangun langkah yang tepat untuk mencapainya.
            </p>
            <p className="mt-6 leading-8 text-[#687470]">
              Kami memberikan pendampingan hukum dengan pendekatan yang
              profesional, objektif, dan strategis. Setiap perkara ditangani
              berdasarkan analisis yang cermat, komunikasi yang transparan,
              serta strategi yang disesuaikan dengan kebutuhan dan tujuan
              masing-masing klien.
            </p>
          </div>
        </div>

        {/* ========================================================== */}
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
                  {/* ICON */}
                  <div className="flex h-14 w-14 items-center justify-center">
                    <Icon
                      size={36}
                      strokeWidth={1.5}
                      className="text-[#8a7548]"
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#001311]">
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[#687470] lg:text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================*/}
      <div className=" text-[#001311]">
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
                Pendekatan yang lebih tajam.
                <br />
                <span className="text-[#c5ad76]">
                  Pendampingan yang lebih personal.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#001311] lg:text-base">
                Setiap persoalan hukum membutuhkan pendekatan yang berbeda. Kami
                menggabungkan ketelitian, strategi, dan pemahaman terhadap
                kebutuhan klien dalam setiap langkah pendampingan.
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              {differentItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`flex flex-col items-center py-8 ${index === 0 ? "border-t border-[#45615c]" : ""} ${
                      index === 1
                        ? "border-t border-[#45615c] sm:border-l sm:pl-10"
                        : ""
                    } ${index === 2 ? "border-t border-[#45615c]" : ""} ${index === 3 ? "border-t border-[#45615c] sm:border-l sm:pl-10" : ""}`}
                  >
                    <Icon
                      size={34}
                      strokeWidth={1.5}
                      className="text-[#c5ad76] "
                    />
                    <h3 className="mt-5 text-xl font-semibold text-[#001311] ">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-[#001311] text-center">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/*======================================================================  */}
      <div className="bg-[#001311]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-[#b59b62]" />
            <div className="relative aspect-4/5 overflow-hidden bg-[#e9ebe7]">
              <img
                src={User}
                alt="Founder"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a7548]">
              Founder & Managing Partner
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl text-[#F3F8F1]">
              [Nama Founder]
            </h2>

            <p className="mt-2 text-sm font-medium text-[#F3F8F1]">
              Managing Partner
            </p>

            <div className="my-8 h-px w-16 bg-[#b59b62]" />

            <p className="text-lg leading-8 text-[#F3F8F1]">
              “[Nama Founder] seorang ..................................., yang
              memberikan nasihat kepada klien mengenai masalah bisnis,
              korporasi, dan sengketa.”
            </p>

            <p className="mt-5 leading-8 text-[#F3F8F1]">
              Praktiknya berfokus pada penyediaan nasihat hukum yang praktis,
              strategis, dan berwawasan komersial, dengan perhatian khusus pada
              pemahaman keadaan dan tujuan di balik setiap masalah. Ia bekerja
              sama dengan klien untuk menavigasi masalah hukum yang kompleks dan
              mengembangkan solusi yang jelas, praktis, dan selaras dengan
              tujuan mereka.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => (window.location.href = "/profile")}
                className="flex gap-3 border px-4 py-2 text-s font-bold text-[#F3F8F1] transition-color items-center hover:bg-[#A27A44] hover:text-[#F3F8F1] hover:border-transparent"
              >
                Profile <ArrowRight className="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OUR OFFICES */}
      <section className="bg-[#f7f7f4] border-y border-[#dedfd9]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[#001311] sm:text-3xl">
              Our Offices
            </h2>

            <span className="h-px w-12 bg-[#b8925a]" />
          </div>

          <div className="grid lg:grid-cols-2">
            {/* ================= OFFICE ================= */}
            <div className="flex items-center justify-center border-b border-[#d9dedb] px-6 py-8 text-center lg:border-b-0 lg:border-r lg:px-10 lg:py-6">
              <div className="max-w-sm">
                {/* LABEL */}
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="h-px w-7 bg-[#c9a96e]" />

                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a7548]">
                    Batam Office
                  </p>

                  <span className="h-px w-7 bg-[#c9a96e]" />
                </div>

                {/* OFFICE NAME */}
                <h3 className="font-serif text-xl font-semibold tracking-tight text-[#001311]">
                  Business Center Adhya Building
                </h3>

                {/* ADDRESS */}
                <p className="mt-3 text-sm leading-6 text-[#344642]">
                  Tower 3rd Floor
                  <br />
                  Jl. Jend. Sudirman, Bukit Indah Sukajadi
                  <br />
                  Kota Batam 29462
                  <br />
                  Indonesia
                </p>

                {/* VIEW MAP */}
                <button
                  type="button"
                  className="group mx-auto mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7548] transition-colors duration-300 hover:text-[#001311]"
                >
                  View on Map
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

            {/* ================= CONTACT ================= */}
            <div className="flex items-center justify-center px-6 py-8 text-center lg:px-10 lg:py-6">
              <div className="w-full max-w-sm">
                {/* LABEL */}
                <div className="mb-5 flex items-center justify-center gap-3">
                  <span className="h-px w-7 bg-[#c9a96e]" />

                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a7548]">
                    Contact
                  </p>

                  <span className="h-px w-7 bg-[#c9a96e]" />
                </div>

                {/* CONTACT DETAILS */}
                <div className="space-y-4">
                  {/* PHONE */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8a8f8c]">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#263a36]">
                      +62 813 9157 8817
                    </p>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8a8f8c]">
                      Email
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#263a36]">
                      dsplawyer@gmail.com
                    </p>
                  </div>

                  {/* WEBSITE */}
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
          CTA
      ====================================================== */}

      <Footer />
    </section>
  );
}
