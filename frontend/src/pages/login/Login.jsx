import React, { useState } from 'react';
import { TbPasswordUser } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { validateEmail } from '../../utils/helper';
import { toast, Toaster } from 'react-hot-toast';
import Cookie from 'js-cookie';
import { useUser } from '../../UserContext';

const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useUser();    

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
    
        setError("");
        try {
            const response = await fetch('http://localhost:3000/loginuser', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json(); 
            console.log("API Response:", result);

            if (response.ok) {
                toast.success(result.message);
                console.log("Logging in user:", { name: result.user.name, email: result.user.email });
                Cookie.set('token', result.token, { expires: 1 });
                login({ name: result.user.name, email: result.user.email }); 
                setTimeout(() => {
                    navigate('/dashboard'); 
                }, 2000);
            } else {
                setError(result.error); 
                toast.error(result.error); 
            }
    
        } catch (error) {
            console.error('Error during login:', error);
            setError('Server error, please try again later.');
            toast.error('Server error, please try again later.'); 
        }
    };

    return (
        <div className='flex items-center justify-center pt-10'>
            <Toaster /> {/* Ensure toast notifications can be displayed */}
            <form onSubmit={handleLogin} className='p-6 rounded shadow-md'>
                <h4 className='text-2xl mb-3 border-b-2 pb-2 border-zinc-500'>Login</h4>

                <label className="input input-bordered min-w-[40vw] flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Write your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label className="input mt-2 relative input-bordered min-w-[40vw] flex items-center gap-2">
                    <TbPasswordUser />
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="grow"
                        placeholder="Write Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {isShowPassword ? (
                        <IoIosEye
                            size={22}
                            className='text-primary cursor-pointer'
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        <FaEyeSlash
                            size={22}
                            className='text-slate-400 cursor-pointer'
                            onClick={toggleShowPassword}
                        />
                    )}
                </label>

                {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

                <p className='text-sm mt-4'>
                    Not registered yet?{" "}
                    <Link to="/signUp" className=''>
                        <u className='text-blue-200'>Create an Account</u>
                    </Link>
                </p>

                <div className="mt-3 flex items-center gap-3">
                    <button className="btn btn-active btn-neutral" type="submit">Login to your account</button>
                    <Link to="/signUp">
                        <button className="btn" type="button">Sign up</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
