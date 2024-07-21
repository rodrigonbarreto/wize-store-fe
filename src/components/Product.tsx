import React from 'react';
import { Link } from 'react-router-dom';
import { Product as ProductType } from '../types';

interface ProductProps extends ProductType {}

const Product: React.FC<ProductProps> = ({ id, name, price, image, supplier }) => {
    return (
        <li className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link to={`/products/${id}`} className="block">
                <img src={image} alt={name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-gray-600">${price}</p>
                </div>
            </Link>
        </li>
    );
};

export default Product;
