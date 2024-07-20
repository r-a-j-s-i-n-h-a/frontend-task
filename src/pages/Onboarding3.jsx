import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight02Icon from '../components/ArrowRight02Icon';

const Onboarding3 = () => {
    const currentPage = 3;
    const totalPages = 3;
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/login');
    };

    return (
        <div>
            <div className="bg-page3 h-screen bg-cover bg-center relative flex justify-center">
                <div className='flex flex-col px-5 pt-8 pb-5 text-white bg-cOrange w-[311px] h-[400px] bottom-10 rounded-[48px] absolute text-center font-inter justify-between'style={{marginBottom:100}}>
                    <div className='flex flex-col items-center'>
                        <h4 className="text-[32px] leading-[40px] mb-4 font-semibold">We serve incomparable delicacies</h4>

                        <p className="text-[14px] mb-4 w-[251px]">All the best restaurants with their top menu waiting for you, they can't wait for your order!!</p>

                        <div className="flex items-center justify-center mb-4">
                            {[...Array(totalPages)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-[25px] h-[6px] mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-white' : 'bg-gray-400'}`}
                                ></span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center text-cOrange">
                        <div className="flex justify-center h-[94px] w-[94px] relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button onClick={handleNext} className="progress bg-white h-[60px] w-[60px] rounded-full flex justify-center items-center z-10">
                                    <ArrowRight02Icon />
                                </button>
                            </div>
                            <div className="absolute inset-0 rounded-full border-[3px] border-t-cOrange animate-spin75"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Onboarding3;
