import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, BookOpen, FolderKanban, LogOut, Mail, MessageSquare, Settings, Video } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";
import { brand } from "@/lib/brand";

type Status = "draft" | "published";

type RecentItem = Record<string, string | number | boolean | null | undefined>;

const emptyBlog = {
  title: "",
  slug: "",
  tag: "React",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  content: "",
  read_time: 3,
  status: "draft" as Status,
};

const emptyVideo = {
  youtube_id: "",
  title: "",
  description: "",
  published_at: "",
  featured: true,
};

const emptyProject = {
  title: "",
  slug: "",
  description: "",
  tech_stack: "React, Node.js, Tailwind CSS",
  github_url: "",
  live_url: "",
  featured: true,
};

const makeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatDate = (value?: string | number | boolean | null) => {
  if (!value || typeof value === "boolean") return "—";
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN");
};

const DataList = ({ title, items, fields, emptyText }: { title: string; items?: RecentItem[]; fields: string[]; emptyText: string }) => (
  <div className="rounded-2xl border border-border/60 bg-card p-5">
    <h2 className="font-mono text-lg font-semibold">{title}</h2>
    {!items?.length ? (
      <p className="mt-4 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">{emptyText}</p>
    ) : (
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={`${title}-${item.id ?? index}`} className="rounded-xl border border-border/60 bg-background/60 p-3 text-sm">
            {fields.map((field) => (
              <div key={field} className="flex gap-2 py-1">
                <span className="min-w-24 font-medium capitalize text-muted-foreground">{field.replace(/_/g, " ")}</span>
                <span className="break-all">{field.includes("created") ? formatDate(item[field]) : String(item[field] ?? "—")}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )}
  </div>
);

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => localStorage.getItem("devwithsunil_admin_token") || "");
  const [email, setEmail] = useState(brand.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [blog, setBlog] = useState(emptyBlog);
  const [video, setVideo] = useState(emptyVideo);
  const [project, setProject] = useState(emptyProject);

  const dashboard = useQuery({
    queryKey: ["adminDashboard", token],
    queryFn: () => api.getAdminDashboard(token),
    enabled: Boolean(token),
    retry: false,
  });

  const stats = dashboard.data?.data.stats;
  const statCards = useMemo(
    () => [
      { label: "Blogs", value: stats?.blogs ?? 0, icon: BookOpen },
      { label: "Videos", value: stats?.videos ?? 0, icon: Video },
      { label: "Projects", value: stats?.projects ?? 0, icon: FolderKanban },
      { label: "Subscribers", value: stats?.subscribers ?? 0, icon: Mail },
      { label: "Messages", value: stats?.messages ?? 0, icon: MessageSquare },
      { label: "Analytics", value: "GA", icon: BarChart3 },
      { label: "Settings", value: "Live", icon: Settings },
    ],
    [stats],
  );

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const result = await api.loginAdmin({ email, password });
      if (result.data.user.role !== "admin") {
        setError("This account is not an admin account. Check ADMIN_EMAIL and ADMIN_PASSWORD on Render.");
        return;
      }
      localStorage.setItem("devwithsunil_admin_token", result.data.token);
      setToken(result.data.token);
      setSuccess("Admin login successful.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("devwithsunil_admin_token");
    setToken("");
    setPassword("");
    queryClient.clear();
  };

  const createBlog = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.createBlogPost(token, blog);
      setBlog(emptyBlog);
      setSuccess("Blog post saved successfully.");
      dashboard.refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog post");
    }
  };

  const createVideo = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.createYoutubeVideo(token, { ...video, published_at: video.published_at || undefined });
      setVideo(emptyVideo);
      setSuccess("YouTube video saved successfully.");
      dashboard.refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create video");
    }
  };

  const createProject = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.createProject(token, {
        title: project.title,
        slug: project.slug,
        description: project.description,
        tech_stack: project.tech_stack.split(",").map((item) => item.trim()).filter(Boolean),
        github_url: project.github_url || undefined,
        live_url: project.live_url || undefined,
        featured: project.featured,
      });
      setProject(emptyProject);
      setSuccess("Project saved successfully.");
      dashboard.refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <SEO title="Admin Dashboard - DevWithSunil" description="Private DevWithSunil admin workspace." canonical={`${brand.siteUrl}/admin`} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm text-primary">Admin workspace</p>
            <h1 className="mt-2 font-mono text-3xl font-bold">DevWithSunil Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Manage real blogs, YouTube videos, projects, newsletter subscribers, and contact messages from your database.</p>
          </div>
          <div className="flex gap-3">
            <Link className="rounded-lg border border-border px-4 py-2 text-sm" to="/">View site</Link>
            {token ? <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground"><LogOut className="h-4 w-4" /> Logout</button> : null}
          </div>
        </div>

        {error ? <div className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div> : null}
        {success ? <div className="mb-4 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div> : null}
        {dashboard.error ? <div className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">Dashboard API error: {dashboard.error instanceof Error ? dashboard.error.message : "Unknown error"}</div> : null}

        {!token ? (
          <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="font-mono text-xl font-bold">Admin Login</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use the admin email and password configured in Render environment variables.</p>
            <input className="mt-5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" required />
            <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" required />
            <button className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Login</button>
          </form>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {statCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                  <card.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{card.label}</p>
                  <p className="mt-1 font-mono text-2xl font-bold">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <form onSubmit={createBlog} className="rounded-2xl border border-border/60 bg-card p-5">
                <h2 className="font-mono text-lg font-semibold">Create Blog</h2>
                <input className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Title" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value, slug: blog.slug || makeSlug(e.target.value) })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="slug-example" value={blog.slug} onChange={(e) => setBlog({ ...blog, slug: makeSlug(e.target.value) })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Tag" value={blog.tag} onChange={(e) => setBlog({ ...blog, tag: e.target.value })} required />
                <select className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" value={blog.status} onChange={(e) => setBlog({ ...blog, status: e.target.value as Status })}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <textarea className="mt-3 min-h-20 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Excerpt" value={blog.excerpt} onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })} required />
                <textarea className="mt-3 min-h-32 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Full content" value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })} required />
                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Blog</button>
              </form>

              <form onSubmit={createVideo} className="rounded-2xl border border-border/60 bg-card p-5">
                <h2 className="font-mono text-lg font-semibold">Add YouTube Video</h2>
                <input className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="YouTube video ID" value={video.youtube_id} onChange={(e) => setVideo({ ...video, youtube_id: e.target.value })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Video title" value={video.title} onChange={(e) => setVideo({ ...video, title: e.target.value })} required />
                <textarea className="mt-3 min-h-28 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Description" value={video.description} onChange={(e) => setVideo({ ...video, description: e.target.value })} />
                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Video</button>
              </form>

              <form onSubmit={createProject} className="rounded-2xl border border-border/60 bg-card p-5">
                <h2 className="font-mono text-lg font-semibold">Add Project</h2>
                <input className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Project title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value, slug: project.slug || makeSlug(e.target.value) })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="project-slug" value={project.slug} onChange={(e) => setProject({ ...project, slug: makeSlug(e.target.value) })} required />
                <textarea className="mt-3 min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Tech stack, comma separated" value={project.tech_stack} onChange={(e) => setProject({ ...project, tech_stack: e.target.value })} />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="GitHub URL" value={project.github_url} onChange={(e) => setProject({ ...project, github_url: e.target.value })} />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Live URL" value={project.live_url} onChange={(e) => setProject({ ...project, live_url: e.target.value })} />
                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Project</button>
              </form>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <DataList title="Recent Blogs" items={dashboard.data?.data.recentBlogs as RecentItem[] | undefined} fields={["title", "slug", "status", "created_at"]} emptyText="No blog posts found yet." />
              <DataList title="Recent Videos" items={dashboard.data?.data.recentVideos as RecentItem[] | undefined} fields={["title", "youtube_id", "video_url", "created_at"]} emptyText="No YouTube videos found yet." />
              <DataList title="Recent Projects" items={dashboard.data?.data.recentProjects as RecentItem[] | undefined} fields={["title", "slug", "live_url", "created_at"]} emptyText="No projects found yet." />
              <DataList title="Recent Subscribers" items={dashboard.data?.data.recentSubscribers as RecentItem[] | undefined} fields={["email", "created_at"]} emptyText="No subscribers yet." />
              <DataList title="Recent Messages" items={dashboard.data?.data.recentMessages as RecentItem[] | undefined} fields={["name", "email", "message", "created_at"]} emptyText="No contact messages yet." />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
