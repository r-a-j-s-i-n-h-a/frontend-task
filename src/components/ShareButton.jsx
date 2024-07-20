import React from 'react';

const ShareButton = ({ onShare }) => {
    return (
        <button
            onClick={onShare}
            className="text-white bg-cOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm w-full sm:w-auto px-5 py-[16px] text-center mt-2 hover:bg-orange-600 z-10"
        >
            Share
        </button>
    );
};

export default ShareButton;
