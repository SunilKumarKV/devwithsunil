import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, BookOpen, FolderKanban, Mail, MessageSquare, Settings, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";
import { brand } from "@/lib/brand";

const modules = [
  { title: "Blog Posts", desc: "Create, edit, draft, publish, and optimize technical articles.", icon: BookOpen },
  { title: "YouTube Videos", desc: "Add real YouTube video IDs, thumbnails, descriptions, and featured status.", icon: Video },
  { title: "Projects", desc: "Manage real project cards, GitHub links, live demos, and case studies.", icon: FolderKanban },
  { title: "Newsletter", desc: "View subscribers and plan email updates for new tutorials.", icon: Mail },
  { title: "Messages", desc: "Review contact form messages from learners, clients, and collaborators.", icon: MessageSquare },
  { title: "Analytics", desc: "Track page views, popular content, and conversion paths.", icon: BarChart3 },
  { title: "Settings", desc: "Update brand links, contact email, SEO defaults, and social profiles.", icon: Settings },
];

const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem("devwithsunil_admin_token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dashboard = useQuery({
    queryKey: ["adminDashboard", token],
    queryFn: () => api.getAdminDashboard(token),
    enabled: Boolean(token),
    retry: false,
  });

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const result = await api.loginAdmin({ email, password });
      if (result.data.user.role !== "admin") {
        setError("This account is not an admin account.");
        return;
      }
      localStorage.setItem("devwithsunil_admin_token", result.data.token);
      setToken(result.data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const stats = dashboard.data?.data.stats;

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <SEO title="Admin Dashboard - DevWithSunil" canonical={`${brand.siteUrl}/admin`} />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm text-primary">Admin workspace</p>
            <h1 className="mt-2 font-mono text-3xl font-bold">DevWithSunil Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage blogs, YouTube content, newsletter subscribers, contact messages, projects, and production settings.
            </p>
          </div>
          <Link to="/" className="rounded-lg border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">
            Back to website
          </Link>
        </div>

        {!token ? (
          <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="font-mono text-xl font-semibold">Admin Login</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use an admin user from your backend database.</p>
            <input
              className="mt-5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            <button className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Login
            </button>
          </form>
        ) : (
          <>
            {dashboard.isError && (
              <div className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                Admin API is not reachable or token expired. Clear local storage and login again.
              </div>
            )}

            <div className="mb-6 grid gap-4 md:grid-cols-5">
              {Object.entries(stats || { blogs: 0, videos: 0, subscribers: 0, messages: 0, projects: 0 }).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-border/60 bg-card p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{key}</p>
                  <p className="mt-2 font-mono text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((card) => (
                <div key={card.title} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:border-primary/40">
                  <card.icon className="mb-4 h-6 w-6 text-primary" />
                  <h2 className="font-mono text-lg font-semibold">{card.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                  <span className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary">Module ready</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
