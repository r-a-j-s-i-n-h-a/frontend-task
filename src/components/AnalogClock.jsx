import React from 'react';

const AnalogClock = ({ time }) => {

    const calculateDegrees = () => {
        const hours = time.getHours() % 12;
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const hourDegrees = -(hours * 30) + (minutes / 2) + 180 + (30 / 60) * minutes + (30 / 3600) * seconds + 180 / 12 * (hours % 12) + 180 / 3600 * minutes + 180 / 216000 * seconds + 180 / 43200000 * time.getMilliseconds();
        const minuteDegrees = -(minutes * 6) + 180 + (6 / 60) * seconds + 180 / 60 * minutes + 180 / 3600 * seconds + 180 / 216000 * time.getMilliseconds();
        const secondDegrees = (seconds * 6) + 180 + 180 / 60 * seconds + 180 / 3600 * seconds + 180 / 216000 * time.getMilliseconds();
        return { hourDegrees, minuteDegrees, secondDegrees };
    };

    const { hourDegrees, minuteDegrees, secondDegrees } = calculateDegrees();

    const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className="relative w-64 h-64 border-4 border-gray-800 rounded-full flex items-center justify-center mb-5">
            <div className="absolute w-1/2 h-1 bg-gray-800 origin-bottom" style={{ transform: `rotate(${hourDegrees}deg)` }}>
                <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 -translate-x-1 -translate-y-1" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }} />
            </div>
            <div className="absolute w-3/4 h-1 bg-gray-800 origin-bottom" style={{ transform: `rotate(-${minuteDegrees}deg)` }}>
                <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 -translate-x-1 -translate-y-1" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }} />
            </div>
            <div className="absolute w-3/4 h-1 bg-red-600 origin-bottom" style={{ transform: `rotate(-${secondDegrees}deg)` }}>
                <div className="absolute w-3 h-3 bg-red-600 transform rotate-45 -translate-x-1 -translate-y-1" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }} />
            </div>
            {clockNumbers.map((num) => (
                <div
                    key={num}
                    className="absolute text-gray-800"
                    style={{
                        transform: `rotate(${num * 30}deg) translate(0, -110px) rotate(-${num * 30}deg)`,
                    }}
                >
                    {num}
                </div>
            ))}
        </div>
    );
};

export default AnalogClock;

