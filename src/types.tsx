export interface User {
    id: number;
    name: string;
    email: string;
    type: string;
}

export interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    supplier: string;
}