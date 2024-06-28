import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

// @ts-ignore
$api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default $api