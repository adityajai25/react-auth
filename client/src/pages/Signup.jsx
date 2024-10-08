import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        document.title = "Sign-up 🔒";
        document.icon = "🔒";
    })
    const [data, setdata] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: '',
        city: ''
    });
    
    const navigate = useNavigate();

    // Validate password length and confirmation
    useEffect(() => {
        if (data.password.length > 0 && data.password.length <7) {
            setError('Password must be at least 8 characters long');
        } else if (data.password !== data.cpassword) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    }, [data.password, data.cpassword]);

    const registeruser = async (e) => {
        e.preventDefault();
        if (error) {
            toast.error(error);
            return;
        }

        const { fname, lname, email, password, cpassword,city } = data;
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                fname,
                lname,
                email,
                password,
                cpassword,
                city
            });

            // Handle server response
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success("Registration successful!");
                setdata({ fname: '', lname: '', email: '', password: '', cpassword: '', city: '' });
                navigate('/login');
            }
        } catch (err) {
            toast.error("Registration failed: " + (err.response?.data?.error || err.message));
            console.error(err);
        }
    };

    return (
        <div className="container">
            <form onSubmit={registeruser}>
                <h1>Register a new user</h1>
                <div className="form-floating mb-3">
                    <input type="text" className='form-control' id="firstname" name="fname" placeholder='First Name ...' 
                    value={data.fname} 
                    onChange={(e)=> setdata({...data,fname:e.target.value})} required/>
                    <label htmlFor="firstname">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className='form-control' name="lname" id="lastname" placeholder='Last Name ...' 
                    value={data.lname}
                    onChange={(e)=> setdata({...data,lname:e.target.value})} required/>
                    <label htmlFor="lastname">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" name="email" id="floatingInput" placeholder="name@example.com"
                    value={data.email}
                    onChange={(e)=> setdata({...data,email:e.target.value})} required/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type={showPassword ? "text" : "password"} className="form-control" name="password" id="floatingPassword" placeholder="Password"
                    value={data.password}
                    onChange={(e)=> setdata({...data,password:e.target.value})}
                    required/>
                    <label htmlFor="floatingPassword">Enter Password</label>

                    <button
                        type="button"
                        className="btn btn-outline-dark position-absolute end-1 top-50 translate-middle-y"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ right: '10px' }}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className={`form-floating mb-3 ${error ? 'is-invalid' : ''}`}>
                    <input type="text" className={`form-control ${error ? 'border-danger' : ''}`} name="cpassword" id="floatingcPassword" placeholder="Confirm Password"
                    value={data.cpassword}
                    onChange={(e)=> setdata({...data,cpassword:e.target.value})}
                    required/>
                    <label htmlFor="floatingcPassword">Confirm Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="city" id="floatingcity" placeholder='City'
                    value={data.city}
                    onChange={(e)=> setdata({...data,city:e.target.value})} required/>
                    <label htmlFor="floatingcity">City</label>
                </div>
                <button type="submit" >
                    Submit
                </button>
            </form>
            <div className="mt-3">
                <strong>Already have an account? </strong>
                <Link to="/login"><strong>Login</strong></Link>
            </div>
        </div>
    );
}
