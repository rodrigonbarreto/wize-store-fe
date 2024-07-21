import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
    const { cart } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item?.price || 0) * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cart</h1>
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
                onClick={() => {
                    // TODO: Implement checkout
                }}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                Checkout
            </button>
        </div>
    );
};

export default Cart;
