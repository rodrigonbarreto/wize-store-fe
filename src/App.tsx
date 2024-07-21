import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Navbar />
                    <div className="pt-16">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<ProductList />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
