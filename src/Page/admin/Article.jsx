import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus, X, Upload, FileText } from "lucide-react";

import Navbar from "../../Components/admin/Navbar";

const API_URL = "http://localhost:3500/article";
const BACKEND_URL = "http://localhost:3500";

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingArticle, setViewingArticle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    judul: "",
    kategori: "Legal Update",
    excerpt: "",
    isi: "",
    penulis: "",
    tanggal: "",
    status: "Draft",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Gagal membaca user:", error);
      }
    }
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token login tidak ditemukan");
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("ARTICLE STATUS:", response.status);
      console.log("ARTICLE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil data article");
      }

      setArticles(data.data || []);
    } catch (error) {
      console.error("FETCH ARTICLE ERROR:", error);
      alert(error.message || "Gagal mengambil data article");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Format gambar harus JPG, JPEG, PNG, atau WEBP.");
      e.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2 MB.");
      e.target.value = "";
      return;
    }
    setSelectedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const resetForm = () => {
    setForm({
      judul: "",
      kategori: "Legal Update",
      excerpt: "",
      isi: "",
      penulis: "",
      tanggal: "",
      status: "Draft",
    });

    setEditingId(null);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };
  const handleEdit = (article) => {
    setEditingId(article.id);
    setForm({
      judul: article.judul || "",
      kategori: article.kategori || "Legal Update",
      excerpt: article.excerpt || "",
      isi: article.isi || "",
      penulis: article.penulis || "",
      tanggal: article.tanggal ? article.tanggal.substring(0, 10) : "",
      status: article.status || "Draft",
    });
    setSelectedImage(null);
    if (article.gambar) {
      setImagePreview(`${BACKEND_URL}${article.gambar}`);
    } else {
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleView = (article) => {
    setViewingArticle(article);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.judul.trim()) {
      alert("Judul artikel wajib diisi.");
      return;
    }

    if (!form.isi.trim()) {
      alert("Isi artikel wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("judul", form.judul);
      formData.append("kategori", form.kategori);
      formData.append("excerpt", form.excerpt);
      formData.append("isi", form.isi);
      formData.append("penulis", form.penulis);
      formData.append("tanggal", form.tanggal);
      formData.append("status", form.status);

      if (selectedImage) {
        formData.append("gambar", selectedImage);
      }
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan artikel");
      }
      alert(
        editingId
          ? "Artikel berhasil diperbarui."
          : "Artikel berhasil ditambahkan.",
      );
      setShowModal(false);
      resetForm();
      fetchArticles();
    } catch (error) {
      console.error("SAVE ARTICLE ERROR:", error);

      alert(error.message || "Gagal menyimpan artikel.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus artikel ini?",
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus artikel");
      }
      alert("Artikel berhasil dihapus.");

      fetchArticles();
    } catch (error) {
      console.error("DELETE ARTICLE ERROR:", error);

      alert(error.message || "Gagal menghapus artikel.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6]">
      <Navbar user={user} />
      <main className="px-5 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A27A44]">
                Content Management
              </p>
              <h1 className="text-3xl font-semibold text-[#0B2F2A]">Article</h1>
              <p className="mt-2 text-sm text-gray-500">
                Kelola artikel dan legal insight yang ditampilkan pada website.
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#0B2F2A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#001311]"
            >
              <Plus size={18} />
              Tambah Article
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#D9DEDB] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-[#D9DEDB] bg-[#F5F8F6]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Article
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Penulis
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-sm text-gray-400"
                      >
                        Memuat artikel...
                      </td>
                    </tr>
                  ) : articles.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <FileText
                          size={32}
                          className="mx-auto mb-3 text-gray-300"
                        />

                        <p className="text-sm text-gray-500">
                          Belum ada artikel.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    articles.map((article) => (
                      <tr
                        key={article.id}
                        className="border-b border-[#D9DEDB] last:border-0 hover:bg-[#FAFCFB]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F3F6F3]">
                              {article.gambar ? (
                                <img
                                  src={`${BACKEND_URL}${article.gambar}`}
                                  alt={article.judul}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <FileText
                                    size={20}
                                    className="text-gray-300"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="line-clamp-2 font-medium text-[#0B2F2A]">
                                {article.judul}
                              </p>
                              <p className="mt-1 line-clamp-1 text-xs text-gray-400">
                                {article.excerpt || "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="rounded-full bg-[#F3F6F3] px-3 py-1 text-xs font-medium text-[#0B2F2A]">
                            {article.kategori || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600">
                          {article.penulis || "-"}
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {formatDate(article.tanggal)}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              article.status === "Published"
                                ? "bg-green-50 text-green-700"
                                : "bg-yellow-50 text-yellow-700"
                            }`}
                          >
                            {article.status || "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleView(article)}
                              title="Lihat"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9DEDB] text-[#0B2F2A] transition hover:bg-[#F3F6F3]"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleEdit(article)}
                              title="Edit"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9DEDB] text-[#0B2F2A] transition hover:bg-[#F3F6F3]"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              title="Hapus"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <div
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D9DEDB] px-6 py-5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#A27A44]">
                  {editingId ? "Edit Article" : "New Article"}
                </p>

                <h2 className="text-2xl font-semibold text-[#0B2F2A]">
                  {editingId ? "Perbarui Artikel" : "Tambah Artikel"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#0B2F2A]"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 px-6 py-7">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
                  placeholder="Masukkan judul artikel"
                  className="w-full rounded-lg border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                  required
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D9DEDB] bg-white px-4 py-3 text-sm outline-none focus:border-[#A27A44]"
                  >
                    <option value="Legal Update">Legal Update</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Employment">Employment</option>
                    <option value="Dispute Resolution">
                      Dispute Resolution
                    </option>
                    <option value="Regulatory">Regulatory</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                    Penulis
                  </label>
                  <input
                    type="text"
                    name="penulis"
                    value={form.penulis}
                    onChange={handleChange}
                    placeholder="Nama penulis"
                    className="w-full rounded-lg border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                  />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={form.tanggal}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D9DEDB] px-4 py-3 text-sm outline-none focus:border-[#A27A44]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D9DEDB] bg-white px-4 py-3 text-sm outline-none focus:border-[#A27A44]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Ringkasan singkat artikel..."
                  className="w-full resize-none rounded-lg border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                  Gambar Artikel
                </label>
                <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#D9DEDB] px-6 py-8 transition hover:border-[#A27A44] hover:bg-[#FAFCFB]">
                  <div className="text-center">
                    <Upload size={28} className="mx-auto mb-3 text-[#A27A44]" />
                    <p className="text-sm font-medium text-[#0B2F2A]">
                      Pilih gambar artikel
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      JPG, PNG, WEBP — maksimal 2 MB
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </label>
                {imagePreview && (
                  <div className="relative mt-4 overflow-hidden rounded-xl border border-[#D9DEDB]">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-56 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow transition hover:bg-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0B2F2A]">
                  Isi Artikel
                </label>
                <textarea
                  name="isi"
                  value={form.isi}
                  onChange={handleChange}
                  rows="14"
                  placeholder={`Pendahuluan
                    Pembahasan
                    Implikasi hukum
                    Hal yang perlu diperhatikan
                    Kesimpulan`}
                  className="w-full resize-y rounded-lg border border-[#D9DEDB] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#A27A44]"
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  Gunakan baris baru untuk memisahkan paragraf.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-3 border-t border-[#D9DEDB] pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-[#D9DEDB] px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#0B2F2A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#001311] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Menyimpan..."
                    : editingId
                      ? "Simpan Perubahan"
                      : "Tambah Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setViewingArticle(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-[#D9DEDB] px-6 py-5">
              <div className="pr-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A27A44]">
                  {viewingArticle.kategori || "Legal Insight"}
                </p>

                <h2 className="text-2xl font-semibold leading-tight text-[#0B2F2A] md:text-3xl">
                  {viewingArticle.judul}
                </h2>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                  <span>{viewingArticle.penulis || "Law Firm"}</span>

                  <span>•</span>

                  <span>{formatDate(viewingArticle.tanggal)}</span>
                </div>
              </div>

              <button
                onClick={() => setViewingArticle(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#0B2F2A]"
              >
                <X size={20} />
              </button>
            </div>

            {/* CONTENT */}

            <div className="px-6 py-7 md:px-8">
              {/* IMAGE */}

              {viewingArticle.gambar && (
                <div className="mb-8 overflow-hidden rounded-xl bg-[#F3F6F3]">
                  <img
                    src={`${BACKEND_URL}${viewingArticle.gambar}`}
                    alt={viewingArticle.judul}
                    className="max-h-105 w-full object-cover"
                  />
                </div>
              )}

              {/* EXCERPT */}

              {viewingArticle.excerpt && (
                <div className="mb-8 border-l-2 border-[#A27A44] pl-5">
                  <p className="text-lg leading-8 text-gray-600">
                    {viewingArticle.excerpt}
                  </p>
                </div>
              )}

              {/* ARTICLE CONTENT */}

              <article>
                {viewingArticle.isi?.split("\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-5 whitespace-pre-line text-base leading-8 text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end border-t border-[#D9DEDB] px-6 py-4">
              <button
                onClick={() => setViewingArticle(null)}
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
