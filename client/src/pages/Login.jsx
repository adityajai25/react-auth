import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();

    const [data,setdata] = useState({
        email:'',
        password:''
    });
    const loginuser = async(e) =>{
        e.preventDefault();
        try{
            const {email,password} = data;
            const response = await axios.post('/login',{
                email,
                password
            });
            if (response.status === 200) {
                toast.success('Login successful!');
                 // Set the user as authenticated
                setdata({ email: '', password: '' });  // Reset the form data
                navigate('/');  // Navigate to the homepage or another page
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
                    <input type="password" className="form-control" id="floatingPassword" placeholder="password" name="password"
                    value={data.password}
                    onChange={(e)=> setdata({...data,password:e.target.value})}
                    required/>
                    <label htmlFor="floatingPassword">Password</label>
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