import { ArrowRight, Scale, ShieldCheck, Users } from "lucide-react";
import { scrollToSection } from "../utils/scrollTo";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 bg-[#F5F8F6] px-6 py-14 md:px-10 md:py-16 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#1F5C4D]">
              Tentang Kami
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#102A25] md:text-4xl">
              Pendamping Hukum yang{" "}
              <span className="text-[#1F5C4D]">Profesional dan Terpercaya</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-gray-600 lg:pb-1">
            Memberikan layanan dan pendampingan hukum yang profesional,
            strategis, dan berorientasi pada kebutuhan setiap klien.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#123D34] p-7 text-white md:p-9">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                <Scale size={25} />
              </div>

              <h3 className="mb-4 text-2xl font-semibold">
                Solusi Hukum untuk Setiap Kebutuhan
              </h3>

              <p className="max-w-xl text-sm leading-7 text-white/75 md:text-base">
                Kami memahami bahwa setiap persoalan hukum memiliki
                karakteristik dan kebutuhan yang berbeda. Oleh karena itu,
                setiap perkara ditangani melalui pendekatan yang cermat,
                strategis, dan berdasarkan analisis hukum yang menyeluruh.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                Dengan mengedepankan integritas, profesionalitas, dan
                kerahasiaan, kami berkomitmen memberikan pendampingan hukum
                yang dapat diandalkan bagi setiap klien.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#123D34] transition duration-300 hover:bg-[#E8F0EC]"
              >
                Konsultasi Sekarang
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="grid gap-4">
            {/* Card 1 */}
            <div className="group flex items-start gap-5 rounded-2xl border border-[#DCE7E2] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E7F0EC] text-[#1F5C4D] transition duration-300 group-hover:bg-[#123D34] group-hover:text-white">
                <Scale size={23} />
              </div>

              <div>
                <h3 className="mb-1.5 text-lg font-semibold text-[#102A25]">
                  Profesional
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  Layanan hukum diberikan berdasarkan keahlian, pengalaman,
                  serta analisis yang profesional.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex items-start gap-5 rounded-2xl border border-[#DCE7E2] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E7F0EC] text-[#1F5C4D] transition duration-300 group-hover:bg-[#123D34] group-hover:text-white">
                <ShieldCheck size={23} />
              </div>

              <div>
                <h3 className="mb-1.5 text-lg font-semibold text-[#102A25]">
                  Terpercaya
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  Menjaga kepercayaan, kerahasiaan, serta kepentingan klien
                  dalam setiap proses hukum.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex items-start gap-5 rounded-2xl border border-[#DCE7E2] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E7F0EC] text-[#1F5C4D] transition duration-300 group-hover:bg-[#123D34] group-hover:text-white">
                <Users size={23} />
              </div>

              <div>
                <h3 className="mb-1.5 text-lg font-semibold text-[#102A25]">
                  Berorientasi pada Klien
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  Memahami kebutuhan klien dan memberikan solusi hukum yang
                  sesuai dengan kondisi setiap perkara.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Highlights */}
        <div className="mt-6 grid overflow-hidden rounded-2xl border border-[#DCE7E2] bg-white md:grid-cols-3">
          <div className="p-5 md:p-6">
            <p className="mb-1 text-xl font-bold text-[#123D34]">
              Profesional
            </p>
            <p className="text-sm text-gray-600">
              Penanganan perkara secara cermat dan terarah
            </p>
          </div>

          <div className="border-[#DCE7E2] p-5 md:border-x md:p-6">
            <p className="mb-1 text-xl font-bold text-[#123D34]">
              Integritas
            </p>
            <p className="text-sm text-gray-600">
              Mengutamakan etika dan kepercayaan klien
            </p>
          </div>

          <div className="p-5 md:p-6">
            <p className="mb-1 text-xl font-bold text-[#123D34]">
              Solusi Hukum
            </p>
            <p className="text-sm text-gray-600">
              Pendekatan strategis sesuai kebutuhan perkara
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}