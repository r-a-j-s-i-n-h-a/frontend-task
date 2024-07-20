import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordSuccess = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/login');
    }

    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 bg-page4 bg-cover bg-center filter blur-sm"></div>

            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative h-full flex flex-col justify-end">
                <div className="h-[60vh] w-full rounded-t-[24px] flex flex-col items-center bg-white p-7 font-inter">
                    <img width={200} src="/src/assets/images/success.png" alt="success" />

                    <h1 className="font-semibold text-2xl px-[24px]">Password Changed</h1>

                    <p className="opacity-50 text-sm font-semibold text-center my-3">Password changed successfully, you can login again with a new password</p>

                    <button 
                        type="submit" 
                        onClick={handleNext} 
                        className="text-white bg-cOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm w-full sm:w-auto px-5 py-[16px] text-center mt-5"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordSuccess;
