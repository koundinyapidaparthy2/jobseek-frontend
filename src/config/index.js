const ENV = import.meta.env.VITE_ENV || "local";

const configs = {
  local: {
    frontendUrl: import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173",
    backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
  },
  staging: {
    frontendUrl:
      import.meta.env.VITE_FRONTEND_URL || "https://staging.yourfrontend.com",
    backendUrl: "https://staging.yourbackend.com",
  },
  production: {
    frontendUrl:
      import.meta.env.VITE_FRONTEND_URL || "https://yourfrontend.com",
    backendUrl: "https://api.yourbackend.com",
  },
};

const config = configs[ENV] || configs.local;
console.log(`Environment: ${ENV}`);
console.log(`Config: ${JSON.stringify(config)}`);
export default config;
