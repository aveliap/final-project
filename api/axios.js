import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/v1",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response, // jika reposne berhasil , kembalikan tanpa modifikasi
    (error) => {
        if (error.response && error.response.status === 401) {
            //jika status 401 Unauthorized di handle lalu di arahkan ke halaman login
            // window.location = "/login";
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
