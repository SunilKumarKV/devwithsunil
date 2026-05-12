const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8080",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:8080",
  "https://devwithsunil.vercel.app",
];

const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1):(3000|5173|5174|8080)$/;
const vercelPreviewPattern = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

const buildAllowedOrigins = () => {
  const envOrigins = parseList(process.env.CORS_ORIGIN || process.env.FRONTEND_URL);
  return Array.from(new Set([...defaultOrigins, ...envOrigins]));
};

const allowedOrigins = buildAllowedOrigins();
const exactOriginSet = new Set(allowedOrigins);
const customPatterns = allowedOrigins
  .filter((origin) => origin.includes("*") || origin.includes("localhost:") || origin.includes("127.0.0.1:"))
  .map((origin) => new RegExp(`^${escapeRegex(origin).replace(/\\\*/g, ".*")}$`, "i"));

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (exactOriginSet.has(origin)) return true;
  if (localhostPattern.test(origin)) return true;
  if (vercelPreviewPattern.test(origin)) return true;
  return customPatterns.some((pattern) => pattern.test(origin));
};

const corsOptions = {
  origin(origin, callback) {
    if (isOriginAllowed(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

module.exports = {
  corsOptions,
  allowedOrigins,
  isOriginAllowed,
};
