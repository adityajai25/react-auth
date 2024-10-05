import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export default function Home() {
    const navigate = useNavigate();
    const home = (e) =>{
        e.preventDefault();
        toast.success("Logout successful!");
        navigate('/login')
    }
    return (
        <div>
            <h1>Home</h1>
            <button onClick={home}>Logout</button>
        </div>
    )
}
