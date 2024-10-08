import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useEffect, useState} from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    useEffect(()=>{
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            document.title = "Welcome 🏠 " + storedUsername;
        }
        else{
            toast.error("Session expired, please log in again.");
            navigate('/login');
        }
        const timer = setTimeout(() => {
            toast.error("Session expired, please log in again.");
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login'); // Navigate to login after 10 seconds
        }, 100000);
        return () => clearTimeout(timer);
    },[navigate,username]);

    const home = (e) =>{
        e.preventDefault();
        localStorage.removeItem('token'); // Clear token from localStorage
        toast.success("Logout successful!");
        navigate('/login')
    }
    return (
        <div>
            <h1>Welcome 🏠 {username}</h1>
            <button onClick={home}>Logout</button>
        </div>
    )
}