const errorHandler = (error, req, res, next) => {
    console.error(error);

    const statusCode = error.statusCode || 500;

    const response = {
        error: {
            message: error.message || 'Internal Server Error'
        }
    };

    res.status(statusCode).json(response);
}

module.exports = errorHandler;