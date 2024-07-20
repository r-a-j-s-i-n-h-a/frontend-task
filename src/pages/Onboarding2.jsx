import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight02Icon from '../components/ArrowRight02Icon';

const Onboarding2 = () => {
    const [currentPage, setCurrentPage] = useState(2);
    const totalPages = 3;
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            if (nextPage === 3) {
                navigate('/onboarding3');
            }
        }
    };

    const handleSkip = () => {
        setCurrentPage(totalPages);
        navigate('/onboarding3');
    };

    return (
        <div>
            <div className="bg-page2 h-screen bg-cover bg-center relative flex justify-center">
                <div className='flex flex-col px-5 pt-8 pb-5 text-white bg-cOrange w-[311px] h-[400px] bottom-10 rounded-[48px] absolute text-center font-inter justify-between'style={{marginBottom:100}}>
                    <div className='flex flex-col items-center'>
                        <h4 className="text-[32px] leading-[40px] mb-4 font-semibold">We serve incomparable delicacies</h4>

                        <p className="text-[14px] mb-4 w-[251px]">All the best restaurants with their top menu waiting for you, they can't wait for your order!!</p>

                        <div className="flex items-center justify-center mb-8">
                            {[...Array(totalPages)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-[25px] h-[6px] mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-white' : 'bg-gray-400'}`}
                                ></span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-[14px]">
                            <button
                                onClick={handleSkip}
                                className="text-white font-semibold py-2 px-4 rounded"
                            >
                                Skip
                            </button>

                            <button
                                onClick={handleNext}
                                className="text-white font-semibold py-2 px-4 rounded flex items-center gap-1"
                            >
                                Next
                                <ArrowRight02Icon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding2;
