const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

interface ApiOptions extends RequestInit {
  timeout?: number;
}

export interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt?: string;
}

export interface ProjectItem {
  id?: number;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const normalizeBlogPost = (post: any): BlogPost => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  tag: post.tag,
  date: post.date ? new Date(post.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "",
  excerpt: post.excerpt,
  content: post.content,
  readTime: typeof post.readTime === "string" ? post.readTime : `${post.read_time ?? post.readTime ?? 1} min read`,
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

    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  getBlogPosts: async () => {
    const data = await request<{ posts: any[] }>("/api/blog/posts");
    return { posts: data.posts.map(normalizeBlogPost) };
  },

  getBlogPost: async (slug: string) => {
    const data = await request<{ post: any }>(`/api/blog/posts/${slug}`);
    return { post: normalizeBlogPost(data.post) };
  },

  getYoutubeVideos: () => request<{ videos: YoutubeVideo[] }>("/api/videos"),

  getProjects: () => request<{ projects: ProjectItem[] }>("/api/projects"),

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

  createBlogPost: (token: string, data: { slug: string; title: string; tag: string; date: string; excerpt: string; content: string; read_time: number; status: "draft" | "published" }) =>
    request<{ status: string; data: BlogPost }>("/api/blog/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
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
