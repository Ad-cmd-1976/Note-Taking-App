import axios from 'axios';

const axiosInstance=axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:8080" : "https://note-taking-app-api-rs5t.onrender.com",
    withCredentials:true
});

export default axiosInstance;