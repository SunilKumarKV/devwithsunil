const dotenv = require("dotenv");
const path = require("path");

// Load appropriate environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.join(__dirname, "..", envFile) });

// Required environment variables
const requiredVars = ["JWT_SECRET", "DATABASE_URL"];

// Validate required variables (skip in test mode - tests can run with mock data)
const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0 && process.env.NODE_ENV !== "test") {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach((varName) => console.error(`   - ${varName}`));
  console.error("\nPlease set these variables in your .env file or deployment environment.");
  process.exit(1);
}

if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32 && process.env.NODE_ENV !== "test") {
  console.error("❌ JWT_SECRET must be at least 32 characters long");
  console.error(`   Current length: ${process.env.JWT_SECRET.length}`);
  process.exit(1);
}

const missingEmailConfig = ["EMAIL_USER", "EMAIL_PASS", "EMAIL_HOST", "EMAIL_PORT", "EMAIL_TO"].filter(
  (varName) => !process.env[varName],
);
if (missingEmailConfig.length > 0) {
  console.warn("⚠️ Email sending is not fully configured:");
  missingEmailConfig.forEach((varName) => console.warn(`   - ${varName}`));
  console.warn("Contact and newsletter email notifications may be disabled.");
}

console.log("✅ Environment validation passed");

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_TO: process.env.EMAIL_TO,
  FRONTEND_URL: process.env.FRONTEND_URL || "https://devwithsunil.vercel.app",
  CORS_ORIGIN: process.env.CORS_ORIGIN || process.env.FRONTEND_URL || "https://devwithsunil.vercel.app",
};
