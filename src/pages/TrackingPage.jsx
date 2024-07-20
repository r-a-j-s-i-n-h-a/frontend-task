import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnalogClock from '../components/AnalogClock';
import SpeedSlider from '../components/SpeedSlider';
import ShareButton from '../components/ShareButton';
import RandomQuote from '../components/RandomQuote';

const TrackingPage = () => {
    const [time, setTime] = useState(new Date());
    const [speed, setSpeed] = useState(1);
    const intervalRef = useRef(null);
    const categories = [ 'age', 'beauty', 'courage', 'dreams', 'environmental', 'faith', 'god', 'happiness', 'imagination', 'jealousy', 'knowledge', 'leadership', 'marriage', 'success', ]; // Example categories
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sharedSpeed = parseFloat(params.get('speed'));
        if (!isNaN(sharedSpeed)) {
            setSpeed(sharedSpeed);
        }
    }, [location.search]);

    // Start clock
    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        intervalRef.current = setInterval(() => {
            setTime(prevTime => new Date(prevTime.getTime() + 1000 * speed));
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [speed]);

    useEffect(() => {
        const categoryInterval = setInterval(() => {
            setCurrentCategoryIndex(prevIndex => (prevIndex + 1) % categories.length);
        }, 15000); // Change category every 15 seconds

        return () => clearInterval(categoryInterval);
    }, [categories]);

    const handleSpeedChange = (e) => {
        setSpeed(parseFloat(e.target.value));
    };

    const handleShare = () => {
        const uniqueURL = `${window.location.origin}${window.location.pathname}?speed=${speed}`;
        navigator.clipboard.writeText(uniqueURL);
        alert('URL copied to clipboard!');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            <div className="absolute inset-0 bg-page1 bg-repeat-y bg-center bg-cover filter blur-sm min-h-[110vh]"></div>
            <div className="absolute inset-0 bg-black opacity-30 min-h-[110vh]"></div>

            <Navbar />

            <div className=" top-36 flex flex-col items-center justify-center min-h-fit rounded-lg bg-gray-100 absolute p-5 top-20 w-5/6">
                <AnalogClock time={time} />
                <SpeedSlider speed={speed} onSpeedChange={handleSpeedChange} />
                <ShareButton onShare={handleShare} />
                <RandomQuote category={categories[currentCategoryIndex]} />
            </div>
        </div>
    );
};

export default TrackingPage;
