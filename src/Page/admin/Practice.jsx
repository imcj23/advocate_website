import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  BriefcaseBusiness,
  Eye,
} from "lucide-react";
import Navbar from "../../Components/admin/Navbar";

const API_URL = "http://localhost:3500/practice";

const emptyForm = {
  nama: "",
  deskripsi: "",
  icon: "BriefcaseBusiness",
  yang_kami_lakukan: "",
  pendekatan_kami: "",
  masalah_umum: "",
};

export default function Practice() {
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [viewingPractice, setViewingPractice] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchPractices = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data practice");
      }

      setPractices(result.data || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPractices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const handleEdit = (practice) => {
    setEditingId(practice.id);

    setForm({
      nama: practice.nama || "",
      deskripsi: practice.deskripsi || "",
      icon: practice.icon || "BriefcaseBusiness",

      yang_kami_lakukan: Array.isArray(practice.yang_kami_lakukan)
        ? practice.yang_kami_lakukan.join("\n")
        : "",

      pendekatan_kami: Array.isArray(practice.pendekatan_kami)
        ? practice.pendekatan_kami.join("\n")
        : "",

      masalah_umum: Array.isArray(practice.masalah_umum)
        ? practice.masalah_umum.join("\n")
        : "",
    });

    setError("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  //   convert menjadi array
  const convertToArray = (value) => {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.nama.trim()) {
      setError("Nama practice wajib diisi.");
      return;
    }

    if (!form.deskripsi.trim()) {
      setError("Deskripsi wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      const payload = {
        nama: form.nama.trim(),
        deskripsi: form.deskripsi.trim(),
        icon: form.icon.trim(),

        yang_kami_lakukan: convertToArray(form.yang_kami_lakukan),

        pendekatan_kami: convertToArray(form.pendekatan_kami),

        masalah_umum: convertToArray(form.masalah_umum),
      };

      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan practice");
      }

      await fetchPractices();

      handleCloseModal();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus practice ini?",
    );

    if (!confirmed) return;

    try {
      setError("");

      const token = getToken();

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus practice");
      }

      await fetchPractices();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  const handleView = (practice) => {
    setViewingPractice(practice);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F3] text-[#001311]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:py-14">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#A27A44]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#A27A44]">
                Content Management
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl">Practice</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Kelola layanan hukum yang ditampilkan pada website.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-[#001311] px-5 py-3 text-sm text-white transition hover:bg-[#0B2F2A]"
          >
            <Plus size={17} strokeWidth={1.5} />
            Tambah Practice
          </button>
        </div>

        {error && !modalOpen && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-hidden border border-[#D9DEDB] bg-white">
          <div className="border-b border-[#D9DEDB] px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Daftar Practice</h3>

                <p className="mt-1 text-xs text-gray-400">
                  {practices.length} layanan
                </p>
              </div>

              <BriefcaseBusiness
                size={20}
                strokeWidth={1.5}
                className="text-[#A27A44]"
              />
            </div>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-sm text-gray-400">
              Memuat data...
            </div>
          ) : practices.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <BriefcaseBusiness
                size={30}
                strokeWidth={1}
                className="mx-auto text-gray-300"
              />

              <p className="mt-4 text-sm text-gray-500">
                Belum ada data practice.
              </p>

              <button
                onClick={handleAdd}
                className="mt-4 text-sm text-[#A27A44] hover:underline"
              >
                Tambahkan practice pertama
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#D9DEDB]">
              {practices.map((practice, index) => (
                <div
                  key={practice.id}
                  className="group px-6 py-6 transition hover:bg-[#FAFBFA]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* INFO */}

                    <div className="flex min-w-0 items-start gap-5">
                      <div className="hidden h-10 w-10 shrink-0 items-center justify-center bg-[#001311] text-[#C9A96E] sm:flex">
                        <span className="font-serif text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-serif text-xl text-[#001311]">
                          {practice.nama}
                        </h3>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                          {practice.deskripsi}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="border border-[#D9DEDB] px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-400">
                            {Array.isArray(practice.yang_kami_lakukan)
                              ? `${practice.yang_kami_lakukan.length} layanan`
                              : "0 layanan"}
                          </span>

                          <span className="border border-[#D9DEDB] px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-400">
                            {Array.isArray(practice.pendekatan_kami)
                              ? `${practice.pendekatan_kami.length} pendekatan`
                              : "0 pendekatan"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION */}

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => handleView(practice)}
                        className="rounded-lg border border-[#D9DEDB] px-4 py-2 text-sm font-medium text-[#0B2F2A] transition hover:bg-[#F3F6F3]"
                      >
                        <Eye size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleEdit(practice)}
                        className="flex items-center gap-2 border border-[#D9DEDB] px-4 py-2.5 text-xs transition hover:border-[#A27A44] hover:text-[#A27A44]"
                      >
                        <Pencil size={14} strokeWidth={1.5} />
                      </button>

                      <button
                        onClick={() => handleDelete(practice.id)}
                        className="flex items-center gap-2 border border-[#D9DEDB] px-4 py-2.5 text-xs text-red-500 transition hover:border-red-300 hover:bg-red-50"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL TAMBAH / EDIT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001311]/60 px-4 py-6">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D9DEDB] px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A27A44]">
                  Practice
                </p>

                <h2 className="mt-1 font-serif text-2xl">
                  {editingId ? "Edit Practice" : "Tambah Practice"}
                </h2>
              </div>

              <button
                onClick={handleCloseModal}
                className="flex h-9 w-9 items-center justify-center border border-[#D9DEDB] text-gray-500 transition hover:border-[#A27A44] hover:text-[#A27A44]"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* MODAL BODY */}

            <form onSubmit={handleSubmit} className="overflow-y-auto">
              <div className="space-y-6 px-6 py-6">
                {/* ERROR */}

                {error && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* NAMA */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Nama Practice
                  </label>

                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Kontrak & Komersial"
                    className="w-full border border-[#D9DEDB] bg-[#FAFBFA] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44] focus:bg-white"
                  />
                </div>

                {/* DESKRIPSI */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Deskripsi
                  </label>

                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Deskripsi singkat layanan..."
                    className="w-full resize-none border border-[#D9DEDB] bg-[#FAFBFA] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#A27A44] focus:bg-white"
                  />
                </div>

                {/* ICON */}

                <div>
                  <label className="mb-2 block text-sm font-medium">Icon</label>

                  <select
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    className="w-full border border-[#D9DEDB] bg-[#FAFBFA] px-4 py-3 text-sm outline-none focus:border-[#A27A44]"
                  >
                    <option value="BriefcaseBusiness">BriefcaseBusiness</option>

                    <option value="FileText">FileText</option>

                    <option value="Scale">Scale</option>

                    <option value="Handshake">Handshake</option>

                    <option value="ShieldCheck">ShieldCheck</option>

                    <option value="Building2">Building2</option>
                  </select>
                </div>

                {/* YANG KAMI LAKUKAN */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Yang Kami Lakukan
                  </label>

                  <textarea
                    name="yang_kami_lakukan"
                    value={form.yang_kami_lakukan}
                    onChange={handleChange}
                    rows={7}
                    placeholder={`Perjanjian komersial
                        Penyusunan & peninjauan
                        Negosiasi kontrak
                        Transaksi bisnis
                        Perjanjian kemitraan
                        Perjanjian distribusi`}
                    className="w-full resize-none border border-[#D9DEDB] bg-[#FAFBFA] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#A27A44] focus:bg-white"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Satu item per baris.
                  </p>
                </div>

                {/* PENDEKATAN */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Pendekatan Kami
                  </label>

                  <textarea
                    name="pendekatan_kami"
                    value={form.pendekatan_kami}
                    onChange={handleChange}
                    rows={6}
                    placeholder={`Memahami kebutuhan klien
                        Mengidentifikasi risiko hukum
                        Menyusun strategi hukum
                        Melindungi kepentingan klien`}
                    className="w-full resize-none border border-[#D9DEDB] bg-[#FAFBFA] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#A27A44] focus:bg-white"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Satu item per baris.
                  </p>
                </div>

                {/* MASALAH UMUM */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Masalah Umum
                  </label>

                  <textarea
                    name="masalah_umum"
                    value={form.masalah_umum}
                    onChange={handleChange}
                    rows={6}
                    placeholder={`Kontrak memiliki klausul tidak jelas
                    Perselisihan dengan mitra bisnis
                    Klausul kontrak merugikan
                    Risiko wanprestasi`}
                    className="w-full resize-none border border-[#D9DEDB] bg-[#FAFBFA] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#A27A44] focus:bg-white"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Satu item per baris.
                  </p>
                </div>
              </div>

              {/* MODAL FOOTER */}

              <div className="flex items-center justify-end gap-3 border-t border-[#D9DEDB] bg-[#FAFBFA] px-6 py-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="border border-[#D9DEDB] bg-white px-5 py-3 text-sm transition hover:border-[#A27A44]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-[#001311] px-5 py-3 text-sm text-white transition hover:bg-[#0B2F2A] disabled:opacity-50"
                >
                  <Save size={16} strokeWidth={1.5} />

                  {saving
                    ? "Menyimpan..."
                    : editingId
                      ? "Simpan Perubahan"
                      : "Simpan Practice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {viewingPractice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setViewingPractice(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#D9DEDB] px-6 py-5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#A27A44]">
                  Practice Area
                </p>

                <h2 className="text-2xl font-semibold text-[#0B2F2A]">
                  {viewingPractice.nama}
                </h2>
              </div>

              <button
                onClick={() => setViewingPractice(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-[#0B2F2A]"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}
            <div className="space-y-8 px-6 py-6">
              {/* DESKRIPSI */}
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#A27A44]">
                  Deskripsi
                </h3>

                <p className="leading-7 text-gray-600">
                  {viewingPractice.deskripsi || "-"}
                </p>
              </section>

              {/* YANG KAMI LAKUKAN */}
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#A27A44]">
                  Yang Kami Lakukan
                </h3>

                {Array.isArray(viewingPractice.yang_kami_lakukan) &&
                viewingPractice.yang_kami_lakukan.length > 0 ? (
                  <ul className="space-y-2">
                    {viewingPractice.yang_kami_lakukan.map((item, index) => (
                      <li key={index} className="flex gap-3 text-gray-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A27A44]" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">Belum ada data.</p>
                )}
              </section>

              {/* PENDEKATAN KAMI */}
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#A27A44]">
                  Pendekatan Kami
                </h3>

                {Array.isArray(viewingPractice.pendekatan_kami) &&
                viewingPractice.pendekatan_kami.length > 0 ? (
                  <ul className="space-y-2">
                    {viewingPractice.pendekatan_kami.map((item, index) => (
                      <li key={index} className="flex gap-3 text-gray-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A27A44]" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">Belum ada data.</p>
                )}
              </section>

              {/* MASALAH UMUM */}
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#A27A44]">
                  Masalah Umum
                </h3>

                {Array.isArray(viewingPractice.masalah_umum) &&
                viewingPractice.masalah_umum.length > 0 ? (
                  <ul className="space-y-2">
                    {viewingPractice.masalah_umum.map((item, index) => (
                      <li key={index} className="flex gap-3 text-gray-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A27A44]" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">Belum ada data.</p>
                )}
              </section>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end border-t border-[#D9DEDB] px-6 py-4">
              <button
                onClick={() => setViewingPractice(null)}
                className="rounded-lg bg-[#0B2F2A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#001311]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
