import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, BookOpen, Edit3, Eye, FolderKanban, Heart, LogOut, Mail, MessageSquare, RefreshCw, Search, Settings, Star, Trash2, Video } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import { api, BlogPayload, BlogPost, ProjectItem, YoutubeVideo } from "@/lib/api";
import { brand } from "@/lib/brand";

type Status = "draft" | "published";
type RecentItem = Record<string, string | number | boolean | null | undefined>;

const baseBlog = (): BlogPayload => ({
  title: "",
  slug: "",
  tag: "Full Stack Development",
  tags: ["React", "Node.js"],
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  content: "",
  read_time: 5,
  status: "draft",
  cover_image: "",
  seo_title: "",
  seo_description: "",
  scheduled_at: "",
  featured: false,
});

const emptyVideo = { youtube_id: "", title: "", description: "", published_at: "", featured: true };
const emptyProject = { title: "", slug: "", description: "", tech_stack: "React, Node.js, Tailwind CSS", github_url: "", live_url: "", featured: true };

const makeSlug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const tagsToString = (tags?: string[]) => (tags || []).join(", ");
const stringToTags = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);
const formatDate = (value?: string | number | boolean | null) => {
  if (!value || typeof value === "boolean") return "—";
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const getVideoId = (item: YoutubeVideo) => String(item.youtube_id || item.youtubeId || item.id || "");
const getProjectStack = (item: ProjectItem) => item.tech_stack || item.techStack || [];

const DataList = ({ title, items, fields, emptyText }: { title: string; items?: RecentItem[]; fields: string[]; emptyText: string }) => (
  <div className="rounded-2xl border border-border/60 bg-card p-5">
    <h2 className="font-mono text-lg font-semibold">{title}</h2>
    {!items?.length ? <p className="mt-4 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">{emptyText}</p> : (
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
  const [blog, setBlog] = useState<BlogPayload>(baseBlog());
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogStatus, setBlogStatus] = useState("all");
  const [videoSearch, setVideoSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [video, setVideo] = useState(emptyVideo);
  const [project, setProject] = useState(emptyProject);

  const dashboard = useQuery({ queryKey: ["adminDashboard", token], queryFn: () => api.getAdminDashboard(token), enabled: Boolean(token), retry: false, staleTime: 0 });
  const adminBlogs = useQuery({ queryKey: ["adminBlogs", token, blogSearch, blogStatus], queryFn: () => api.getAdminBlogPosts(token, { search: blogSearch, status: blogStatus }), enabled: Boolean(token), retry: false, staleTime: 0 });
  const adminVideos = useQuery({ queryKey: ["adminVideos", token, videoSearch], queryFn: () => api.getAdminVideos(token, videoSearch).then((res) => res.data), enabled: Boolean(token), retry: false, staleTime: 0 });
  const adminProjects = useQuery({ queryKey: ["adminProjects", token, projectSearch], queryFn: () => api.getAdminProjects(token, projectSearch).then((res) => res.data), enabled: Boolean(token), retry: false, staleTime: 0 });

  const stats = dashboard.data?.data.stats;
  const statCards = useMemo(() => [
    { label: "Blogs", value: stats?.blogs ?? adminBlogs.data?.length ?? 0, icon: BookOpen },
    { label: "Videos", value: stats?.videos ?? adminVideos.data?.length ?? 0, icon: Video },
    { label: "Projects", value: stats?.projects ?? adminProjects.data?.length ?? 0, icon: FolderKanban },
    { label: "Subscribers", value: stats?.subscribers ?? 0, icon: Mail },
    { label: "Messages", value: stats?.messages ?? 0, icon: MessageSquare },
    { label: "Analytics", value: "GA", icon: BarChart3 },
    { label: "Settings", value: "Live", icon: Settings },
  ], [stats, adminBlogs.data?.length, adminVideos.data?.length, adminProjects.data?.length]);

  const refreshAdminData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] }),
      queryClient.invalidateQueries({ queryKey: ["adminBlogs"] }),
      queryClient.invalidateQueries({ queryKey: ["adminVideos"] }),
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] }),
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] }),
      queryClient.invalidateQueries({ queryKey: ["youtubeVideos"] }),
      queryClient.invalidateQueries({ queryKey: ["projects"] }),
    ]);
  };

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
      setPassword("");
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

  const saveBlog = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const payload = {
        ...blog,
        slug: makeSlug(blog.slug || blog.title),
        tags: blog.tags || [],
        cover_image: blog.cover_image || null,
        seo_title: blog.seo_title || blog.title,
        seo_description: blog.seo_description || blog.excerpt.slice(0, 170),
        scheduled_at: blog.scheduled_at || null,
      };
      if (editingBlogId) await api.updateBlogPost(token, editingBlogId, payload);
      else await api.createBlogPost(token, payload);
      setBlog(baseBlog());
      setEditingBlogId(null);
      setSuccess(editingBlogId ? "Blog updated successfully. Dashboard and blog manager refreshed." : "Blog saved successfully. Dashboard and blog manager refreshed.");
      await refreshAdminData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save blog post");
    }
  };

  const editBlog = (post: BlogPost) => {
    setEditingBlogId(post.id || null);
    setBlog({
      title: post.title || "",
      slug: post.slug || "",
      tag: post.tag || "General",
      tags: post.tags || [],
      date: post.created_at ? new Date(post.created_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      excerpt: post.excerpt || "",
      content: post.content || "",
      read_time: post.read_time || 5,
      status: post.status || "draft",
      cover_image: post.cover_image || "",
      seo_title: post.seo_title || "",
      seo_description: post.seo_description || "",
      scheduled_at: post.scheduled_at ? new Date(post.scheduled_at).toISOString().slice(0, 16) : "",
      featured: Boolean(post.featured),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = async (id?: number) => {
    if (!id || !confirm("Delete this blog permanently?")) return;
    try {
      await api.deleteBlogPost(token, id);
      setSuccess("Blog deleted successfully.");
      await refreshAdminData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete blog");
    }
  };

  const createVideo = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.createYoutubeVideo(token, { ...video, published_at: video.published_at || undefined });
      setVideo(emptyVideo);
      setSuccess("YouTube video saved successfully. Dashboard and video manager refreshed.");
      await refreshAdminData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create video");
    }
  };

  const deleteVideo = async (id?: string | number) => {
    if (!id || !confirm("Delete this video from admin?")) return;
    try {
      await api.deleteYoutubeVideo(token, id);
      setSuccess("Video deleted successfully.");
      await refreshAdminData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete video");
    }
  };

  const createProject = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.createProject(token, {
        title: project.title,
        slug: makeSlug(project.slug || project.title),
        description: project.description,
        tech_stack: stringToTags(project.tech_stack),
        github_url: project.github_url || undefined,
        live_url: project.live_url || undefined,
        featured: project.featured,
      });
      setProject(emptyProject);
      setSuccess("Project saved successfully. Dashboard and project manager refreshed.");
      await refreshAdminData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    }
  };

  const deleteProject = async (id?: string | number) => {
    if (!id || !confirm("Delete this project from admin?")) return;
    try {
      await api.deleteProject(token, id);
      setSuccess("Project deleted successfully.");
      await refreshAdminData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
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
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Manage blogs, YouTube videos, projects, subscribers, contact messages, SEO, and scheduled publishing.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="rounded-lg border border-border px-4 py-2 text-sm" to="/">View site</Link>
            {token ? <button type="button" onClick={refreshAdminData} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm"><RefreshCw className="h-4 w-4" /> Refresh</button> : null}
            {token ? <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground"><LogOut className="h-4 w-4" /> Logout</button> : null}
          </div>
        </div>

        {error ? <div className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div> : null}
        {success ? <div className="mb-4 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div> : null}
        {dashboard.error ? <div className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">Dashboard API error: {dashboard.error instanceof Error ? dashboard.error.message : "Unknown error"}</div> : null}

        {!token ? (
          <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-lg">
            <h2 className="font-mono text-xl font-semibold">Admin Login</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use the ADMIN_EMAIL and ADMIN_PASSWORD configured on your backend.</p>
            <input className="mt-5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" required />
            <input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" required />
            <button className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Login</button>
          </form>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => {
                const Icon = card.icon;
                return <div key={card.label} className="rounded-2xl border border-border/60 bg-card p-5"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{card.label}</span><Icon className="h-5 w-5 text-primary" /></div><p className="mt-4 text-3xl font-bold">{card.value}</p></div>;
              })}
            </div>

            <form onSubmit={saveBlog} className="mt-8 rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><h2 className="font-mono text-xl font-semibold">{editingBlogId ? "Edit Blog" : "Create Blog"}</h2><button type="button" onClick={() => setShowPreview((value) => !value)} className="rounded-lg border border-border px-4 py-2 text-sm">{showPreview ? "Hide Preview" : "Show Preview"}</button></div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Blog title" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value, slug: blog.slug || makeSlug(e.target.value), seo_title: blog.seo_title || e.target.value.slice(0, 70) })} required />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="blog-slug" value={blog.slug} onChange={(e) => setBlog({ ...blog, slug: makeSlug(e.target.value) })} required />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Category / tag" value={blog.tag} onChange={(e) => setBlog({ ...blog, tag: e.target.value })} required />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Tags: React, Node.js, SEO" value={tagsToString(blog.tags)} onChange={(e) => setBlog({ ...blog, tags: stringToTags(e.target.value) })} />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" type="date" value={blog.date} onChange={(e) => setBlog({ ...blog, date: e.target.value })} required />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" type="number" min="1" placeholder="Read time" value={blog.read_time} onChange={(e) => setBlog({ ...blog, read_time: Number(e.target.value) })} required />
                <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={blog.status} onChange={(e) => setBlog({ ...blog, status: e.target.value as Status })}><option value="draft">Draft</option><option value="published">Published</option></select>
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" type="datetime-local" value={blog.scheduled_at || ""} onChange={(e) => setBlog({ ...blog, scheduled_at: e.target.value })} />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm lg:col-span-2" placeholder="Thumbnail / cover image URL" value={blog.cover_image || ""} onChange={(e) => setBlog({ ...blog, cover_image: e.target.value })} />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" maxLength={70} placeholder="SEO title" value={blog.seo_title || ""} onChange={(e) => setBlog({ ...blog, seo_title: e.target.value })} />
                <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" maxLength={170} placeholder="SEO description" value={blog.seo_description || ""} onChange={(e) => setBlog({ ...blog, seo_description: e.target.value })} />
                <textarea className="min-h-20 rounded-lg border border-border bg-background px-3 py-2 text-sm lg:col-span-2" placeholder="Excerpt" value={blog.excerpt} onChange={(e) => setBlog({ ...blog, excerpt: e.target.value, seo_description: blog.seo_description || e.target.value.slice(0, 170) })} required />
                <textarea className="min-h-72 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm lg:col-span-2" placeholder="Rich text / Markdown content. Use # headings, **bold**, lists, and links." value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })} required />
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(blog.featured)} onChange={(e) => setBlog({ ...blog, featured: e.target.checked })} /> Featured blog</label>
              {showPreview ? <div className="mt-5 rounded-xl border border-border bg-background p-5"><p className="text-xs uppercase text-muted-foreground">Preview</p><h1 className="mt-2 text-2xl font-bold">{blog.title || "Blog title"}</h1><p className="mt-2 text-muted-foreground">{blog.excerpt}</p><div className="prose prose-invert mt-4 max-w-none whitespace-pre-wrap text-sm">{blog.content}</div></div> : null}
              <div className="mt-5 flex flex-wrap gap-3"><button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{editingBlogId ? "Update Blog" : "Save Blog"}</button>{editingBlogId ? <button type="button" onClick={() => { setBlog(baseBlog()); setEditingBlogId(null); }} className="rounded-lg border border-border px-4 py-2 text-sm">Cancel Edit</button> : null}</div>
            </form>

            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><h2 className="font-mono text-xl font-semibold">Blog Manager</h2><div className="flex flex-col gap-2 sm:flex-row"><div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><input className="rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm" placeholder="Search blogs" value={blogSearch} onChange={(e) => setBlogSearch(e.target.value)} /></div><select className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={blogStatus} onChange={(e) => setBlogStatus(e.target.value)}><option value="all">All</option><option value="draft">Draft</option><option value="published">Published</option></select></div></div>
              <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="text-muted-foreground"><tr><th className="p-3">Title</th><th>Status</th><th>Featured</th><th>Views</th><th>Likes</th><th>Schedule</th><th>Actions</th></tr></thead><tbody>{adminBlogs.data?.map((post) => <tr key={post.id} className="border-t border-border"><td className="p-3"><p className="font-medium">{post.title}</p><p className="text-xs text-muted-foreground">/{post.slug}</p></td><td><span className="rounded-full border border-border px-2 py-1 text-xs">{post.status}</span></td><td>{post.featured ? <Star className="h-4 w-4 text-primary" /> : "—"}</td><td><span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" /> {post.view_count ?? 0}</span></td><td><span className="inline-flex items-center gap-1"><Heart className="h-4 w-4" /> {post.like_count ?? 0}</span></td><td>{post.scheduled_at ? formatDate(post.scheduled_at) : "—"}</td><td><div className="flex gap-2"><button type="button" onClick={() => editBlog(post)} className="rounded-lg border border-border p-2"><Edit3 className="h-4 w-4" /></button>{post.status === "published" ? <Link to={`/blog/${post.slug}`} className="rounded-lg border border-border p-2"><Eye className="h-4 w-4" /></Link> : null}<button type="button" onClick={() => deleteBlog(post.id)} className="rounded-lg border border-destructive/40 p-2 text-destructive"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>{adminBlogs.isLoading ? <p className="mt-4 text-sm text-muted-foreground">Loading blogs...</p> : null}{!adminBlogs.data?.length && !adminBlogs.isLoading ? <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No blogs found. Create your first blog above.</p> : null}</div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <form onSubmit={createVideo} className="rounded-2xl border border-border/60 bg-card p-5"><h2 className="font-mono text-lg font-semibold">Add YouTube Video</h2><input className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="YouTube video ID" value={video.youtube_id} onChange={(e) => setVideo({ ...video, youtube_id: e.target.value })} required /><input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Video title" value={video.title} onChange={(e) => setVideo({ ...video, title: e.target.value })} required /><textarea className="mt-3 min-h-28 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Description" value={video.description} onChange={(e) => setVideo({ ...video, description: e.target.value })} /><input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" type="datetime-local" value={video.published_at} onChange={(e) => setVideo({ ...video, published_at: e.target.value })} /><label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={video.featured} onChange={(e) => setVideo({ ...video, featured: e.target.checked })} /> Featured on homepage</label><button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Video</button></form>
              <form onSubmit={createProject} className="rounded-2xl border border-border/60 bg-card p-5"><h2 className="font-mono text-lg font-semibold">Add Project</h2><input className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Project title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value, slug: project.slug || makeSlug(e.target.value) })} required /><input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="project-slug" value={project.slug} onChange={(e) => setProject({ ...project, slug: makeSlug(e.target.value) })} required /><textarea className="mt-3 min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} required /><input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Tech stack, comma separated" value={project.tech_stack} onChange={(e) => setProject({ ...project, tech_stack: e.target.value })} /><input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="GitHub URL" value={project.github_url} onChange={(e) => setProject({ ...project, github_url: e.target.value })} /><input className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Live URL" value={project.live_url} onChange={(e) => setProject({ ...project, live_url: e.target.value })} /><label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={project.featured} onChange={(e) => setProject({ ...project, featured: e.target.checked })} /> Featured on homepage</label><button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Project</button></form>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-card p-5"><div className="flex items-center justify-between gap-3"><h2 className="font-mono text-lg font-semibold">Video Manager</h2><input className="max-w-52 rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Search videos" value={videoSearch} onChange={(e) => setVideoSearch(e.target.value)} /></div><div className="mt-4 space-y-3">{adminVideos.data?.map((item) => <div key={String(item.id)} className="rounded-xl border border-border/60 bg-background/60 p-3 text-sm"><p className="font-medium">{item.title}</p><p className="text-xs text-muted-foreground">{getVideoId(item)}</p><div className="mt-3 flex gap-2"><a href={item.videoUrl || item.video_url} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-3 py-1 text-xs">Open</a><button type="button" onClick={() => deleteVideo(item.id)} className="rounded-lg border border-destructive/40 px-3 py-1 text-xs text-destructive">Delete</button></div></div>)}{!adminVideos.data?.length ? <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No videos found yet.</p> : null}</div></div>
              <div className="rounded-2xl border border-border/60 bg-card p-5"><div className="flex items-center justify-between gap-3"><h2 className="font-mono text-lg font-semibold">Project Manager</h2><input className="max-w-52 rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Search projects" value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} /></div><div className="mt-4 space-y-3">{adminProjects.data?.map((item) => <div key={item.id} className="rounded-xl border border-border/60 bg-background/60 p-3 text-sm"><p className="font-medium">{item.title}</p><p className="text-xs text-muted-foreground">/{item.slug} • {getProjectStack(item).join(", ")}</p><div className="mt-3 flex gap-2">{(item.liveUrl || item.live_url) ? <a href={item.liveUrl || item.live_url} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-3 py-1 text-xs">Live</a> : null}<button type="button" onClick={() => deleteProject(item.id)} className="rounded-lg border border-destructive/40 px-3 py-1 text-xs text-destructive">Delete</button></div></div>)}{!adminProjects.data?.length ? <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No projects found yet.</p> : null}</div></div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <DataList title="Recent Blogs" items={dashboard.data?.data.recentBlogs as RecentItem[] | undefined} fields={["title", "slug", "status", "created_at"]} emptyText="No blogs found yet." />
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
