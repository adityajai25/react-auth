import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data,setdata] = useState({
        email:'',
        password:''
    });
    useEffect(()=>{
        document.title = "Sign-in 🔒";
        document.icon="🔒";
    });

    const loginuser = async(e) =>{
        e.preventDefault();
        try{
            const {email,password} = data;
            const response = await axios.post('http://localhost:5000/login',{
                email,
                password
            });
            if (response.status === 200) {
                toast.success('Login successful!');
                setdata({ email: '', password: '' });
                localStorage.setItem('token', response.data.token);
                const {username} = response.data;
                localStorage.setItem('username', username);  // Reset the form data
                navigate('/');
            }

        }catch(error){
            if (error.response && error.response.status === 422) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Login failed, please try again');
            }
        }
    }
    return (
        <div className="container">
            <form onSubmit={loginuser}>
                <h1>Welcome back, Login</h1>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingemail" placeholder="Email Address" name="email"
                    value={data.email}
                    onChange={(e)=> setdata({...data,email:e.target.value})} required/>
                    <label htmlFor="floatingemail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type={showPassword ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="password" name="password"
                    value={data.password}
                    onChange={(e)=> setdata({...data,password:e.target.value})}
                    required/>
                    <label htmlFor="floatingPassword">Password</label>
                    <button
                        type="button"
                        className="btn btn-outline-dark position-absolute end-1 top-50 translate-middle-y"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ right: '10px' }}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
            <div className="mt-3">
                <strong>Don&apos;t have an account? </strong>
                <Link to="/signup"><strong>Register</strong></Link>
            </div>
        </div>
    )
}