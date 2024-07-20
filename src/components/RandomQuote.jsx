import React, { useState, useEffect } from 'react';

const RandomQuote = ({ category }) => {
    const [quote, setQuote] = useState('');

    const fetchQuote = async () => {
        try {
            const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
            const apiKey = '6F1WKSqfVPDiUGWzETUFCg==Ld1TqGCCeNnxW4Ec';

            const response = await fetch(apiUrl, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const { quote, author } = data[0];
                setQuote(`${quote} - ${author}`);
            } else {
                throw new Error('Empty response or invalid data format');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    useEffect(() => {
        fetchQuote();
        const interval = setInterval(fetchQuote, 5000); // Fetch a new quote every 5 seconds
        return () => clearInterval(interval);
    }, [category]);

    return (
        <div className="mt-4 p-4 bg-white rounded shadow-lg text-center w-full font-inter">
            <p className="text-black text-sm">{quote}</p>
        </div>
    );
};

export default RandomQuote;
