const Env = {
  ENV: import.meta.env.VITE_ENV,
  DEBUGGER: import.meta.env.VITE_DEBUGGER === "true",
  API_URL: import.meta.env.VITE_API_URL,
};

export default Env;
