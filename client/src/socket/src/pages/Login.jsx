import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {registerUser } from '@/services/backendInt';

export default function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res =await registerUser(username);
        setUser(res.data);
        navigate('/');
    };
    return (
        <div className ="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-xl font-bold mb-6 text-center">LJoin Chat</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </div>
    );
}