import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const LoginSuccess = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/tracking');
    }

    const handleLogout = () => {
        googleLogout();
        navigate('/login');
    }

    return (
        <div className="bg-page1 h-screen bg-cover bg-center relative flex flex-row min-h-screen justify-center items-center" >
            <div className="absolute h-[60vh] w-50 rounded-[24px] flex flex-col items-center bg-white p-7 font-inter"
            // style={{marginLeft:600}}
            >
                <img width={200} src="/src/assets/images/success.png" alt="success" />

                <h1 className="font-semibold text-2xl p-[24px] pt-0">Login Successfull</h1>

                <button type="submit" onClick={handleNext} className="text-white bg-cOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm w-full sm:w-auto px-5 py-[16px] text-center mt-2 hover:bg-orange-600">Go to Tracking Screen</button>

                <button onClick={handleLogout} className="opacity-50 text-sm font-semibold mt-[20px] hover:opacity-100">Logout</button>
            </div>
        </div>
    )
}

export default LoginSuccess