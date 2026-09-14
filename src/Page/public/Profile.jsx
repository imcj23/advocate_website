import { useEffect, useMemo, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Scale,
  Languages,
  SquareText,
  Gavel,
  UserGroup,
  Loader2,
  AlertCircle,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";

const API_URL = "http://localhost:3500";

// =====================================================
// ICON PRACTICE
// =====================================================

const practiceIcons = [
  BriefcaseBusiness,
  SquareText,
  Scale,
  UserGroup,
  Gavel,
  Building2,
];

// =====================================================
// HELPER
// =====================================================

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === null || value === undefined) {
    return [];
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed;
      }

      if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.items)) {
          return parsed.items;
        }

        if (Array.isArray(parsed.data)) {
          return parsed.data;
        }

        return [parsed];
      }
    } catch {
      return [trimmed];
    }

    return [trimmed];
  }

  if (typeof value === "object") {
    if (Array.isArray(value.items)) {
      return value.items;
    }

    if (Array.isArray(value.data)) {
      return value.data;
    }

    return [value];
  }

  return [];
};

// =====================================================
// HELPER OBJECT FIELD
// =====================================================

const getField = (item, fields = []) => {
  if (!item || typeof item !== "object") {
    return "";
  }

  for (const field of fields) {
    if (
      item[field] !== undefined &&
      item[field] !== null &&
      String(item[field]).trim() !== ""
    ) {
      return String(item[field]).trim();
    }
  }

  return "";
};

// =====================================================
// IMAGE
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
// COMPONENT
// =====================================================

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ===================================================
  // GET PROFILE
  // ===================================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/advocate`);

      const result = await response.json();

      console.log("=================================");
      console.log("PUBLIC PROFILE RESPONSE");
      console.log(result);
      console.log("=================================");

      if (response.status === 404) {
        setErrorMessage("Profil advocate belum tersedia.");
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal mengambil data profil advocate.",
        );
      }

      const advocate = result?.data;

      if (!advocate) {
        throw new Error("Data advocate tidak ditemukan dari backend.");
      }

      console.log("PRACTICE FOCUS:", advocate.practice_focus);
      console.log("EDUCATION:", advocate.education);
      console.log("EXPERIENCE:", advocate.experience);
      console.log("ADMISSION:", advocate.admission);
      console.log("MEMBERSHIP:", advocate.membership);
      console.log("LANGUAGES:", advocate.languages);
      console.log("SELECTED EXPERIENCE:", advocate.selected_experience);

      setProfile({
        id: advocate.id || "",

        nama: advocate.nama || "",
        posisi: advocate.posisi || "",

        email_1: advocate.email_1 || "",
        email_office: advocate.email_office || "",
        no_hp: advocate.no_hp || "",

        foto: advocate.foto || "",

        tagline: advocate.tagline || "",
        bio: advocate.bio || "",

        practice_focus: normalizeArray(advocate.practice_focus),

        education: normalizeArray(advocate.education),

        experience: normalizeArray(advocate.experience),

        admission: normalizeArray(advocate.admission),

        membership: normalizeArray(advocate.membership),

        languages: normalizeArray(advocate.languages),

        selected_experience: normalizeArray(advocate.selected_experience),

        status: advocate.status || "active",
      });
    } catch (error) {
      console.error("GET PUBLIC PROFILE ERROR:", error);

      setErrorMessage(error.message || "Gagal mengambil data profil advocate.");
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // PRACTICE FOCUS
  // ===================================================

  const practiceFocus = useMemo(() => {
    if (!profile) return [];

    return profile.practice_focus
      .map((item, index) => {
        const Icon = practiceIcons[index % practiceIcons.length];

        if (typeof item === "string") {
          return {
            icon: Icon,
            title: item,
            description: "",
          };
        }

        if (item && typeof item === "object") {
          const title =
            getField(item, [
              "title",
              "name",
              "nama",
              "judul",
              "practice",
              "area",
              "bidang",
            ]) || "Practice Area";

          const description =
            getField(item, [
              "description",
              "deskripsi",
              "desc",
              "detail",
              "content",
              "keterangan",
            ]) || "";

          return {
            icon: Icon,
            title,
            description,
          };
        }

        return null;
      })
      .filter(Boolean)
      .filter((item) => item.title || item.description);
  }, [profile]);

  // ===================================================
  // EDUCATION
  // ===================================================

  const educationData = useMemo(() => {
    if (!profile) return [];

    return profile.education
      .map((item) => {
        if (typeof item === "string") {
          return {
            degree: item,
            institution: "",
            year: "",
          };
        }

        return {
          degree:
            getField(item, [
              "degree",
              "title",
              "name",
              "nama",
              "program",
              "pendidikan",
            ]) || "Pendidikan",

          institution: getField(item, [
            "institution",
            "universitas",
            "university",
            "school",
            "kampus",
            "institusi",
          ]),

          year: getField(item, ["year", "tahun", "period"]),
        };
      })
      .filter((item) => item.degree || item.institution || item.year);
  }, [profile]);

  // ===================================================
  // PROFESSIONAL EXPERIENCE
  // ===================================================

  const experienceData = useMemo(() => {
    if (!profile) return [];

    return profile.experience
      .map((item) => {
        if (typeof item === "string") {
          return {
            position: item,
            company: "",
            period: "",
            description: "",
          };
        }

        return {
          position:
            getField(item, [
              "position",
              "title",
              "name",
              "nama",
              "jabatan",
              "role",
            ]) || "Professional Experience",

          company: getField(item, [
            "company",
            "perusahaan",
            "firm",
            "organization",
            "organisasi",
            "institution",
          ]),

          period: getField(item, [
            "period",
            "periode",
            "year",
            "tahun",
            "date",
          ]),

          description: getField(item, [
            "description",
            "deskripsi",
            "detail",
            "content",
            "keterangan",
          ]),
        };
      })
      .filter(
        (item) =>
          item.position || item.company || item.period || item.description,
      );
  }, [profile]);

  // ===================================================
  // ADMISSION
  // ===================================================

  const admissionData = useMemo(() => {
    if (!profile) return [];

    return profile.admission
      .map((item) => {
        if (typeof item === "string") {
          return {
            title: item,
            description: "",
          };
        }

        return {
          title:
            getField(item, [
              "title",
              "name",
              "nama",
              "admission",
              "organization",
              "organisasi",
            ]) || "Admission",

          description: getField(item, [
            "description",
            "deskripsi",
            "detail",
            "period",
            "periode",
            "tahun",
            "year",
          ]),
        };
      })
      .filter((item) => item.title || item.description);
  }, [profile]);

  // ===================================================
  // MEMBERSHIP
  // ===================================================

  const membershipData = useMemo(() => {
    if (!profile) return [];

    return profile.membership
      .map((item) => {
        if (typeof item === "string") {
          return {
            title: item,
            description: "",
          };
        }

        return {
          title:
            getField(item, [
              "title",
              "name",
              "nama",
              "membership",
              "organization",
              "organisasi",
            ]) || "Membership",

          description: getField(item, [
            "description",
            "deskripsi",
            "detail",
            "period",
            "periode",
            "tahun",
            "year",
          ]),
        };
      })
      .filter((item) => item.title || item.description);
  }, [profile]);

  // ===================================================
  // LANGUAGES
  // ===================================================

  const languagesData = useMemo(() => {
    if (!profile) return [];

    return profile.languages
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        return getField(item, ["name", "nama", "language", "bahasa", "title"]);
      })
      .filter(Boolean);
  }, [profile]);

  // ===================================================
  // SELECTED EXPERIENCE
  // ===================================================

  const selectedExperienceData = useMemo(() => {
    if (!profile) return [];

    return profile.selected_experience
      .map((item) => {
        if (typeof item === "string") {
          return {
            title: item,
            description: "",
          };
        }

        return {
          title:
            getField(item, ["title", "name", "nama", "judul"]) ||
            "Selected Experience",

          description: getField(item, [
            "description",
            "deskripsi",
            "detail",
            "content",
            "keterangan",
          ]),
        };
      })
      .filter((item) => item.title || item.description);
  }, [profile]);

  // ===================================================
  // CHECK EXPERIENCE & CREDENTIALS
  // ===================================================

  const hasCredentials =
    educationData.length > 0 ||
    experienceData.length > 0 ||
    admissionData.length > 0 ||
    membershipData.length > 0 ||
    languagesData.length > 0;

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f6f3]">
          <div className="flex flex-col items-center text-center">
            <Loader2 size={30} className="animate-spin text-[#0b2f2a]" />

            <p className="mt-4 text-sm text-[#68716d]">
              Memuat profil advocate...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (!profile || errorMessage) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f6f3] px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#d9dedb] bg-white text-[#9b7b42]">
              <AlertCircle size={22} strokeWidth={1.5} />
            </div>

            <h1 className="mt-5 text-2xl font-medium text-[#0b2f2a]">
              Profil Tidak Tersedia
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#68716d]">
              {errorMessage || "Data profil advocate belum tersedia."}
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <>
      <Navbar />

      <main className="bg-[#f5f6f3] text-[#0b2f2a]">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="bg-[#001311] text-[#f5f6f3]">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[250px_1fr] lg:items-center">
              {/* PHOTO */}

              <div className="relative w-full max-w-62.5">
                <div className="absolute -bottom-2 -left-2 h-full w-full border border-[#c9a96e]/50" />

                <div className="relative aspect-4/4.5 overflow-hidden bg-[#dfe3df]">
                  {profile.foto ? (
                    <img
                      src={getImageUrl(profile.foto)}
                      alt={profile.nama || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#0b2f2a]/30">
                      <UserGroup size={70} strokeWidth={1} />
                    </div>
                  )}
                </div>
              </div>

              {/* INFORMATION */}

              <div className="lg:pl-5">
                {profile.posisi && (
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#c9a96e]" />

                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e]">
                      {profile.posisi}
                    </p>
                  </div>
                )}

                <h1 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                  {profile.nama || "Nama Lengkap"}
                </h1>

                {profile.tagline && (
                  <p className="mt-3 text-lg font-light text-[#c9a96e]">
                    {profile.tagline}
                  </p>
                )}

                <div className="my-5 h-px bg-white/15" />

                {profile.bio && (
                  <p className="max-w-3xl text-base leading-7 text-white/65 sm:text-lg">
                    {profile.bio}
                  </p>
                )}

                {(profile.email_1 || profile.email_office || profile.no_hp) && (
                  <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-xs uppercase tracking-widest text-white/45">
                    {profile.email_1 && <span>{profile.email_1}</span>}

                    {profile.email_office &&
                      profile.email_office !== profile.email_1 && (
                        <span>{profile.email_office}</span>
                      )}

                    {profile.no_hp && <span>{profile.no_hp}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            PRACTICE FOCUS
        ================================================= */}

        {practiceFocus.length > 0 && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
              {/* Header */}
              <div className="mb-7 max-w-2xl">
                <div className="mb-2 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#9b7b42]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b7b42]">
                    Areas of Practice
                  </span>
                </div>

                <h2 className="text-3xl font-medium tracking-tight text-[#0b2f2a] md:text-4xl">
                  Practice <span className="font-light">Focus</span>
                </h2>

                <p className="mt-3 max-w-xl text-xs leading-6 text-[#68716d]">
                  Bidang praktik hukum yang menjadi fokus profesional advocate
                  berdasarkan pengalaman dan kompetensi.
                </p>
              </div>

              {/* Grid Card Dark */}
              <div className="grid gap-px overflow-hidden border border-[#0b2f2a]/10 bg-[#0b2f2a]/10 md:grid-cols-2 lg:grid-cols-3">
                {practiceFocus.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={`${item.title}-${index}`}
                      className="group relative bg-[#0b2f2a] p-6 transition-all duration-500 hover:bg-[#0e3a34]"
                    >

                      <div className="relative flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center border border-[#c9a96e]/40 bg-transparent text-[#c9a96e] transition-all duration-500 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#0b2f2a]">
                          <Icon size={17} strokeWidth={1.5} />
                        </div>

                        <span className="text-[10px] font-medium tracking-[0.2em] text-[#c9a96e]/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="relative mt-5 text-base font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#c9a96e]">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="relative mt-2 text-xs leading-5 text-white/50 transition-colors duration-300 group-hover:text-white/70">
                          {item.description}
                        </p>
                      )}

                      {/* Garis aksen bawah */}
                      <div className="relative mt-5 h-px w-6 bg-[#c9a96e]/60 transition-all duration-500 group-hover:w-full group-hover:bg-[#c9a96e]" />
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

                {/* =================================================
            EXPERIENCE & CREDENTIALS
        ================================================= */}

        {hasCredentials && (
          <section className="bg-white">
            <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
              {/* HEADER */}
              <div className="mb-12 border-b border-[#001311]/10 pb-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#001311]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#001311]">
                    Professional Background
                  </span>
                </div>

                <h2 className="text-3xl font-medium tracking-tight text-[#001311] sm:text-4xl">
                  Experience{" "}
                  <span className="font-light italic text-[#A27A44]">
                    &amp; Credentials
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-xs leading-6 text-[#001311]/60">
                  Pendidikan, pengalaman profesional, admission, keanggotaan,
                  dan kemampuan bahasa yang mendukung praktik profesional
                  advocate.
                </p>
              </div>

              {/* BODY */}
              <div className="space-y-10">
                {/* EDUCATION */}
                {educationData.length > 0 && (
                  <div className="border border-[#001311]/15 bg-[#001311]">
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center border border-[#c9a96e]/50 text-[#c9a96e]">
                          <GraduationCap size={16} strokeWidth={1.5} />
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]">
                            Education
                          </p>
                          <h3 className="text-sm font-medium tracking-tight text-white">
                            Educational Background
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/70">
                        {String(educationData.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="divide-y divide-white/10 border-t border-white/10">
                      {educationData.map((item, index) => (
                        <div
                          key={`education-${index}`}
                          className="group grid gap-3 px-6 py-4 transition-colors duration-300 hover:bg-white/3 md:grid-cols-[40px_1fr_auto] md:items-center"
                        >
                          <span className="text-[10px] tracking-[0.15em] text-[#c9a96e]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div>
                            <h4 className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-[#c9a96e]">
                              {item.degree}
                            </h4>
                            {item.institution && (
                              <p className="mt-1 text-xs text-white/45">
                                {item.institution}
                              </p>
                            )}
                          </div>

                          {item.year && (
                            <span className="text-[10px] uppercase tracking-[0.15em] text-[#c9a96e]">
                              {item.year}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROFESSIONAL EXPERIENCE */}
                {experienceData.length > 0 && (
                  <div className="border border-[#001311]/15 bg-[#001311]">
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center border border-[#c9a96e]/50 text-[#c9a96e]">
                          <BriefcaseBusiness size={16} strokeWidth={1.5} />
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]">
                            Career
                          </p>
                          <h3 className="text-sm font-medium tracking-tight text-white">
                            Professional Experience
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/70">
                        {String(experienceData.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="divide-y divide-white/10 border-t border-white/10">
                      {experienceData.map((item, index) => (
                        <div
                          key={`experience-${index}`}
                          className="group grid gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/3rid-cols-[40px_240px_1fr] lg:items-start"
                        >
                          <div className="text-[10px] tracking-[0.15em] text-[#c9a96e]">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#c9a96e]">
                              {item.position}
                            </h4>
                            {item.company && (
                              <p className="mt-1 text-xs text-white/45">
                                {item.company}
                              </p>
                            )}
                            {item.period && (
                              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#c9a96e]">
                                {item.period}
                              </p>
                            )}
                          </div>

                          {item.description && (
                            <p className="max-w-2xl text-xs leading-6 text-white/50">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ADMISSION */}
                {admissionData.length > 0 && (
                  <div className="border border-[#001311]/15 bg-[#001311]">
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center border border-[#c9a96e]/50 text-[#c9a96e]">
                          <Scale size={16} strokeWidth={1.5} />
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]">
                            Admission
                          </p>
                          <h3 className="text-sm font-medium tracking-tight text-white">
                            Professional Admission
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/70">
                        {String(admissionData.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="divide-y divide-white/10 border-t border-white/10">
                      {admissionData.map((item, index) => (
                        <div
                          key={`admission-${index}`}
                          className="group grid gap-3 px-6 py-4 transition-colors duration-300 hover:bg-white/3 md:grid-cols-[40px_1fr]"
                        >
                          <span className="text-[10px] tracking-[0.15em] text-[#c9a96e]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              size={15}
                              strokeWidth={1.5}
                              className="mt-0.5 shrink-0 text-[#c9a96e]"
                            />

                            <div>
                              <h4 className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-[#c9a96e]">
                                {item.title}
                              </h4>
                              {item.description && (
                                <p className="mt-1 text-xs leading-5 text-white/45">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MEMBERSHIP */}
                {membershipData.length > 0 && (
                  <div className="border border-[#001311]/15 bg-[#001311]">
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center border border-[#c9a96e]/50 text-[#c9a96e]">
                          <Users size={16} strokeWidth={1.5} />
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]">
                            Membership
                          </p>
                          <h3 className="text-sm font-medium tracking-tight text-white">
                            Professional Membership
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/70">
                        {String(membershipData.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="divide-y divide-white/10 border-t border-white/10">
                      {membershipData.map((item, index) => (
                        <div
                          key={`membership-${index}`}
                          className="group grid gap-3 px-6 py-4 transition-colors duration-300 hover:bg-white/3 md:grid-cols-[40px_1fr]"
                        >
                          <span className="text-[10px] tracking-[0.15em] text-[#c9a96e]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              size={15}
                              strokeWidth={1.5}
                              className="mt-0.5 shrink-0 text-[#c9a96e]"
                            />

                            <div>
                              <h4 className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-[#c9a96e]">
                                {item.title}
                              </h4>
                              {item.description && (
                                <p className="mt-1 text-xs leading-5 text-white/45">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LANGUAGES */}
                {languagesData.length > 0 && (
                  <div className="border border-[#001311]/15 bg-[#001311]">
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center border border-[#c9a96e]/50 text-[#c9a96e]">
                          <Languages size={16} strokeWidth={1.5} />
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]">
                            Languages
                          </p>
                          <h3 className="text-sm font-medium tracking-tight text-white">
                            Professional Communication
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/70">
                        {String(languagesData.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-white/10 px-6 py-5">
                      {languagesData.map((language, index) => (
                        <span
                          key={`language-${index}`}
                          className="border border-white/15 px-4 py-2 text-xs text-white/70 transition-all duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e]"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            SELECTED EXPERIENCE
        ================================================= */}

        {selectedExperienceData.length > 0 && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="h-px w-7 bg-[#9b7b42]" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b7b42]">
                      Track Record
                    </span>
                  </div>

                  <h2 className="text-3xl font-medium tracking-tight text-[#0b2f2a] sm:text-4xl">
                    Selected <span className="font-light">Experience</span>
                  </h2>
                </div>

                <p className="max-w-sm text-xs leading-5 text-[#68716d] sm:text-right">
                  Pengalaman terpilih yang mencerminkan bidang pekerjaan dan
                  pendekatan profesional advocate.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {selectedExperienceData.map((item, index) => (
                  <article
                    key={`selected-${index}`}
                    className={`group border border-[#d9dedb] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0b2f2a] hover:shadow-sm ${
                      index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#9b7b42]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.4}
                        className="text-[#9b7b42] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>

                    <p className="mt-5 text-[9px] uppercase tracking-[0.18em] text-[#9b7b42]">
                      Selected Experience
                    </p>

                    <h3 className="mt-1.5 text-base font-medium text-[#0b2f2a]">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-xs leading-5 text-[#66736f]">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-5 h-px w-6 bg-[#9b7b42] transition-all duration-500 group-hover:w-full" />
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
