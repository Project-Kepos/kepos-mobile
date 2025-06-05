import axios from 'axios';

class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AppError';
    }
}

const API_BASE_URL = 'https://694hfvjh-8080.brs.devtunnels.ms/api/v1';
// const API_BASE_URL = 'http://localhost:8080/api/v1';

export const keposApi = axios.create({
    baseURL: API_BASE_URL,
});

keposApi.registerInterceptTokenManager = (signOut, getToken) => {
    keposApi.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    keposApi.interceptors.response.use(
        (response) => response,
        async (requestError) => {
            if (
                requestError.response?.status === 403 ||
                requestError.response?.data?.message === 'Usuario não encontrado no sistema'
            ) {
                signOut();
                return Promise.reject(requestError);
            }

            if (requestError.response && requestError.response.data) {
                return Promise.reject(new AppError(requestError.response.data.message));
            } else {
                return Promise.reject(requestError);
            }
        }
    );
};
