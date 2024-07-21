import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Product as ProductType } from '../types';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProductById(Number(id));
            setProduct(product);
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
            <p className="text-xl font-semibold">${product.price}</p>
            <p className="text-gray-600 mt-2">{product.supplier}</p>
        </div>
    );
};

export default ProductDetails;
