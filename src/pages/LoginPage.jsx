import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            navigate('/loginSuccess');
        }
    }, [formErrors]);

    const handleRegister = () => {
        navigate('/register');
    };

    const handleForgetPassword = (e) => {
        e.preventDefault();
        navigate('/forgot');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });
                const data = await response.json();
                if (response.ok) {
                    setIsSubmit(true);
                } else {
                    setFormErrors({ message: data.message });
                }
            } catch (error) {
                console.error('Login Error:', error);
                setFormErrors({ message: 'Internal Server Error' });
            }
        } else {
            setIsSubmit(false);
        }
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        } else if (values.password.length > 15) {
            errors.password = "Password cannot exceed more than 15 characters";
        }
        return errors;
    };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            navigate('/loginSuccess');
        },
        onError: () => {
            console.error('Login Failed');
        },
    });

    return (
        <div className="p-5 font-inter"
        style={{marginTop:100}}
        >
            <div className="flex flex-col mb-7 max-w-sm mx-auto">
                <h1 className="text-[32px] font-semibold">Login to your account</h1>
                <p className="opacity-50 text-sm font-semibold">Please sign in to your account</p>
            </div>

            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Email"
                        required
                    />
                    <p className='text-sm text-red-800 my-2'>{formErrors.email}</p>
                </div>

                <div className="mb-5 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Password</label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent focus:outline-none"
                        >
                            <img src={passwordVisible ? "/src/assets/eye.svg" : "/src/assets/eye-cross.svg"} alt="Toggle visibility" />
                        </button>
                    </div>
                    <p className='text-sm text-red-800 my-2'>{formErrors.password}</p>
                </div>

                <div className="flex justify-end mb-5 w-full">
                    <button onClick={handleForgetPassword} className="ms-2 text-sm font-semibold text-cOrange dark:text-gray-300">Forgot Password?</button>
                </div>

                <button
                    type="submit"
                    className={`text-white bg-cOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm w-full sm:w-auto px-40 py-[15px] text-center ${!formValues.email || !formValues.password ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                    disabled={!formValues.email || !formValues.password}
                >
                    Sign In
                </button>
                {formErrors.message && (
                    <p className="text-sm text-red-800 my-5 text-center">{formErrors.message}</p>
                )}
            </form>

            <div className="option flex items-center my-5">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 text-gray-400 text-sm font-medium">Or sign in with</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <button onClick={() => login()} className="mb-7 flex justify-center w-full">
                <img src="/src/assets/images/google.png" alt="Google sign-in" />
            </button>

            <div className="register text-center text-sm">
                <span className="font-semibold">Don't have an account? </span>
                <span onClick={handleRegister} className="text-cOrange font-semibold cursor-pointer">Register</span>
            </div>
        </div>
    );
};

export default LoginPage;
