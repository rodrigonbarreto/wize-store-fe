import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
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
        if (error?.response?.data) {
            throw error.response.data?.errors ? error.response.data.errors : {form: error.response.data.error};
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const getUserOrders = async (token: string) => {
    const response = await api.get('/user/orders', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
};

export const checkout = async (products: { product_id: number; quantity: number }[], token: string) => {
    const response = await api.post(
        '/cart/checkout',
        { products },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};