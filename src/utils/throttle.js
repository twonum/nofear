let lastEmailTimestamp = 0;

export const canSendEmail = () => {
    const now = Date.now();
    if (now - lastEmailTimestamp > 3600000) { // 1 hour in milliseconds
        lastEmailTimestamp = now;
        return true;
    }
    return false;
};
