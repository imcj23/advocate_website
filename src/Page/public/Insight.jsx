import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  X,
  CalendarDays,
  Clock3,
  Tag,
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import background from "../../assets/insight.jpg";

const insightData = [
  {
    id: 1,
    category: "Business Law",
    title: "Memahami Klausul Penting dalam Perjanjian Bisnis",
    excerpt:
      "Perjanjian bisnis menjadi dasar penting dalam hubungan komersial. Berikut beberapa klausul yang perlu diperhatikan sebelum sebuah perjanjian ditandatangani.",
    date: "10 September 2026",
    readTime: "5 min read",
    featured: true,
    content: [
      "Perjanjian merupakan salah satu instrumen hukum yang penting dalam kegiatan bisnis. Melalui perjanjian, para pihak dapat menetapkan hak, kewajiban, serta batas tanggung jawab masing-masing pihak.",
      "Sebelum menandatangani sebuah perjanjian, terdapat sejumlah klausul yang perlu diperhatikan. Klausul mengenai identitas para pihak, ruang lingkup pekerjaan, pembayaran, jangka waktu, serta hak dan kewajiban perlu dirumuskan secara jelas.",
      "Selain itu, mekanisme penyelesaian sengketa juga menjadi bagian penting dalam suatu perjanjian. Para pihak dapat menentukan terlebih dahulu apakah sengketa akan diselesaikan melalui negosiasi, mediasi, arbitrase, atau pengadilan.",
      "Perjanjian yang disusun secara jelas dan komprehensif dapat membantu mengurangi potensi perselisihan di kemudian hari.",
    ],
  },

  {
    id: 2,
    category: "Corporate",
    title: "Mengapa Legal Due Diligence Penting bagi Perusahaan?",
    excerpt:
      "Legal due diligence membantu perusahaan memahami risiko hukum sebelum melakukan transaksi, investasi, maupun kerja sama bisnis.",
    date: "7 September 2026",
    readTime: "6 min read",
    content: [
      "Legal due diligence merupakan proses pemeriksaan aspek hukum terhadap suatu perusahaan, aset, maupun transaksi tertentu.",
      "Pemeriksaan dapat mencakup dokumen perusahaan, perizinan, kontrak, kepemilikan aset, ketenagakerjaan, hingga potensi sengketa hukum.",
      "Bagi perusahaan, proses ini penting untuk mengidentifikasi risiko sebelum keputusan bisnis diambil.",
      "Dengan memahami kondisi hukum secara menyeluruh, perusahaan dapat membuat keputusan dengan pertimbangan yang lebih baik.",
    ],
  },

  {
    id: 3,
    category: "Litigation",
    title: "Langkah yang Perlu Dipertimbangkan dalam Sengketa Bisnis",
    excerpt:
      "Sengketa bisnis membutuhkan strategi yang tepat agar penyelesaian dapat dilakukan secara efektif dan sesuai kepentingan para pihak.",
    date: "3 September 2026",
    readTime: "5 min read",
    content: [
      "Sengketa dalam hubungan bisnis dapat muncul karena berbagai faktor, mulai dari perbedaan interpretasi kontrak hingga kegagalan memenuhi kewajiban.",
      "Sebelum menempuh proses litigasi, para pihak dapat mempertimbangkan penyelesaian secara non-litigasi seperti negosiasi atau mediasi.",
      "Apabila penyelesaian tidak tercapai, proses hukum dapat dipertimbangkan berdasarkan karakteristik dan posisi hukum masing-masing pihak.",
      "Setiap sengketa memiliki karakteristik yang berbeda sehingga strategi penyelesaian perlu disusun berdasarkan fakta dan dokumen yang tersedia.",
    ],
  },

  {
    id: 4,
    category: "Commercial",
    title: "Hal yang Perlu Diperhatikan Sebelum Menandatangani Kontrak",
    excerpt:
      "Kontrak yang baik tidak hanya mengatur kewajiban para pihak, tetapi juga memberikan kejelasan mengenai risiko dan mekanisme penyelesaiannya.",
    date: "29 Agustus 2026",
    readTime: "4 min read",
    content: [
      "Kontrak merupakan dokumen hukum yang dapat menjadi dasar hubungan antara dua pihak atau lebih.",
      "Sebelum menandatangani kontrak, penting untuk memastikan bahwa seluruh ketentuan telah dipahami dan sesuai dengan kesepakatan.",
      "Beberapa hal yang dapat diperhatikan antara lain identitas para pihak, objek perjanjian, jangka waktu, pembayaran, wanprestasi, force majeure, serta mekanisme penyelesaian sengketa.",
    ],
  },

  {
    id: 5,
    category: "Legal Update",
    title: "Mengikuti Perubahan Regulasi dalam Dunia Usaha",
    excerpt:
      "Perubahan regulasi dapat memberikan dampak langsung maupun tidak langsung terhadap kegiatan operasional perusahaan.",
    date: "24 Agustus 2026",
    readTime: "4 min read",
    content: [
      "Lingkungan bisnis terus berkembang seiring dengan perubahan regulasi dan kebijakan pemerintah.",
      "Perusahaan perlu memperhatikan perubahan tersebut agar kegiatan usaha tetap berjalan sesuai dengan ketentuan yang berlaku.",
      "Pemantauan regulasi secara berkala dapat membantu perusahaan mengidentifikasi kewajiban baru maupun potensi risiko hukum.",
    ],
  },

  {
    id: 6,
    category: "Legal Tips",
    title: "5 Hal yang Harus Dicek Sebelum Membuat Perjanjian",
    excerpt:
      "Beberapa pemeriksaan sederhana dapat membantu memastikan bahwa perjanjian telah memuat ketentuan yang dibutuhkan oleh para pihak.",
    date: "20 Agustus 2026",
    readTime: "3 min read",
    content: [
      "Menyusun perjanjian membutuhkan ketelitian agar kepentingan para pihak dapat dituangkan secara jelas.",
      "Lima hal yang dapat diperiksa antara lain identitas para pihak, objek perjanjian, hak dan kewajiban, jangka waktu, serta mekanisme penyelesaian sengketa.",
      "Pemeriksaan tersebut dapat menjadi langkah awal untuk mengurangi potensi kesalahpahaman dalam pelaksanaan perjanjian.",
    ],
  },

  {
    id: 7,
    category: "Business Law",
    title: "Pentingnya Kejelasan Hak dan Kewajiban dalam Kontrak",
    excerpt:
      "Kejelasan pembagian hak dan kewajiban membantu para pihak memahami tanggung jawab masing-masing selama kontrak berlangsung.",
    date: "15 Agustus 2026",
    readTime: "4 min read",
    content: [
      "Setiap kontrak idealnya memberikan kejelasan mengenai apa yang menjadi hak dan kewajiban masing-masing pihak.",
      "Ketentuan yang terlalu umum dapat menimbulkan perbedaan interpretasi ketika kontrak mulai dilaksanakan.",
      "Oleh karena itu, penyusunan klausul yang spesifik dan mudah dipahami menjadi salah satu aspek penting dalam penyusunan kontrak.",
    ],
  },

  {
    id: 8,
    category: "Corporate",
    title: "Peran Legal Counsel dalam Pengambilan Keputusan Bisnis",
    excerpt:
      "Pendampingan hukum sejak tahap awal dapat membantu perusahaan mempertimbangkan aspek legal dalam setiap keputusan strategis.",
    date: "10 Agustus 2026",
    readTime: "5 min read",
    content: [
      "Keputusan bisnis tidak hanya berkaitan dengan aspek komersial, tetapi juga memiliki konsekuensi hukum.",
      "Legal counsel dapat membantu perusahaan melakukan identifikasi risiko, meninjau dokumen, serta memberikan pertimbangan hukum terhadap keputusan tertentu.",
      "Pendekatan preventif memungkinkan potensi masalah hukum untuk diidentifikasi sebelum berkembang menjadi sengketa.",
    ],
  },
];

const categories = [
  "All",
  "Business Law",
  "Corporate",
  "Litigation",
  "Commercial",
  "Legal Update",
  "Legal Tips",
];

export default function Insight() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredArticle = insightData.find((article) => article.featured);

  const filteredArticles =
    activeCategory === "All"
      ? insightData.filter((article) => !article.featured)
      : insightData.filter(
          (article) => article.category === activeCategory && !article.featured,
        );

  return (
    <main className="bg-[#F5F8F6] text-[#16352B]">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-162.5 overflow-hidden bg-[#001311] lg:min-h-180">
        {/* IMAGE */}
        <div className="absolute inset-0 lg:left-[27%]">
          <img
            src={background}
            alt="Legal Insights"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#001311] via-[#001311]/75 to-[#001311]/10" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#001311] to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-162.5 max-w-7xl items-center px-6 py-24 lg:min-h-180 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#8A7548]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F3F8F1]">
                Legal Insights
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#F3F8F1] sm:text-5xl md:text-6xl lg:text-7xl">
              Perspectives
              <br />
              on Law.
              <br />
              <span className="text-[#8A7548]">Insight for Business.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-xl text-[15px] leading-8 text-[#D8E0DC] lg:text-[17px]">
              Wawasan hukum, perkembangan regulasi, dan perspektif strategis
              untuk membantu Anda memahami berbagai persoalan hukum dalam dunia
              bisnis.
            </p>

            {/* BOTTOM META */}
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-14 bg-[#8A7548]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#F3F8F1]/70">
                Knowledge · Perspective · Strategy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED INSIGHT
      ====================================================== */}
      {featuredArticle && (
        <section className="relative px-6 py-20 md:px-10 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-7xl">
            {/* SECTION INTRO */}
            <div className="mb-10 flex items-end justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#8A7548]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#71827B]">
                    Featured
                  </span>
                </div>

                <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">
                  Featured Insight
                </h2>
              </div>
            </div>

            {/* FEATURED CARD */}
            <article className="group relative overflow-hidden bg-[#16352B]">
              <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
                {/* CONTENT */}
                <div className="relative flex min-h-125 flex-col justify-between p-8 md:p-12 lg:p-16">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="border border-[#8A9A93]/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#DCE4E0]">
                        {featuredArticle.category}
                      </span>

                      <ArrowUpRight
                        size={21}
                        className="text-[#8A7548] transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                    <h3 className="mt-12 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.035em] text-white md:text-4xl lg:text-5xl">
                      {featuredArticle.title}
                    </h3>
                    <p className="mt-7 max-w-xl text-sm leading-7 text-[#C4D0CA] md:text-[15px]">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="relative z-10 mt-12">
                    <div className="mb-6 h-px w-full bg-white/10" />

                    <div className="flex flex-wrap items-center justify-between gap-5">
                      <div className="flex flex-wrap items-center gap-5 text-[11px] text-[#B5C2BC]">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={14} />
                          {featuredArticle.date}
                        </div>

                        <div className="h-1 w-1 rounded-full bg-[#8A7548]" />

                        <div className="flex items-center gap-2">
                          <Clock3 size={14} />
                          {featuredArticle.readTime}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedArticle(featuredArticle)}
                        className="flex items-center gap-2 border-b border-[#8A7548] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:text-[#C7B889]"
                      >
                        Read Insight
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* VISUAL PANEL */}
                <div className="relative hidden min-h-125 overflow-hidden bg-[#001311] lg:block">
                  <img
                    src={background}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[#16352B]/55" />

                  {/* Editorial lines */}
                  <div className="absolute inset-8 border border-white/10" />

                  <div className="absolute left-12 top-12">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#D5DED9]">
                      Legal Perspective
                    </span>
                  </div>

                  <div className="absolute bottom-12 right-12 text-right">
                    <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#B8C6BF]">
                      Featured Article
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* =====================================================
          LATEST INSIGHTS
      ====================================================== */}
      <section className="px-6 pb-24 md:px-10 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="border-b border-[#CDD6D1] pb-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#8A7548]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#71827B]">
                    Latest Insights
                  </span>
                </div>

                <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">
                  Legal Perspectives
                </h2>
              </div>

              {/* FILTER */}
              <div className="flex max-w-full gap-1 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-[#16352B] text-white"
                        : "text-[#718079] hover:bg-[#E4EAE7] hover:text-[#16352B]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ARTICLE GRID */}
          {filteredArticles.length > 0 ? (
            <div className="grid gap-x-6 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className="group relative flex min-h-107.5 cursor-pointer flex-col justify-between border-b border-[#D5DDD9] py-9 lg:min-h-110 lg:px-5 lg:first:pl-0"
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* TOP */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#718079]">
                        {article.category}
                      </span>

                      <span className="text-xs font-medium text-[#A0ADA7]">
                        {String(index + 2).padStart(2, "0")}
                      </span>
                    </div>

                    {/* GOLD LINE */}
                    <div className="mt-7 h-px w-8 bg-[#8A7548] transition-all duration-500 group-hover:w-16" />

                    {/* TITLE */}
                    <h3 className="mt-7 text-[23px] font-medium leading-[1.2] tracking-tight text-[#16352B] transition-colors duration-300 group-hover:text-[#6E5E3B]">
                      {article.title}
                    </h3>

                    {/* EXCERPT */}
                    <p className="mt-5 text-[13px] leading-6 text-[#718079]">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-[#829089]">
                        <CalendarDays size={13} />
                        {article.date}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-[#829089]">
                        <Clock3 size={13} />
                        {article.readTime}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#16352B]">
                        Read Insight
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center border border-[#D2DAD6] transition-all duration-300 group-hover:border-[#16352B] group-hover:bg-[#16352B] group-hover:text-white">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-b border-[#D5DDD9] py-24 text-center">
              <p className="text-sm text-[#718079]">
                Belum ada artikel pada kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ARTICLE MODAL
      =========================================aa============= */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#001311]/80 px-4 py-5 backdrop-blur-md md:px-8"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden bg-[#F5F8F6] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL TOP */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#D5DDD9] bg-[#F5F8F6] px-6 py-4 md:px-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#8A7548]" />

                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#687A72]">
                  <Tag size={13} />
                  {selectedArticle.category}
                </div>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="group flex h-10 w-10 items-center justify-center border border-[#D0D9D5] transition duration-300 hover:border-[#16352B] hover:bg-[#16352B] hover:text-white"
                aria-label="Close"
              >
                <X
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="overflow-y-auto">
              <div className="px-6 py-10 md:px-12 md:py-14 lg:px-16">
                {/* META */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.12em] text-[#788881]">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={13} />
                    {selectedArticle.date}
                  </div>

                  <span className="h-1 w-1 rounded-full bg-[#8A7548]" />

                  <div className="flex items-center gap-2">
                    <Clock3 size={13} />
                    {selectedArticle.readTime}
                  </div>
                </div>

                {/* TITLE */}
                <h1 className="mt-7 max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-[#16352B] md:text-5xl lg:text-6xl">
                  {selectedArticle.title}
                </h1>

                {/* INTRO */}
                <p className="mt-8 max-w-3xl border-l-2 border-[#8A7548] pl-5 text-[15px] leading-7 text-[#61736C] md:text-[17px] md:leading-8">
                  {selectedArticle.excerpt}
                </p>

                {/* DIVIDER */}
                <div className="my-10 h-px bg-[#D5DDD9]" />

                {/* ARTICLE BODY */}
                <div className="max-w-3xl space-y-7">
                  {selectedArticle.content.map((paragraph, index) => (
                    <div key={index} className="flex gap-5">
                      <span className="pt-1 text-[10px] font-semibold text-[#9A8A64]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-[15px] leading-8 text-[#4F625A] md:text-base">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ARTICLE CTA */}
                <div className="mt-14 border-t border-[#D5DDD9] pt-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718079]">
                        Need Legal Advice?
                      </p>

                      <p className="mt-2 text-sm text-[#61736C]">
                        Discuss your legal matter with our team.
                      </p>
                    </div>

                    <button className="group flex w-fit items-center gap-3 bg-[#16352B] px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#8A7548]">
                      Contact Us
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
