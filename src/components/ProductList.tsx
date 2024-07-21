import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import Product from './Product';
import { Product as ProductType } from '../types';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        supplier={product.supplier}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
