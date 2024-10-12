// Signup.jsx
import React, { useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper'; 
import { Toaster, toast } from 'react-hot-toast'; 

const Signup = () => {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!name) {
            setError("Please Enter Your name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please Enter a Valid Email Address");
            return;
        }
        if (!password) {
            setError("Please Enter The Password");
            return;
        }

        setError('');

        try {
            const response = await fetch('http://localhost:3000/createUser', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include' 
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Account created successfully!");
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                setError(result.message || "An error occurred. Please try again.");
                toast.error(result.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Server error, please try again later.');
            toast.error('Server error, please try again later.');
        }
    };

    return (
        <div>
            <Toaster />
            <div className='flex items-center justify-center pt-10'>
                <form onSubmit={handleSignUp}>
                    <h4 className='text-2xl mb-3 border-b-2 pb-2 border-zinc-500'>Signup</h4>
                    <label className="input input-bordered min-w-[40vw] flex items-center gap-2">
                        <MdOutlineDriveFileRenameOutline />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="input mt-2 input-bordered min-w-[40vw] flex items-center gap-2">
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
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    {error ? <p className='text-red-500 text-xs pt-4'>{error}</p> : ""}

                    <p className='text-sm mt-4'>
                        Already have an account?{" "}
                        <Link to="/login">
                            <u className='text-blue-200'>Login to your account</u>
                        </Link>
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                        <button className="btn btn-active btn-neutral" type="submit">Create Account</button>
                        <Link to="/login">
                            <button className="btn" type="button">Login</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
