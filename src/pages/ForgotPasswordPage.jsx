import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            navigate('/email');
        }
    }, [formErrors]);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const validate = (email) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!email) {
            errors.email = "Email is required!";
        } else if (!regex.test(email)) {
            errors.email = "This is not a valid email format!";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(email);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('http://localhost:3000/api/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                const data = await response.json();
                if (response.ok) {
                    // navigate('/email');
                    setIsSubmit(true);
                } else {
                    setFormErrors({ message: data.message });
                }
            } catch (error) {
                console.error('Email Send Error:', error);
                setFormErrors({ message: 'Internal Server Error' });
            }
        } else {
            setIsSubmit(false);
        }
    };
    

    return (
        <div className="p-5 font-inter min-h-screen flex flex-col items-center"
        style={{marginTop:100}}
        >

            <div className="flex flex-col mb-7 max-w-sm w-full mx-auto md:text-center">
                <h1 className="text-[32px] font-semibold">Forgot Password?</h1>
                <p className="opacity-50 text-sm font-semibold">Enter your email address and we'll send you a confirmation code to reset your password</p>
            </div>

            <form className="max-w-sm w-full mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Email"
                        required
                    />
                    <p className='text-sm text-red-800 my-2'>{formErrors.email}</p>
                    {formErrors.message && (
                    <p className="text-sm text-red-800 my-5 text-center">{formErrors.message}</p>
                )}
                </div>

                <div className="w-full flex justify-center absolute left-0">
                    <button
                        type="submit"
                        className={`text-white bg-cOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm w-[90%] sm:w-auto px-5 py-[16px] text-center ${!email ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                        disabled={!email}
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
