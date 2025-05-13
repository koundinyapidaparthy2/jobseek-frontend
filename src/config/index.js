const ENV = import.meta.env.VITE_ENV || "local";

const configs = {
  local: {
    backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  },
  staging: {
    backendUrl: "https://staging.yourbackend.com",
  },
  production: {
    backendUrl: "https://api.yourbackend.com",
  },
};

const config = configs[ENV] || configs.local;
console.log(`Environment: ${ENV}`);
console.log(`Config: ${JSON.stringify(config)}`);
export default config;
