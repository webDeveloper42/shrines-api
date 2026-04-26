/**
 * Central frontend environment config.
 * All VITE_ variables are resolved here with safe fallbacks for local dev.
 * Never put secrets here — Vite bundles this into the client.
 */
const env = {
  API_BASE:    import.meta.env.VITE_API_BASE    || "http://localhost:3000",
  GITHUB_URL:  import.meta.env.VITE_GITHUB_URL  || "https://github.com",
  APP_NAME:    import.meta.env.VITE_APP_NAME    || "Shrine Database",
  AUTHOR_NAME: import.meta.env.VITE_AUTHOR_NAME || "Shrine Database",
  SITE_URL:    import.meta.env.VITE_SITE_URL    || "http://localhost:5173",
};

export default env;
