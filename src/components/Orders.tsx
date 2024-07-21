import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {getUserOrders} from '../services/api';
import {Order} from "../types";

const Orders: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('token');
                    if (token) {
                        const data = await getUserOrders(token);
                        setOrders(data);
                    } else {
                        setErrorMessage('Authentication token is missing.');
                    }
                } catch (error) {
                    setErrorMessage('Failed to fetch orders. Please try again.');
                }
            }
        };

        fetchOrders();
    }, [user]);

    useEffect(() => {
        if(location?.state?.message) {
            setSuccessMessage(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <ul>
                {orders.map((order) => (
                    <li key={order.id} className="mb-4">
                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
                            <h3 className="text-2xl font-bold mb-2" >Total: #{order.total_price} </h3>
                            <p>Total Price: ${order.total_price}</p>
                            <p>Status: {order.status}</p>
                            <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            <ul className="mt-4">
                                {order.items.map((item) => (
                                    <li key={item.product_id} className="flex justify-between items-center mb-2">
                                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
                                        <span>{item.product.name}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
