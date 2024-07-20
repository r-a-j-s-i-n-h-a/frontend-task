import React from 'react';

const SpeedSlider = ({ speed, onSpeedChange }) => {
    return (
        <div className="my-3 w-5/6">
            <label className="block text-cOrange font-bold mb-2">Adjust Speed:</label>
            <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={speed}
                onChange={onSpeedChange}
                className="w-full h-2 bg-gray-400 rounded-lg cursor-pointer accent-cOrange"
            />
        </div>
    );
};

export default SpeedSlider;
