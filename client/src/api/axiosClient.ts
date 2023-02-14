import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", 
    headers: {
        'Content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage['userChatBot']
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    }, 
    (error) => {
        if (error.response) return error.response.data
        else return { success: false, message: error.message }
    })

export default axiosClient;