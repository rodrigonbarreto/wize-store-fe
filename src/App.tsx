import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

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
                            <Route path="/products" element={<ProductList />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
