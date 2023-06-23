const inputValidator = (req, res, next) => {
    if (req.method === 'GET') {
        if (!req.query) {
            const error = new Error('Request query not found');
            error.statusCode = 400;
            next(error);
        } else {
            const { id } = req.query;
    
            if (!id || !parseInt(id)) {
                const error = new Error('Invalid id');
                error.statusCode = 400;
                next(error);
            } else {
                next();
            }
        }
    } else {
        if (!req.body) {
            const error = new Error('Request body not found');
            error.statusCode = 400;
            next(error);
        } else {
            const { id } = req.body;
    
            if (!id || !parseInt(id)) {
                const error = new Error('Invalid id');
                error.statusCode = 400;
                next(error);
            } else {
                next();
            }
        }
    }
};

module.exports = inputValidator;