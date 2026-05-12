const DEFAULT_API_URL = import.meta.env.PROD
  ? "https://devwithsunil-backend.onrender.com"
  : "http://localhost:5000";

const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, "");

interface ApiOptions extends RequestInit {
  timeout?: number;
}

export interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  tag: string;
  tags?: string[];
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  read_time?: number;
  status?: "draft" | "published";
  cover_image?: string;
  seo_title?: string;
  seo_description?: string;
  scheduled_at?: string;
  featured?: boolean;
  view_count?: number;
  like_count?: number;
  created_at?: string;
}

export interface YoutubeVideo {
  id?: string | number;
  youtube_id?: string;
  youtubeId?: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  thumbnail_url?: string;
  videoUrl?: string;
  video_url?: string;
  publishedAt?: string;
  published_at?: string;
  featured?: boolean;
  createdAt?: string;
  created_at?: string;
}

export interface ProjectItem {
  id?: number;
  title: string;
  slug: string;
  description: string;
  techStack?: string[];
  tech_stack?: string[];
  githubUrl?: string;
  github_url?: string;
  liveUrl?: string;
  live_url?: string;
  featured?: boolean;
  createdAt?: string;
  created_at?: string;
}

export type BlogPayload = {
  slug: string;
  title: string;
  tag: string;
  tags?: string[];
  date: string;
  excerpt: string;
  content: string;
  read_time: number;
  status: "draft" | "published";
  cover_image?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  scheduled_at?: string | null;
  featured?: boolean;
};

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}


const normalizeYoutubeVideo = (video: any): YoutubeVideo => ({
  id: video.id,
  youtube_id: video.youtube_id,
  youtubeId: video.youtube_id ?? video.youtubeId,
  title: video.title,
  description: video.description,
  thumbnailUrl: video.thumbnail_url ?? video.thumbnailUrl ?? (video.youtube_id ? `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg` : undefined),
  thumbnail_url: video.thumbnail_url,
  videoUrl: video.video_url ?? video.videoUrl ?? (video.youtube_id ? `https://www.youtube.com/watch?v=${video.youtube_id}` : undefined),
  video_url: video.video_url,
  publishedAt: video.published_at ?? video.publishedAt,
  published_at: video.published_at,
  featured: Boolean(video.featured),
  createdAt: video.created_at ?? video.createdAt,
  created_at: video.created_at,
});

const normalizeProject = (project: any): ProjectItem => ({
  id: project.id,
  title: project.title,
  slug: project.slug,
  description: project.description,
  techStack: Array.isArray(project.tech_stack) ? project.tech_stack : Array.isArray(project.techStack) ? project.techStack : [],
  tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
  githubUrl: project.github_url ?? project.githubUrl,
  github_url: project.github_url,
  liveUrl: project.live_url ?? project.liveUrl,
  live_url: project.live_url,
  featured: Boolean(project.featured),
  createdAt: project.created_at ?? project.createdAt,
  created_at: project.created_at,
});

const normalizeBlogPost = (post: any): BlogPost => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  tag: post.tag,
  tags: Array.isArray(post.tags) ? post.tags : [],
  date: post.date ? new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "",
  excerpt: post.excerpt,
  content: post.content,
  readTime: typeof post.readTime === "string" ? post.readTime : `${post.read_time ?? post.readTime ?? 1} min read`,
  read_time: Number(post.read_time ?? 1),
  status: post.status,
  cover_image: post.cover_image,
  seo_title: post.seo_title,
  seo_description: post.seo_description,
  scheduled_at: post.scheduled_at,
  featured: Boolean(post.featured),
  view_count: Number(post.view_count ?? 0),
  like_count: Number(post.like_count ?? 0),
  created_at: post.created_at,
});

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(async () => ({ message: await res.text().catch(() => "Unknown error") }));
      throw new ApiError(body.message || "Request failed", res.status);
    }

    if (res.status === 204) return {} as T;
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  getBlogPosts: async (search = "") => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    const data = await request<{ posts: any[] }>(`/api/blog/posts${query}`);
    return { posts: data.posts.map(normalizeBlogPost) };
  },

  getAdminBlogPosts: async (token: string, filters: { search?: string; status?: string } = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.status) params.set("status", filters.status);
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await request<{ status: string; data: any[] }>(`/api/blog/admin/posts${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data.map(normalizeBlogPost);
  },

  getBlogPost: async (slug: string) => {
    const data = await request<{ post: any }>(`/api/blog/posts/${slug}`);
    return { post: normalizeBlogPost(data.post) };
  },

  likeBlogPost: (slug: string) => request<{ status: string; like_count: number }>(`/api/blog/posts/${slug}/like`, { method: "POST" }),

  getYoutubeVideos: async () => {
    const data = await request<{ videos: any[] }>("/api/videos");
    return { videos: data.videos.map(normalizeYoutubeVideo) };
  },

  getAdminVideos: (token: string, search = "") => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return request<{ status: string; data: any[] }>(`/api/videos/admin/all${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((data) => ({ ...data, data: data.data.map(normalizeYoutubeVideo) }));
  },

  deleteYoutubeVideo: (token: string, id: string | number) =>
    request<{ status: string; message: string }>(`/api/videos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getProjects: async () => {
    const data = await request<{ projects: any[] }>("/api/projects");
    return { projects: data.projects.map(normalizeProject) };
  },

  getAdminProjects: (token: string, search = "") => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return request<{ status: string; data: any[] }>(`/api/projects/admin/all${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((data) => ({ ...data, data: data.data.map(normalizeProject) }));
  },

  deleteProject: (token: string, id: string | number) =>
    request<{ status: string; message: string }>(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  subscribeNewsletter: (email: string) =>
    request<{ status: string; message: string }>("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  sendContactMessage: (data: { name: string; email: string; message: string }) =>
    request<{ status: string; message?: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  loginAdmin: (data: { email: string; password: string }) =>
    request<{ status: string; data: { user: { id: number; name: string; email: string; role: string }; token: string } }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAdminDashboard: (token: string) =>
    request<{ status: string; data: { stats: Record<string, number>; recentMessages: unknown[]; recentSubscribers: unknown[]; recentBlogs: unknown[]; recentVideos: unknown[]; recentProjects: unknown[] } }>("/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createBlogPost: (token: string, data: BlogPayload) =>
    request<{ status: string; data: BlogPost }>("/api/blog/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  updateBlogPost: (token: string, id: number, data: BlogPayload) =>
    request<{ status: string; data: BlogPost }>(`/api/blog/posts/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  deleteBlogPost: (token: string, id: number) =>
    request<{ status: string; message: string }>(`/api/blog/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  createYoutubeVideo: (token: string, data: { youtube_id: string; title: string; description?: string; published_at?: string; featured?: boolean }) =>
    request<{ status: string; data: YoutubeVideo }>("/api/videos", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  createProject: (token: string, data: { title: string; slug: string; description: string; tech_stack: string[]; github_url?: string; live_url?: string; featured?: boolean }) =>
    request<{ status: string; data: ProjectItem }>("/api/projects", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
};

export { ApiError };
