import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, BookOpen, FolderKanban, LogOut, Mail, MessageSquare, Settings, Video } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";
import { brand } from "@/lib/brand";

const modules = [
  { title: "Blog Posts", desc: "Create database-powered articles with draft/publish status.", icon: BookOpen },
  { title: "YouTube Videos", desc: "Add real YouTube video IDs and show them on the website.", icon: Video },
  { title: "Projects", desc: "Add real project cards with GitHub and live demo links.", icon: FolderKanban },
  { title: "Newsletter", desc: "View real subscribers from the database.", icon: Mail },
  { title: "Messages", desc: "Review real contact messages from the website.", icon: MessageSquare },
  { title: "Analytics", desc: "Track growth using Vercel Analytics and Google Analytics.", icon: BarChart3 },
  { title: "Settings", desc: "Brand email, YouTube link, SEO defaults, and social profiles.", icon: Settings },
];

const emptyBlog = {
  title: "",
  slug: "",
  tag: "React",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  content: "",
  read_time: 3,
  status: "draft" as "draft" | "published",
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

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const result = await api.loginAdmin({ email, password });
      if (result.data.user.role !== "admin") {
        setError("This account is not an admin account. Run the admin seed script first.");
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
      await api.createYoutubeVideo(token, {
        ...video,
        published_at: video.published_at || undefined,
      });
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

  const stats = dashboard.data?.data.stats;

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <SEO title="Admin Dashboard - DevWithSunil" description="Private DevWithSunil admin workspace." canonical={`${brand.siteUrl}/admin`} />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm text-primary">Admin workspace</p>
            <h1 className="mt-2 font-mono text-3xl font-bold">DevWithSunil Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage real blogs, YouTube videos, projects, newsletter subscribers, and contact messages.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="rounded-lg border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">Back to website</Link>
            {token && <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:border-destructive hover:text-destructive"><LogOut className="h-4 w-4" /> Logout</button>}
          </div>
        </div>

        {!token ? (
          <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="font-mono text-xl font-semibold">Admin Login</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use the admin account created with <code>npm run seed:admin</code>.</p>
            <input className="mt-5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            {success && <p className="mt-3 text-sm text-primary">{success}</p>}
            <button className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Login</button>
          </form>
        ) : (
          <>
            {(error || success || dashboard.isError) && (
              <div className={`mb-6 rounded-xl border p-4 text-sm ${error || dashboard.isError ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-primary/40 bg-primary/10 text-primary"}`}>
                {error || success || "Admin API is not reachable or token expired. Logout and login again."}
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
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <form onSubmit={createBlog} className="rounded-2xl border border-border/60 bg-card p-5">
                <h2 className="font-mono text-lg font-semibold">Create Blog</h2>
                <input className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Title" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="slug-example" value={blog.slug} onChange={(e) => setBlog({ ...blog, slug: e.target.value })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Tag" value={blog.tag} onChange={(e) => setBlog({ ...blog, tag: e.target.value })} required />
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
                <input className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Project title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="project-slug" value={project.slug} onChange={(e) => setProject({ ...project, slug: e.target.value })} required />
                <textarea className="mt-3 min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} required />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Tech stack, comma separated" value={project.tech_stack} onChange={(e) => setProject({ ...project, tech_stack: e.target.value })} />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="GitHub URL" value={project.github_url} onChange={(e) => setProject({ ...project, github_url: e.target.value })} />
                <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Live URL" value={project.live_url} onChange={(e) => setProject({ ...project, live_url: e.target.value })} />
                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Project</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
