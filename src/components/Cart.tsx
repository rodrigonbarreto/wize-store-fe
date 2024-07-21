import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {useAuth} from "../context/AuthContext";
import { checkout } from '../services/api';

const Cart: React.FC = () => {
    const { cart, setCart } = useCart();
    const [message, setMessage] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item?.price || 0) * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            setMessage('You need to be logged in to complete the order.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Authentication token is missing.');
            return;
        }

        try {
            const response = await checkout(cart, token);
            setCart([]); // Clear the cart on successful checkout

            if (response.message === 'Order completed successfully') {
                navigate('/orders', { state: { message: response.message } });
            } else {
                setMessage(response.message);
            }
        } catch (error: any) {
            setMessage('Checkout failed. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cart</h1>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <ul className="mb-4">
                {cart.map((item) => (
                    <li key={item.product_id} className="flex justify-between items-center mb-2">
                        <span>{item.name}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Total: ${((item?.price || 0) * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="text-right mb-4">
                <span className="font-bold">Grand Total: ${calculateTotal()}</span>
            </div>
            <button
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
                Checkout
            </button>
        </div>
    );
};

export default Cart;
