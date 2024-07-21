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