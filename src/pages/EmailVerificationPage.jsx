import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState({ code1: '', code2: '', code3: '', code4: '' });
    const [email, setEmail] = useState(''); // formValue
    const [timer, setTimer] = useState(540);
    const [formErrors, setFormErrors] = useState('');

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setFormErrors('Please resend the OTP');
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleChange = (e) => {
        setCode({ ...code, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = `${code.code1}${code.code2}${code.code3}${code.code4}`;

        try {
            const response = await fetch('http://localhost:3000/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify OTP');
            }

            const data = await response.json();

            if (data.status === 'VERIFIED') {
                navigate('/reset');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Failed to verify OTP. Please try again.');
        }
    };

    const handleResend = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resend-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to resend OTP');
            }

            const data = await response.json();

            if (data.status === 'PENDING') {
                alert('Verification email resent. Please check your inbox.');
                setTimer(540);
                setFormErrors('');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            alert('Failed to resend OTP. Please try again.');
        }
    };

    const handleBack = () => {
        navigate('/forgot');
    };

    const isButtonDisabled = Object.values(code).some(value => value === '');

    return (
        <div className="p-5 font-inter min-h-screen flex flex-col items-center">
            <button onClick={handleBack} className="w-full flex items-center mb-5">
                <div className="border rounded-full p-1 cursor-pointer">
                    <img src="/src/assets/arrow-left.svg" alt="back" />
                </div>
                <div className="text-center w-full">
                    <span className="font-bold">OTP</span>
                </div>
            </button>

            <div className="flex flex-col mb-7 max-w-sm w-full mx-auto md:text-center">
                <h1 className="text-[32px] font-semibold">Email Verification</h1>
                <p className="opacity-50 text-sm font-semibold">Enter the verification code we sent you at: {email}</p>
            </div>

            <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex mb-2 space-x-4 rtl:space-x-reverse w-full sm:max-w-sm mx-auto">
                    {['code1', 'code2', 'code3', 'code4'].map((codeId, index) => (
                        <div key={index} className="w-1/4">
                            <label htmlFor={codeId} className="sr-only">Code {index + 1}</label>
                            <input
                                type="text"
                                maxLength="1"
                                id={codeId}
                                value={code[codeId]}
                                onChange={handleChange}
                                className="block w-full h-14 text-lg font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required autoComplete='off'
                            />
                        </div>
                    ))}
                </div>

                {formErrors && (
                    <div className="my-3 text-red-500 text-sm text-center">
                        {formErrors}
                    </div>
                )}

                <div className="my-3 text-sm text-center">
                    <span className="opacity-50 font-semibold">Didn't receive the code? </span>
                    <span onClick={handleResend} className="text-cOrange font-semibold cursor-pointer">Resend</span>
                </div>

                <div className="flex gap-2 items-center justify-center my-6">
                    <img width={18} className="opacity-50" src="/src/assets/clock.svg" alt="clock" />
                    <span className="timer opacity-50 text-sm font-semibold">{formatTime(timer)}</span>
                </div>

                <div className="w-full flex justify-center absolute bottom-8 left-0">
                    <button
                        type="submit"
                        disabled={isButtonDisabled || formErrors}
                        className={`text-white bg-cOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm w-[90%] sm:w-auto px-5 py-[16px] text-center ${isButtonDisabled || formErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmailVerificationPage;
