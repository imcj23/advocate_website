import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  Clock3,
  Search,
} from "lucide-react";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import background from "../../assets/insight.jpg";

const API_URL = "http://localhost:3500/article/public";
const BACKEND_URL = "http://localhost:3500";

// const categories = [
//   "All",
//   "Legal Update",
//   "Corporate",
//   "Commercial",
//   "Employment",
//   "Dispute Resolution",
//   "Regulatory",
// ];

export default function Insight() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  // =====================================================
  // FETCH ARTICLES
  // =====================================================

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);
        const result = await response.json();

        console.log("PUBLIC ARTICLE STATUS:", response.status);
        console.log("PUBLIC ARTICLE RESPONSE:", result);

        if (!response.ok) {
          throw new Error(result.message || "Gagal mengambil artikel");
        }

        setArticles(result.data || []);
      } catch (error) {
        console.error("FETCH PUBLIC ARTICLE ERROR:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // =====================================================
  // ESTIMATE READ TIME
  // =====================================================

  const getReadTime = (content) => {
    if (!content) return "1 min read";

    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min read`;
  };

  // =====================================================
  // FILTER ARTICLE
  // =====================================================

  const filteredArticles = articles.filter((article) => {
    const search = searchQuery.toLowerCase();

    return (
      article.judul.toLowerCase().includes(search) ||
      article.excerpt?.toLowerCase().includes(search) ||
      article.kategori?.toLowerCase().includes(search)
    );
  });
  // =====================================================
  // FEATURED ARTICLE
  // Artikel Published terbaru
  // =====================================================

  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <main className="bg-[#F5F8F6] text-[#16352B]">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-162.5 overflow-hidden bg-[#001311] lg:min-h-180">
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

        <div className="relative z-10 mx-auto flex min-h-162.5 max-w-7xl items-center px-6 py-24 lg:min-h-180 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#A27A44]" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#F3F8F1]">
                Legal Insights
              </span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#F3F8F1] sm:text-5xl md:text-6xl lg:text-7xl">
              Legal Perspective
              <br />
              <span className="text-[#A27A44]">Practical Clarity</span>
            </h1>

            <p className="mt-8 max-w-xl text-[15px] leading-8 text-[#D8E0DC] lg:text-[17px]">
              Practical legal insight for business, investors and individuals
              navigating complex legal matters in indonesia
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-14 bg-[#8A7548]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#F3F8F1]/70">
                Knowledge · Perspective · Strategy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {loading ? (
        <section className="px-6 py-20 md:px-10 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="h-8 w-48 animate-pulse bg-[#D9DEDB]" />

            <div className="mt-8 h-96 animate-pulse bg-[#D9DEDB]" />
          </div>
        </section>
      ) : featuredArticle ? (
        <section className="relative px-6 py-20 md:px-10 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-7xl">
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
                <div className="relative flex min-h-125 flex-col justify-between p-8 md:p-12 lg:p-16">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="border border-[#8A9A93]/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#DCE4E0]">
                        {featuredArticle.kategori}
                      </span>
                      <ArrowUpRight
                        size={21}
                        className="text-[#8A7548] transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                    <h3 className="mt-12 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.035em] text-white md:text-4xl lg:text-5xl">
                      {featuredArticle.judul}
                    </h3>
                    <p className="mt-7 max-w-xl text-sm leading-7 text-[#C4D0CA] md:text-[15px]">
                      {featuredArticle.excerpt || featuredArticle.isi}
                    </p>
                  </div>
                  <div className="relative z-10 mt-12">
                    <div className="mb-6 h-px w-full bg-white/10" />
                    <div className="flex flex-wrap items-center justify-between gap-5">
                      <div className="flex flex-wrap items-center gap-5 text-[11px] text-[#B5C2BC]">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={14} />
                          {formatDate(featuredArticle.tanggal)}
                        </div>
                        <div className="h-1 w-1 rounded-full bg-[#8A7548]" />
                        <div className="flex items-center gap-2">
                          <Clock3 size={14} />
                          {getReadTime(featuredArticle.isi)}
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
                  {featuredArticle.gambar ? (
                    <img
                      src={`${BACKEND_URL}${featuredArticle.gambar}`}
                      alt={featuredArticle.judul}
                      className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={background}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity transition duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-[#16352B]/55" />

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
      ) : null}

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

              {/* SEARCH */}

              <div className="w-full lg:w-auto">
                <div className="flex items-center rounded-full border border-[#D9DEDB] bg-white px-4 py-2.5 transition focus-within:border-[#A27A44]">
                  <Search className="mr-2 h-4 w-4 text-[#71827B]" />

                  <input
                    type="text"
                    placeholder="Search insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#0B2F2A] outline-none placeholder:text-gray-400 lg:w-64"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              LOADING
          ====================================================== */}

          {loading ? (
            <div className="py-24 text-center">
              <p className="text-sm text-[#718079]">Memuat insight...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="border-b border-[#D5DDD9] py-24 text-center">
              <p className="text-sm text-[#718079]">
                Belum ada artikel pada kategori ini.
              </p>
            </div>
          ) : (
            /* =====================================================
                ARTICLE GRID
            ====================================================== */

            <div className="grid gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group overflow-hidden border border-[#D9DEDB] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* IMAGE */}

                  <div className="aspect-16/10 overflow-hidden bg-[#F3F6F3]">
                    {article.gambar ? (
                      <img
                        src={`${BACKEND_URL}${article.gambar}`}
                        alt={article.judul}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#F3F6F3] text-sm text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em]">
                      <span className="text-[#A27A44]">{article.kategori}</span>

                      <span className="text-gray-300">•</span>

                      <span className="text-gray-400">
                        {formatDate(article.tanggal)}
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-tight text-[#0B2F2A]">
                      {article.judul}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                      {article.excerpt || article.isi}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">
                        {getReadTime(article.isi)}
                      </span>

                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-sm font-medium text-[#A27A44] transition hover:text-[#0B2F2A]"
                      >
                        Read Article →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ARTICLE DETAIL MODAL
      ====================================================== */}

      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-[#D9DEDB] px-6 py-6 md:px-8">
              <div className="pr-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A27A44]">
                  {selectedArticle.kategori}
                </p>

                <h2 className="mt-3 font-serif text-2xl leading-tight text-[#0B2F2A] md:text-4xl">
                  {selectedArticle.judul}
                </h2>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span>{selectedArticle.penulis || "Law Firm"}</span>

                  <span>•</span>

                  <span>{formatDate(selectedArticle.tanggal)}</span>

                  <span>•</span>

                  <span>{getReadTime(selectedArticle.isi)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center text-2xl text-gray-400 transition hover:text-[#0B2F2A]"
                aria-label="Close article"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}

            <div className="px-6 py-7 md:px-8 md:py-9">
              {/* IMAGE */}

              {selectedArticle.gambar && (
                <div className="mb-8 overflow-hidden">
                  <img
                    src={`${BACKEND_URL}${selectedArticle.gambar}`}
                    alt={selectedArticle.judul}
                    className="max-h-112.5 w-full object-cover"
                  />
                </div>
              )}

              {/* EXCERPT */}

              {selectedArticle.excerpt && (
                <div className="mb-8 border-l-2 border-[#A27A44] pl-5">
                  <p className="text-lg leading-8 text-gray-600">
                    {selectedArticle.excerpt}
                  </p>
                </div>
              )}

              {/* ARTICLE CONTENT */}

              <article className="text-base leading-8 text-gray-700">
                {selectedArticle.isi?.split(/\r?\n/).map((paragraph, index) => (
                  <p key={index} className="mb-5 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </article>
            </div>

            {/* FOOTER */}

            <div className="border-t border-[#D9DEDB] px-6 py-5 text-right md:px-8">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#0B2F2A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#001311]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
