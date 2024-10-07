import {useNavigate, useLocation} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useEffect} from 'react';

export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username || 'Guest';
    useEffect(()=>{
        document.title = "Welcome 🏠 "+username;
        document.icon="";
    })
    const home = (e) =>{
        e.preventDefault();
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