import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  Scale,
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Discuss from "../../assets/discuss.jpg";

export default function Contact() {
  const [contact, setContact] = useState({
    no_hp: "",
    email_office: "",
  });

  const [loadingContact, setLoadingContact] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("http://localhost:3500/advocate");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Gagal mengambil data contact",
          );
        }

        // Backend /advocate mengembalikan data di dalam result.data
        const advocate = result?.data;

        if (!advocate) {
          throw new Error("Data advocate tidak ditemukan.");
        }

        console.log("DATA CONTACT:", advocate);

        setContact({
          no_hp: advocate.no_hp || "",
          email_office: advocate.email_office || "",
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingContact(false);
      }
    };

    fetchContact();
  }, []);

  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    email: "",
    kebutuhan: "",
    pesan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const kebutuhanText =
      formData.kebutuhan || "Belum menentukan kebutuhan hukum";

    const message = `
Halo, saya ingin melakukan konsultasi hukum.
*Data Pemohon*
Nama: ${formData.nama}
Nomor Telepon: ${formData.telepon}
Email: ${formData.email}

*Kebutuhan Hukum*
${kebutuhanText}

*Pesan*
${formData.pesan}

Saya berharap dapat memperoleh informasi dan arahan terkait kebutuhan hukum tersebut.

Terima kasih.
    `.trim();

    // Nomor WhatsApp diambil dari database
    // melalui endpoint /advocate
    const whatsappNumber = String(contact.no_hp || "").replace(/\D/g, "");

    if (!whatsappNumber) {
      alert("Nomor WhatsApp belum tersedia.");
      return;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    // Hanya satu kali membuka WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="bg-[#F5F7F5] text-[#001311]">
      <Navbar />
      <div className="relative overflow-hidden bg-[#001311]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[65%]">
          <img
            src={Discuss}
            alt="Our Firm"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#001311] via-[#001311]/25 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#A27A44]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                Contact Us
              </span>
            </div>

            <h1 className="text-[#F3F8F1] font-serif text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              Let's talk about it
              <span className="block text-[#C9A96E]">your legal issues.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white md:text-base">
              Every legal issue requires a proper understanding. Tell us about
              your legal needs and receive professional, strategic, and
              solution-oriented assistance.
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

      <section className="px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="mb-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A27A44]">
                Office Information
              </span>

              <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-[#001311]">
                We are ready to help
                <span className="block">your legal needs.</span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 border-t border-[#d9dedb] pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#A27A44]/40">
                  <MapPin
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#A27A44]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001311]/45">
                    Office Addres
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#001311]/70">
                    <span className="font-bold">Jakarta</span>
                    <br />
                    Jl.Letjen TB Simatupang Kav.20 Gedung ratu prabu 1 lt.1,
                    cilandak, jakarta selatan 12560
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-t border-[#d9dedb] pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#A27A44]/40">
                  <MapPin
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#A27A44]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001311]/45">
                    Office Addres
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#001311]/70">
                    <span className="font-bold">Batam</span>
                    <br />
                    business center adhya building tower 3rd floor Jl. Jendral
                    Sudirman, Bukit indah sukajadi, Kota Batam 2962
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 border-t border-[#d9dedb] pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#A27A44]/40">
                  <Phone
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#A27A44]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001311]/45">
                    WhatsApp
                  </p>

                  <p className="mt-2 text-sm text-[#001311]/70">
                    {loadingContact
                      ? "Loading..."
                      : contact.no_hp
                        ? `+${contact.no_hp}`
                        : "-"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 border-t border-[#d9dedb] pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#A27A44]/40">
                  <Mail
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#A27A44]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001311]/45">
                    Email
                  </p>

                  <p className="mt-2 text-sm text-[#001311]/70">
                    {loadingContact
                      ? "Loading..."
                      : contact.email_office || "-"}
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4 border-t border-[#d9dedb] pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#A27A44]/40">
                  <Clock
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#A27A44]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001311]/45">
                    Operational Hours
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#001311]/70">
                    Monday – Friday
                    <br />
                    09.00 – 17.00 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Small Note */}
            <div className="mt-8 border-l-2 border-[#A27A44] bg-white px-5 py-4">
              <p className="text-xs leading-6 text-[#001311]/55">
                Any information conveyed in the consultation process is handled
                with professionalism and client confidentiality.
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="border border-[#d9dedb] bg-white p-6 md:p-8 lg:p-10">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[#001311]">
                  <Scale
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#C9A96E]"
                  />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#001311]/45">
                  Konsultation Form
                </span>
              </div>

              <h2 className="font-serif text-3xl font-medium text-[#001311]">
                Convey your needs
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#001311]/50">
                Please complete the following information so we can better
                understand your legal needs.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#001311]/55">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="..."
                    required
                    className="w-full border border-[#d9dedb] bg-[#F8FAF8] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#001311]/55">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    placeholder="....."
                    required
                    className="w-full border border-[#d9dedb] bg-[#F8FAF8] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#001311]/55">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  required
                  className="w-full border border-[#d9dedb] bg-[#F8FAF8] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#001311]/55">
                  Legal Requirements
                </label>

                <select
                  name="kebutuhan"
                  value={formData.kebutuhan}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none border border-[#d9dedb] bg-[#F8FAF8] px-4 py-3 text-sm text-[#001311]/70 outline-none transition focus:border-[#A27A44]"
                >
                  <option value="" disabled>
                    Select Legal Needs
                  </option>

                  <option value="Business & Corporate">
                    Business & Corporate
                  </option>

                  <option value="Contract & Commercial">
                    Contract & Commercial
                  </option>

                  <option value="Dispute Resolution">
                    Dispute Resolution
                  </option>

                  <option value="Employment & Industrial Relations">
                    Employment & Industrial Relations
                  </option>

                  <option value="Legal Opinion & Due Diligence">
                    Legal Opinion & Due Diligence
                  </option>

                  <option value="Mergers & Acquisitions">
                    Mergers & Acquisitions
                  </option>

                  <option value="Banking & Finance">
                    Banking & Finance
                  </option>

                  <option value="Regulatory & Compliance">
                    Regulatory & Compliance
                  </option>

                  <option value="Lainnya">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#001311]/55">
                  Message
                </label>

                <textarea
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Briefly explain your legal needs or issues..."
                  required
                  className="w-full resize-none border border-[#d9dedb] bg-[#F8FAF8] px-4 py-3 text-sm outline-none transition focus:border-[#A27A44]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-between bg-[#001311] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#A27A44]"
              >
                <span>Submit Consultation Request</span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A27A44] transition-all duration-300 group-hover:bg-[#001311] group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight size={17} strokeWidth={1.5} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}