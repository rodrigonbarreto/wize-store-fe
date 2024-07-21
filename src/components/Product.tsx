import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import {Product as ProductType} from '../types';
import {useCart} from "../context/CartContext";

const Product: React.FC<ProductType> = ({ id, name, price, image }) => {

    const { cart, addToCart, updateCartItem, removeFromCart } = useCart();
    const [quantity, setQuantity] = useState(() => {
        const cartItem = cart.find(item => item.product_id === id);
        return cartItem?.quantity || 0;
    });

    const handleAddToCart = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);

        if (newQuantity === 1) return addToCart({ product_id: id, quantity: newQuantity, name, price: parseFloat(price), image});

        updateCartItem({ product_id: id, quantity: newQuantity });
    }

    const handleRemoveFromCart = () => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);

        if (newQuantity === 0) return removeFromCart(id);

        updateCartItem({ product_id: id, quantity: newQuantity });
    }


    return (
        <li className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link to={`/products/${id}`} className="block">
                <img src={image} alt={name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-gray-600">${price}</p>
                </div>
            </Link>
            <div className="p-4 flex justify-between items-center">
                <button
                    disabled={quantity === 0}
                    onClick={handleRemoveFromCart}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    -
                </button>
                <span>{quantity}</span>
                <button
                    onClick={handleAddToCart}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    +
                </button>
            </div>
        </li>
    );
};

export default Product;
