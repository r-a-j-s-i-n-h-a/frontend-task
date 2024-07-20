let latestEmail = '';

export const setLatestEmail = (email) => {
    latestEmail = email;
};

export const getLatestEmail = () => {
    return latestEmail;
};
