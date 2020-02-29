import axios from 'axios';

const api = axios.create({
    baseURL: 'https://teste.fitcard.com.br/api'
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    config.headers.grupoId = 5;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
