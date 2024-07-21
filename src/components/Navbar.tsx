import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md fixed w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">My Store</Link>
                <div>
                    {isAuthenticated && user ? (
                        <>
                            <span className="mr-4">Logged in as: {user.name}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </Link>
                    )}
                    <Link to="/cart" className="ml-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        Cart
                    </Link>
                    <Link to="/orders" className="ml-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        My Orders
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
