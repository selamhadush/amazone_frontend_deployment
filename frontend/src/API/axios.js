import axios from "axios";
const axiosInstance = axios.create({
  // local instance of fiberbase function
  // baseURL: "http://127.0.0.1:5001/clone-32c9b/us-central1/api",
  // deployed version of amazon server on render.com
  baseURL: "https://amazon-clone-deploy-jnua.onrender.com",
});
export { axiosInstance };
