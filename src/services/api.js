import axios from "axios";

const API = axios.create({
    baseURL: "https://task-manager-system-production-4b32.up.railway.app"
});

export default API;