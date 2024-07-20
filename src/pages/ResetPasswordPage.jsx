import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [formValues, setFormValues] = useState({ password: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            navigate('/resetSuccess');
        }
    }, [formErrors, isSubmit]);

    const togglePasswordVisibility1 = () => {
        setPasswordVisible1(!passwordVisible1);
    };

    const togglePasswordVisibility2 = () => {
        setPasswordVisible2(!passwordVisible2);
    };

    const handleBack = () => {
        navigate('/email');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values) => {
        const errors = {};
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('http://localhost:3000/api/resetPassword', {
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
                    setIsSubmit(false);
                }
            } catch (error) {
                console.error('Reset Password Error:', error);
                setFormErrors({ message: 'Internal Server Error' });
                setIsSubmit(false);
            }
        } else {
            setIsSubmit(false);
        }
    };

    return (
        <div className="p-5 font-inter min-h-screen">
            <button onClick={handleBack} className="w-full flex items-center mb-5">
                <div className="border rounded-full p-1 cursor-pointer">
                    <img src="/src/assets/arrow-left.svg" alt="back" />
                </div>
                <div className="text-center w-full">
                    <span className="font-bold">Reset Password</span>
                </div>
            </button>

            <div className="flex flex-col mb-7 max-w-sm w-full mx-auto md:text-center">
                <h1 className="text-[32px] font-semibold">Reset Password?</h1>
                <p className="opacity-50 text-sm font-semibold">Your new password must be different from the previously used password</p>
            </div>

            <form className="max-w-sm w-full mx-auto flex flex-col justify-between h-[70vh]" onSubmit={handleSubmit}>
                <div className='w-full'>
                    <div className="mb-5 relative w-full">
                        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">New Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible1 ? 'text' : 'password'}
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
                                onClick={togglePasswordVisibility1}
                                className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent focus:outline-none"
                            >
                                <img src={passwordVisible1 ? "/src/assets/eye.svg" : "/src/assets/eye-cross.svg"} alt="Toggle visibility" />
                            </button>
                        </div>
                        {formErrors.password && (
                            <p className="text-red-500 my-1 text-sm">{formErrors.password}</p>
                        )}
                        {!formErrors.password && (
                            <span className="opacity-50 text-sm font-semibold">Must be at least 8 characters</span>
                        )}
                    </div>

                    <div className="mb-5 relative w-full">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible2 ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                                placeholder="Confirm Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility2}
                                className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent focus:outline-none"
                            >
                                <img src={passwordVisible2 ? "/src/assets/eye.svg" : "/src/assets/eye-cross.svg"} alt="Toggle visibility" />
                            </button>
                        </div>
                        {formErrors.confirmPassword && (
                            <p className="text-red-500 my-1 text-sm">{formErrors.confirmPassword}</p>
                        )}
                        {!formErrors.confirmPassword && (
                            <span className="opacity-50 text-sm font-semibold">Both passwords must match</span>
                        )}
                    </div>
                </div>

                <div className="w-full flex justify-center mt-5">
                    <button
                        type="submit"
                        className={`text-white bg-cOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm w-full sm:w-auto px-5 py-[16px] text-center ${!formValues.password || !formValues.confirmPassword ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                        disabled={!formValues.password || !formValues.confirmPassword}
                    >
                        Verify Account
                    </button>
                </div>
                {formErrors.message && (
                    <p className="text-sm text-red-800 my-5 text-center">{formErrors.message}</p>
                )}
            </form>
        </div>
    );
};

export default ResetPasswordPage;
