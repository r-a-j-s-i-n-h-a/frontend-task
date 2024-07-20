import bcrypt from 'bcrypt';

const hashData = async (data, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        throw new Error('Hashing failed', error);
    }
};

export default hashData;
