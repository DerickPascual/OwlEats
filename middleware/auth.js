const auth = (req, res, next) => {
    if (!req.session.user) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        next(error);
    } else {
        let parsedId;
        if (req.method === 'GET') {
            const { id } = req.query;
            parsedId = id;
        } else {
            const { id } = req.body;
            parsedId = id;
        }

        if (parsedId !== req.session.user.id) {
            const error = new Error('Request ID does not match ID associated with session');
            error.statusCode = 401;
            next(error);
        } else {
            next();
        }
    }
}

module.exports = auth;