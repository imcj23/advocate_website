import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  BriefcaseBusiness,
  Users,
  FileText,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";
import Navbar from "../../Components/admin/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    practice: 0,
    advocate: 0,
    article: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Gagal membaca data user:", error);
      }
    }

    // eslint-disable-next-line react-hooks/immutability
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const [practiceResponse, advocateResponse, articleResponse] =
        await Promise.all([
          fetch("http://localhost:3500/practice", {
            headers,
          }),

          fetch("http://localhost:3500/advocate", {
            headers,
          }),
          fetch("http://localhost:3500/article", { 
            headers }),
        ]);

      const practiceResult = await practiceResponse.json();
      const advocateResult = await advocateResponse.json();
      const articleResult = await articleResponse.json();

      setStats({
        practice: practiceResult.data?.length || 0,
        advocate: advocateResult.data?.length || 0,
        article: articleResult.data?.length || 0,
      });
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: "Practice",
      description: "Kelola layanan hukum",
      count: stats.practice,
      icon: BriefcaseBusiness,
      path: "/admin/practice",
    },
    {
      title: "Advokat",
      description: "Kelola profil Advokat",
      count: stats.advocate,
      icon: Users,
      path: "/admin/advocate",
    },
    {
      title: "Article",
      description: "Kelola artikel & insight",
      count: stats.article,
      icon: FileText,
      path: "/admin/article",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F6F3] text-[#001311]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:py-14">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-[#A27A44]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#A27A44]">
              Dashboard
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl">
            Welcome back,{" "}
            <span className="text-[#A27A44]">
              {user?.nama || "Administrator"}
            </span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Kelola konten website law firm melalui Content Management System.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className="group border border-[#D9DEDB] bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#A27A44] hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center bg-[#001311] text-[#C9A96E]">
                    <Icon size={19} strokeWidth={1.5} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.5}
                    className="text-gray-300 transition group-hover:text-[#A27A44]"
                  />
                </div>

                <div className="mt-7">
                  <div className="flex items-end gap-2">
                    <span className="font-serif text-4xl">
                      {loading ? "—" : item.count}
                    </span>

                    <span className="mb-1 text-xs text-gray-400">items</span>
                  </div>

                  <h3 className="mt-2 text-base font-medium">{item.title}</h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ======================================
            QUICK ACCESS
        ======================================= */}

        <section className="mt-10 border border-[#D9DEDB] bg-[#001311] p-7 md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <LayoutDashboard
                  size={17}
                  strokeWidth={1.5}
                  className="text-[#C9A96E]"
                />

                <span className="text-xs uppercase tracking-[0.18em] text-[#C9A96E]">
                  Quick Access
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white">
                Manage your website
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                Pilih bagian website yang ingin kamu kelola dan perbarui dari
                CMS.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/practice")}
              className="group flex shrink-0 items-center justify-center gap-3 border border-[#C9A96E] px-5 py-3 text-sm text-[#C9A96E] transition hover:bg-[#C9A96E] hover:text-[#001311]"
            >
              Manage Practice
              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </section>

        {/* ======================================
            FOOTER
        ======================================= */}

        <div className="mt-10 border-t border-[#D9DEDB] pt-5">
          <p className="text-xs text-gray-400">
            Law Firm CMS · Content Management System
          </p>
        </div>
      </main>
    </div>
  );
}
