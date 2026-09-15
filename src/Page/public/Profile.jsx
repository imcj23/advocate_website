import { useEffect, useMemo, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import {
  // ArrowUpRight,
  ChevronRight,
  Quote,
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
  // CheckCircle2,
  Landmark,
  ShieldCheck,
  FileText,
  GitMerge,
  ClipboardCheck,
} from "lucide-react";

const API_URL = "http://localhost:3500";

// =====================================================
// ICON PRACTICE
// =====================================================

const practiceIconMap = {
  BriefcaseBusiness,
  SquareText,
  Scale,
  UserGroup,
  Gavel,
  Building2,
  Users,
  Landmark,
  ShieldCheck,
  FileText,
  GitMerge,
  ClipboardCheck,
};

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
// GET PRACTICE ICON
// =====================================================

const getPracticeIcon = (iconName, index) => {
  if (iconName && typeof iconName === "string") {
    const cleanName = iconName.trim();

    if (practiceIconMap[cleanName]) {
      return practiceIconMap[cleanName];
    }
  }

  const fallbackIcons = [
    BriefcaseBusiness,
    SquareText,
    Scale,
    UserGroup,
    Gavel,
    Building2,
    Landmark,
    ShieldCheck,
  ];

  return fallbackIcons[index % fallbackIcons.length];
};

// =====================================================
// COMPONENT
// =====================================================

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [practices, setPractices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingPractice, setLoadingPractice] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [practiceError, setPracticeError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProfile();
    // eslint-disable-next-line react-hooks/immutability
    fetchPractices();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/advocate`);
      const result = await response.json();

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

  const fetchPractices = async () => {
    try {
      setLoadingPractice(true);
      setPracticeError("");

      const response = await fetch(`${API_URL}/practice`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data practice.");
      }

      const practiceData = result?.data || result?.practices || result || [];

      if (!Array.isArray(practiceData)) {
        throw new Error("Format data practice dari backend tidak valid.");
      }

      const formattedPractices = practiceData
        .map((item, index) => {
          if (!item || typeof item !== "object") {
            return null;
          }

          return {
            id: item.id || index,
            nama: item.nama || item.name || "",
            deskripsi: item.deskripsi || item.description || "",
            icon: item.icon || "",
          };
        })
        .filter((item) => item.nama || item.deskripsi);

      setPractices(formattedPractices);
    } catch (error) {
      console.error("GET PRACTICE ERROR:", error);
      setPracticeError(error.message || "Gagal mengambil data practice.");
    } finally {
      setLoadingPractice(false);
    }
  };

  const practiceFocus = useMemo(() => {
    return practices.map((item, index) => {
      const Icon = getPracticeIcon(item.icon, index);

      return {
        id: item.id,
        icon: Icon,
        title: item.nama,
        description: item.deskripsi,
      };
    });
  }, [practices]);

  const educationData = useMemo(() => {
    if (!profile) return [];

    return profile.education
      .map((item) => {
        if (typeof item === "string") {
          return { degree: item, institution: "", year: "" };
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

  const experienceData = useMemo(() => {
    if (!profile) return [];

    return profile.experience
      .map((item) => {
        if (typeof item === "string") {
          return { position: item, company: "", period: "", description: "" };
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

  const admissionData = useMemo(() => {
    if (!profile) return [];

    return profile.admission
      .map((item) => {
        if (typeof item === "string") {
          return { title: item, description: "" };
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

  const membershipData = useMemo(() => {
    if (!profile) return [];

    return profile.membership
      .map((item) => {
        if (typeof item === "string") {
          return { title: item, description: "" };
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

  const selectedExperienceData = useMemo(() => {
    if (!profile) return [];

    return profile.selected_experience
      .map((item) => {
        if (typeof item === "string") {
          return { title: item, description: "" };
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
        <main className="flex min-h-[70vh] items-center justify-center bg-[#F5F2EC]">
          <div className="flex flex-col items-center text-center">
            <Loader2 size={30} className="animate-spin text-[#001311]" />
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
  // ERROR PROFILE
  // ===================================================

  if (!profile || errorMessage) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center bg-[#F5F2EC] px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#d9dedb] bg-white text-[#9b7b42]">
              <AlertCircle size={22} strokeWidth={1.5} />
            </div>
            <h1 className="mt-5 text-2xl font-medium text-[#001311]">
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

  return (
    <>
      <Navbar />

      <main className="bg-[#F5F2EC] text-[#001311]">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative overflow-hidden bg-[#001311]">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            {/* TEXT */}
            <div className="flex flex-col justify-center px-6 py-16 lg:px-8 lg:py-24">
              <div className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white/45 lg:mb-16">
                <span>Home</span>
                <ChevronRight size={12} />
                <span>About DSP</span>
                <ChevronRight size={12} />
                <span className="text-[#c9a96e]">Founder Profile</span>
              </div>

              {profile.posisi && (
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#c9a96e]" />
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96e]">
                    {profile.posisi}
                  </p>
                </div>
              )}

              <h1 className="text-4xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-5xl">
                {profile.nama || "Nama Lengkap"}
              </h1>

              {profile.tagline && (
                <p className="mt-4 text-lg font-light italic text-[#c9a96e]">
                  {profile.tagline}
                </p>
              )}

              {(profile.email_1 || profile.email_office || profile.no_hp) && (
                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-xs uppercase tracking-widest text-white/40">
                  {profile.email_1 && <span>{profile.email_1}</span>}
                  {profile.email_office &&
                    profile.email_office !== profile.email_1 && (
                      <span>{profile.email_office}</span>
                    )}
                  {profile.no_hp && <span>{profile.no_hp}</span>}
                </div>
              )}
            </div>

            {/* PHOTO */}
            <div className="relative min-h-75 lg:min-h-full">
              {profile.foto ? (
                <img
                  src={getImageUrl(profile.foto)}
                  alt={profile.nama || "Profile"}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0e3a34] text-white/20">
                  <UserGroup size={80} strokeWidth={1} />
                </div>
              )}
              <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#001311] to-transparent lg:block" />
            </div>
          </div>
        </section>

        {/* =================================================
            PROFESSIONAL PROFILE + PRACTICE FOCUS
        ================================================= */}

        <section className="bg-[#F3F8F1]">
          <div className="mx-auto grid max-w-7xl gap-14 border-t border-[#001311]/10 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-20">
            {/* Professional Profile */}
            <div>
              <h2 className="text-xl font-semibold uppercase tracking-[0.15em] text-[#001311]">
                Professional Profile
              </h2>
              <div className="mt-4 h-px w-10 bg-[#c9a96e]" />

              <div className="mt-6 space-y-5 text-sm leading-7 text-[#001311]/70">
                {profile.bio ? (
                  profile.bio
                    .split("\n")
                    .filter(Boolean)
                    .map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p>Bio belum tersedia.</p>
                )}
              </div>
            </div>

            {/* Practice Focus */}
            <div>
              <h2 className="text-xl font-semibold uppercase tracking-[0.15em] text-[#001311]">
                Practice Focus
              </h2>
              <div className="mt-4 h-px w-10 bg-[#c9a96e]" />

              {loadingPractice ? (
                <div className="mt-6 flex items-center gap-3 text-[#001311]/40">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs">Memuat practice...</span>
                </div>
              ) : practiceError ? (
                <div className="mt-6 flex items-center gap-3 text-[#A27A44]">
                  <AlertCircle size={16} />
                  <span className="text-xs">{practiceError}</span>
                </div>
              ) : practiceFocus.length > 0 ? (
                <div className="mt-6 divide-y divide-[#001311]/10">
                  {practiceFocus.slice(0, 5).map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex items-start gap-4 py-4 first:pt-0"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#c9a96e]/40 text-[#9b7b42]">
                          <Icon size={17} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#001311]">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="mt-1 text-xs leading-5 text-[#001311]/55">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-6 text-xs text-[#001311]/40">
                  Belum ada data practice yang tersedia.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            EXPERIENCE & CREDENTIALS
        ================================================= */}

        {hasCredentials && (
          <section className="bg-[#F5F2EC]">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
              <h2 className="text-center text-lg font-semibold uppercase tracking-[0.2em] text-[#001311]">
                Experience &amp; Credentials
              </h2>
              <div className="mx-auto mt-4 h-px w-14 bg-[#A27A44]" />

              <div className="mt-12 grid gap-10 sm:grid-cols-3 lg:grid-cols-5">
                {/* Education */}
                {educationData.length > 0 && (
                  <div className="flex flex-col items-center text-center">
                    <GraduationCap
                      size={26}
                      strokeWidth={1.4}
                      className="text-[#A27A44]"
                    />
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#001311]">
                      Education
                    </p>
                    <div className="mt-2 space-y-1">
                      {educationData.map((item, index) => (
                        <p
                          key={`edu-${index}`}
                          className="text-xs leading-5 text-[#001311]/60"
                        >
                          {item.degree}
                          {item.institution && (
                            <>
                              <br />
                              {item.institution}
                            </>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Professional Experience */}
                {experienceData.length > 0 && (
                  <div className="flex flex-col items-center text-center">
                    <BriefcaseBusiness
                      size={26}
                      strokeWidth={1.4}
                      className="text-[#A27A44]"
                    />
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#001311]">
                      Professional Experience
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#001311]/60">
                      {experienceData[0].position}
                      {experienceData[0].company &&
                        ` — ${experienceData[0].company}`}
                      {experienceData.length > 1 &&
                        ` (+${experienceData.length - 1} lainnya)`}
                    </p>
                  </div>
                )}

                {/* Admissions */}
                {admissionData.length > 0 && (
                  <div className="flex flex-col items-center text-center">
                    <Scale
                      size={26}
                      strokeWidth={1.4}
                      className="text-[#A27A44]"
                    />
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#001311]">
                      Admissions
                    </p>
                    <div className="mt-2 space-y-1">
                      {admissionData.map((item, index) => (
                        <p
                          key={`adm-${index}`}
                          className="text-xs leading-5 text-[#001311]/60"
                        >
                          {item.title}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Memberships */}
                {membershipData.length > 0 && (
                  <div className="flex flex-col items-center text-center">
                    <Users
                      size={26}
                      strokeWidth={1.4}
                      className="text-[#A27A44]"
                    />
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#001311]">
                      Memberships
                    </p>
                    <div className="mt-2 space-y-1">
                      {membershipData.map((item, index) => (
                        <p
                          key={`mem-${index}`}
                          className="text-xs leading-5 text-[#001311]/60"
                        >
                          {item.title}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languagesData.length > 0 && (
                  <div className="flex flex-col items-center text-center">
                    <Languages
                      size={26}
                      strokeWidth={1.4}
                      className="text-[#A27A44]"
                    />
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#001311]">
                      Languages
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#001311]/60">
                      {languagesData.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            QUOTE + SELECTED EXPERIENCE
        ================================================= */}

        {(profile.tagline || selectedExperienceData.length > 0) && (
          <section className="grid lg:grid-cols-2 mb-10">
            {/* Quote */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-[#001311] px-10 py-20 sm:px-16">
              <div className="absolute inset-0">
                {profile.foto && (
                  <img
                    src={getImageUrl(profile.foto)}
                    alt=""
                    className="h-full w-full object-cover opacity-25"
                  />
                )}
                <div className="absolute inset-0 bg-[#001311]/80" />
              </div>

              <div className="relative">
                <Quote size={40} strokeWidth={1} className="text-[#c9a96e]" />

                <p className="mt-6 max-w-md text-2xl font-light leading-snug text-white">
                  {profile.tagline || "Doby & Situmorang Partners"}
                </p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a96e]">
                  — {profile.nama}
                </p>
              </div>
            </div>

            {/* Selected Experience */}
            <div className="flex flex-col justify-center bg-[#F5F2EC] px-10 py-20 sm:px-16">
              <h2 className="text-xl font-semibold uppercase tracking-[0.15em] text-[#001311]">
                Selected Experience
              </h2>
              <div className="mt-4 h-px w-10 bg-[#A27A44]" />

              {selectedExperienceData.length > 0 ? (
                <ul className="mt-6 space-y-4">
                  {selectedExperienceData.map((item, index) => (
                    <li
                      key={`selected-${index}`}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A27A44]" />
                      <div>
                        <span className="text-sm font-medium leading-6 text-[#001311]">
                          {item.title}
                        </span>
                        {item.description && (
                          <p className="mt-1 text-xs leading-5 text-[#001311]/55">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-sm text-[#001311]/50">
                  Belum ada data selected experience.
                </p>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
