import { useNavigate } from "react-router";
import { ArrowRight, Scale, ShieldCheck, Users } from "lucide-react";

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <section
        id="about"
        className="scroll-mt-16 bg-[#F5F8F6] px-6 py-14 md:px-10 md:py-16 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="justify-center items-center text-center">
            <p className="mb-2 text-xl font-bold uppercase tracking-[0.2em] text-[#071512] ">
              about us
            </p>
            <div className=" flex justify-center items-center gap-3 mb-8">
              <div className="h-px w-16 bg-[#B8925A]" />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#968873]" />
              <div className="h-px w-16 bg-[#B8925A]/50" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between rounded-sm bg-[#001311] p-7 text-white md:p-9">
              <div>
                <div className="flex gap-2 items-center">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                    <Scale size={25} />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold">
                    Legal Advocate <br />
                    <span className="text-[#B8925A]">
                      Professional and Trusted
                    </span>
                  </h3>
                </div>

                <p className="max-w-xl text-sm leading-7 text-white/75 md:text-base">
                  Law Office is a boutique law firm built on a simple principle:
                  legal advice should provide clarity and direction, not simply
                  identify risks.
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                  We advise businesspeople, entrepreneurs, executives, and
                  individual clients on a wide range of complex legal issues,
                  including business, corporate, and disputes. Our services
                  combine legal expertise with practical, commercially-oriented
                  understanding, focused on achieving meaningful client
                  outcomes.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    navigate("/about");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-[#A27A44] px-5 py-3 text-sm font-semibold text-white transition duration-300"
                >
                  Read More
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="grid gap-4">
              <div className="group flex items-start gap-5 rounded-sm border-2 border-[#A27A44] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#123D34] text-[#F3F8F1] transition duration-300 ">
                  <Scale size={23} />
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg font-semibold text-[#102A25]">
                    Professional
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                   Legal services are provided based on expertise, experience and professional analysis.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-5 rounded-sm border-2 border-[#A27A44] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#123D34] text-[#F3F8F1] transition duration-300 ">
                  <ShieldCheck size={23} />
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg font-semibold text-[#102A25]">
                    Trusted
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    Maintaining client trust, confidentiality and interests in every legal process.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-5 rounded-sm border-2 border-[#A27A44] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#123D34] text-[#F3F8F1] transition duration-300">
                  <Users size={23} />
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg font-semibold text-[#102A25]">
                    Client Oriented
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    Understand client needs and provide legal solutions that suit the conditions of each case.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
