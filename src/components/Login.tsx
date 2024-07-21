import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginRequest } from '../services/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            const { access_token, user } = await loginRequest(email, password);
            login(access_token, user);
            navigate('/');
        } catch (error: any) {
            setErrors(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
