import { useEffect, useState } from "react";
import {
  Save,
  Upload,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  Globe,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Pencil,
} from "lucide-react";
import Navbar from "../../Components/admin/Navbar";

const API_URL = "http://localhost:3500";

export default function Advocate() {
  // =====================================================
  // STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [existingProfile, setExistingProfile] = useState(false);

  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    email_1: "",
    email_office: "",
    no_hp: "",
    foto: "",

    tagline: "",
    bio: "",

    // ===================================================
    // PRACTICE FOCUS
    // OBJECT
    // ===================================================
    practice_focus: [
      {
        title: "",
        description: "",
      },
    ],

    education: [],
    experience: [],
    admission: [],
    membership: [],
    languages: [],
    selected_experience: [],

    status: "active",
  });

  // =====================================================
  // GET ADVOCATE
  // =====================================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchAdvocate();
  }, []);

  const fetchAdvocate = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/advocate`);
      const result = await response.json();

      if (response.status === 404) {
        setExistingProfile(false);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal mengambil data advocate"
        );
      }

      const advocate = result.data;

      // =================================================
      // NORMALISASI PRACTICE FOCUS
      // =================================================

      let practiceFocus = [];

      if (Array.isArray(advocate.practice_focus)) {
        practiceFocus = advocate.practice_focus
          .map((item) => {
            // Format baru:
            // {
            //   title: "...",
            //   description: "..."
            // }

            if (typeof item === "object" && item !== null) {
              return {
                title: item.title || "",
                description: item.description || "",
              };
            }

            // Kompatibilitas data lama
            // jika sebelumnya hanya berupa string
            if (typeof item === "string") {
              return {
                title: item,
                description: "",
              };
            }

            return {
              title: "",
              description: "",
            };
          })
          .filter(
            (item) =>
              item.title.trim() !== "" ||
              item.description.trim() !== ""
          );
      }

      if (practiceFocus.length === 0) {
        practiceFocus = [
          {
            title: "",
            description: "",
          },
        ];
      }

      setFormData({
        nama: advocate.nama || "",
        posisi: advocate.posisi || "",
        email_1: advocate.email_1 || "",
        email_office: advocate.email_office || "",
        no_hp: advocate.no_hp || "",
        foto: advocate.foto || "",

        tagline: advocate.tagline || "",
        bio: advocate.bio || "",

        practice_focus: practiceFocus,

        education: Array.isArray(advocate.education)
          ? advocate.education
          : [],

        experience: Array.isArray(advocate.experience)
          ? advocate.experience
          : [],

        admission: Array.isArray(advocate.admission)
          ? advocate.admission
          : [],

        membership: Array.isArray(advocate.membership)
          ? advocate.membership
          : [],

        languages: Array.isArray(advocate.languages)
          ? advocate.languages
          : [],

        selected_experience: Array.isArray(
          advocate.selected_experience
        )
          ? advocate.selected_experience
          : [],

        status: advocate.status || "active",
      });

      if (advocate.foto) {
        setPhotoPreview(`${API_URL}${advocate.foto}`);
      }

      setExistingProfile(true);
    } catch (error) {
      console.error("GET ADVOCATE ERROR:", error);

      setErrorMessage(
        error.message || "Gagal mengambil data advocate"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE PHOTO
  // =====================================================

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhotoFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  // =====================================================
  // SIMPLE ARRAY FIELD
  // =====================================================

  const addSimpleItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const updateSimpleItem = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated[index] = value;

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const removeSimpleItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  // =====================================================
  // PRACTICE FOCUS
  // =====================================================

  const addPracticeFocus = () => {
    setFormData((prev) => ({
      ...prev,
      practice_focus: [
        ...prev.practice_focus,
        {
          title: "",
          description: "",
        },
      ],
    }));
  };

  const updatePracticeFocus = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.practice_focus];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        practice_focus: updated,
      };
    });
  };

  const removePracticeFocus = (index) => {
    setFormData((prev) => ({
      ...prev,
      practice_focus: prev.practice_focus.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  // =====================================================
  // EDUCATION
  // =====================================================

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          year: "",
        },
      ],
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.education];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        education: updated,
      };
    });
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  // =====================================================
  // EXPERIENCE
  // =====================================================

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          position: "",
          company: "",
          period: "",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.experience];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        experience: updated,
      };
    });
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  // =====================================================
  // SELECTED EXPERIENCE
  // =====================================================

  const addSelectedExperience = () => {
    setFormData((prev) => ({
      ...prev,
      selected_experience: [
        ...prev.selected_experience,
        {
          title: "",
          description: "",
        },
      ],
    }));
  };

  const updateSelectedExperience = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.selected_experience];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        selected_experience: updated,
      };
    });
  };

  const removeSelectedExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      selected_experience: prev.selected_experience.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const data = new FormData();

      data.append("nama", formData.nama);
      data.append("posisi", formData.posisi);
      data.append("email_1", formData.email_1);
      data.append("email_office", formData.email_office);
      data.append("no_hp", formData.no_hp);

      data.append("tagline", formData.tagline);
      data.append("bio", formData.bio);

      // =================================================
      // PRACTICE FOCUS
      // OBJECT -> JSON STRING
      // =================================================

      data.append(
        "practice_focus",
        JSON.stringify(formData.practice_focus)
      );

      data.append(
        "education",
        JSON.stringify(formData.education)
      );

      data.append(
        "experience",
        JSON.stringify(formData.experience)
      );

      data.append(
        "admission",
        JSON.stringify(formData.admission)
      );

      data.append(
        "membership",
        JSON.stringify(formData.membership)
      );

      data.append(
        "languages",
        JSON.stringify(formData.languages)
      );

      data.append(
        "selected_experience",
        JSON.stringify(formData.selected_experience)
      );

      data.append("status", formData.status);

      if (photoFile) {
        data.append("foto", photoFile);
      }

      // =================================================
      // CREATE / UPDATE
      // =================================================

      const method = existingProfile ? "PUT" : "POST";

      const response = await fetch(`${API_URL}/advocate`, {
        method,
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Gagal menyimpan profil advocate"
        );
      }

      // =================================================
      // UPDATE STATE
      // =================================================

      setExistingProfile(true);

      const advocate = result.data;

      // =================================================
      // NORMALISASI PRACTICE FOCUS
      // =================================================

      let savedPracticeFocus = [];

      if (Array.isArray(advocate.practice_focus)) {
        savedPracticeFocus = advocate.practice_focus
          .map((item) => {
            if (
              typeof item === "object" &&
              item !== null
            ) {
              return {
                title: item.title || "",
                description: item.description || "",
              };
            }

            if (typeof item === "string") {
              return {
                title: item,
                description: "",
              };
            }

            return {
              title: "",
              description: "",
            };
          })
          .filter(
            (item) =>
              item.title.trim() !== "" ||
              item.description.trim() !== ""
          );
      }

      if (savedPracticeFocus.length === 0) {
        savedPracticeFocus = [
          {
            title: "",
            description: "",
          },
        ];
      }

      setFormData({
        nama: advocate.nama || "",
        posisi: advocate.posisi || "",
        email_1: advocate.email_1 || "",
        email_office: advocate.email_office || "",
        no_hp: advocate.no_hp || "",
        foto: advocate.foto || "",

        tagline: advocate.tagline || "",
        bio: advocate.bio || "",

        practice_focus: savedPracticeFocus,

        education: Array.isArray(advocate.education)
          ? advocate.education
          : [],

        experience: Array.isArray(advocate.experience)
          ? advocate.experience
          : [],

        admission: Array.isArray(advocate.admission)
          ? advocate.admission
          : [],

        membership: Array.isArray(advocate.membership)
          ? advocate.membership
          : [],

        languages: Array.isArray(advocate.languages)
          ? advocate.languages
          : [],

        selected_experience: Array.isArray(
          advocate.selected_experience
        )
          ? advocate.selected_experience
          : [],

        status: advocate.status || "active",
      });

      if (advocate.foto) {
        setPhotoPreview(`${API_URL}${advocate.foto}`);
      }

      setPhotoFile(null);

      setSuccessMessage(
        "Profil advocate berhasil disimpan."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("SAVE ADVOCATE ERROR:", error);

      setErrorMessage(
        error.message ||
          "Gagal menyimpan profil advocate"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7F5]">
        <div className="flex items-center gap-3 text-[#0B2F2A]">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span className="text-sm">
            Memuat profil advocate...
          </span>
        </div>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F5F7F5] text-[#17201D]">
      <Navbar />

      {/* =================================================
          HEADER
      ================================================== */}

      <div className="border-b border-[#D9DEDB] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-7 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#A27A44]">
                CMS
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-[#0B2F2A]">
                Advocate Profile
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Kelola informasi profil advocate yang
                ditampilkan pada website.
              </p>
            </div>

            <button
              type="submit"
              form="advocate-form"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-[#0B2F2A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#123D37] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          NOTIFICATION
      ================================================== */}

      <div className="mx-auto max-w-6xl px-6 pt-6 lg:px-8">
        {successMessage && (
          <div className="flex items-center gap-3 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}
      </div>

      {/* =================================================
          FORM
      ================================================== */}

      <form
        id="advocate-form"
        onSubmit={handleSubmit}
        className="mx-auto max-w-6xl space-y-6 px-6 py-8 lg:px-8"
      >
        {/* =================================================
            BASIC PROFILE
        ================================================== */}

        <section className="bg-white p-6 shadow-sm lg:p-8">
          <SectionTitle
            icon={<UserRound size={20} />}
            title="Informasi Utama"
            description="Informasi dasar advocate."
          />

          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* FOTO */}

            <div>
              <label className="mb-3 block text-sm font-medium text-[#27312E]">
                Foto Advocate
              </label>

              <div className="relative aspect-3/4 overflow-hidden bg-[#E9EEEB]">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview Advocate"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-400">
                    <UserRound size={42} />

                    <span className="mt-2 text-xs">
                      Belum ada foto
                    </span>
                  </div>
                )}

                <label className="absolute bottom-3 left-3 right-3 flex cursor-pointer items-center justify-center gap-2 bg-[#0B2F2A] px-4 py-3 text-xs font-medium text-white transition hover:bg-[#123D37]">
                  <Upload size={15} />

                  Ganti Foto

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-gray-400">
                JPG, JPEG, PNG atau WEBP. Maksimal 2MB.
              </p>
            </div>

            {/* BASIC DATA */}

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />

              <InputField
                label="Posisi"
                name="posisi"
                value={formData.posisi}
                onChange={handleChange}
                required
              />

              <InputField
                label="Email Utama"
                name="email_1"
                type="email"
                value={formData.email_1}
                onChange={handleChange}
                required
              />

              <InputField
                label="Email Office"
                name="email_office"
                type="email"
                value={formData.email_office}
                onChange={handleChange}
              />

              <InputField
                label="Nomor HP"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange}
                required
              />

              <InputField
                label="Tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Clear Counsel. Strong Resolution."
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#27312E]">
                  Status Profile
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-[#D9DEDB] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B2F2A]"
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            BIO
        ================================================== */}

        <section className="bg-white p-6 shadow-sm lg:p-8">
          <SectionTitle
            icon={<UserRound size={20} />}
            title="About Advocate"
            description="Deskripsi yang ditampilkan pada public profile."
          />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={7}
            placeholder="Tuliskan profil singkat dan pengalaman profesional advocate..."
            className="w-full resize-none border border-[#D9DEDB] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#0B2F2A]"
          />
        </section>

        {/* =================================================
            PRACTICE FOCUS
        ================================================== */}

        <section className="bg-white p-6 shadow-sm lg:p-8">
          <SectionTitle
            icon={<BriefcaseBusiness size={20} />}
            title="Practice Focus"
            description="Bidang praktik hukum yang menjadi fokus advocate."
          />

          <div className="space-y-3">
            {formData.practice_focus.map(
              (item, index) => (
                <PracticeFocusCard
                  key={index}
                  item={item}
                  index={index}
                  onChange={updatePracticeFocus}
                  onRemove={removePracticeFocus}
                />
              )
            )}

            <button
              type="button"
              onClick={addPracticeFocus}
              className="group flex w-full items-center justify-center gap-2 border border-dashed border-[#C8D0CC] px-5 py-4 text-sm font-medium text-[#0B2F2A] transition hover:border-[#0B2F2A] hover:bg-[#F5F7F5]"
            >
              <Plus
                size={17}
                className="transition-transform group-hover:rotate-90"
              />

              Tambah Practice Focus
            </button>
          </div>
        </section>

        {/* =================================================
            EDUCATION
        ================================================== */}

        <section className="bg-white p-6 shadow-sm lg:p-8">
          <SectionTitle
            icon={<GraduationCap size={20} />}
            title="Education"
            description="Riwayat pendidikan advocate."
          />

          <div className="space-y-4">
            {formData.education.map(
              (item, index) => (
                <div
                  key={index}
                  className="border border-[#E0E5E2] bg-[#FAFBFA] p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A27A44]">
                      Pendidikan {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeEducation(index)
                      }
                      className="text-gray-400 transition hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px]">
                    <InputField
                      label="Gelar"
                      value={item.degree}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                      placeholder="Sarjana Hukum"
                    />

                    <InputField
                      label="Institusi"
                      value={item.institution}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                      placeholder="Universitas..."
                    />

                    <InputField
                      label="Tahun"
                      value={item.year}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "year",
                          e.target.value
                        )
                      }
                      placeholder="2020"
                    />
                  </div>
                </div>
              )
            )}

            <AddButton
              onClick={addEducation}
              label="Tambah Pendidikan"
            />
          </div>
        </section>

        {/* =================================================
            EXPERIENCE
        ================================================== */}

        <section className="bg-white p-6 shadow-sm lg:p-8">
          <SectionTitle
            icon={<BriefcaseBusiness size={20} />}
            title="Professional Experience"
            description="Pengalaman profesional advocate."
          />

          <div className="space-y-4">
            {formData.experience.map(
              (item, index) => (
                <div
                  key={index}
                  className="border border-[#E0E5E2] bg-[#FAFBFA] p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A27A44]">
                      Experience {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeExperience(index)
                      }
                      className="text-gray-400 transition hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                      label="Position"
                      value={item.position}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "position",
                          e.target.value
                        )
                      }
                    />

                    <InputField
                      label="Company / Firm"
                      value={item.company}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "company",
                          e.target.value
                        )
                      }
                    />

                    <InputField
                      label="Period"
                      value={item.period}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "period",
                          e.target.value
                        )
                      }
                      placeholder="2020 - Sekarang"
                    />

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-[#27312E]">
                        Description
                      </label>

                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full border border-[#D9DEDB] px-4 py-3 text-sm outline-none focus:border-[#0B2F2A]"
                      />
                    </div>
                  </div>
                </div>
              )
            )}

            <AddButton
              onClick={addExperience}
              label="Tambah Experience"
            />
          </div>
        </section>

        {/* =================================================
            ADMISSION
        ================================================== */}

        <ArraySection
          title="Admission"
          description="Informasi admission / izin praktik."
          icon={<Award size={20} />}
          field="admission"
          items={formData.admission}
          onAdd={addSimpleItem}
          onChange={updateSimpleItem}
          onRemove={removeSimpleItem}
          placeholder="Contoh: PERADI"
        />

        {/* =================================================
            MEMBERSHIP
        ================================================== */}

        <ArraySection
          title="Membership"
          description="Keanggotaan organisasi atau asosiasi."
          icon={<Award size={20} />}
          field="membership"
          items={formData.membership}
          onAdd={addSimpleItem}
          onChange={updateSimpleItem}
          onRemove={removeSimpleItem}
          placeholder="Contoh: PERADI"
        />

        {/* =================================================
            LANGUAGES
        ================================================== */}

        <ArraySection
          title="Languages"
          description="Bahasa yang dikuasai advocate."
          icon={<Globe size={20} />}
          field="languages"
          items={formData.languages}
          onAdd={addSimpleItem}
          onChange={updateSimpleItem}
          onRemove={removeSimpleItem}
          placeholder="Contoh: Bahasa Indonesia"
        />

        {/* =================================================
            SELECTED EXPERIENCE
        ================================================== */}

        <section className="bg-white p-6 shadow-sm lg:p-8">
          <SectionTitle
            icon={<Award size={20} />}
            title="Selected Experience"
            description="Pengalaman terpilih yang ditampilkan pada public profile."
          />

          <div className="space-y-4">
            {formData.selected_experience.map(
              (item, index) => (
                <div
                  key={index}
                  className="border border-[#E0E5E2] bg-[#FAFBFA] p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A27A44]">
                      Selected Experience{" "}
                      {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeSelectedExperience(
                          index
                        )
                      }
                      className="text-gray-400 transition hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <InputField
                      label="Title"
                      value={item.title}
                      onChange={(e) =>
                        updateSelectedExperience(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: Representasi dalam transaksi bisnis"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#27312E]">
                        Description
                      </label>

                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          updateSelectedExperience(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full border border-[#D9DEDB] px-4 py-3 text-sm outline-none focus:border-[#0B2F2A]"
                      />
                    </div>
                  </div>
                </div>
              )
            )}

            <AddButton
              onClick={addSelectedExperience}
              label="Tambah Selected Experience"
            />
          </div>
        </section>

        {/* =================================================
            BOTTOM SAVE
        ================================================== */}

        <div className="flex justify-end border-t border-[#D9DEDB] pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0B2F2A] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#123D37] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={17} />
                Simpan Profil Advocate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// =====================================================
// PRACTICE FOCUS CARD
// =====================================================

function PracticeFocusCard({
  item,
  index,
  onChange,
  onRemove,
}) {
  const [editing, setEditing] = useState(
    !item.title && !item.description
  );

  return (
    <div className="overflow-hidden border border-[#E0E5E2] bg-[#FAFBFA] transition hover:border-[#C8D0CC]">
      {/* CARD HEADER */}

      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex min-w-0 items-center gap-4">
          {/* NUMBER */}

          <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#0B2F2A] text-xs font-semibold text-white">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* TITLE + DESCRIPTION */}

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#0B2F2A]">
              {item.title || "Practice Focus Baru"}
            </h3>

            {!editing &&
              item.description && (
                <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                  {item.description}
                </p>
              )}
          </div>
        </div>

        {/* ACTION */}

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="inline-flex items-center gap-1.5 border border-[#D9DEDB] px-3 py-2 text-xs font-medium text-[#0B2F2A] transition hover:border-[#0B2F2A] hover:bg-white"
          >
            {editing ? (
              "Selesai"
            ) : (
              <>
                <Pencil size={13} />
                Edit
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex h-9 w-9 items-center justify-center border border-[#E0E5E2] text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            title="Hapus Practice Focus"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* EDIT FORM */}

      {editing && (
        <div className="border-t border-[#E0E5E2] bg-white p-5">
          <div className="mb-4">
            <InputField
              label="Title"
              value={item.title}
              onChange={(e) =>
                onChange(
                  index,
                  "title",
                  e.target.value
                )
              }
              placeholder="Contoh: Bisnis & Korporate"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#27312E]">
              Description
            </label>

            <textarea
              value={item.description}
              onChange={(e) =>
                onChange(
                  index,
                  "description",
                  e.target.value
                )
              }
              rows={4}
              placeholder="Tuliskan deskripsi singkat mengenai bidang praktik ini..."
              className="w-full resize-none border border-[#D9DEDB] bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#0B2F2A]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// INPUT FIELD
// =====================================================

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#27312E]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-[#D9DEDB] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#0B2F2A]"
      />
    </div>
  );
}

// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({
  icon,
  title,
  description,
}) {
  return (
    <div className="mb-6 border-b border-[#E2E6E3] pb-5">
      <div className="flex items-center gap-3">
        <div className="text-[#A27A44]">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-[#0B2F2A]">
            {title}
          </h2>

          <p className="text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// ARRAY SECTION
// =====================================================

function ArraySection({
  title,
  description,
  icon,
  field,
  items,
  onAdd,
  onChange,
  onRemove,
  placeholder,
}) {
  return (
    <section className="bg-white p-6 shadow-sm lg:p-8">
      <SectionTitle
        icon={icon}
        title={title}
        description={description}
      />

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-3"
          >
            <input
              value={item}
              onChange={(e) =>
                onChange(
                  field,
                  index,
                  e.target.value
                )
              }
              placeholder={placeholder}
              className="flex-1 border border-[#D9DEDB] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B2F2A]"
            />

            <button
              type="button"
              onClick={() =>
                onRemove(field, index)
              }
              className="flex h-11.5 w-11.5 shrink-0 items-center justify-center border border-[#E0E5E2] text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}

        <AddButton
          onClick={() => onAdd(field)}
          label={`Tambah ${title}`}
        />
      </div>
    </section>
  );
}

// =====================================================
// ADD BUTTON
// =====================================================

function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 border border-[#C8D0CC] px-4 py-2.5 text-xs font-medium text-[#0B2F2A] transition hover:border-[#0B2F2A] hover:bg-[#F5F7F5]"
    >
      <Plus size={15} />

      {label}
    </button>
  );
} 