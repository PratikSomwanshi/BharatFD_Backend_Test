export const createResponse = (
    success,
    data = null,
    message = "",
    error = null
) => {
    return {
        success,
        data,
        message,
        error: error ? { explanation: error.message } : null,
    };
};
