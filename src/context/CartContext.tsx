import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {CartContextProps, CartItem} from "../types";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: CartItem) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const updateCartItem = (updatedProduct: CartItem) => {
        setCart((prevCart) => {
            const itemInCartIndex = prevCart.findIndex((item) => item.product_id === updatedProduct.product_id);

            prevCart.splice(itemInCartIndex, 1, {...prevCart[itemInCartIndex], ...updatedProduct})

            return prevCart;
        });
    };

    const removeFromCart = (product_id: number) => {
        setCart((prevCart) => {
            const itemInCartIndex = prevCart.findIndex((item) => item.product_id === product_id);

            prevCart.splice(itemInCartIndex, 1)

            return prevCart;
        });
    };



    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
