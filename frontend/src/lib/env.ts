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
};

// Validate on module load
validateEnvironment();
