// import axios from "axios";

// // in production, there's no localhost so we have to make this dynamic
// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// export default api;
import axios from "axios";

// Set the backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
