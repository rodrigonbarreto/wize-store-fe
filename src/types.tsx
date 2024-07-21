import React from "react";

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

export interface CartItem {
    product_id: number;
    quantity: number;
    name?: string;
    price?: number;
    image?: string;
}

export interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateCartItem: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
