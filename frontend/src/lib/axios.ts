import axios from 'axios';

const axiosInstance=axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:8080" : import.meta.env.API_URL as string,
    withCredentials:true
});

export default axiosInstance;