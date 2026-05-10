const API_URL =
  import.meta.env.VITE_API_URL || "https://devwithsunil-backend.onrender.com";

interface ApiOptions extends RequestInit {
  timeout?: number;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface BlogPost {
  slug: string;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
}

async function request<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
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
      const body = await res.text().catch(() => "Unknown error");
      throw new ApiError(body, res.status);
    }

    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  // Blog
  getBlogPosts: () => request<{ posts: BlogPost[] }>("/api/blog/posts"),
  getBlogPost: (slug: string) =>
    request<{ post: BlogPost }>(`/api/blog/posts/${slug}`),

  // Newsletter
  subscribeNewsletter: (email: string) =>
    request<{ message: string }>("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  // Contact
  sendContactMessage: (data: {
    name: string;
    email: string;
    message: string;
  }) =>
    request<{ message: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export { ApiError };
