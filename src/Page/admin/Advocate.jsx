import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

import Navbar from "../../Components/admin/Navbar";

const API_URL = "http://localhost:3500/advocate";
const BACKEND_URL = "http://localhost:3500";

export default function Advocate() {
  const [user, setUser] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [viewingAdvocate, setViewingAdvocate] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    posisi: "",
    email_1: "",
    email_2: "",
    no_hp: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser));
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.error("User data tidak valid");
      }
    }

    // eslint-disable-next-line react-hooks/immutability
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const result = await response.json();
      setLawyers(result.data || []);
    } catch (error) {
      console.error("Gagal mengambil data lawyer:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE PHOTO
  // =====================================================

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi tipe
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Format foto harus JPG, JPEG, PNG, atau WEBP.");
      return;
    }

    // Validasi ukuran 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB.");
      return;
    }

    setSelectedPhoto(file);

    // Preview
    const previewUrl = URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      nama: "",
      posisi: "",
      email_1: "",
      email_2: "",
      no_hp: "",
    });

    setSelectedPhoto(null);
    setPhotoPreview(null);

    setModalOpen(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (lawyer) => {
    setEditingId(lawyer.id);

    setForm({
      nama: lawyer.nama || "",
      posisi: lawyer.posisi || "",
      email_1: lawyer.email_1 || "",
      email_2: lawyer.email_2 || "",
      no_hp: lawyer.no_hp || "",
    });

    setSelectedPhoto(null);

    if (lawyer.foto) {
      setPhotoPreview(`${BACKEND_URL}${lawyer.foto}`);
    } else {
      setPhotoPreview(null);
    }

    setModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    setModalOpen(false);

    setEditingId(null);

    setSelectedPhoto(null);

    setPhotoPreview(null);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nama", form.nama);
      formData.append("posisi", form.posisi);
      formData.append("email_1", form.email_1);
      formData.append("email_2", form.email_2);
      formData.append("no_hp", form.no_hp);

      // Tambahkan foto jika ada
      if (selectedPhoto) {
        formData.append("foto", selectedPhoto);
      }

      const token = localStorage.getItem("token");

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
        throw new Error(result.message || "Gagal menyimpan data");
      }

      alert(
        editingId
          ? "Data advocate berhasil diperbarui"
          : "Data advocate berhasil ditambahkan",
      );

      closeModal();

      fetchLawyers();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const openDeleteModal = (lawyer) => {
    setSelectedLawyer(lawyer);

    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedLawyer(null);

    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedLawyer) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${selectedLawyer.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus data");
      }

      alert("Data advocate berhasil dihapus");

      closeDeleteModal();

      fetchLawyers();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  //   url foto
  const getPhotoUrl = (foto) => {
    if (!foto) return null;

    return `${BACKEND_URL}${foto}`;
  };

  //   lihat advokat
  const handleView = (advocate) => {
    setViewingAdvocate(advocate);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6]">
      <Navbar user={user} />
      <main className="px-6 py-8 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-[#A27A44]">
                Management
              </p>

              <h1 className="text-3xl font-semibold text-[#001311]">
                Advocate
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Kelola data advokat yang ditampilkan pada website.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 bg-[#001311] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0b2f2a]"
            >
              <Plus size={18} />
              Tambah Advocate
            </button>
          </div>

          <div className="overflow-hidden border border-[#D9DEDB] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-[#D9DEDB] bg-[#F5F8F6]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Foto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Posisi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      No. HP
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-sm text-gray-500"
                      >
                        Memuat data...
                      </td>
                    </tr>
                  ) : lawyers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <ImageIcon
                          size={40}
                          className="mx-auto mb-3 text-gray-300"
                        />

                        <p className="text-sm text-gray-500">
                          Belum ada data advocate.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    lawyers.map((lawyer) => (
                      <tr
                        key={lawyer.id}
                        className="border-b border-[#E5E9E6] last:border-b-0 hover:bg-[#FAFCFB]"
                      >
                        <td className="px-6 py-4">
                          {lawyer.foto ? (
                            <img
                              src={getPhotoUrl(lawyer.foto)}
                              alt={lawyer.nama}
                              className="h-14 w-14 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EFEC] text-gray-400">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-[#001311]">
                            {lawyer.nama}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {lawyer.posisi}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {lawyer.email_1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {lawyer.no_hp}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleView(lawyer)}
                              className="rounded-lg border border-[#D9DEDB] px-4 py-2 text-sm font-medium text-[#0B2F2A] transition hover:bg-[#F3F6F3]"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => openEditModal(lawyer)}
                              className="flex h-9 w-9 items-center justify-center border border-[#D9DEDB] text-gray-600 transition hover:border-[#A27A44] hover:text-[#A27A44]"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(lawyer)}
                              className="flex h-9 w-9 items-center justify-center border border-[#D9DEDB] text-gray-600 transition hover:border-red-300 hover:text-red-600"
                              title="Hapus"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-[#D9DEDB] px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-[#001311]">
                  {editingId ? "Edit Advocate" : "Tambah Advocate"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Lengkapi informasi advocate.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-400 transition hover:text-[#001311]"
              >
                <X size={22} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* FOTO */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#001311]">
                  Foto Advocate
                </label>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* PREVIEW */}

                  <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D9DEDB] bg-[#F5F8F6]">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={35} className="text-gray-300" />
                    )}
                  </div>

                  {/* UPLOAD */}

                  <div className="flex-1">
                    <label
                      htmlFor="foto"
                      className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-[#BFC8C3] px-6 py-6 transition hover:border-[#A27A44] hover:bg-[#FAFCFB]"
                    >
                      <Upload size={24} className="mb-2 text-[#A27A44]" />

                      <span className="text-sm font-medium text-[#001311]">
                        Pilih foto
                      </span>

                      <span className="mt-1 text-xs text-gray-500">
                        JPG, PNG, WEBP · Maksimal 2 MB
                      </span>
                    </label>

                    <input
                      id="foto"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />

                    {selectedPhoto && (
                      <p className="mt-2 text-xs text-gray-500">
                        {selectedPhoto.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* NAMA */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#001311]">
                  Nama
                </label>

                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  required
                  placeholder="Nama lengkap"
                  className="w-full border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>

              {/* POSISI */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#001311]">
                  Posisi
                </label>

                <input
                  type="text"
                  name="posisi"
                  value={form.posisi}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Managing Partner"
                  className="w-full border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>

              {/* EMAIL 1 */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#001311]">
                  Email Utama
                </label>

                <input
                  type="email"
                  name="email_1"
                  value={form.email_1}
                  onChange={handleChange}
                  required
                  placeholder="nama@email.com"
                  className="w-full border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>

              {/* EMAIL 2 */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#001311]">
                  Email Kedua
                </label>

                <input
                  type="email"
                  name="email_2"
                  value={form.email_2}
                  onChange={handleChange}
                  placeholder="email kedua (opsional)"
                  className="w-full border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>

              {/* PHONE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#001311]">
                  Nomor HP
                </label>

                <input
                  type="text"
                  name="no_hp"
                  value={form.no_hp}
                  onChange={handleChange}
                  required
                  placeholder="08xxxxxxxxxx"
                  className="w-full border border-[#D9DEDB] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>

              {/* BUTTON */}

              <div className="flex justify-end gap-3 border-t border-[#D9DEDB] pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-[#D9DEDB] px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="bg-[#001311] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0b2f2a]"
                >
                  {editingId ? "Simpan Perubahan" : "Tambah Advocate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingAdvocate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setViewingAdvocate(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#D9DEDB] px-6 py-5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#A27A44]">
                  Advocate Profile
                </p>

                <h2 className="text-2xl font-semibold text-[#0B2F2A]">
                  {viewingAdvocate.nama}
                </h2>
              </div>

              <button
                onClick={() => setViewingAdvocate(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-[#0B2F2A]"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-6 py-8">
              {/* FOTO + IDENTITAS */}
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* FOTO */}
                <div className="h-40 w-32 shrink-0 overflow-hidden rounded-xl bg-[#F3F6F3]">
                  {viewingAdvocate.foto ? (
                    <img
                      src={`http://localhost:3500${viewingAdvocate.foto}`}
                      alt={viewingAdvocate.nama}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                      Tidak ada foto
                    </div>
                  )}
                </div>

                {/* NAMA & POSISI */}
                <div className="flex-1">
                  <p className="text-2xl font-semibold text-[#0B2F2A]">
                    {viewingAdvocate.nama}
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#A27A44]">
                    {viewingAdvocate.posisi}
                  </p>
                </div>
              </div>

              {/* INFORMASI KONTAK */}
              <div className="mt-8 border-t border-[#D9DEDB] pt-6">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-[#A27A44]">
                  Informasi Kontak
                </h3>

                <div className="space-y-5">
                  {/* EMAIL 1 */}
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Email Utama
                    </p>

                    <p className="text-sm text-[#0B2F2A]">
                      {viewingAdvocate.email_1 || "-"}
                    </p>
                  </div>

                  {/* EMAIL 2 */}
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Email Alternatif
                    </p>

                    <p className="text-sm text-[#0B2F2A]">
                      {viewingAdvocate.email_2 || "-"}
                    </p>
                  </div>

                  {/* NOMOR HP */}
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Nomor HP
                    </p>

                    <p className="text-sm text-[#0B2F2A]">
                      {viewingAdvocate.no_hp || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end border-t border-[#D9DEDB] px-6 py-4">
              <button
                onClick={() => setViewingAdvocate(null)}
                className="rounded-lg bg-[#0B2F2A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#001311]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {deleteModalOpen && selectedLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-[#001311]">
              Hapus Advocate?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Apakah Anda yakin ingin menghapus data{" "}
              <strong className="text-[#001311]">{selectedLawyer.nama}</strong>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="border border-[#D9DEDB] px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
