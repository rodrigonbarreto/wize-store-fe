import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // update to ENV file
});

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data.data;
};

export const getProductById = async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
};

export const loginRequest = async (email: string, password: string) => {
    try {
        const response = await api.post('/user/login', {
            email,
            password,
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
            throw error.response.data.errors;
        } else {
            console.error('Login failed', error);
            throw new Error('An unexpected error occurred');
        }
    }
};