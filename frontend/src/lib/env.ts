// Environment variable validation
export const validateEnvironment = () => {
  const requiredVars = ["VITE_API_URL"];

  const missingVars = requiredVars.filter(
    (varName) => !import.meta.env[varName],
  );

  if (missingVars.length > 0) {
    console.warn(
      `Missing environment variables: ${missingVars.join(", ")}. ` +
        `Using default values where available.`,
    );
  }

  // Log current environment for debugging
  if (import.meta.env.DEV) {
    console.log("Environment variables:", {
      VITE_API_URL: import.meta.env.VITE_API_URL || "Using default backend URL",
      MODE: import.meta.env.MODE,
      DEV: import.meta.env.DEV,
      PROD: import.meta.env.PROD,
    });
  }
};

// Validate on module load
validateEnvironment();
